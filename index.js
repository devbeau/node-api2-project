const express = require('express');
const postsRouter = require('./posts/postsRouter.js');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);

const PORT = 5001;
server.listen(PORT, () => {
    console.log(`\n Server is running...`);
});