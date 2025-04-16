import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';
import { useResume } from '../hooks/useResume';
import SavedResumeItem from '../components/SavedResumeItem';
import Button from '../components/Button';

const SavedResumesScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  const { setResumeData } = useResume();
  const isFocused = useIsFocused();
  
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isFocused) {
      loadSavedResumes();
    }
  }, [isFocused]);
  
  const loadSavedResumes = async () => {
    setLoading(true);
    try {
      const savedResumesJson = await AsyncStorage.getItem('saved-resumes');
      const savedResumes = savedResumesJson ? JSON.parse(savedResumesJson) : [];
      
      // Sort by date, most recent first
      savedResumes.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setResumes(savedResumes);
    } catch (error) {
      console.error('Error loading saved resumes:', error);
      Alert.alert(t('error'), t('loadingResumesFailed'));
    } finally {
      setLoading(false);
    }
  };
  
  const handleResumePress = (resume) => {
    setResumeData(resume.data);
    navigation.navigate('Preview');
  };
  
  const handleResumeDelete = async (id) => {
    Alert.alert(
      t('deleteResume'),
      t('deleteResumeConfirmation'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedResumes = resumes.filter(resume => resume.id !== id);
              await AsyncStorage.setItem('saved-resumes', JSON.stringify(updatedResumes));
              setResumes(updatedResumes);
            } catch (error) {
              console.error('Error deleting resume:', error);
              Alert.alert(t('error'), t('deletingResumeFailed'));
            }
          },
        },
      ]
    );
  };
  
  const handleCreateNew = () => {
    navigation.navigate('NewResume');
  };
  
  const renderItem = ({ item }) => (
    <SavedResumeItem
      resume={item}
      onPress={() => handleResumePress(item)}
      onDelete={() => handleResumeDelete(item.id)}
      theme={currentTheme}
    />
  );
  
  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1531986362435-16b427eb9c26' }}
        style={styles.emptyImage}
      />
      <Text style={[styles.emptyTitle, { color: currentTheme.text }]}>
        {t('noSavedResumes')}
      </Text>
      <Text style={[styles.emptySubtitle, { color: currentTheme.textSecondary }]}>
        {t('createYourFirstResume')}
      </Text>
      <View style={styles.createButtonContainer}>
        <Button
          title={t('createResume')}
          onPress={handleCreateNew}
          color={currentTheme.primary}
          textColor={currentTheme.buttonText}
          icon="plus"
        />
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={currentTheme.primary} />
        </View>
      ) : resumes.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <FlatList
            data={resumes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
          
          <View style={styles.footer}>
            <Button
              title={t('createNew')}
              onPress={handleCreateNew}
              color={currentTheme.primary}
              textColor={currentTheme.buttonText}
              icon="plus"
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 25,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  createButtonContainer: {
    width: '100%',
    maxWidth: 250,
  },
});

export default SavedResumesScreen;
