//models/Comentario.js
import mongoose from 'mongoose';

const ComentarioSchema = new mongoose.Schema({
  noticia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'News',
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  texto: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Comentario || mongoose.model('Comentario', ComentarioSchema); 