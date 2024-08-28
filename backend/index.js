import mongoose from 'mongoose';
import express, { json } from 'express';
import { Todo } from './models/todoModal.js';
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors());

const mongoDBURL = 'mongodb+srv://emanikishore:mani1729@cluster0.syvdd39.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.post('/todos', async (request, response) => {
    try {
        const newTodo = {
            text: request.body.text
        }

        const todo = await Todo.create(newTodo);
        return response.status(201).json(todo); 
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ error: error.message });
    }
})

app.get('/todos', async (request, response) => {
    try {
        const todos = await Todo.find({});
        return response.status(200).json(todos);
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ error: error.message });
    }
})

app.delete('/todos/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Todo.findByIdAndDelete(id);
        return response.status(200).send("Todo deleted successfully");
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ error: error.message });
    }
})

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(6000, () => {
            console.log("Everything is fine");
        });
    })
    .catch((error) => {
        console.log("Error is:", error.message);
    });
