const express = require('express')
const { validateToken } = require('../middleware/auth.middleware')
const { getAllToDoItems, getToDoItem, addToDoItem, deleteToDoItem, updateToDoItem
} = require('../controllers/todo.controller')
const router = express.Router()

router.get('/item/all', validateToken, getAllToDoItems)
router.get('/item/:id', validateToken, getToDoItem)
router.post('/item', validateToken, addToDoItem)
router.patch('/item/:id', validateToken, updateToDoItem)
router.delete('/item/:id', validateToken, deleteToDoItem)

module.exports = router