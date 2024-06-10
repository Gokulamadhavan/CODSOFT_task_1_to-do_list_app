import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskColor, setTaskColor] = useState('#000000'); // Default dark color

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksString = await AsyncStorage.getItem('tasks');
        if (tasksString) {
          setTasks(JSON.parse(tasksString));
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadTasks();
  }, []);

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  };

  const addTask = () => {
    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      description: taskDescription,
      completed: false,
      color: taskColor || '#000000' // Default to dark color if not specified
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setTaskTitle('');
    setTaskDescription('');
    setTaskColor('#000000');
    setModalVisible(false);
  };

  const editTask = () => {
    const updatedTasks = tasks.map(task =>
      task.id === currentTask.id
        ? { ...task, title: taskTitle, description: taskDescription, color: taskColor || '#000000' }
        : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setTaskTitle('');
    setTaskDescription('');
    setTaskColor('#000000');
    setModalVisible(false);
    setCurrentTask(null);
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskColor(task.color || '#000000');
    setModalVisible(true);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => toggleTaskCompletion(item.id)}
              onLongPress={() => openEditModal(item)}
            >
              <Text style={[styles.item, { color: item.color || '#000000' }, item.completed && styles.completed]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <Button title="Delete" color="red" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
      <Button title="Add Task" onPress={() => setModalVisible(true)} />
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalView}>
          <TextInput
            placeholder="Task Title"
            value={taskTitle}
            onChangeText={setTaskTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Task Description"
            value={taskDescription}
            onChangeText={setTaskDescription}
            style={styles.input}
          />
          
          <Button title={currentTask ? "Save Changes" : "Add Task"} onPress={currentTask ? editTask : addTask} />
          <Button title="Cancel" onPress={() => {
            setModalVisible(false);
            setCurrentTask(null);
            setTaskTitle('');
            setTaskDescription('');
            setTaskColor('#000000');
          }} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888888',
  },
  modalView: {
    margin: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    backgroundColor: '#000000', // Change background color to black
    color: '#FFFFFF', // Change text color to white
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
