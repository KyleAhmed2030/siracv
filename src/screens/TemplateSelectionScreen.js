import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import { useResume } from '../hooks/useResume';
import { ThemeContext } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';
import TemplateCard from '../components/TemplateCard';
import Button from '../components/Button';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.8;

const templates = [
  {
    id: 'template1',
    name: 'Professional',
    description: 'A clean, professional template perfect for corporate jobs',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
  },
  {
    id: 'template2',
    name: 'Creative',
    description: 'A bold, creative template that stands out from the crowd',
    image: 'https://images.unsplash.com/photo-1484981138541-3d074aa97716',
  },
  {
    id: 'template3',
    name: 'Minimal',
    description: 'A simple, elegant template with a focus on content',
    image: 'https://images.unsplash.com/photo-1425421669292-0c3da3b8f529',
  },
  {
    id: 'template4',
    name: 'Modern',
    description: 'A contemporary design with stylish elements',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
  },
  {
    id: 'template5',
    name: 'Executive',
    description: 'A sophisticated template for senior positions',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
  },
];

const TemplateSelectionScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  const { updateResumeData, resumeData } = useResume();
  
  const [selectedTemplate, setSelectedTemplate] = useState(resumeData.template || null);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template.id);
    updateResumeData({ template: template.id });
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      navigation.navigate('Preview');
    }
  };

  const renderItem = ({ item }) => (
    <TemplateCard
      template={item}
      selected={selectedTemplate === item.id}
      onSelect={() => handleSelectTemplate(item)}
      theme={currentTheme}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: currentTheme.text }]}>
          {t('chooseTemplate')}
        </Text>
        <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>
          {t('templateDescription')}
        </Text>
      </View>

      <FlatList
        data={templates}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + 20}
        decelerationRate="fast"
        contentContainerStyle={styles.list}
      />

      <View style={styles.pagination}>
        {templates.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: selectedTemplate === templates[index].id
                  ? currentTheme.primary
                  : currentTheme.border,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          title={t('continue')}
          onPress={handleContinue}
          disabled={!selectedTemplate}
          color={currentTheme.primary}
          textColor={currentTheme.buttonText}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 25,
  },
});

export default TemplateSelectionScreen;
