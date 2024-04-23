const router = require('express').Router()

const { getCollection, ObjectId } = require('./todo-db')


router.get('/', async (_, response) => {
    const collection = await getCollection('todo-api', 'todos')
    const todos = await collection.find().toArray()
    response.json(todos);
})

router.post('/', async (request, response) => {
    const { item } = request.body
    const collection = await getCollection('todo-api', 'todos')
    const id = await collection.countDocuments() + 1
    const complete = false
    const result = await collection.insertOne({id, item, complete })
    response.json(item)
})

router.put('/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getCollection('todo-api', 'todos')
    const todo = await collection.findOne({ id: parseInt(id) })
    const complete = !todo.complete
    const result = await collection.updateOne({ id: parseInt(id) }, { $set: { complete } })
    response.json({ id, complete })
})

module.exports = router