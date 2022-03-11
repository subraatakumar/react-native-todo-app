import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {Verify, Trash} from 'iconsax-react-native';
import {TodoObject} from '../../types';

interface Props {
  singleTodo: TodoObject;
  handleDeletePress: (id: number) => void;
}
const SingleTodoComponent: React.FC<Props> = ({
  singleTodo,
  handleDeletePress,
}) => {
  return (
    <View style={[styles.singleTodoContainer, styles.shadowProp]}>
      <Text style={styles.todoText}>{singleTodo.text}</Text>
      <View style={styles.singleTodoIconsContainer}>
        <Pressable
          testID="delete-btn"
          onPress={() => handleDeletePress(singleTodo.id)}>
          <Trash size="45" color="#FF0000" />
        </Pressable>
        <Pressable onPress={() => handleDeletePress(singleTodo.id)}>
          <Verify size="45" color="#21A300" />
        </Pressable>
      </View>
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

export default SingleTodoComponent;
