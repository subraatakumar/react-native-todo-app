import React from 'react';
import {TodoObject, AppData} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addDays} from 'date-fns';

type AppContextType = {
  todos: TodoObject[];
  setTodos: (todos: TodoObject[]) => void;
  navBarDate: number;
  setNavBarDate: (date: number) => void;
  handleRightPress: () => void;
  handleLeftPress: () => void;
  handleSubmitPress: (textInputValue: string) => void;
  setAppData: (newData: AppData) => void;
};

const AppContext = React.createContext<AppContextType>({
  todos: [],
  setTodos: () => {},
  navBarDate: Date.now(),
  setNavBarDate: () => {},
  handleRightPress: () => {},
  handleLeftPress: () => {},
  handleSubmitPress: (textInputValue: string) => {},
  setAppData: (newData: {}) => {},
});

export const AppContextProvider: React.FC = ({children}) => {
  const storageKey: string = 'my-app-data';

  const [todos, setTodos] = React.useState<TodoObject[]>([]);
  const [navBarDate, setNavBarDate] = React.useState<number>(Date.now());

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
    };
    getDataFromStorage();
  }, []);

  const handleSubmitPress = (textInputValue: string) => {
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
      console.log('setTodos', newValue);
      return newValue;
    });
  };

  const handleRightPress = () => {
    console.log('Right Press');
    setNavBarDate(addDays(new Date(navBarDate), 1).getTime());
  };

  const handleLeftPress = () => {
    console.log('Left Press');
    setNavBarDate(addDays(new Date(navBarDate), -1).getTime());
  };

  return (
    <AppContext.Provider
      value={{
        todos,
        setTodos,
        navBarDate,
        setNavBarDate,
        handleRightPress,
        handleLeftPress,
        handleSubmitPress,
        setAppData,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useContextProvider = () => React.useContext(AppContext);
