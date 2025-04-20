import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [processing, setProcessing] = useState(false);
  
  const formatCardNumber = (text) => {
    // Remove any non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Format with spaces every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.substring(0, 19);
  };
  
  const formatExpiryDate = (text) => {
    // Remove any non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Format as MM/YY
    if (cleaned.length > 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };
  
  const handleCardNumberChange = (text) => {
    setCardNumber(formatCardNumber(text));
  };
  
  const handleExpiryDateChange = (text) => {
    setExpiryDate(formatExpiryDate(text));
  };
  
  const handleCvvChange = (text) => {
    // Allow only numbers, max 3-4 digits
    const cleaned = text.replace(/\D/g, '');
    setCvv(cleaned.substring(0, 4));
  };
  
  const validateForm = () => {
    if (cardNumber.replace(/\s/g, '').length < 16) {
      Alert.alert(t('error'), t('invalidCardNumber'));
      return false;
    }
    
    if (expiryDate.length < 5) {
      Alert.alert(t('error'), t('invalidExpiryDate'));
      return false;
    }
    
    if (cvv.length < 3) {
      Alert.alert(t('error'), t('invalidCvv'));
      return false;
    }
    
    if (!cardholderName.trim()) {
      Alert.alert(t('error'), t('invalidCardholderName'));
      return false;
    }
    
    return true;
  };
  
  const handlePayment = async () => {
    if (!validateForm()) return;
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      try {
        // Mark as premium user in storage
        await AsyncStorage.setItem('premium-user', 'true');
        
        setProcessing(false);
        
        // Show success message
        Alert.alert(
          t('paymentSuccessful'),
          t('paymentSuccessMessage'),
          [
            {
              text: t('continue'),
              onPress: () => navigation.navigate('Preview')
            }
          ]
        );
      } catch (error) {
        setProcessing(false);
        Alert.alert(t('error'), t('paymentFailed'));
      }
    }, 2000);
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: currentTheme.text }]}>
              {t('unlockPremium')}
            </Text>
            <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>
              {t('oneTimePurchase')}
            </Text>
          </View>
          
          <View style={[styles.priceCard, { backgroundColor: currentTheme.surface }]}>
            <View style={styles.priceRow}>
              <Text style={[styles.price, { color: currentTheme.text }]}>$1.00</Text>
              <Text style={[styles.oneTime, { color: currentTheme.textSecondary }]}>
                {t('oneTime')}
              </Text>
            </View>
            
            <View style={styles.featuresContainer}>
              <FeatureItem
                icon="download"
                text={t('unlimitedDownloads')}
                theme={currentTheme}
              />
              <FeatureItem
                icon="edit-2"
                text={t('unlimitedEditing')}
                theme={currentTheme}
              />
              <FeatureItem
                icon="file"
                text={t('allTemplates')}
                theme={currentTheme}
              />
            </View>
          </View>
          
          <View style={styles.paymentForm}>
            <Text style={[styles.formTitle, { color: currentTheme.text }]}>
              {t('paymentDetails')}
            </Text>
            
            <FormInput
              label={t('cardNumber')}
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              keyboardType="number-pad"
              maxLength={19}
              theme={currentTheme}
            />
            
            <View style={styles.row}>
              <View style={styles.half}>
                <FormInput
                  label={t('expiryDate')}
                  value={expiryDate}
                  onChangeText={handleExpiryDateChange}
                  placeholder="MM/YY"
                  keyboardType="number-pad"
                  maxLength={5}
                  theme={currentTheme}
                />
              </View>
              
              <View style={styles.half}>
                <FormInput
                  label={t('cvv')}
                  value={cvv}
                  onChangeText={handleCvvChange}
                  placeholder="123"
                  keyboardType="number-pad"
                  maxLength={4}
                  theme={currentTheme}
                />
              </View>
            </View>
            
            <FormInput
              label={t('cardholderName')}
              value={cardholderName}
              onChangeText={setCardholderName}
              placeholder="John Smith"
              theme={currentTheme}
            />
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <Button
            title={processing ? t('processing') : t('payNow')}
            onPress={handlePayment}
            disabled={processing}
            color={currentTheme.primary}
            textColor={currentTheme.buttonText}
          />
          
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => navigation.navigate('Preview')}
            disabled={processing}
          >
            <Text style={[styles.skipText, { color: currentTheme.textSecondary }]}>
              {t('skipForNow')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const FeatureItem = ({ icon, text, theme }) => {
  return (
    <View style={styles.featureItem}>
      <Feather name={icon} size={20} color={theme.primary} />
      <Text style={[styles.featureText, { color: theme.text }]}>{text}</Text>
    </View>
  );
};

const FormInput = ({ label, value, onChangeText, placeholder, keyboardType, maxLength, theme }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input, 
          { 
            color: theme.text,
            backgroundColor: theme.inputBackground,
            borderColor: theme.border,
          }
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.placeholder}
        keyboardType={keyboardType || 'default'}
        maxLength={maxLength}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  priceCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 15,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 5,
  },
  oneTime: {
    fontSize: 14,
  },
  featuresContainer: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
  },
  paymentForm: {
    marginTop: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 25,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 5,
  },
  skipText: {
    fontSize: 16,
  },
});

export default PaymentScreen;
