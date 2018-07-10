const express = require('express');
const app = express();
const open = require("open");

const router = express.Router();
router.get('/', function (req, res, next) {
  req.url = './index.html';
  next();
});
app.use(router);

app.use(express.static('./dist'));
const server = app.listen(3000, () => {
  console.log('success on localhost:3000');
  open('http://localhost:3000');
})