//models/Curtida.js
import mongoose from 'mongoose';

const CurtidaSchema = new mongoose.Schema({
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
  data: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Curtida || mongoose.model('Curtida', CurtidaSchema); 