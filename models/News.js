//models/News.js
import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
    enum: ['Política', 'Jurídica', 'Eventos', 'Conquistas', 'Capacitação', 'Convênios'],
  },
  data: {
    type: Date,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  imagem: {
    type: String,
    default: '/general/no-image.jpg',
  },
}, {
  timestamps: true
});

const News = mongoose.models.News || mongoose.model('News', newsSchema);
export default News; 