const express = require('express');
const router = express.Router();

const { createCraft, getCraft, getCrafts } = require('../controllers/craftController');

router.post('/', createCraft);
router.get('/:id', getCraft).get('/', getCrafts);

module.exports = router;