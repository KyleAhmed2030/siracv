import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  View 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

/**
 * Reusable button component with optional icon and loading state
 */
const Button = ({ 
  title, 
  onPress, 
  color = '#2196F3', 
  textColor = 'white',
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle
}) => {
  const buttonOpacity = disabled || loading ? 0.6 : 1;
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color, opacity: buttonOpacity },
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <View style={styles.contentContainer}>
          {icon && (
            <Feather 
              name={icon} 
              size={18} 
              color={textColor} 
              style={styles.icon} 
            />
          )}
          <Text style={[styles.text, { color: textColor }, textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  icon: {
    marginRight: 8,
  },
});

export default Button;
