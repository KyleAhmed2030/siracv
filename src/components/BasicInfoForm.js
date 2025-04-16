import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import Input from './Input';

const BasicInfoForm = ({ data, updateData, errors, theme }) => {
  const { t } = useTranslation();
  
  const handleChange = (field, value) => {
    updateData({ [field]: value });
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        {t('tellUsAboutYourself')}
      </Text>
      
      <Input
        label={t('fullName')}
        value={data.fullName || ''}
        onChangeText={(text) => handleChange('fullName', text)}
        placeholder={t('enterYourName')}
        error={errors.fullName}
        theme={theme}
        icon="user"
      />
      
      <Input
        label={t('jobTitle')}
        value={data.jobTitle || ''}
        onChangeText={(text) => handleChange('jobTitle', text)}
        placeholder={t('enterYourJobTitle')}
        error={errors.jobTitle}
        theme={theme}
        icon="briefcase"
      />
      
      <Input
        label={t('email')}
        value={data.email || ''}
        onChangeText={(text) => handleChange('email', text)}
        placeholder={t('enterYourEmail')}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
        theme={theme}
        icon="mail"
      />
      
      <Input
        label={t('phone')}
        value={data.phone || ''}
        onChangeText={(text) => handleChange('phone', text)}
        placeholder={t('enterYourPhone')}
        keyboardType="phone-pad"
        error={errors.phone}
        theme={theme}
        icon="phone"
      />
      
      <Input
        label={t('location')}
        value={data.location || ''}
        onChangeText={(text) => handleChange('location', text)}
        placeholder={t('enterYourLocation')}
        error={errors.location}
        theme={theme}
        icon="map-pin"
      />
      
      <Input
        label={t('linkedIn')}
        value={data.linkedin || ''}
        onChangeText={(text) => handleChange('linkedin', text)}
        placeholder={t('enterYourLinkedInOptional')}
        autoCapitalize="none"
        theme={theme}
        icon="linkedin"
        optional
      />
      
      <Input
        label={t('website')}
        value={data.website || ''}
        onChangeText={(text) => handleChange('website', text)}
        placeholder={t('enterYourWebsiteOptional')}
        autoCapitalize="none"
        theme={theme}
        icon="globe"
        optional
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
});

export default BasicInfoForm;
