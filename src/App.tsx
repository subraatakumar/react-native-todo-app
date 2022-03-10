/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavBarComponent} from './Components/NavBarComponent';
import {AppContextProvider} from './AppContextProvider';
import TodoList from './Components/TodoList';
import TodoInput from './Components/TodoInput';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.bodyStyle}>
      <AppContextProvider>
        <NavBarComponent />
        <TodoInput />
        <TodoList />
      </AppContextProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bodyStyle: {
    justifyContent: 'flex-end',
  },
});

export default App;
