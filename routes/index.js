const express = require('express');
const router = express.Router();
const multer = require('multer');

const uploadDestination = 'uploads'

// Show where we save files
const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, collback) {
    collback(null, file.originalname)
  }
})

const uploads = multer({ storage: storage })

router.get('/', (req, res) => {
  res.send('home page')
})

router.get('/register', (req, res) => {
  res.send('register')
})

module.exports = router;
