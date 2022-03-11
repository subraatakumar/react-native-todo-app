import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import App, {todoStore} from '../../src/App';

// Testing User Interaction
test('given empty todoList, user can add an item to it', () => {
  const {
    getByPlaceholderText,
    getByTestId,
    getAllByText,
    getAllByTestId,
    toJSON,
  } = render(<App />);

  fireEvent.changeText(getByPlaceholderText('Input Todo...'), 'testing todo');
  fireEvent.press(getByTestId('addTodoBtn'));

  const testElements = getAllByText('testing todo');
  expect(testElements).toHaveLength(1); // expect 'testing todo' to be on the list
  expect(toJSON()).toMatchSnapshot(); // Another method of snapshot testing
});
