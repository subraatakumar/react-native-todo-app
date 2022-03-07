import React from 'react';
import {StyleSheet, View, Pressable, TextInput} from 'react-native';
import {useContextProvider} from '../AppContextProvider';
import {ArrowRight2} from 'iconsax-react-native';

const TodoInput = () => {
  const todoTextInput = React.useRef<TextInput>(null);
  const appContext = useContextProvider();
  const [textInputValue, setTextInputValue] = React.useState<string>('');
  const handleChangeText = (t: string) => {
    setTextInputValue(t);
  };
  const setInputFocus = () => {
    if (null !== todoTextInput.current) todoTextInput.current.focus();
  };
  const handleSubmitEditing = (textInputValue: string) => {
    appContext.handleSubmitPress(textInputValue);
    setTextInputValue('');
    setInputFocus();
  };
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textinput}
        value={textInputValue}
        placeholder="Input Todo..."
        onChangeText={t => {
          handleChangeText(t);
        }}
        onSubmitEditing={() => handleSubmitEditing(textInputValue)}
        blurOnSubmit={false} // Without this focus method will not work
        ref={todoTextInput}
      />
      <Pressable
        onPress={() => handleSubmitEditing(textInputValue)}
        style={styles.submitPressable}>
        <ArrowRight2 size={32} color="#000000" style={styles.submitArrow} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyStyle: {
    justifyContent: 'flex-end',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
  },
  navBarDateStyle: {
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
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#FBFBFB',
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
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: 4, height: 4},
    shadowRadius: 1,
    elevation: 10,
  },
});

export default TodoInput;
