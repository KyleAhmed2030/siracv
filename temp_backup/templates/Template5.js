import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

/**
 * Executive resume template
 */
const Template5 = ({ data }) => {
  if (!data) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.fullName || 'FULL NAME'}</Text>
        <View style={styles.titleContainer}>
          <View style={styles.titleLine} />
          <Text style={styles.jobTitle}>{data.jobTitle || 'JOB TITLE'}</Text>
          <View style={styles.titleLine} />
        </View>
        
        <View style={styles.contactInfo}>
          {data.email && (
            <View style={styles.contactItem}>
              <Feather name="mail" size={12} color="#666" />
              <Text style={styles.contactText}>{data.email}</Text>
            </View>
          )}
          
          {data.phone && (
            <View style={styles.contactItem}>
              <Feather name="phone" size={12} color="#666" />
              <Text style={styles.contactText}>{data.phone}</Text>
            </View>
          )}
          
          {data.location && (
            <View style={styles.contactItem}>
              <Feather name="map-pin" size={12} color="#666" />
              <Text style={styles.contactText}>{data.location}</Text>
            </View>
          )}
          
          {data.linkedin && (
            <View style={styles.contactItem}>
              <Feather name="linkedin" size={12} color="#666" />
              <Text style={styles.contactText}>{data.linkedin}</Text>
            </View>
          )}
          
          {data.website && (
            <View style={styles.contactItem}>
              <Feather name="globe" size={12} color="#666" />
              <Text style={styles.contactText}>{data.website}</Text>
            </View>
          )}
        </View>
      </View>
      
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </View>
      )}
      
      {data.workExperience && data.workExperience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
          
          {data.workExperience.map((work, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.companyName}>{work.company.toUpperCase()}</Text>
                <Text style={styles.experienceDate}>
                  {work.startDate} - {work.endDate || 'Present'}
                </Text>
              </View>
              
              <View style={styles.positionLocationContainer}>
                <Text style={styles.position}>{work.position}</Text>
                {work.location && (
                  <Text style={styles.location}>{work.location}</Text>
                )}
              </View>
              
              {work.description && (
                <Text style={styles.description}>{work.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}
      
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          
          {data.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <View style={styles.educationHeader}>
                <Text style={styles.institutionName}>{edu.institution.toUpperCase()}</Text>
                <Text style={styles.educationDate}>
                  {edu.startDate} - {edu.endDate || 'Present'}
                </Text>
              </View>
              
              <Text style={styles.degree}>
                {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
              </Text>
              
              {edu.description && (
                <Text style={styles.educationDescription}>{edu.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}
      
      <View style={styles.twoColumnsSection}>
        {data.skills && data.skills.length > 0 && (
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>CORE COMPETENCIES</Text>
            
            <View style={styles.skillsList}>
              {data.skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <View style={styles.skillDot} />
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {data.languages && data.languages.length > 0 && (
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>LANGUAGES</Text>
            
            <View style={styles.languagesList}>
              {data.languages.map((language, index) => (
                <View key={index} style={styles.languageItem}>
                  <View style={styles.languageDot} />
                  <View style={styles.languageContent}>
                    <Text style={styles.languageName}>{language.name}</Text>
                    <Text style={styles.languageProficiency}>{language.proficiency}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
      
      <View style={styles.footer}>
        <View style={styles.footerLine} />
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
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  titleLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    paddingHorizontal: 10,
    fontStyle: 'italic',
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
    fontSize: 11,
    color: '#666',
    marginLeft: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: '#222',
    marginBottom: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  summary: {
    fontSize: 13,
    lineHeight: 18,
    color: '#444',
    textAlign: 'center',
  },
  experienceItem: {
    marginBottom: 20,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  experienceDate: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  positionLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  position: {
    fontSize: 13,
    fontWeight: '500',
    color: '#444',
  },
  location: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 12,
    lineHeight: 17,
    color: '#444',
  },
  educationItem: {
    marginBottom: 15,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  institutionName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  educationDate: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  degree: {
    fontSize: 13,
    fontWeight: '500',
    color: '#444',
    marginBottom: 5,
  },
  educationDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: '#444',
  },
  twoColumnsSection: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  skillsList: {
    marginTop: 10,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#222',
    marginRight: 8,
  },
  skillText: {
    fontSize: 12,
    color: '#444',
  },
  languagesList: {
    marginTop: 10,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  languageDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#222',
    marginRight: 8,
  },
  languageContent: {
    flex: 1,
  },
  languageName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#444',
  },
  languageProficiency: {
    fontSize: 11,
    color: '#666',
    fontStyle: 'italic',
  },
  footer: {
    alignItems: 'center',
  },
  footerLine: {
    width: '30%',
    height: 3,
    backgroundColor: '#ddd',
  },
});

export default Template5;
