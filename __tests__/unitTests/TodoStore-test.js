import TodoStore from '../../src/store/TodoStore';

describe('TodoStore', () => {
  const store = new TodoStore();
  let len = store.todos.length;
  let lastId = len > 0 ? store.todos[len - 1].id : 0;

  it('creates new todos', () => {
    store.handleSubmitPress('todo1');
    expect(store.todos.length).toBe(len + 1);
    expect(store.todos[len].text).toBe('todo1');
    expect(store.todos[len].id).toBe(lastId + 1);
  });

  it('dele todo by id', () => {
    len = store.todos.length;
    lastId = len > 0 ? store.todos[len - 1].id : 0;
    store.handleSubmitPress('Todo To Be deleted');
    store.handleDeletePress(lastId + 1);
    expect(store.todos.length).toBe(len); // Deleted one item so length should be equal to old length
    expect(store.todos[len]).toBeUndefined(); // As we deleted the last
  });
});
