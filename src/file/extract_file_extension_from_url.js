import extractFileExtensionFromString from './extract_file_extension_from_string';


/**
 * Extracts a file extension from a url.
 *
 * If the file name does not have an extensions, then this method just returns an empty string.
 * @param  {string} url Url ending in a file name
 * @return {string}     File extension
 */
export default function extractFileExtensionFromUrl(url) {
    const fileName = url.split('/').pop();
    return extractFileExtensionFromString(fileName);
}
