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

const WorkExperienceForm = ({ data, updateData, errors, theme }) => {
  const { t } = useTranslation();
  
  const [workExperience, setWorkExperience] = useState(data.workExperience || []);
  const [editIndex, setEditIndex] = useState(-1);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [currentErrors, setCurrentErrors] = useState({});
  
  const resetForm = () => {
    setCompany('');
    setPosition('');
    setLocation('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setCurrentErrors({});
    setEditIndex(-1);
  };
  
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    
    if (!company.trim()) {
      formErrors.company = t('companyRequired');
      isValid = false;
    }
    
    if (!position.trim()) {
      formErrors.position = t('positionRequired');
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
    
    const workItem = {
      company,
      position,
      location,
      startDate,
      endDate,
      description,
    };
    
    const updatedWorkExperience = [...workExperience, workItem];
    setWorkExperience(updatedWorkExperience);
    updateData({ workExperience: updatedWorkExperience });
    resetForm();
  };
  
  const handleUpdate = () => {
    if (!validateForm()) return;
    
    const workItem = {
      company,
      position,
      location,
      startDate,
      endDate,
      description,
    };
    
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[editIndex] = workItem;
    
    setWorkExperience(updatedWorkExperience);
    updateData({ workExperience: updatedWorkExperience });
    resetForm();
  };
  
  const handleEdit = (index) => {
    const item = workExperience[index];
    setCompany(item.company);
    setPosition(item.position);
    setLocation(item.location || '');
    setStartDate(item.startDate);
    setEndDate(item.endDate || '');
    setDescription(item.description || '');
    setEditIndex(index);
  };
  
  const handleDelete = (index) => {
    Alert.alert(
      t('deleteWorkExperience'),
      t('deleteWorkExperienceConfirmation'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: () => {
            const updatedWorkExperience = workExperience.filter((_, i) => i !== index);
            setWorkExperience(updatedWorkExperience);
            updateData({ workExperience: updatedWorkExperience });
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
        {t('workExperience')}
      </Text>
      
      {workExperience.length > 0 && (
        <View style={styles.workList}>
          {workExperience.map((item, index) => (
            <View 
              key={index} 
              style={[
                styles.workItem, 
                { backgroundColor: theme.surface, borderColor: theme.border }
              ]}
            >
              <View style={styles.workContent}>
                <Text style={[styles.companyText, { color: theme.text }]}>
                  {item.company}
                </Text>
                <Text style={[styles.positionText, { color: theme.textSecondary }]}>
                  {item.position}
                  {item.location ? ` - ${item.location}` : ''}
                </Text>
                <Text style={[styles.dateText, { color: theme.textSecondary }]}>
                  {item.startDate} {item.endDate ? `- ${item.endDate}` : `- ${t('present')}`}
                </Text>
              </View>
              
              <View style={styles.workActions}>
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
          {editIndex === -1 ? t('addWorkExperience') : t('editWorkExperience')}
        </Text>
        
        <Input
          label={t('company')}
          value={company}
          onChangeText={setCompany}
          placeholder={t('enterCompany')}
          error={currentErrors.company}
          theme={theme}
        />
        
        <Input
          label={t('position')}
          value={position}
          onChangeText={setPosition}
          placeholder={t('enterPosition')}
          error={currentErrors.position}
          theme={theme}
        />
        
        <Input
          label={t('location')}
          value={location}
          onChangeText={setLocation}
          placeholder={t('enterLocationOptional')}
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
          placeholder={t('enterJobDescriptionOptional')}
          multiline
          numberOfLines={4}
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
      
      {errors.workExperience && (
        <Text style={[styles.errorText, { color: theme.error }]}>
          {errors.workExperience}
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
  workList: {
    marginBottom: 20,
  },
  workItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
  },
  workContent: {
    flex: 1,
  },
  companyText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  positionText: {
    fontSize: 14,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
  },
  workActions: {
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

export default WorkExperienceForm;
