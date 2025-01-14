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
	objectData.daysLeft = Math.ceil((objectData.dateDeleted.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

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
		dateDeprecated: new Date(LFVersions[objectData.versionDeprecated]),
		dateDeleted: new Date(LFVersions[objectData.versionDeleted]),
	};
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
	const dayString = new Intl.RelativeTimeFormat().format(objectData.daysLeft, 'day');

	return `Deprecated since LF ${objectData.versionDeprecated}, until ${objectData.versionDeleted}, ${dayString}, ${objectData.dateDeleted.toLocaleDateString()}: ${objectData.faultyPattern}`;
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
