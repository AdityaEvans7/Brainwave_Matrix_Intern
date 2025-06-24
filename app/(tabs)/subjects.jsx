import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const subjects = ['English', 'Math', 'Physics', 'Computer', 'SoftSkill'];

export default function SubjectsScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  const handleSelect = (subject) => {
    setSelected(subject);
    setTimeout(() => {
      router.push(`/quiz/${subject.toLowerCase()}`);
    }, 150); // slight delay to show feedback
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Subject</Text>

      <FlatList
        data={subjects}
        numColumns={2}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.subjectButton,
              selected === item && styles.selectedButton
            ]}
            onPress={() => handleSelect(item)}
          >
            <Text
              style={[
                styles.subjectText,
                selected === item && styles.selectedText
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  grid: {
    gap: 16,
  },
  subjectButton: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    margin: 8,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  subjectText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedButton: {
    backgroundColor: '#3D85C6',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
