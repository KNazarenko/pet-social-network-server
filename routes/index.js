const express = require('express');
const router = express.Router();
const multer = require('multer');
const { UserController } = require('../controllers');

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

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/current', UserController.current)
router.get('/users/:id', UserController.login)
router.put('/users/:id', UserController.updateUser)

module.exports = router;
