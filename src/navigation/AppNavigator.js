import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import ResumeBuilderScreen from '../screens/ResumeBuilderScreen';
import TemplateSelectionScreen from '../screens/TemplateSelectionScreen';
import PreviewScreen from '../screens/PreviewScreen';
import PaymentScreen from '../screens/PaymentScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SavedResumesScreen from '../screens/SavedResumesScreen';

// Context
import { ThemeContext } from '../context/ThemeContext';

// Styles
import { darkTheme, lightTheme } from '../styles/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { 
          backgroundColor: currentTheme.background,
          borderTopColor: currentTheme.border,
        },
        tabBarActiveTintColor: currentTheme.primary,
        tabBarInactiveTintColor: currentTheme.text,
        headerStyle: {
          backgroundColor: currentTheme.background,
        },
        headerTintColor: currentTheme.text,
      }}
    >
      <Tab.Screen 
        name="NewResume" 
        component={ResumeStackNavigator} 
        options={{
          tabBarLabel: t('newResume'),
          tabBarIcon: ({ color, size }) => (
            <Feather name="file-plus" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="SavedResumes" 
        component={SavedResumesScreen} 
        options={{
          tabBarLabel: t('savedResumes'),
          tabBarIcon: ({ color, size }) => (
            <Feather name="folder" size={size} color={color} />
          ),
          title: t('savedResumes'),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          tabBarLabel: t('settings'),
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
          title: t('settings'),
        }}
      />
    </Tab.Navigator>
  );
}

function ResumeStackNavigator() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: currentTheme.background,
        },
        headerTintColor: currentTheme.text,
        cardStyle: { backgroundColor: currentTheme.background }
      }}
    >
      <Stack.Screen 
        name="ResumeBuilder" 
        component={ResumeBuilderScreen} 
        options={{ 
          title: t('buildResume'),
        }} 
      />
      <Stack.Screen 
        name="TemplateSelection" 
        component={TemplateSelectionScreen} 
        options={{ 
          title: t('chooseTemplate'),
        }} 
      />
      <Stack.Screen 
        name="Preview" 
        component={PreviewScreen} 
        options={{ 
          title: t('preview'),
        }} 
      />
      <Stack.Screen 
        name="Payment" 
        component={PaymentScreen} 
        options={{ 
          title: t('payment'),
        }} 
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator({ initialLanguage }) {
  // Force RTL if language is Arabic
  React.useEffect(() => {
    if (initialLanguage === 'ar' && !I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    }
  }, [initialLanguage]);

  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <NavigationContainer
      theme={{
        dark: theme === 'dark',
        colors: {
          primary: currentTheme.primary,
          background: currentTheme.background,
          card: currentTheme.surface,
          text: currentTheme.text,
          border: currentTheme.border,
          notification: currentTheme.primary,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: currentTheme.background }
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="MainApp" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
