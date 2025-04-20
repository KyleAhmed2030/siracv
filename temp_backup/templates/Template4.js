import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

/**
 * Modern resume template
 */
const Template4 = ({ data }) => {
  if (!data) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.fullName || 'Full Name'}</Text>
        <Text style={styles.jobTitle}>{data.jobTitle || 'Job Title'}</Text>
        
        <View style={styles.contactContainer}>
          {data.email && (
            <View style={styles.contactItem}>
              <View style={styles.iconCircle}>
                <Feather name="mail" size={12} color="white" />
              </View>
              <Text style={styles.contactText}>{data.email}</Text>
            </View>
          )}
          
          {data.phone && (
            <View style={styles.contactItem}>
              <View style={styles.iconCircle}>
                <Feather name="phone" size={12} color="white" />
              </View>
              <Text style={styles.contactText}>{data.phone}</Text>
            </View>
          )}
          
          {data.location && (
            <View style={styles.contactItem}>
              <View style={styles.iconCircle}>
                <Feather name="map-pin" size={12} color="white" />
              </View>
              <Text style={styles.contactText}>{data.location}</Text>
            </View>
          )}
          
          {data.linkedin && (
            <View style={styles.contactItem}>
              <View style={styles.iconCircle}>
                <Feather name="linkedin" size={12} color="white" />
              </View>
              <Text style={styles.contactText}>{data.linkedin}</Text>
            </View>
          )}
          
          {data.website && (
            <View style={styles.contactItem}>
              <View style={styles.iconCircle}>
                <Feather name="globe" size={12} color="white" />
              </View>
              <Text style={styles.contactText}>{data.website}</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.content}>
        {data.summary && (
          <View style={styles.section}>
            <View style={styles.sectionHeading}>
              <Feather name="user" size={16} color="#2c3e50" />
              <Text style={styles.sectionTitle}>Profile</Text>
            </View>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        )}
        
        {data.workExperience && data.workExperience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeading}>
              <Feather name="briefcase" size={16} color="#2c3e50" />
              <Text style={styles.sectionTitle}>Work Experience</Text>
            </View>
            
            {data.workExperience.map((work, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceLeft}>
                  <Text style={styles.experienceDate}>
                    {work.startDate} - {work.endDate || 'Present'}
                  </Text>
                  {work.location && (
                    <Text style={styles.experienceLocation}>{work.location}</Text>
                  )}
                </View>
                
                <View style={styles.verticalLine} />
                
                <View style={styles.experienceRight}>
                  <Text style={styles.experiencePosition}>{work.position}</Text>
                  <Text style={styles.experienceCompany}>{work.company}</Text>
                  {work.description && (
                    <Text style={styles.experienceDescription}>{work.description}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
        
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeading}>
              <Feather name="book" size={16} color="#2c3e50" />
              <Text style={styles.sectionTitle}>Education</Text>
            </View>
            
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationLeft}>
                  <Text style={styles.educationDate}>
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </Text>
                </View>
                
                <View style={styles.verticalLine} />
                
                <View style={styles.educationRight}>
                  <Text style={styles.educationDegree}>
                    {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                  </Text>
                  <Text style={styles.educationInstitution}>{edu.institution}</Text>
                  {edu.description && (
                    <Text style={styles.educationDescription}>{edu.description}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
        
        <View style={styles.skillsLanguagesContainer}>
          {data.skills && data.skills.length > 0 && (
            <View style={styles.skillsSection}>
              <View style={styles.sectionHeading}>
                <Feather name="code" size={16} color="#2c3e50" />
                <Text style={styles.sectionTitle}>Skills</Text>
              </View>
              
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
              <View style={styles.sectionHeading}>
                <Feather name="globe" size={16} color="#2c3e50" />
                <Text style={styles.sectionTitle}>Languages</Text>
              </View>
              
              {data.languages.map((language, index) => (
                <View key={index} style={styles.languageItem}>
                  <Text style={styles.languageName}>{language.name}</Text>
                  <View style={styles.languageBar}>
                    <View 
                      style={[
                        styles.languageLevel,
                        getProficiencyStyle(language.proficiency)
                      ]} 
                    />
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

// Helper function to determine proficiency style
const getProficiencyStyle = (proficiency) => {
  switch (proficiency) {
    case 'beginner':
      return { width: '20%' };
    case 'intermediate':
      return { width: '50%' };
    case 'advanced':
      return { width: '75%' };
    case 'expert':
    case 'native':
      return { width: '100%' };
    default:
      return { width: '0%' };
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 16,
    color: '#ecf0f1',
    marginBottom: 15,
  },
  contactContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 3,
  },
  iconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 12,
    color: '#ecf0f1',
    marginLeft: 5,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 8,
  },
  summary: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  experienceItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  experienceLeft: {
    width: '30%',
    paddingRight: 10,
  },
  verticalLine: {
    width: 2,
    backgroundColor: '#3498db',
    marginHorizontal: 10,
  },
  experienceRight: {
    flex: 1,
  },
  experienceDate: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  experienceLocation: {
    fontSize: 11,
    color: '#95a5a6',
    fontStyle: 'italic',
  },
  experiencePosition: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 2,
  },
  experienceCompany: {
    fontSize: 13,
    color: '#34495e',
    marginBottom: 5,
  },
  experienceDescription: {
    fontSize: 12,
    color: '#34495e',
    lineHeight: 17,
  },
  educationItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  educationLeft: {
    width: '30%',
    paddingRight: 10,
  },
  educationRight: {
    flex: 1,
  },
  educationDate: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  educationDegree: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 2,
  },
  educationInstitution: {
    fontSize: 13,
    color: '#34495e',
    marginBottom: 5,
  },
  educationDescription: {
    fontSize: 12,
    color: '#34495e',
    lineHeight: 17,
  },
  skillsLanguagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillsSection: {
    flex: 1,
    minWidth: '48%',
    marginRight: 10,
  },
  languagesSection: {
    flex: 1,
    minWidth: '48%',
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    backgroundColor: '#ecf0f1',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
  },
  skillText: {
    fontSize: 12,
    color: '#2c3e50',
  },
  languageItem: {
    marginBottom: 10,
  },
  languageName: {
    fontSize: 13,
    color: '#2c3e50',
    marginBottom: 3,
  },
  languageBar: {
    height: 5,
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
  },
  languageLevel: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 3,
  },
});

export default Template4;
