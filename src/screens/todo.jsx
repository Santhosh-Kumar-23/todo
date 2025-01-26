import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/TodoStyles'
import labels from '../utlis/Strings'
import colors from '../utlis/Colors';

const TodoList = () => {
  //State variables
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(labels.ALL);
  const [editingTaskId, setEditingTaskId] = useState(null);

  //Hooks functions
  useEffect(() => {
    handleLoadTasks();
  }, []);

 //Functions
  const handleLoadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem(labels.TASKS);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error(labels.ERROR_LOADING_TASKS, error);
    }
  };

 
  const handleSaveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem(labels.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error(labels.ERROR_SAVING_TASKS, error);
    }
  };

 
  const handleAddTask = () => {
    if (task.trim() !== '') {
      const newTask = { id: Date.now().toString(), text: task, completed: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      handleSaveTasks(updatedTasks);
      setTask('');
    } else {
      Alert.alert(labels.TASK_ADD_PLACEHOLDER);
    }
  };

  const handlepdateTask = () => {
    if (task.trim() !== '') {
      const updatedTasks = tasks.map((t) =>
        t.id === editingTaskId ? { ...t, text: task } : t
      );
      setTasks(updatedTasks);
      handleSaveTasks(updatedTasks);
      setTask('');
      setEditingTaskId(null); 
    } else {
      Alert.alert(labels.TASK_UPDATE_PLACEHOLDER);
    }
  };

 
  const handleToggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    handleSaveTasks(updatedTasks);
  };


  const deleteTask = (id) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: labels.CANCEL, },
      { text: labels.DELETE, onPress: () => handleDelete(id),  },
    ]);
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    handleSaveTasks(updatedTasks);
  };

 
  const filteredTasks = tasks.filter((task) => {
    if (filter === labels.ALL) return true;
    if (filter === labels.ACTIVE) return !task.completed;
    return task.completed;
  });

  
  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id); 
    setTask(taskToEdit.text); 
    setEditingTaskId(id); 
  };

  //renderUIFunctions
  const renderTitle=()=>{
    return(
      <Text style={styles.title}>{labels.TITLE}</Text>
    )
  }

  const renderInput=()=>{
    return(
      <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder={editingTaskId ? labels.EDIT_TASK : labels.ENTER_TASK}
          accessibilityLabel="Task input"
        />
    )
  }

  const renderUpdateAndAddButton=()=>{
    return(
      <Button
      title={editingTaskId ? labels.UPDATE : labels.ADD}
      onPress={editingTaskId ? handlepdateTask : handleAddTask}
      accessibilityLabel={editingTaskId ? labels.UPDATE_TASK : labels.ADD_TASK}
    />
    )
  }

  const renderAllButton=()=>{
    return(
      <Button 
      title={"ALL"} 
      onPress={() => setFilter(labels.ALL)} 
      accessibilityLabel={labels.SHOW_ALL_TASKS} />
    )
  }

  const renderActiveButton=()=>{
    return(   
      <Button title={'Active'} 
      onPress={() => setFilter(labels.ACTIVE)}
       accessibilityLabel={labels.SHOW_ACTIVE_TASKS} />
    )
  }

  const renderCompletedCompleted=()=>{
    return(
      <Button title={'Completed'}
       onPress={() => setFilter(labels.COMPLETED)} 
       accessibilityLabel={labels.SHOW_COMPLETED_TASKS} />
    )
  }

  const renderTaskItem = ({ item }) => {
    const renderEdit=()=>{
   return(
    <TouchableOpacity onPress={() => handleEditTask(item.id)} accessible={true}>
    <Text style={styles.editButton}>{labels.EDIT}</Text>
    </TouchableOpacity>
   )
    }
    const rendeDelete=()=>{
      return(
      // <TouchableOpacity onPress={() => deleteTask(item.id)} accessible={true}>
      // <Text style={styles.deleteButton}>{labels.DELETE}</Text>
      // </TouchableOpacity>
      <Icon name="trash" size={24} color={colors.neonRed} onPress={() => deleteTask(item.id)} />
      )
    }

    const renderIcon=()=>{
      return(
        <TouchableOpacity onPress={() => handleToggleTaskCompletion(item.id)} accessible={true}>
        <Icon
          name={item.completed ? 'check-square' : 'square-o'} // Use check icon if completed, else square
          size={24}
          color={item.completed ? colors.green : colors.gray}
          accessibilityLabel={`Mark task ${item.completed ? labels.INCOMPLETE : labels.COMPLETE}`}
        />
      </TouchableOpacity>
      )
    }
    return (
      <View style={styles.taskContainer}>
           {renderIcon()}
            <Text
              style={[
                styles.taskText,
                item.completed ? { textDecorationLine: 'line-through', color: colors.lightGray } : null,
              ]}
            >
              {item.text}
            </Text>
           {renderEdit()}
           {rendeDelete()}
          </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderTitle()}
    <View style={styles.addTaskContainer}>
        {renderInput()}
        {renderUpdateAndAddButton()}       
      </View>
      <View style={styles.filterContainer}>
        {renderAllButton()}
        {renderActiveButton()}
        {renderCompletedCompleted()}      
      </View>
      <FlatList
        data={filteredTasks}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskItem}
        ListEmptyComponent={<Text style={styles.emptyMessage}>{labels.NO_TASK_FOUND}</Text>}
      />
    </View>
  );
};



export default TodoList;
