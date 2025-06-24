import { Stack } from 'expo-router';
import { QuizProvider } from '../context/QuizContext';
import { StatusBar, useColorScheme } from 'react-native';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';

export default function RootLayout() {
  const scheme = useColorScheme(); 

  return (
    <QuizProvider>
      <ThemeProvider value={DarkTheme}>
        {/* status bar */}
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </QuizProvider>
  );
}
