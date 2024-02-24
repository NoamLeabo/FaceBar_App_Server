import express from 'express'
import bodyParser from 'body-parser'
import postsRouter from './routes/posts.js'
import usersRouter from './routes/users.js'


const server = express();
server.use(express.static('public'))
server.use(bodyParser());
server.set('view engine', 'ejs')

server.use('/api/posts', postsRouter)
server.use('/api/users', usersRouter)


server.listen(8080);