import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TodoObject} from '../../types';
// import {useContextProvider} from '../AppContextProvider';
import SingleTodoComponent from './SingleTodoComponent';
import {observer} from 'mobx-react-lite';
import {todoStore} from '../App';

const TodoList: React.FC = observer(() => {
  // const appContext = useContextProvider();

  const compareDates = React.useCallback(
    (sTodo: TodoObject, navBarDate: number) => {
      let date1 = new Date(sTodo.date);
      date1.setHours(0, 0, 0, 0);
      let date2 = new Date(navBarDate);
      date2.setHours(0, 0, 0, 0);
      console.log(
        'Date Filter',
        date1,
        date2,
        date1.toString() == date2.toString(),
      );

      return date1.toString() == date2.toString();
    },
    [],
  );

  // const handleDeletePress = (id: number) => {
  //   appContext.setTodos(appContext.todos.filter(item => item.id !== id));
  //   appContext.setAppData({todosData: appContext.todos});
  // };

  return (
    <ScrollView>
      {todoStore.todos.length === 0 ||
      todoStore.todos.filter(sTodo => compareDates(sTodo, todoStore.navBarDate))
        .length === 0 ? (
        <View style={[styles.singleTodoContainer, styles.shadowProp]}>
          <Text>No Data</Text>
        </View>
      ) : (
        todoStore.todos
          .filter(sTodo => compareDates(sTodo, todoStore.navBarDate))
          .map(singleTodo => (
            <SingleTodoComponent
              key={singleTodo.id}
              singleTodo={singleTodo}
              handleDeletePress={todoStore.handleDeletePress}
            />
          ))
      )}
    </ScrollView>
  );
});

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

export default TodoList;
