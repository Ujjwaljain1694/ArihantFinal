/**
 * apiResponseHandler.js
 * Utility functions to safely extract data arrays from API responses with various structures.
 */

/**
 * Safely get a nested value from an object using a dot‑separated path.
 * Returns undefined if any segment is missing.
 */
export const getNestedValue = (obj, path) => {
  return path
    .split('.')
    .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};

/**
 * Extract an array of rows from a response.
 * `customPaths` is an ordered list of dot‑separated paths to try.
 * The function will return the first truthy array it finds, or an empty array.
 */
export const extractDataFromApiResponse = (response, customPaths = []) => {
  if (!response) return [];
  const possiblePaths = [
    // Common patterns
    'data.result.userList',
    'data.result.rows',
    'data.result.resultlist',
    'data.resultlist',
    'result.userList',
    'result.rows',
    'result.resultlist',
    'resultlist',
    'data.result',
    'data',
    // Custom overrides supplied by the caller
    ...customPaths,
  ];

  for (const path of possiblePaths) {
    const value = getNestedValue(response, path);
    if (Array.isArray(value) && value.length) {
      return value;
    }
    // Some endpoints return objects with a `rows` property that itself is an array
    if (value && Array.isArray(value.rows) && value.rows.length) {
      return value.rows;
    }
  }
  // Fallback – try to return any array found directly on the response
  if (Array.isArray(response)) return response;
  return [];
};
