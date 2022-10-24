const mongoose = require('mongoose')
const ToDo = require('../mongoose/model/todo.model')

const getAllToDoItems = async (req, res) => {
    try {
        if (!req.userId) return res.status(401).send({ message: 'Unauthenticated' })
        const id = req.userId
        let query = { createdBy: id }
        if (!isEmpty(req.query)) {
            const status = req.query.status.split(',')
            query = { ...query, status: { $in: status } }
        }
        const todoItems = await ToDo.find(query)
        let todoList = []
        for (let i of todoItems) {
            const { _id: id, item, status, createdBy, createdAt, updatedAt } = i
            todoList.push({ id, item, status, createdBy, createdAt, updatedAt })
        }
        return res.status(200).send({ data: todoList })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const getToDoItemById = async (req, res) => {
    try {
        if (!req.userId) return res.status(401).send({ message: 'Unauthenticated' })
        const id = req.params.id
        let query = { _id: id }
        if (!isEmpty(req.query)) {
            const status = req.query.status.split(',')
            query = { ...query, status: { $in: status } }
        }
        const todoItems = await ToDo.find(query)
        return res.status(200).send({ data: todoItems })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const addToDoItem = async (req, res) => {
    try {
        if (!req.userId) return res.status(401).send({ message: 'Unauthenticated' })
        if (!req.body) return res.status(400).send({ message: 'Bad Request.' })
        const id = req.userId
        const { item, status } = req.body
        const todoRequest = new ToDo({ item: item, status: status, createdBy: id })
        const todo = await todoRequest.save()
        return res.status(200).send({ data: todo })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const updateToDoItem = async (req, res) => {
    try {
        if (!req.userId) return res.status(401).send({ message: 'Unauthenticated' })
        if (!req.body) return res.status(400).send({ message: 'Bad Request.' })
        const todoId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(todoId)) return res.status(404).send({ message: 'Item not found' })
        const { item, status } = req.body
        const todo = await ToDo.findById(todoId)
        if (todo.createdBy.toString() !== req.userId) return res.status(401).send({ message: 'Unauthorized' })
        const updatedToDo = await ToDo.findByIdAndUpdate(todoId, { item: item, status: status }, { new: true })
        return res.status(200).send({ data: updatedToDo })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const deleteToDoItem = async (req, res) => {
    try {
        if (!req.userId) return res.status(401).send({ message: 'Unauthenticated' })
        const todoId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(todoId)) return res.status(404).send({ message: 'Item not found' })
        const deletedToDo = await ToDo.findByIdAndDelete(todoId)
        return res.status(200).send({ data: deletedToDo })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const isEmpty = (obj) => {
    return Object.keys(obj).length === 0
}

module.exports = { getAllToDoItems, getToDoItem: getToDoItemById, addToDoItem, updateToDoItem, deleteToDoItem }  