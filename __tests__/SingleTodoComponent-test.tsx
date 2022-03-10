import React from 'react';
import renderer from 'react-test-renderer';
import SingleTodoComponent from '../src/Components/SingleTodoComponent';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <SingleTodoComponent
        handleDeletePress={() => {}}
        singleTodo={{id: 5, date: 123456, text: 'task1'}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
