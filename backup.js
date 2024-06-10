import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Task 1' },
    { id: '2', title: 'Task 2' },
  ]);

  return (
    <SafeAreaView>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Task', { task: item })}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Add Task"
        onPress={() => {
          const newTask = { id: Date.now().toString(), title: `Task ${tasks.length + 1}` };
          setTasks([...tasks, newTask]);
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
