const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const username = 'hestercruz';
const password = 'eanjdepP3snCSJcI'; // Substitua pela sua senha
const dbName = 'users'; // Substitua pelo nome do seu banco de dados

const url = `mongodb+srv://${username}:${password}@cluster0.ehhmsiv.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(url);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
  }
}

// Definir o schema para a coleção "ontimes"
const ontimesSchema = new mongoose.Schema({
  nome: String,
  cargo: String,
  areaInteresse: String,
});

// Criar um modelo com base no schema
const Ontime = mongoose.model('Ontime', ontimesSchema);

module.exports = { connectToMongoDB, client, ObjectId, Ontime };