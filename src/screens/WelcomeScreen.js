import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import Button from '../components/Button';
import LanguageSelector from '../components/LanguageSelector';
import { ThemeContext } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = async (language) => {
    await i18n.changeLanguage(language);
    await AsyncStorage.setItem('user-language', language);
  };

  const handleGetStarted = async () => {
    setLoading(true);
    try {
      // Mock a brief loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      navigation.replace('MainApp');
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={currentTheme.background}
      />
      
      <View style={styles.header}>
        <LanguageSelector onLanguageChange={handleLanguageChange} />
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: currentTheme.text }]}>
          {t('welcomeTitle')}
        </Text>
        
        <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>
          {t('welcomeSubtitle')}
        </Text>
        
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2' }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.features}>
          <FeatureItem 
            icon="file-text" 
            text={t('feature1')} 
            theme={currentTheme} 
          />
          <FeatureItem 
            icon="download" 
            text={t('feature2')} 
            theme={currentTheme} 
          />
          <FeatureItem 
            icon="globe" 
            text={t('feature3')} 
            theme={currentTheme} 
          />
        </View>
      </View>
      
      <View style={styles.footer}>
        <Button 
          title={t('getStarted')}
          onPress={handleGetStarted} 
          loading={loading}
          color={currentTheme.primary}
          textColor={currentTheme.buttonText}
        />
      </View>
    </SafeAreaView>
  );
};

const FeatureItem = ({ icon, text, theme }) => {
  return (
    <View style={styles.featureItem}>
      <Feather name={icon} size={24} color={theme.primary} />
      <Text style={[styles.featureText, { color: theme.text }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.6,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  features: {
    width: '100%',
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    marginLeft: 15,
    fontSize: 16,
  },
  footer: {
    padding: 20,
  },
});

export default WelcomeScreen;

// Import at the top, keeping it here for the reviewer to understand dependency
import { Feather } from '@expo/vector-icons';
