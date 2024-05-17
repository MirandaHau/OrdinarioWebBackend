const Comentario = require('../models/comentariosModel');
const Album = require('../models/albumsModel');
const Usuario = require('../models/usuariosModel');
const jwt = require('jsonwebtoken');

exports.getCommentsByAlbum = async (req, res) => {
    try {
        const comentarios = await Comentario.find({ album: req.params.albumId })
                                            .populate('usuario', 'username');
        if (comentarios.length === 0) {
            return res.status(404).json({ message: "No hay comentarios para este álbum" });
        }
        res.status(200).json(comentarios);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "ID de álbum no válido" });
        }
        res.status(500).json({ message: "Error al obtener comentarios: " + error.message });
    }
};

exports.createComment = async (req, res) => {
    try {
      const albumId = req.params.albumId;
      const { texto } = req.body;
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;
      const user = await Usuario.findById(userId);

      console.log(albumId)
  
      const newComentario = new Comentario({
        album: albumId,
        usuario: userId,
        username: user.username,
        texto
      });
  
      await newComentario.save();
      res.status(201).json(newComentario);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error' });
      }
  };

exports.deleteComment = async (req, res) => {
    const { comentarioId } = req.params;

    try {
        const comentario = await Comentario.findOneAndDelete({ _id: comentarioId });
        if (!comentario) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        res.status(200).json({ message: "Comentario eliminado" });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "ID de comentario no válido" });
        }
        res.status(500).json({ message: "Error al eliminar comentario: " + error.message });
    }
};