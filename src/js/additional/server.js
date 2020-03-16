require('dotenv').config()

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json()) // lets our application actually use JSON

const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        title: 'Post 2'
    }
]

app.get('/posts', (req, res) => {

    res.json(posts)

})



app.post('/login', (req, res) => {

    //Authenticate User
    const username = req.body.username;
    const user = {
        name : username
    }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken})

})

function authentica

app.listen(3000);