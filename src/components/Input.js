import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

/**
 * Reusable input component with label, icon, and error handling
 */
const Input = ({ 
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
  multiline = false,
  numberOfLines = 1,
  error,
  theme,
  icon,
  optional = false,
  autoCapitalize = 'sentences',
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            {label}
          </Text>
          {optional && (
            <Text style={[styles.optional, { color: theme.textTertiary }]}>
              (optional)
            </Text>
          )}
        </View>
      )}
      
      <View style={[
        styles.inputContainer,
        { 
          backgroundColor: theme.inputBackground,
          borderColor: error ? theme.error : theme.border 
        },
        multiline && { minHeight: 24 * numberOfLines },
      ]}>
        {icon && (
          <Feather 
            name={icon} 
            size={18} 
            color={theme.textSecondary} 
            style={styles.icon} 
          />
        )}
        
        <TextInput
          style={[
            styles.input,
            { color: theme.text },
            multiline && styles.multilineInput,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : undefined}
          autoCapitalize={autoCapitalize}
          {...props}
        />
      </View>
      
      {error && (
        <Text style={[styles.errorText, { color: theme.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  optional: {
    fontSize: 12,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  multilineInput: {
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default Input;
