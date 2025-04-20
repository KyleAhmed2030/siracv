import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Utility functions for AsyncStorage operations
 */
const storage = {
  /**
   * Store a value in AsyncStorage with the given key
   * 
   * @param {string} key - Storage key
   * @param {any} value - Value to store (will be JSON.stringified)
   * @returns {Promise<void>}
   */
  setItem: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  },
  
  /**
   * Retrieve a value from AsyncStorage by key
   * 
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {Promise<any>} Retrieved value (JSON.parsed)
   */
  getItem: async (key, defaultValue = null) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return defaultValue;
    }
  },
  
  /**
   * Remove a value from AsyncStorage by key
   * 
   * @param {string} key - Storage key to remove
   * @returns {Promise<void>}
   */
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  },
  
  /**
   * Clear all items from AsyncStorage
   * 
   * @returns {Promise<void>}
   */
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
  
  /**
   * Get all keys from AsyncStorage
   * 
   * @returns {Promise<string[]>} Array of keys
   */
  getAllKeys: async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  },
  
  /**
   * Merge an existing value with a new one
   * 
   * @param {string} key - Storage key
   * @param {any} value - Value to merge
   * @returns {Promise<void>}
   */
  mergeItem: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.mergeItem(key, jsonValue);
    } catch (error) {
      console.error('Error merging data:', error);
      throw error;
    }
  },
  
  /**
   * Store multiple items at once
   * 
   * @param {Array<Array<string, any>>} pairs - Array of [key, value] pairs
   * @returns {Promise<void>}
   */
  multiSet: async (pairs) => {
    try {
      const jsonPairs = pairs.map(([key, value]) => [key, JSON.stringify(value)]);
      await AsyncStorage.multiSet(jsonPairs);
    } catch (error) {
      console.error('Error storing multiple items:', error);
      throw error;
    }
  },
  
  /**
   * Get multiple items at once
   * 
   * @param {string[]} keys - Array of keys to retrieve
   * @returns {Promise<Object>} Object with key-value pairs
   */
  multiGet: async (keys) => {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      return pairs.reduce((obj, [key, value]) => {
        obj[key] = value != null ? JSON.parse(value) : null;
        return obj;
      }, {});
    } catch (error) {
      console.error('Error retrieving multiple items:', error);
      return {};
    }
  },
};

export default storage;
