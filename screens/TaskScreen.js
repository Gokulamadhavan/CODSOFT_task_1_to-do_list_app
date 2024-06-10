import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const TaskScreen = ({ navigation }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskColor, setTaskColor] = useState('#000000');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF', // Change background color to white
      padding: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      backgroundColor: '#000000', // Change background color to black
      color: '#FFFFFF', // Change text color to white
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: '#000000', // Change button background color to black
      color: '#FFFFFF', // Change button text color to white
    },
  });

  const addTask = () => {
    // Add task logic here
    console.log("Adding task:", taskTitle, taskDescription, taskColor);
  };

  return (
    <View style={styles.container}>
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
      <TextInput
        placeholder="Task Color (e.g., #FF0000)"
        value={taskColor}
        onChangeText={setTaskColor}
        style={styles.input}
      />
      <Button title="Add Task" onPress={addTask} style={styles.button} />
    </View>
  );
};

export default TaskScreen;
