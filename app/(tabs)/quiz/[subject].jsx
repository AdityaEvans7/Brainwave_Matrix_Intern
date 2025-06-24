import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import { quizzes } from '../../constants/quizzes';
import { useQuiz } from '../../context/QuizContext';
import { Ionicons } from '@expo/vector-icons';

export default function SubjectQuizScreen() {
  const { subject } = useLocalSearchParams();
  const router = useRouter();
  const quiz = quizzes[subject?.toLowerCase()] || [];

  const [current, setCurrent] = useState(0);
  const { answers, setAnswers, setScore, resetQuiz } = useQuiz();

  const handleOption = (option) => {
    const updated = { ...answers, [current]: option };
    setAnswers(updated);
  };

  const handleSubmit = () => {
    let newScore = 0;
    quiz.forEach((q, index) => {
      if (answers[index] === q.answer) newScore++;
    });
    setScore(newScore);
    router.push('/result');
  };

  const currentQ = quiz[current];

  if (!quiz.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No quiz found for subject: {subject}</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { resetQuiz(); setCurrent(0); }} style={styles.resetButton}>
          <Ionicons name="refresh" size={16} color="#FF6B6B" />
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
        <Text style={styles.progress}>Q{current + 1} / {quiz.length}</Text>
      </View>

      {/* Question */}
      <Text style={styles.questionText}>
        {currentQ?.question}
      </Text>

      {/* Options */}
      {currentQ?.options.map((opt) => (
        <TouchableOpacity
          key={opt}
          onPress={() => handleOption(opt)}
          style={[
            styles.optionButton,
            answers[current] === opt && styles.selectedOption,
          ]}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}

      {/* Navigation */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          onPress={() => setCurrent((p) => Math.max(p - 1, 0))}
          disabled={current === 0}
          style={styles.navButton}
        >
          <Ionicons name="arrow-back" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={
            current === quiz.length - 1
              ? handleSubmit
              : () => setCurrent((p) => Math.min(p + 1, quiz.length - 1))
          }
          style={styles.navButton}
        >
          <Ionicons
            name={current === quiz.length - 1 ? 'checkmark' : 'arrow-forward'}
            size={20}
            color="#ccc"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resetButton: {
    flexDirection: 'row',
    borderColor: '#FF6B6B',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    gap: 6,
  },
  resetText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  progress: {
    color: '#bbb',
    fontSize: 14,
  },
  questionText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 15,
    fontWeight: '600',
  },
  optionButton: {
    backgroundColor: '#1f1f1f',
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#333',
  },
  selectedOption: {
    backgroundColor: '#3434ff',
    borderColor: '#5c5cff',
  },
  optionText: {
    color: '#eee',
    fontSize: 16,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  navButton: {
    backgroundColor: '#1f1f1f',
    padding: 12,
    borderRadius: 10,
    borderColor: '#333',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});
