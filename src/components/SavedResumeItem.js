import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { formatDate } from '../utils/helpers';

/**
 * Component to display a saved resume item in the saved resumes list
 */
const SavedResumeItem = ({ resume, onPress, onDelete, theme }) => {
  if (!resume || !resume.data) {
    return null;
  }
  
  const { data, date } = resume;
  const formattedDate = formatDate(date);
  
  // Get template name
  const getTemplateName = (templateId) => {
    switch (templateId) {
      case 'template1':
        return 'Professional';
      case 'template2':
        return 'Creative';
      case 'template3':
        return 'Minimal';
      case 'template4':
        return 'Modern';
      case 'template5':
        return 'Executive';
      default:
        return 'Custom';
    }
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { 
          backgroundColor: theme.surface, 
          borderColor: theme.border 
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        <Text style={[styles.name, { color: theme.text }]}>
          {data.fullName || 'Unnamed Resume'}
        </Text>
        
        <Text style={[styles.jobTitle, { color: theme.textSecondary }]}>
          {data.jobTitle || 'No job title'}
        </Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Feather name="calendar" size={14} color={theme.textSecondary} />
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              {formattedDate}
            </Text>
          </View>
          
          <View style={styles.metaItem}>
            <Feather name="file-text" size={14} color={theme.textSecondary} />
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              {getTemplateName(data.template)}
            </Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Feather name="trash-2" size={20} color={theme.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
  },
  contentContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  metaText: {
    fontSize: 12,
    marginLeft: 5,
  },
  deleteButton: {
    justifyContent: 'center',
    paddingLeft: 15,
  },
});

export default SavedResumeItem;
