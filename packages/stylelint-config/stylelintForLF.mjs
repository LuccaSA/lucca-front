import LFVersions from './LFVersions.mjs';
import currentLFVersion from './currentLFVersion.mjs';

/**
 * Get all blacklisted elements from all versions.
 *
 * @return {Array[Regex | String]}
 */
export function getDisallowedObjects(disallowedObjects) {
	return disallowedObjects.reduce((output, object) => {
		return output.concat(object.objectPattern);
	}, []);
}

/**
 * Get data related to object.
 *
 * @param {Array[Object{objectPattern, versionDeprecated, versionDeleted}]} disallowedObjects - List of disallowed objects
 * @param {String} faultyPattern - Pattern provided by Stylelint, to check against list of custom patterns
 * @return {{message: String, severity: String}}
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
 * @param {Object} objectData - Object found in the list of disallowed objects
 * @return {Object}           - objectData with dates.
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
 * @param {*} date - Value to analise
 * @return boolean
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
	if (version && version in LFVersions) {
		const date = new Date(LFVersions[version]);

		if (isValidDate(date)) {
			return date;
		}
	}

	return;
}

/**
 * Compare the faulty pattern with disallowed patterns.
 *
 * @param {String} faultyPattern - faultyPattern returned by Stylelint
 * @param {Array[RegExp | String] | RegExp | String} disallowedPattern - Custom pattern to match
 * @return boolean
 */
function comparePatterns(faultyPattern, disallowedPattern) {
	return typeof disallowedPattern === 'string' ? faultyPattern === disallowedPattern : disallowedPattern.test(faultyPattern);
}

/**
 * Format message based on versions criticity.
 *
 * @param {Object} objectData
 * @return {String}
 */
function getMessage(objectData) {
	let pattern = `${objectData.faultyPattern}`;
	let status = 'deprecated';
	let messageDeprecated = '';
	let messageDeleted = '';

	if (objectData.dateDeprecated) {
		const daysAgo = Math.ceil((objectData.dateDeprecated.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
		const daysAgoString = new Intl.RelativeTimeFormat().format(daysAgo, 'day');

		messageDeprecated = ` | since ${objectData.dateDeprecated.toLocaleDateString()} (${daysAgoString}, LF ${objectData.versionDeprecated})`;
	}

	if (objectData.dateDeleted) {
		const daysLeft = Math.ceil((objectData.dateDeleted.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
		const dayString = new Intl.RelativeTimeFormat().format(daysLeft, 'day');

		if (daysLeft <= 0) {
			status = 'deleted';
		}

		messageDeleted = ` | until ${objectData.dateDeleted.toLocaleDateString()} (${dayString}, LF ${objectData.versionDeleted})`;
	}

	return `${status}${messageDeprecated}${messageDeleted} | ${pattern}`;
}

/**
 * Get severity based on version used.
 *
 * @param {String} objectData
 * @return {"warning"|"error"}
 */
function getSeverity(objectData) {
	if (currentLFVersion < objectData.versionDeleted) {
		return 'warning';
	}

	return 'error';
}
