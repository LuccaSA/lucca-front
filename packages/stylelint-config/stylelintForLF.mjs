import LFVersions, { normalizeVersion } from './LFVersions.mjs';
import currentLFVersion from './currentLFVersion.mjs';

/**
 * @typedef {object} DisallowedObject - Object found in the list of disallowed objects
 * @property {(RegExp | string)[] | RegExp | string} [objectPattern] - Pattern(s) matching the deprecated element
 * @property {string} versionDeprecated - LF version deprecating the element
 * @property {string} [versionDeleted] - LF version deleting the element
 * @property {string} [actions] - Migration actions
 * @property {object} [urls] - Related URLs
 * @property {Date} [dateDeprecated] - Deprecation date, added by setDates()
 * @property {Date} [dateDeleted] - Deletion date, added by setDates()
 * @property {string} [faultyPattern] - Pattern reported by Stylelint, added by getDisallowedData()
 */

/**
 * Get all blacklisted elements from all versions.
 *
 * @param {DisallowedObject[]} disallowedObjects - List of disallowed objects
 * @return {(RegExp | string)[]}
 */
export function getDisallowedObjects(disallowedObjects) {
	return disallowedObjects.flatMap((object) => object.objectPattern).filter((pattern) => pattern != null);
}

/**
 * Get data related to object.
 *
 * @param {DisallowedObject[]} disallowedObjects - List of disallowed objects
 * @param {string} faultyPattern - Pattern provided by Stylelint, to check against list of custom patterns
 * @return {{message: string, severity: string}}
 */
export function getDisallowedData(disallowedObjects, faultyPattern) {
	let objectData = disallowedObjects.find((haystack) => {
		// If the patterns are within an array, parse it.
		if (Array.isArray(haystack.objectPattern)) {
			return haystack.objectPattern.find((subHaystack) => {
				return comparePatterns(faultyPattern, subHaystack);
			});
		}

		return comparePatterns(faultyPattern, haystack.objectPattern);
	});

	objectData = setDates(objectData);
	objectData.faultyPattern = faultyPattern;

	return {
		message: getMessage(objectData),
		severity: getSeverity(objectData),
	};
}

/**
 * Set deprecation and deletion dates for an object.
 *
 * @param {DisallowedObject} objectData
 * @return {DisallowedObject}           - objectData with dates.
 */
function setDates(objectData) {
	return {
		...objectData,
		dateDeprecated: getDateForVersion(objectData.versionDeprecated),
		dateDeleted: getDateForVersion(objectData.versionDeleted),
	};
}

/**
 * Is the parameter a valid date?
 *
 * @param {*} date - Value to analyse
 * @return {boolean}
 */
function isValidDate(date) {
	return date instanceof Date && !isNaN(date);
}

/**
 * Get date for the specified LF version.
 *
 * @param {string} version - semver formatted LF version
 * @return {Date|undefined}
 */
function getDateForVersion(version) {
	if (!version) {
		return;
	}

	// LFVersions keys are normalised; a non-normalised lookup would silently miss the map.
	const normalizedVersion = normalizeVersion(version);

	if (normalizedVersion in LFVersions) {
		const date = new Date(LFVersions[normalizedVersion]);

		if (isValidDate(date)) {
			return date;
		}
	}
}

/**
 * Compare the faulty pattern with disallowed patterns.
 *
 * @param {string} faultyPattern - faultyPattern returned by Stylelint
 * @param {(RegExp | string)[] | RegExp | string} disallowedPattern - Custom pattern to match
 * @return {boolean}
 */
function comparePatterns(faultyPattern, disallowedPattern) {
	//  A missing pattern never matches: this keeps a broken object from crashing Stylelint.
	if (disallowedPattern == null) {
		return false;
	}

	if (typeof disallowedPattern === 'string') {
		return faultyPattern === disallowedPattern;
	}

	return disallowedPattern.test(faultyPattern);
}

/**
 * Format message based on versions criticity.
 *
 * @param {DisallowedObject} objectData
 * @return {string}
 */
function getMessage(objectData) {
	const status = isDeleted(objectData) ? 'deleted' : 'deprecated';

	let pattern = `${objectData.faultyPattern}`;
	let messageDeprecated = '';
	let messageDeleted = '';
	let messageLFVersionWarning = '';

	if (!currentLFVersion) {
		messageLFVersionWarning = ' | LF version not found';
	}

	if (objectData.dateDeprecated) {
		const daysAgo = Math.ceil((objectData.dateDeprecated.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
		const daysAgoString = new Intl.RelativeTimeFormat().format(daysAgo, 'day');

		messageDeprecated = ` | since ${objectData.dateDeprecated.toLocaleDateString()} (${daysAgoString}, LF ${objectData.versionDeprecated})`;
	}

	if (objectData.dateDeleted) {
		const daysLeft = Math.ceil((objectData.dateDeleted.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
		const dayString = new Intl.RelativeTimeFormat().format(daysLeft, 'day');

		messageDeleted = ` | until ${objectData.dateDeleted.toLocaleDateString()} (${dayString}, LF ${objectData.versionDeleted})`;
	}

	return `${status}${messageLFVersionWarning}${messageDeprecated}${messageDeleted} | ${pattern}`;
}

/**
 * Is the element deleted for the current LF version?
 * Single source of truth for getMessage() and getSeverity().
 * Compares dot-separated versions part by part so the most significant difference decides.
 * A plain string comparison would misorder them (e.g. `9.0.0` > `22.0.0`).
 *
 * @param {DisallowedObject} objectData
 * @return {boolean} - true if the current LF version is at or past versionDeleted
 */
function isDeleted(objectData) {
	if (!currentLFVersion || !objectData.versionDeleted) {
		return false;
	}

	const [currentParts, currentPrerelease] = parseVersion(currentLFVersion);
	const [deletedParts, deletedPrerelease] = parseVersion(objectData.versionDeleted);
	const length = Math.max(currentParts.length, deletedParts.length);

	for (let i = 0; i < length; i++) {
		const diff = (parseInt(currentParts[i], 10) || 0) - (parseInt(deletedParts[i], 10) || 0);

		if (diff < 0) {
			return false;
		}

		if (diff > 0) {
			return true;
		}
	}

	// Equal release versions: per semver, a prerelease sorts before its release (`22.0.0-rc.1` < `22.0.0`).
	if (currentPrerelease && !deletedPrerelease) {
		return false;
	}

	return true;
}

/**
 * Split a version into its numeric release parts and its prerelease tag.
 * e.g. `22.0.0-rc.1` → [['22', '0', '0'], 'rc.1']
 *
 * @param {string} version - semver formatted LF version
 * @return {[string[], string]}
 */
function parseVersion(version) {
	const hyphenIndex = version.indexOf('-');

	if (hyphenIndex === -1) {
		return [version.split('.'), ''];
	}

	return [version.slice(0, hyphenIndex).split('.'), version.slice(hyphenIndex + 1)];
}

/**
 * Get severity based on version used.
 *
 * @param {DisallowedObject} objectData
 * @return {'warning'|'error'}
 */
function getSeverity(objectData) {
	return isDeleted(objectData) ? 'error' : 'warning';
}
