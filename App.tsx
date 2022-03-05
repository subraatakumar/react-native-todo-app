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
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  TextInput,
} from 'react-native';
import {ArrowLeft2, ArrowRight2, Verify, Trash} from 'iconsax-react-native';
import {format, addDays} from 'date-fns';
import {TodoObject, AppData} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RuntimeGlobals} from 'webpack';

const App = () => {
  const [navBarDate, setNavBarDate] = React.useState(Date.now());
  const [todos, setTodos] = React.useState<TodoObject[]>([]);
  const [textInputValue, setTextInputValue] = React.useState<string>('');
  const todoTextInput = React.useRef<TextInput>(null);

  const handleRightPress = () => {
    setNavBarDate(addDays(new Date(navBarDate), 1).getTime());
  };

  const handleLeftPress = () => {
    setNavBarDate(addDays(new Date(navBarDate), -1).getTime());
  };

  const handleDeletePress = (id: Number) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const storageKey = 'my-app-data';

  const getAppData = async (): Promise<AppData | null> => {
    try {
      const data = await AsyncStorage.getItem(storageKey);

      if (data) {
        console.log(JSON.parse(data));
        return JSON.parse(data);
      }
      return null;
    } catch {
      return null;
    }
  };

  const setAppData = async (newData: AppData) => {
    console.log('starting to store local storage!');
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
    } catch {
      console.log('Unable to store to local storage!');
    } finally {
      console.log('Saved to local storage!');
    }
  };

  React.useEffect(() => {
    console.log('First Run!');
    const getDataFromStorage = async () => {
      try {
        const data = await getAppData();
        if (data !== null) {
          console.log('data in storage', data.todosData);
          setTodos(data.todosData);
        } else {
          console.log('no Data on Storage!');
        }
      } catch {}
      return null;
    };
    getDataFromStorage();
  }, []);

  React.useEffect(() => {
    console.log('todos data updated', todos);
  }, [todos]);

  const setInputFocus = () => {
    if (null !== todoTextInput.current) todoTextInput.current.focus();
  };

  const handleSubmitPress = () => {
    if (textInputValue === '') return;
    let maxId: number;

    maxId =
      todos.length == 0 ? 0 : todos.reduce((a, b) => (a.id > b.id ? a : b)).id;

    setTodos(current => {
      const newValue = [
        ...current,
        {id: maxId + 1, date: navBarDate, text: textInputValue},
      ];
      setAppData({todosData: newValue});
      setTextInputValue('');
      setInputFocus();
      console.log('setTodos', newValue);
      return newValue;
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.navBar}>
        <Pressable onPress={handleLeftPress}>
          <ArrowLeft2 size={32} color="#000000" />
        </Pressable>
        <Text style={styles.navBarDate}>
          {format(navBarDate, 'dd/MM/yyyy')}
        </Text>
        <Pressable onPress={handleRightPress}>
          <ArrowRight2 size={32} color="#000000" />
        </Pressable>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textinput}
          value={textInputValue}
          placeholder="Input Todo..."
          onChangeText={setTextInputValue}
          onSubmitEditing={handleSubmitPress}
          blurOnSubmit={false} // Without this focus method will not work
          ref={todoTextInput}
        />
        <Pressable onPress={handleSubmitPress} style={styles.submitPressable}>
          <ArrowRight2 size={32} color="#000000" style={styles.submitArrow} />
        </Pressable>
      </View>
      <ScrollView>
        {todos.length === 0 ? (
          <View>
            <Text>No Data</Text>
          </View>
        ) : todos.filter(sTodo => sTodo.date === navBarDate).length === 0 ? (
          <View>
            <Text>No Data</Text>
          </View>
        ) : (
          todos
            .filter(sTodo => sTodo.date == navBarDate)
            .map(singleTodo => (
              <View key={singleTodo.id} style={styles.singleTodoContainer}>
                <Text style={styles.todoText}>{singleTodo.text}</Text>
                <View style={styles.singleTodoIconsContainer}>
                  <Pressable onPress={() => handleDeletePress(singleTodo.id)}>
                    <Trash size="45" color="#FF0000" />
                  </Pressable>
                  <Pressable onPress={() => handleDeletePress(singleTodo.id)}>
                    <Verify size="45" color="#21A300" />
                  </Pressable>
                </View>
              </View>
            ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
  },
  navBarDate: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000000',
  },
  textInputContainer: {
    flexDirection: 'row',
    padding: 14,
  },
  textinput: {
    borderWidth: 1,
    flex: 1,
    borderRadius: 5,
    fontFamily: 'Roboto',
    fontSize: 24,
    paddingLeft: 15,
    paddingRight: 15,
  },
  submitPressable: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BBECA4',
    borderRadius: 5,
    padding: 10,
    width: 53,
    marginLeft: 15,
  },
  submitArrow: {
    padding: 10,
  },
  singleTodoContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: '#FBFBFB',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000000',
  },
  singleTodoIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todoText: {
    fontFamily: 'Roboto',
    fontSize: 24,
    color: '#000000',
    paddingBottom: 20,
  },
});

export default App;
