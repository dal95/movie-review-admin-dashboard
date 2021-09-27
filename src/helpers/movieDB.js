/**
 *
 * @param {*} path
 * @param {*} size => example format: w500
 * @returns
 */
export const getPoster = (path, size = 'original') =>
  `https://image.tmdb.org/t/p/${size}/${path}`
