const express = require('express');
const connectDB = require('./config/db');
const { PORT } = require('./config/config');
const authRoutes = require('./routes/auth.route');
const postRoutes = require('./routes/post.route');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);


connectDB();
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
