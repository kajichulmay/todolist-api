const { v4: uuidv4 } = require('uuid');
const { readFile, writeFile } = require('fs/promises');

const findTodo = async () => {
  const result = await readFile('dbs/todo.json');
  return JSON.parse(result);
};

const saveTodo = async todos => {
  await writeFile('dbs/todo.json', JSON.stringify(todos));
};

exports.getAllTodo = async (req, res, next) => {
  try {
    const allTodolist = await findTodo();

    res.status(200).json({ allTodolist });
  } catch {
    next(err);
  }
};
exports.createTodo = async (req, res, next) => {
  try {
    const { name } = req.body;
    const todos = await findTodo();

    if (!name || !name.trim()) {
      return res.status(200).json({ message: 'name is required' });
    }
    const newTodo = {
      id: uuidv4(),
      name,
      status: false,
    };
    todos.unshift(newTodo);
    await saveTodo(todos);

    res.status(201).json({ newTodo });
  } catch {
    next(err);
  }
};
exports.editTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const todos = await findTodo();
    const idx = todos.findIndex(item => item.id === id);
    if (idx === -1) return res.status(400).json({ message: 'todo with this id not found' });
    if (!name || !name.trim()) return res.status(400).json({ message: 'name is required' });

    const newTodo = { ...todos[idx], name, status };
    todos[idx] = newTodo;
    await saveTodo(todos);
    res.status(200).json();
  } catch {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todos = await findTodo();
    const idx = todos.findIndex(item => item.id === id);
    if (idx === -1) return res.status(400).json({ message: 'todo with this id not found' });
    todos.splice(idx, 1);
    await saveTodo(todos);
    res.status(204).json();
  } catch {
    next(err);
  }
};
