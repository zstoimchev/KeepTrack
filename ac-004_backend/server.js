import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './DB/queries.js';
import users from './routes/users.js';
import tasks from './routes/tasks.js';

import config from './config.js'
import userRoute from './routes/userRoute.js';
import taskRoute from './routes/taskRoute.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(
    cors({
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        credentials: true,
        origin: ['http://localhost:5173'],
    })
);

// Use your routers
app.use('/users', userRoute);
app.use('/tasks', taskRoute);

// Serve static files
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Uncomment the lines below if you need static file serving
// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
