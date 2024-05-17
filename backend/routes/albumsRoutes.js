const express = require('express');
const router = express.Router();
const {
    getAlbums,
    getAlbumById,
    getAlbumByName,
    createAlbum,
    updateAlbum,
    deleteAlbum
} = require('../controllers/albumsController');

router.get('/', getAlbums);
router.get('/:id', getAlbumById);
router.get('/nombre/:nombre', getAlbumByName);
router.post('/', createAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);

module.exports = router;