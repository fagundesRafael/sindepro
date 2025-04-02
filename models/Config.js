//models/Config.js
import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
  // Grupo 1
  L1: String,
  L2: String,
  L3: String,
  L4: String,
  L5: String,
  L6: String,
  L7: String,
  L8: String,
  
  // Grupo 2
  S1: String,
  S2: String,
  S3: String,
  C1: String,
  C2: String,
  C3: String,
  C4: String,
  
  // Grupo 3
  D1: String,
  D2: String,
  D3: String,
  D4: String,
  
  // Grupo 4
  E1: String,
  E2: String
}, {
  timestamps: true
});

const Config = mongoose.models.Config || mongoose.model('Config', configSchema);

export default Config; 