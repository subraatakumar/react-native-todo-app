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

const App = () => {
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

  const handleSubmitPress = () => {
    if (textInputValue === '') return;

    setTodos([...todos, {id: Date.now(), text: textInputValue}]);
    setTextInputValue('');
  };

  const handleDeletePress = (id: number) => {
    setTodos(todos.filter(item => item.id !== id));
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
          <View>
            <Text key={singleTodo.id}>{singleTodo.text}</Text>
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
