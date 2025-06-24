import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuiz } from '../context/QuizContext';

export default function ResultScreen() {
  const { score, resetQuiz } = useQuiz();
  const router = useRouter();

  const getFeedback = () => {
    if (score === 0) return '😓 Try Again!';
    if (score < 3) return '🙂 Not bad!';
    if (score < 5) return '😎 Great Job!';
    return '🏆 Excellent!';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quiz Completed</Text>

      <View style={styles.scoreBox}>
        <Text style={styles.feedbackText}>{getFeedback()}</Text>
        <Text style={styles.score}>Your Score: {score}</Text>
      </View>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => {
          resetQuiz();
          router.push('/');
        }}
      >
        <Text style={styles.homeButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 30,
  },
  scoreBox: {
    backgroundColor: '#1f1f1f',
    padding: 30,
    borderRadius: 16,
    borderColor: '#333',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 40,
  },
  feedbackText: {
    fontSize: 24,
    color: '#f9c80e',
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  score: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  homeButton: {
    backgroundColor: '#15CAC3',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
