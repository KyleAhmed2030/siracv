import { useState, useEffect } from 'react';

/**
 * Custom hook for AsyncStorage with serialization for objects
 * 
 * @param {string} key The storage key
 * @param {any} initialValue The default value if no value exists in storage
 * @returns {Array} [storedValue, setValue, loading, error]
 */
export const useStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize from localStorage
  useEffect(() => {
    const readValueFromStorage = () => {
      try {
        const item = window.localStorage.getItem(key);
        // Only update state if the value is different
        const parsedItem = item ? JSON.parse(item) : initialValue;
        setStoredValue(parsedItem);
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        setError(error);
        setStoredValue(initialValue);
      } finally {
        setLoading(false);
      }
    };
    
    readValueFromStorage();
  }, [key]); // Remove initialValue from dependencies

  // Return a wrapped version of useState's setter function
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      setError(error);
    }
  };

  return [storedValue, setValue, loading, error];
};

export default useStorage;