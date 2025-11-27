import React, { useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Task = {
  id: string;
  title: string;
};

export default function HomeScreen() {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), title: task }]);
    setTask('');
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.title}</Text>
      <TouchableOpacity onPress={() => removeTask(item.id)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TODO APP</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList<Task>
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  item: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  itemText: {
    fontSize: 16,
  },
  delete: {
    color: '#ef4444',
    fontWeight: '600',
  },
});
