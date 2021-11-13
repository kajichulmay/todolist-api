const router = require('express').Router();
const todoController = require('../controllers/TodoController');

router.get('/', todoController.getAllTodo);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.editTodo);

router.delete('/:id', todoController.deleteTodo);

module.exports = router;
