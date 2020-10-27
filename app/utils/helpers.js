// Email address matcher.

/**
 * Loosely validate an email address.
 *
 * @param {string} string
 * @return {boolean}
 */
export const isEmail = (string) => {
  const matcher = /.+@.+\..+/;
  return matcher.test(string);
};
