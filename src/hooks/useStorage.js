import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  
  // Load from storage on mount
  useEffect(() => {
    const getValueFromStorage = async () => {
      try {
        setLoading(true);
        const item = await AsyncStorage.getItem(key);
        const value = item ? JSON.parse(item) : initialValue;
        setStoredValue(value);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    
    getValueFromStorage();
  }, [key]);
  
  // Function to update the stored value
  const setValue = async (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save to state
      setStoredValue(valueToStore);
      
      // Save to storage
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      setError(e);
    }
  };
  
  // Function to clear the stored value
  const clearValue = async () => {
    try {
      setStoredValue(initialValue);
      await AsyncStorage.removeItem(key);
    } catch (e) {
      setError(e);
    }
  };
  
  return [storedValue, setValue, clearValue, loading, error];
};
