import { createContext, useState } from 'react';
import { CATEGORIES } from '../constants';

export const AppStateContext = createContext();

const LIST = [
  {
    id: 'todo_id',
    task: 'test: To Do',
    time: new Date(Date.now()).toLocaleTimeString(),
    date: new Date(Date.now()).toLocaleDateString(),
    fullDate: '',
    done: false,
    category: CATEGORIES.find((item) => item.id === 'todo').id,
  },
  {
    id: 'placeToGo_id',
    task: 'test: Place to Go',
    time: new Date(Date.now()).toLocaleTimeString(),
    date: new Date(Date.now()).toLocaleDateString(),
    fullDate: '',
    done: false,
    category: CATEGORIES.find((item) => item.id === 'placeToGo').id,
  },
  {
    id: 'needToTalk_id',
    task: 'test: Need to Talk',
    time: new Date(Date.now()).toLocaleTimeString(),
    date: new Date(Date.now()).toLocaleDateString(),
    fullDate: '',
    done: false,
    category: CATEGORIES.find((item) => item.id === 'needToTalk').id,
  },
];

export const AppStateProvider = ({ children }) => {
  const [data, setData] = useState(LIST);

  const addTask = (newTask) => {
    setData((prevState) => [...prevState, newTask]);
  };

  const onUpdate = (task) => {
    setData(
      data.map((item) => {
        if (item.id === task.id) {
          item.done = !item.done;
        }
        return item;
      })
    );
  };

  const contextValue = { data, addTask, onUpdate };

  return <AppStateContext.Provider value={contextValue}>{children}</AppStateContext.Provider>;
};
