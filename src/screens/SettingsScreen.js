import React, { useContext, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Alert,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';
import LanguageSelector from '../components/LanguageSelector';
import ThemeToggle from '../components/ThemeToggle';

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  
  const [isPremium, setIsPremium] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  useEffect(() => {
    checkPremiumStatus();
  }, []);
  
  const checkPremiumStatus = async () => {
    try {
      const premiumStatus = await AsyncStorage.getItem('premium-user');
      setIsPremium(premiumStatus === 'true');
    } catch (error) {
      console.error('Error checking premium status:', error);
    }
  };
  
  const handleLanguageChange = async (language) => {
    await i18n.changeLanguage(language);
    await AsyncStorage.setItem('user-language', language);
  };
  
  const handleToggleNotifications = (value) => {
    setNotificationsEnabled(value);
    // This would normally persist to storage and update notification settings
  };
  
  const handleRestorePurchase = async () => {
    Alert.alert(
      t('restorePurchases'),
      t('restorePurchasesMessage'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('restore'),
          onPress: async () => {
            // Simulate restoration process
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsPremium(true);
            await AsyncStorage.setItem('premium-user', 'true');
            Alert.alert(t('success'), t('purchaseRestored'));
          },
        },
      ]
    );
  };
  
  const handleClearData = () => {
    Alert.alert(
      t('clearData'),
      t('clearDataConfirmation'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('clear'),
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('saved-resumes');
              Alert.alert(t('success'), t('dataCleared'));
            } catch (error) {
              console.error('Error clearing data:', error);
              Alert.alert(t('error'), t('dataClearError'));
            }
          },
        },
      ]
    );
  };
  
  const handleContact = () => {
    Linking.openURL('mailto:support@resumecraft.com');
  };
  
  const handlePrivacyPolicy = () => {
    // This would normally open the privacy policy page
    Alert.alert(t('privacyPolicy'), t('privacyPolicyComingSoon'));
  };
  
  const handleTerms = () => {
    // This would normally open the terms page
    Alert.alert(t('termsOfService'), t('termsOfServiceComingSoon'));
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
            {t('appearance')}
          </Text>
          
          <View style={[styles.card, { backgroundColor: currentTheme.surface }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Feather name="moon" size={20} color={currentTheme.text} />
                <Text style={[styles.settingLabel, { color: currentTheme.text }]}>
                  {t('darkMode')}
                </Text>
              </View>
              <ThemeToggle />
            </View>
            
            <View style={styles.separator} />
            
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Feather name="globe" size={20} color={currentTheme.text} />
                <Text style={[styles.settingLabel, { color: currentTheme.text }]}>
                  {t('language')}
                </Text>
              </View>
              <LanguageSelector 
                onLanguageChange={handleLanguageChange}
                compact={true}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
            {t('account')}
          </Text>
          
          <View style={[styles.card, { backgroundColor: currentTheme.surface }]}>
            <TouchableOpacity 
              style={styles.settingRow}
              onPress={handleRestorePurchase}
            >
              <View style={styles.settingLabelContainer}>
                <Feather name="unlock" size={20} color={currentTheme.text} />
                <Text style={[styles.settingLabel, { color: currentTheme.text }]}>
                  {t('restorePurchases')}
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color={currentTheme.textSecondary} />
            </TouchableOpacity>
            
            <View style={styles.separator} />
            
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Feather name="bell" size={20} color={currentTheme.text} />
                <Text style={[styles.settingLabel, { color: currentTheme.text }]}>
                  {t('notifications')}
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleToggleNotifications}
                trackColor={{ 
                  false: currentTheme.border, 
                  true: currentTheme.primary 
                }}
                thumbColor={Platform.OS === 'ios' ? undefined : '#fff'}
              />
            </View>
            
            <View style={styles.separator} />
            
            <TouchableOpacity 
              style={styles.settingRow}
              onPress={handleClearData}
            >
              <View style={styles.settingLabelContainer}>
                <Feather name="trash-2" size={20} color={currentTheme.error} />
                <Text style={[styles.settingLabel, { color: currentTheme.error }]}>
                  {t('clearAllData')}
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color={currentTheme.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
            {t('about')}
          </Text>
          
          <View style={[styles.card, { backgroundColor: currentTheme.surface }]}>
            <TouchableOpacity 
              style={styles.settingRow}
              onPress={handleContact}
            >
              <View style={styles.settingLabelContainer}>
                <Feather name="mail" size={20} color={currentTheme.text} />
                <Text style={[styles.settingLabel, { color: currentTheme.text }]}>
                  {t('contactUs')}
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color={currentTheme.textSecondary} />
            </TouchableOpacity>
            
            <View style={styles.separator} />
            
            <TouchableOpacity 
              style={styles.settingRow}
              onPress={handlePrivacyPolicy}
            >
              <View style={styles.settingLabelContainer}>
                <Feather name="shield" size={20} color={currentTheme.text} />
                <Text style={[styles.settingLabel, { color: currentTheme.text }]}>
                  {t('privacyPolicy')}
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color={currentTheme.textSecondary} />
            </TouchableOpacity>
            
            <View style={styles.separator} />
            
            <TouchableOpacity 
              style={styles.settingRow}
              onPress={handleTerms}
            >
              <View style={styles.settingLabelContainer}>
                <Feather name="file-text" size={20} color={currentTheme.text} />
                <Text style={[styles.settingLabel, { color: currentTheme.text }]}>
                  {t('termsOfService')}
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color={currentTheme.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={[styles.version, { color: currentTheme.textSecondary }]}>
            ResumeCraft v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  versionContainer: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 30,
  },
  version: {
    fontSize: 14,
  },
});

export default SettingsScreen;
