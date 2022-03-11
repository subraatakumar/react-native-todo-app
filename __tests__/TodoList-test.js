import React from 'react';
import renderer from 'react-test-renderer';
import TodoList from '../src/Components/TodoList';

test('renders correctly', () => {
  beforeAll(() => {
    jest.mock('@react-native-community/async-storage');
  });

  const tree = renderer.create(<TodoList />).toJSON();
  expect(tree).toMatchSnapshot();
});
