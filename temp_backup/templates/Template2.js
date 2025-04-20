import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

/**
 * Creative resume template
 */
const Template2 = ({ data }) => {
  if (!data) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <View style={styles.sidebarHeader}>
          <View style={styles.avatarPlaceholder}>
            <Feather name="user" size={28} color="#fff" />
          </View>
          <Text style={styles.name}>{data.fullName || 'Full Name'}</Text>
          <Text style={styles.jobTitle}>{data.jobTitle || 'Job Title'}</Text>
        </View>
        
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarSectionTitle}>Contact</Text>
          <View style={styles.sidebarDivider} />
          
          {data.email && (
            <View style={styles.contactItem}>
              <Feather name="mail" size={16} color="#fff" />
              <Text style={styles.contactText}>{data.email}</Text>
            </View>
          )}
          
          {data.phone && (
            <View style={styles.contactItem}>
              <Feather name="phone" size={16} color="#fff" />
              <Text style={styles.contactText}>{data.phone}</Text>
            </View>
          )}
          
          {data.location && (
            <View style={styles.contactItem}>
              <Feather name="map-pin" size={16} color="#fff" />
              <Text style={styles.contactText}>{data.location}</Text>
            </View>
          )}
          
          {data.linkedin && (
            <View style={styles.contactItem}>
              <Feather name="linkedin" size={16} color="#fff" />
              <Text style={styles.contactText}>{data.linkedin}</Text>
            </View>
          )}
          
          {data.website && (
            <View style={styles.contactItem}>
              <Feather name="globe" size={16} color="#fff" />
              <Text style={styles.contactText}>{data.website}</Text>
            </View>
          )}
        </View>
        
        {data.skills && data.skills.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Skills</Text>
            <View style={styles.sidebarDivider} />
            
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
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Languages</Text>
            <View style={styles.sidebarDivider} />
            
            {data.languages.map((language, index) => (
              <View key={index} style={styles.languageItem}>
                <Text style={styles.languageName}>{language.name}</Text>
                <View style={styles.proficiencyBar}>
                  <View 
                    style={[
                      styles.proficiencyFill, 
                      { width: getProficiencyWidth(language.proficiency) }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
      
      <View style={styles.mainContent}>
        {data.summary && (
          <View style={styles.mainSection}>
            <View style={styles.sectionTitleContainer}>
              <Feather name="user" size={18} color="#ff6b6b" />
              <Text style={styles.sectionTitle}>Profile</Text>
            </View>
            <View style={styles.mainDivider} />
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        )}
        
        {data.workExperience && data.workExperience.length > 0 && (
          <View style={styles.mainSection}>
            <View style={styles.sectionTitleContainer}>
              <Feather name="briefcase" size={18} color="#ff6b6b" />
              <Text style={styles.sectionTitle}>Work Experience</Text>
            </View>
            <View style={styles.mainDivider} />
            
            {data.workExperience.map((work, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.timelineDot} />
                <View style={styles.experienceContent}>
                  <Text style={styles.experienceTitle}>{work.position}</Text>
                  <View style={styles.experienceSubtitle}>
                    <Text style={styles.companyName}>{work.company}</Text>
                    <Text style={styles.experienceDuration}>
                      {work.startDate} - {work.endDate || 'Present'}
                    </Text>
                  </View>
                  {work.location && <Text style={styles.experienceLocation}>{work.location}</Text>}
                  {work.description && (
                    <Text style={styles.experienceDescription}>{work.description}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
        
        {data.education && data.education.length > 0 && (
          <View style={styles.mainSection}>
            <View style={styles.sectionTitleContainer}>
              <Feather name="book" size={18} color="#ff6b6b" />
              <Text style={styles.sectionTitle}>Education</Text>
            </View>
            <View style={styles.mainDivider} />
            
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.timelineDot} />
                <View style={styles.educationContent}>
                  <Text style={styles.educationDegree}>
                    {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                  </Text>
                  <View style={styles.educationSubtitle}>
                    <Text style={styles.institutionName}>{edu.institution}</Text>
                    <Text style={styles.educationDuration}>
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </Text>
                  </View>
                  {edu.description && (
                    <Text style={styles.educationDescription}>{edu.description}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

// Helper function to determine proficiency bar width
const getProficiencyWidth = (proficiency) => {
  switch (proficiency) {
    case 'beginner':
      return '20%';
    case 'intermediate':
      return '50%';
    case 'advanced':
      return '75%';
    case 'expert':
    case 'native':
      return '100%';
    default:
      return '0%';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#304259',
    padding: 15,
  },
  sidebarHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 12,
    color: '#bdc3c7',
    textAlign: 'center',
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  sidebarDivider: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 12,
    color: '#ecf0f1',
    marginLeft: 8,
    flex: 1,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  skillText: {
    fontSize: 10,
    color: 'white',
  },
  languageItem: {
    marginBottom: 10,
  },
  languageName: {
    fontSize: 12,
    color: 'white',
    marginBottom: 3,
  },
  proficiencyBar: {
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
  },
  proficiencyFill: {
    height: '100%',
    backgroundColor: '#ff6b6b',
    borderRadius: 3,
  },
  mainContent: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  mainSection: {
    marginBottom: 25,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#304259',
    marginLeft: 8,
  },
  mainDivider: {
    height: 2,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
  },
  summary: {
    fontSize: 13,
    color: '#4a5568',
    lineHeight: 18,
  },
  experienceItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff6b6b',
    marginTop: 5,
    marginRight: 10,
  },
  experienceContent: {
    flex: 1,
  },
  experienceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#304259',
    marginBottom: 3,
  },
  experienceSubtitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  companyName: {
    fontSize: 12,
    color: '#4a5568',
  },
  experienceDuration: {
    fontSize: 10,
    color: '#718096',
  },
  experienceLocation: {
    fontSize: 11,
    color: '#718096',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  experienceDescription: {
    fontSize: 11,
    color: '#4a5568',
    lineHeight: 16,
  },
  educationItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  educationContent: {
    flex: 1,
  },
  educationDegree: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#304259',
    marginBottom: 3,
  },
  educationSubtitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  institutionName: {
    fontSize: 12,
    color: '#4a5568',
  },
  educationDuration: {
    fontSize: 10,
    color: '#718096',
  },
  educationDescription: {
    fontSize: 11,
    color: '#4a5568',
    lineHeight: 16,
  },
});

export default Template2;
