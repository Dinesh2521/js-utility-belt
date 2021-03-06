/**
 * In general you should look towards using something like Modernizr before adding a feature detect
 * but sometimes you just have to roll your own.
 *
 * PLEASE postfix your function with '-Available', like this:
 *   featureNameAvailable
 */
// Ignore error as we may have more exports in the future
// eslint-disable-next-line import/prefer-default-export
export dragAndDropAvailable from './drag_and_drop_available';
