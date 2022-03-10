/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavBarComponent} from './Components/NavBarComponent';
// import {AppContextProvider} from './AppContextProvider';
import TodoList from './Components/TodoList';
import TodoInput from './Components/TodoInput';
import TodoStore from './store/TodoStore';
import {AppData} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const todoStore = new TodoStore();

const App: React.FC = () => {
  useEffect(() => {
    const getAppData = async (): Promise<AppData | null> => {
      //console.log('App data getting started.');
      try {
        const data = await AsyncStorage.getItem(todoStore.storageKey);

        if (data) {
          console.log('Data in local storage', JSON.parse(data));
          todoStore.setTodos(JSON.parse(data).todosData);
        }
        return null;
      } catch {
        return null;
      }
    };
    getAppData();
  }, []);

  return (
    <SafeAreaView style={styles.bodyStyle}>
      {/* <AppContextProvider> */}
      <NavBarComponent />
      <TodoInput />
      <TodoList />
      {/* </AppContextProvider> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bodyStyle: {
    justifyContent: 'flex-end',
  },
});

export default App;
