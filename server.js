const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

let todos = [];

app.get('/api/todos',(req,res) =>{
    res.json(todos)
});

app.post('/api/todos',(req,res)=>{
    const todo =  { id: Date.now(), text: req.body.text, completed: false };
    todos.push(todo)
    res.status(201).json(todo);
});

app.put('/api/todos/:id',(req,res) =>{
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = req.body.completed;
      res.json(todo);
    } else {
      res.status(404).send();
    }
});

app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).send();
  });

mongoose.connect('mongodb://localhost:27017/dbconnect')
.then(() =>{
    app.listen(process.env.PORT || 5000, ()=>{
        console.log('listening on 5000')
    });
    console.log('connected to mongoDB')
}).catch((error) =>{
    console.log(error)
})








