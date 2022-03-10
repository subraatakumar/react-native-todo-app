import {makeAutoObservable} from 'mobx';
import {TodoObject, AppData} from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addDays, getOverlappingDaysInIntervals} from 'date-fns';

class TodoStore {
  todos: TodoObject[] = [];
  storageKey: string = 'my-app-data';
  navBarDate: number = Date.now();

  constructor() {
    makeAutoObservable(this);
  }

  handleDateChange = (noOfDays: number) => {
    this.navBarDate = addDays(new Date(this.navBarDate), noOfDays).getTime();
  };

  setTodos(newTodos: TodoObject[]) {
    this.todos = newTodos;
  }

  setAppData = async (newData: AppData) => {
    console.log('starting to store local storage!');
    try {
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(newData));
    } catch {
      console.log('Unable to store to local storage!');
    } finally {
      console.log('Saved to local storage!');
    }
  };

  // getAppData = async (): Promise<AppData | null> => {
  //   try {
  //     const data = await AsyncStorage.getItem(this.storageKey);

  //     if (data) {
  //       console.log(JSON.parse(data));
  //       this.todos = JSON.parse(data);
  //     }
  //     return null;
  //   } catch {
  //     return null;
  //   }
  // };

  // getDataFromStorage: () => Promise<void> = async () => {
  //   try {
  //     const data = await this.getAppData();
  //     if (data !== null) {
  //       console.log('data in storage', data.todosData);
  //       this.todos = data.todosData;
  //     } else {
  //       console.log('no Data on Storage!');
  //     }
  //   } catch {}
  // };

  handleSubmitPress = (textInputValue: string) => {
    console.log('handle Submit Press');
    if (textInputValue === '') return;
    let maxId: number;

    maxId =
      this.todos.length == 0
        ? 0
        : this.todos.reduce((a, b) => (a.id > b.id ? a : b)).id;

    this.todos = [
      ...this.todos,
      {id: maxId + 1, date: this.navBarDate, text: textInputValue},
    ];
    this.setAppData({todosData: this.todos});
    console.log('setTodos', this.todos);
  };

  setNavBarDate(newNavBarDate: number) {
    this.navBarDate = newNavBarDate;
  }

  handleDeletePress(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}

export default TodoStore;
