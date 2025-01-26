/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  View,
} from 'react-native';


import TodoList from './src/screens/todo';


const App=()=>{
  return(

  <View style={{flex:1}}>
    <TodoList/>
  </View>
  )
}



export default App;
