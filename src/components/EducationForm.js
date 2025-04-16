import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import Input from './Input';
import Button from './Button';

const EducationForm = ({ data, updateData, errors, theme }) => {
  const { t } = useTranslation();
  
  const [education, setEducation] = useState(data.education || []);
  const [editIndex, setEditIndex] = useState(-1);
  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [currentErrors, setCurrentErrors] = useState({});
  
  const resetForm = () => {
    setInstitution('');
    setDegree('');
    setFieldOfStudy('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setCurrentErrors({});
    setEditIndex(-1);
  };
  
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    
    if (!institution.trim()) {
      formErrors.institution = t('institutionRequired');
      isValid = false;
    }
    
    if (!degree.trim()) {
      formErrors.degree = t('degreeRequired');
      isValid = false;
    }
    
    if (!startDate.trim()) {
      formErrors.startDate = t('startDateRequired');
      isValid = false;
    }
    
    setCurrentErrors(formErrors);
    return isValid;
  };
  
  const handleAdd = () => {
    if (!validateForm()) return;
    
    const educationItem = {
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      description,
    };
    
    const updatedEducation = [...education, educationItem];
    setEducation(updatedEducation);
    updateData({ education: updatedEducation });
    resetForm();
  };
  
  const handleUpdate = () => {
    if (!validateForm()) return;
    
    const educationItem = {
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      description,
    };
    
    const updatedEducation = [...education];
    updatedEducation[editIndex] = educationItem;
    
    setEducation(updatedEducation);
    updateData({ education: updatedEducation });
    resetForm();
  };
  
  const handleEdit = (index) => {
    const item = education[index];
    setInstitution(item.institution);
    setDegree(item.degree);
    setFieldOfStudy(item.fieldOfStudy || '');
    setStartDate(item.startDate);
    setEndDate(item.endDate || '');
    setDescription(item.description || '');
    setEditIndex(index);
  };
  
  const handleDelete = (index) => {
    Alert.alert(
      t('deleteEducation'),
      t('deleteEducationConfirmation'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: () => {
            const updatedEducation = education.filter((_, i) => i !== index);
            setEducation(updatedEducation);
            updateData({ education: updatedEducation });
          },
        },
      ]
    );
  };
  
  const handleCancel = () => {
    resetForm();
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        {t('education')}
      </Text>
      
      {education.length > 0 && (
        <View style={styles.educationList}>
          {education.map((item, index) => (
            <View 
              key={index} 
              style={[
                styles.educationItem, 
                { backgroundColor: theme.surface, borderColor: theme.border }
              ]}
            >
              <View style={styles.educationContent}>
                <Text style={[styles.institutionText, { color: theme.text }]}>
                  {item.institution}
                </Text>
                <Text style={[styles.degreeText, { color: theme.textSecondary }]}>
                  {item.degree}
                  {item.fieldOfStudy ? `, ${item.fieldOfStudy}` : ''}
                </Text>
                <Text style={[styles.dateText, { color: theme.textSecondary }]}>
                  {item.startDate} {item.endDate && `- ${item.endDate}`}
                </Text>
              </View>
              
              <View style={styles.educationActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleEdit(index)}
                >
                  <Feather name="edit-2" size={18} color={theme.primary} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleDelete(index)}
                >
                  <Feather name="trash-2" size={18} color={theme.error} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
      
      <View style={styles.form}>
        <Text style={[styles.formTitle, { color: theme.text }]}>
          {editIndex === -1 ? t('addEducation') : t('editEducation')}
        </Text>
        
        <Input
          label={t('institution')}
          value={institution}
          onChangeText={setInstitution}
          placeholder={t('enterInstitution')}
          error={currentErrors.institution}
          theme={theme}
        />
        
        <Input
          label={t('degree')}
          value={degree}
          onChangeText={setDegree}
          placeholder={t('enterDegree')}
          error={currentErrors.degree}
          theme={theme}
        />
        
        <Input
          label={t('fieldOfStudy')}
          value={fieldOfStudy}
          onChangeText={setFieldOfStudy}
          placeholder={t('enterFieldOfStudyOptional')}
          theme={theme}
          optional
        />
        
        <View style={styles.dateContainer}>
          <View style={styles.dateField}>
            <Input
              label={t('startDate')}
              value={startDate}
              onChangeText={setStartDate}
              placeholder={t('enterStartDate')}
              error={currentErrors.startDate}
              theme={theme}
            />
          </View>
          
          <View style={styles.dateFieldSpacer} />
          
          <View style={styles.dateField}>
            <Input
              label={t('endDate')}
              value={endDate}
              onChangeText={setEndDate}
              placeholder={t('enterEndDateOptional')}
              theme={theme}
              optional
            />
          </View>
        </View>
        
        <Input
          label={t('description')}
          value={description}
          onChangeText={setDescription}
          placeholder={t('enterDescriptionOptional')}
          multiline
          numberOfLines={3}
          theme={theme}
          optional
        />
        
        <View style={styles.buttonContainer}>
          {editIndex !== -1 && (
            <TouchableOpacity
              style={[styles.cancelButton, { borderColor: theme.border }]}
              onPress={handleCancel}
            >
              <Text style={[styles.cancelButtonText, { color: theme.textSecondary }]}>
                {t('cancel')}
              </Text>
            </TouchableOpacity>
          )}
          
          <Button
            title={editIndex === -1 ? t('add') : t('update')}
            onPress={editIndex === -1 ? handleAdd : handleUpdate}
            color={theme.primary}
            textColor={theme.buttonText}
            icon={editIndex === -1 ? "plus" : "check"}
          />
        </View>
      </View>
      
      {errors.education && (
        <Text style={[styles.errorText, { color: theme.error }]}>
          {errors.education}
        </Text>
      )}
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
  educationList: {
    marginBottom: 20,
  },
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
  },
  educationContent: {
    flex: 1,
  },
  institutionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  degreeText: {
    fontSize: 14,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
  },
  educationActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 5,
  },
  form: {
    marginTop: 10,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  dateContainer: {
    flexDirection: 'row',
  },
  dateField: {
    flex: 1,
  },
  dateFieldSpacer: {
    width: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 14,
    marginTop: 10,
  },
});

export default EducationForm;
