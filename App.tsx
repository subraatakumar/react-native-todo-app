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
import {TodoObject} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  type AppData = {
    todos: TodoObject[];
  };

  const [navBarDate, setNavBarDate] = React.useState(new Date());
  const [todos, setTodos] = React.useState<TodoObject[]>([]);
  console.log(todos);
  const [textInputValue, setTextInputValue] = React.useState<string>('');

  const handleRightPress = () => {
    setNavBarDate(addDays(navBarDate, 1));
  };

  const handleLeftPress = () => {
    setNavBarDate(addDays(navBarDate, -1));
  };

  const handleDeletePress = (id: number) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const storageKey = 'my-app-data';

  const getAppData = async (): Promise<AppData | null> => {
    try {
      const data = await AsyncStorage.getItem(storageKey);

      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch {
      return null;
    }
  };

  const setAppData = async (newData: AppData) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
    } catch {}
  };

  React.useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();

      if (data) {
        setTodos(data.todos);
      }
    };
    getDataFromStorage();
  }, []);

  const handleSubmitPress = () => {
    if (textInputValue === '') return;

    setTodos([...todos, {id: Date.now(), text: textInputValue}]);
    setAppData({todos: todos});
    setTextInputValue('');
  };

  return (
    <SafeAreaView>
      <Pressable onPress={handleLeftPress}>
        <ArrowLeft2 color="#000000" />
      </Pressable>
      <Text>{format(navBarDate, 'dd/MM/yyyy')}</Text>
      <Pressable onPress={handleRightPress}>
        <ArrowRight2 color="#000000" />
      </Pressable>
      <TextInput
        style={styles.textinput}
        value={textInputValue}
        onChangeText={setTextInputValue}
      />
      <Pressable onPress={handleSubmitPress}>
        <ArrowRight2 color="#000000" />
      </Pressable>
      <View>
        {todos.map(singleTodo => (
          <View key={singleTodo.id}>
            <Text>{singleTodo.text}</Text>
            <Pressable onPress={() => handleDeletePress(singleTodo.id)}>
              <Trash color="#000000" />
            </Pressable>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textinput: {
    borderWidth: 1,
  },
});

export default App;
