const express = require('express');
const router = express.Router();
const {
    createMataPelajaran,
    getMataPelajaranById
} = require('../../controllers/Mata-Pelajaran/mataPelajaran.controllers');

/* CREATE MataPelajaran */
router.post('/', createMataPelajaran);

/* GET MataPelajaran by ID */
router.get('/:id', getMataPelajaranById);

module.exports = router;
