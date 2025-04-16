import React, { useContext, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Share,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import { useResume } from '../hooks/useResume';
import { ThemeContext } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';
import ResumePreview from '../components/ResumePreview';
import PdfGenerator from '../components/PdfGenerator';
import Button from '../components/Button';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PreviewScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  const { resumeData } = useResume();
  
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pdfUri, setPdfUri] = useState(null);
  
  const resumeViewRef = useRef(null);

  const handleExportPdf = async () => {
    if (generating) return;
    
    setGenerating(true);
    try {
      const pdfUri = await PdfGenerator.generatePdf(resumeData);
      setPdfUri(pdfUri);
      
      Alert.alert(
        t('pdfGenerated'),
        t('pdfGeneratedMessage'),
        [
          {
            text: t('share'),
            onPress: () => handleShare(pdfUri),
          },
          {
            text: t('ok'),
          }
        ]
      );
    } catch (error) {
      console.error('PDF generation error:', error);
      Alert.alert(t('error'), t('pdfGenerationError'));
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveResume = async () => {
    if (saving) return;
    
    setSaving(true);
    try {
      // Get existing saved resumes
      const savedResumesJson = await AsyncStorage.getItem('saved-resumes');
      const savedResumes = savedResumesJson ? JSON.parse(savedResumesJson) : [];
      
      // Create a new resume with ID and date
      const newResume = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        data: resumeData,
      };
      
      // Add to array and save back to storage
      savedResumes.push(newResume);
      await AsyncStorage.setItem('saved-resumes', JSON.stringify(savedResumes));
      
      Alert.alert(
        t('resumeSaved'),
        t('resumeSavedMessage')
      );
    } catch (error) {
      console.error('Save resume error:', error);
      Alert.alert(t('error'), t('resumeSaveError'));
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async (uri) => {
    try {
      await Share.share({
        url: uri,
        title: `${resumeData.fullName} - Resume.pdf`,
      });
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert(t('error'), t('shareFailed'));
    }
  };

  const handleEdit = () => {
    navigation.navigate('ResumeBuilder');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: currentTheme.text }]}>
          {t('preview')}
        </Text>
        <TouchableOpacity 
          style={[styles.editButton, { backgroundColor: currentTheme.surface }]}
          onPress={handleEdit}
        >
          <Feather name="edit" size={18} color={currentTheme.primary} />
          <Text style={[styles.editText, { color: currentTheme.primary }]}>
            {t('edit')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.previewContainer}
        contentContainerStyle={styles.previewContent}
      >
        <ResumePreview 
          data={resumeData} 
          ref={resumeViewRef}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={generating ? t('generating') : t('exportPdf')}
          onPress={handleExportPdf}
          disabled={generating}
          color={currentTheme.primary}
          textColor={currentTheme.buttonText}
          icon={generating ? null : "download"}
        />
        
        <View style={styles.buttonSpacer} />
        
        <Button
          title={saving ? t('saving') : t('saveResume')}
          onPress={handleSaveResume}
          disabled={saving}
          color={currentTheme.secondary}
          textColor={currentTheme.buttonText}
          icon={saving ? null : "save"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editText: {
    marginLeft: 5,
    fontWeight: '500',
  },
  previewContainer: {
    flex: 1,
  },
  previewContent: {
    padding: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 25,
  },
  buttonSpacer: {
    height: 10,
  },
});

export default PreviewScreen;
