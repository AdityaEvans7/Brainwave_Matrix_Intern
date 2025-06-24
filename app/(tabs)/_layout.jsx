import { Stack } from 'expo-router';
import { QuizProvider } from '../context/QuizContext';
import { StatusBar, useColorScheme } from 'react-native';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';

export default function RootLayout() {
  const scheme = useColorScheme(); // optional, can be used for dynamic light/dark themes

  return (
    <QuizProvider>
      <ThemeProvider value={DarkTheme}>
        {/* Set dark status bar */}
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </QuizProvider>
  );
}
