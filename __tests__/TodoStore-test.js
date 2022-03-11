import TodoStore from '../src/store/TodoStore';

describe('TodoStore', () => {
  // beforeAll(() => {
  //   jest.mock('@react-native-community/async-storage');
  // });

  it('creates new todos', () => {
    const store = new TodoStore();
    const len = store.todos.length;

    store.handleSubmitPress('todo1');
    expect(store.todos.length).toBe(len + 1);
    expect(store.todos[len].text).toBe('todo1');
  });
});
