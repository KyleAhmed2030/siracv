import React, { useContext } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Easing 
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { Feather } from '@expo/vector-icons';

/**
 * Toggle switch component for dark/light mode switching
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  // Animation value for the switch thumb
  const thumbAnim = React.useRef(new Animated.Value(isDark ? 1 : 0)).current;
  
  React.useEffect(() => {
    Animated.timing(thumbAnim, {
      toValue: isDark ? 1 : 0,
      duration: 250,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [isDark, thumbAnim]);
  
  // Interpolate position and background color
  const thumbPosition = thumbAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // Left to right
  });
  
  const trackBgColor = thumbAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#DDDDDD', '#375180'], // Light to dark
  });
  
  const handleToggle = () => {
    toggleTheme();
  };
  
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleToggle}>
      <Animated.View style={[
        styles.track,
        { backgroundColor: trackBgColor }
      ]}>
        <Animated.View 
          style={[
            styles.thumb,
            { transform: [{ translateX: thumbPosition }] }
          ]}
        >
          <Feather
            name={isDark ? 'moon' : 'sun'}
            size={16}
            color={isDark ? '#375180' : '#FFB700'}
          />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeToggle;
