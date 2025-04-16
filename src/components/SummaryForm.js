import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput,
  ScrollView
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Input from './Input';

const SummaryForm = ({ data, updateData, errors, theme }) => {
  const { t } = useTranslation();
  
  const handleSummaryChange = (text) => {
    updateData({ summary: text });
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        {t('summary')}
      </Text>
      
      <Text style={[styles.description, { color: theme.textSecondary }]}>
        {t('summaryDescription')}
      </Text>
      
      <Input
        value={data.summary || ''}
        onChangeText={handleSummaryChange}
        placeholder={t('enterSummary')}
        multiline
        numberOfLines={8}
        textAlignVertical="top"
        error={errors.summary}
        theme={theme}
      />
      
      <View style={styles.exampleContainer}>
        <Text style={[styles.exampleTitle, { color: theme.text }]}>
          {t('example')}:
        </Text>
        <Text style={[styles.exampleText, { color: theme.textSecondary }]}>
          {t('summaryExample')}
        </Text>
      </View>
      
      <View style={styles.tipsContainer}>
        <Text style={[styles.tipsTitle, { color: theme.text }]}>
          {t('tips')}:
        </Text>
        
        <View style={styles.tipItem}>
          <View style={[styles.bulletPoint, { backgroundColor: theme.primary }]} />
          <Text style={[styles.tipText, { color: theme.textSecondary }]}>
            {t('summaryTip1')}
          </Text>
        </View>
        
        <View style={styles.tipItem}>
          <View style={[styles.bulletPoint, { backgroundColor: theme.primary }]} />
          <Text style={[styles.tipText, { color: theme.textSecondary }]}>
            {t('summaryTip2')}
          </Text>
        </View>
        
        <View style={styles.tipItem}>
          <View style={[styles.bulletPoint, { backgroundColor: theme.primary }]} />
          <Text style={[styles.tipText, { color: theme.textSecondary }]}>
            {t('summaryTip3')}
          </Text>
        </View>
      </View>
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
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
  },
  exampleContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  exampleText: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  tipsContainer: {
    marginTop: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 10,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginRight: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default SummaryForm;
