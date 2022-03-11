import TodoStore from '../../src/store/TodoStore';

describe('TodoStore', () => {
  // beforeAll(() => {
  //   jest.mock('@react-native-community/async-storage');
  // });

  it('creates new todos', () => {
    const store = new TodoStore();
    let len = store.todos.length;
    let lastId = len > 0 ? store.todos[len - 1].id : 0;
    store.handleSubmitPress('todo1');
    expect(store.todos.length).toBe(len + 1);
    expect(store.todos[len].text).toBe('todo1');
    expect(store.todos[len].id).toBe(lastId + 1);
  });
});
