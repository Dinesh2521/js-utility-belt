/**
 * Extracts a file extension from a string, by splitting by dot and taking the last substring.
 *
 * If the file name does not have an extensions, then this method just returns an empty string.
 * @param  {string} fileName File's name
 * @return {string}          File extension
 *
 * Via: http://stackoverflow.com/a/190878/1263876
 */
export default function extractFileExtensionFromString(fileName) {
    const explodedFileName = fileName.split('.');
    return explodedFileName.length > 1 ? explodedFileName.pop()
                                       : '';
}
