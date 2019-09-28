import express from 'express';

const app = express();

const {PORT} = process.env;
const port = PORT || 4600;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
