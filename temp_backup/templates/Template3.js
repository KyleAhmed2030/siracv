import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

/**
 * Minimal resume template
 */
const Template3 = ({ data }) => {
  if (!data) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.fullName || 'Full Name'}</Text>
        <Text style={styles.jobTitle}>{data.jobTitle || 'Job Title'}</Text>
        
        <View style={styles.contactBar}>
          {data.email && (
            <View style={styles.contactItem}>
              <Feather name="mail" size={14} color="#666" />
              <Text style={styles.contactText}>{data.email}</Text>
            </View>
          )}
          
          {data.phone && (
            <View style={styles.contactItem}>
              <Feather name="phone" size={14} color="#666" />
              <Text style={styles.contactText}>{data.phone}</Text>
            </View>
          )}
          
          {data.location && (
            <View style={styles.contactItem}>
              <Feather name="map-pin" size={14} color="#666" />
              <Text style={styles.contactText}>{data.location}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.contactBar}>
          {data.linkedin && (
            <View style={styles.contactItem}>
              <Feather name="linkedin" size={14} color="#666" />
              <Text style={styles.contactText}>{data.linkedin}</Text>
            </View>
          )}
          
          {data.website && (
            <View style={styles.contactItem}>
              <Feather name="globe" size={14} color="#666" />
              <Text style={styles.contactText}>{data.website}</Text>
            </View>
          )}
        </View>
      </View>
      
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ABOUT</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </View>
      )}
      
      {data.workExperience && data.workExperience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPERIENCE</Text>
          
          {data.workExperience.map((work, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.itemHeader}>
                <View style={styles.itemTitleContainer}>
                  <Text style={styles.itemTitle}>{work.position}</Text>
                  <Text style={styles.itemSubtitle}>{work.company}</Text>
                </View>
                <Text style={styles.itemDate}>
                  {work.startDate} - {work.endDate || 'Present'}
                </Text>
              </View>
              {work.location && <Text style={styles.itemLocation}>{work.location}</Text>}
              {work.description && <Text style={styles.itemDescription}>{work.description}</Text>}
            </View>
          ))}
        </View>
      )}
      
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          
          {data.education.map((edu, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.itemHeader}>
                <View style={styles.itemTitleContainer}>
                  <Text style={styles.itemTitle}>
                    {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                  </Text>
                  <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                </View>
                <Text style={styles.itemDate}>
                  {edu.startDate} - {edu.endDate || 'Present'}
                </Text>
              </View>
              {edu.description && <Text style={styles.itemDescription}>{edu.description}</Text>}
            </View>
          ))}
        </View>
      )}
      
      <View style={styles.skillsLanguagesRow}>
        {data.skills && data.skills.length > 0 && (
          <View style={styles.skillsContainer}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <View style={styles.skillsList}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  • {skill}
                </Text>
              ))}
            </View>
          </View>
        )}
        
        {data.languages && data.languages.length > 0 && (
          <View style={styles.languagesContainer}>
            <Text style={styles.sectionTitle}>LANGUAGES</Text>
            <View style={styles.languagesList}>
              {data.languages.map((language, index) => (
                <Text key={index} style={styles.language}>
                  • {language.name} ({language.proficiency})
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    marginBottom: 25,
  },
  name: {
    fontSize: 26,
    fontWeight: '300',
    color: '#333',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  contactBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  contactText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  summary: {
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
  },
  item: {
    marginBottom: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  itemTitleContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  itemDate: {
    fontSize: 12,
    color: '#888',
    marginLeft: 10,
  },
  itemLocation: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 12,
    color: '#444',
    lineHeight: 17,
    marginTop: 5,
  },
  skillsLanguagesRow: {
    flexDirection: 'row',
  },
  skillsContainer: {
    flex: 1,
    marginRight: 10,
  },
  languagesContainer: {
    flex: 1,
    marginLeft: 10,
  },
  skillsList: {
    flexDirection: 'column',
  },
  skill: {
    fontSize: 13,
    color: '#444',
    marginBottom: 5,
  },
  languagesList: {
    flexDirection: 'column',
  },
  language: {
    fontSize: 13,
    color: '#444',
    marginBottom: 5,
  },
});

export default Template3;
