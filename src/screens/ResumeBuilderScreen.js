import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useResume } from '../hooks/useResume';
import { ThemeContext } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import BasicInfoForm from '../components/BasicInfoForm';
import EducationForm from '../components/EducationForm';
import WorkExperienceForm from '../components/WorkExperienceForm';
import SkillsForm from '../components/SkillsForm';
import SummaryForm from '../components/SummaryForm';

const ResumeBuilderScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  const { resumeData, updateResumeData, clearResumeData } = useResume();
  
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const steps = [
    { id: 'basic-info', title: t('basicInfo'), component: BasicInfoForm },
    { id: 'education', title: t('education'), component: EducationForm },
    { id: 'work-experience', title: t('workExperience'), component: WorkExperienceForm },
    { id: 'skills', title: t('skills'), component: SkillsForm },
    { id: 'summary', title: t('summary'), component: SummaryForm },
  ];

  useEffect(() => {
    // Validate current step
    validateCurrentStep();
  }, [resumeData, step]);

  const validateCurrentStep = () => {
    let currentErrors = {};
    let valid = true;

    switch (step) {
      case 0: // Basic Info
        if (!resumeData.fullName?.trim()) {
          currentErrors.fullName = t('fullNameRequired');
          valid = false;
        }
        if (!resumeData.jobTitle?.trim()) {
          currentErrors.jobTitle = t('jobTitleRequired');
          valid = false;
        }
        if (!resumeData.email?.trim()) {
          currentErrors.email = t('emailRequired');
          valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(resumeData.email)) {
          currentErrors.email = t('invalidEmail');
          valid = false;
        }
        if (!resumeData.phone?.trim()) {
          currentErrors.phone = t('phoneRequired');
          valid = false;
        }
        break;
        
      case 1: // Education
        if (!resumeData.education || resumeData.education.length === 0) {
          currentErrors.education = t('educationRequired');
          valid = false;
        }
        break;
        
      case 2: // Work Experience
        if (!resumeData.workExperience || resumeData.workExperience.length === 0) {
          currentErrors.workExperience = t('workExperienceRequired');
          valid = false;
        }
        break;
        
      case 3: // Skills
        if (!resumeData.skills || resumeData.skills.length === 0) {
          currentErrors.skills = t('skillsRequired');
          valid = false;
        }
        break;
        
      case 4: // Summary
        if (!resumeData.summary?.trim()) {
          currentErrors.summary = t('summaryRequired');
          valid = false;
        }
        break;
    }

    setErrors(currentErrors);
    setIsValid(valid);
    return valid;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (step < steps.length - 1) {
        setStep(step + 1);
      } else {
        // Last step completed, go to template selection
        navigation.navigate('TemplateSelection');
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      // Show confirmation before discarding resume
      Alert.alert(
        t('discardResume'),
        t('discardResumeConfirmation'),
        [
          {
            text: t('cancel'),
            style: 'cancel'
          },
          {
            text: t('discard'),
            style: 'destructive',
            onPress: () => {
              clearResumeData();
              navigation.goBack();
            }
          }
        ]
      );
    }
  };

  const CurrentStepComponent = steps[step].component;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Feather 
              name={step === 0 ? "x" : "arrow-left"} 
              size={24} 
              color={currentTheme.text} 
            />
          </TouchableOpacity>
          <Text style={[styles.title, { color: currentTheme.text }]}>
            {steps[step].title}
          </Text>
          <View style={styles.placeholder} />
        </View>

        <ProgressBar 
          total={steps.length} 
          current={step + 1} 
          color={currentTheme.primary}
          trackColor={currentTheme.border}
        />

        <ScrollView 
          style={styles.formContainer}
          contentContainerStyle={styles.formContent}
          showsVerticalScrollIndicator={false}
        >
          <CurrentStepComponent
            data={resumeData}
            updateData={updateResumeData}
            errors={errors}
            theme={currentTheme}
          />
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={step < steps.length - 1 ? t('next') : t('chooseTemplate')}
            onPress={handleNext}
            disabled={!isValid}
            color={currentTheme.primary}
            textColor={currentTheme.buttonText}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 34, // Same as back button for proper centering
  },
  formContainer: {
    flex: 1,
  },
  formContent: {
    padding: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 25,
  },
});

export default ResumeBuilderScreen;
