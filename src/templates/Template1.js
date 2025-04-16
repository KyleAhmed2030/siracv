import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

/**
 * Professional resume template
 */
const Template1 = ({ data }) => {
  if (!data) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.fullName || 'Full Name'}</Text>
        <Text style={styles.jobTitle}>{data.jobTitle || 'Job Title'}</Text>
        
        <View style={styles.contactInfo}>
          {data.email && (
            <View style={styles.contactItem}>
              <Feather name="mail" size={14} color="#333" />
              <Text style={styles.contactText}>{data.email}</Text>
            </View>
          )}
          
          {data.phone && (
            <View style={styles.contactItem}>
              <Feather name="phone" size={14} color="#333" />
              <Text style={styles.contactText}>{data.phone}</Text>
            </View>
          )}
          
          {data.location && (
            <View style={styles.contactItem}>
              <Feather name="map-pin" size={14} color="#333" />
              <Text style={styles.contactText}>{data.location}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.contactInfo}>
          {data.linkedin && (
            <View style={styles.contactItem}>
              <Feather name="linkedin" size={14} color="#333" />
              <Text style={styles.contactText}>{data.linkedin}</Text>
            </View>
          )}
          
          {data.website && (
            <View style={styles.contactItem}>
              <Feather name="globe" size={14} color="#333" />
              <Text style={styles.contactText}>{data.website}</Text>
            </View>
          )}
        </View>
      </View>
      
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.divider} />
          <Text style={styles.summary}>{data.summary}</Text>
        </View>
      )}
      
      {data.workExperience && data.workExperience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          <View style={styles.divider} />
          
          {data.workExperience.map((work, index) => (
            <View key={index} style={styles.workItem}>
              <View style={styles.workHeader}>
                <Text style={styles.companyName}>{work.company}</Text>
                <Text style={styles.workDuration}>
                  {work.startDate} - {work.endDate || 'Present'}
                </Text>
              </View>
              
              <Text style={styles.jobPosition}>{work.position}</Text>
              {work.location && <Text style={styles.jobLocation}>{work.location}</Text>}
              {work.description && <Text style={styles.jobDescription}>{work.description}</Text>}
            </View>
          ))}
        </View>
      )}
      
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.divider} />
          
          {data.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <View style={styles.educationHeader}>
                <Text style={styles.institutionName}>{edu.institution}</Text>
                <Text style={styles.educationDuration}>
                  {edu.startDate} - {edu.endDate || 'Present'}
                </Text>
              </View>
              
              <Text style={styles.degree}>
                {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
              </Text>
              {edu.description && <Text style={styles.educationDescription}>{edu.description}</Text>}
            </View>
          ))}
        </View>
      )}
      
      <View style={styles.skillsLanguagesContainer}>
        {data.skills && data.skills.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.divider} />
            
            <View style={styles.skillsList}>
              {data.skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {data.languages && data.languages.length > 0 && (
          <View style={styles.languagesSection}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.divider} />
            
            {data.languages.map((language, index) => (
              <View key={index} style={styles.languageItem}>
                <Text style={styles.languageName}>{language.name}</Text>
                <Text style={styles.languageProficiency}>{language.proficiency}</Text>
              </View>
            ))}
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
    padding: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2a3b4c',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 15,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 5,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 3,
  },
  contactText: {
    fontSize: 12,
    color: '#4a5568',
    marginLeft: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2a3b4c',
    marginBottom: 5,
  },
  divider: {
    height: 2,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4a5568',
  },
  workItem: {
    marginBottom: 15,
  },
  workHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  companyName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2a3b4c',
  },
  workDuration: {
    fontSize: 12,
    color: '#718096',
  },
  jobPosition: {
    fontSize: 14,
    color: '#4a5568',
    fontWeight: '500',
    marginBottom: 3,
  },
  jobLocation: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 5,
  },
  jobDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: '#4a5568',
  },
  educationItem: {
    marginBottom: 15,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  institutionName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2a3b4c',
  },
  educationDuration: {
    fontSize: 12,
    color: '#718096',
  },
  degree: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 3,
  },
  educationDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: '#4a5568',
  },
  skillsLanguagesContainer: {
    flexDirection: 'row',
  },
  skillsSection: {
    flex: 1,
    marginRight: 10,
  },
  languagesSection: {
    flex: 1,
    marginLeft: 10,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    backgroundColor: '#f7fafc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
  },
  skillText: {
    fontSize: 12,
    color: '#4a5568',
  },
  languageItem: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageName: {
    fontSize: 14,
    color: '#4a5568',
    fontWeight: '500',
  },
  languageProficiency: {
    fontSize: 12,
    color: '#718096',
  },
});

export default Template1;
