const express = require('express');
const { connectToMongoDB, client, ObjectId } = require('./mongoDb'); // Adicione ObjectId
const cors = require('cors');

const app = express();

// Adicione o middleware cors antes de definir as rotas
app.use(cors());
app.use(express.json()); // Adicione para facilitar o parsing do corpo JSON

// Certifique-se de que a conexão com o MongoDB seja estabelecida antes de prosseguir
async function startServer() {
  try {
    await connectToMongoDB();

    // Defina suas rotas após a conexão ser estabelecida

    // Rota para obter todos os usuários
    app.get('/users', async (req, res) => {
      const db = client.db('users');
      const collection = db.collection('ontimes');

      try {
        const result = await collection.find({}).toArray();
        res.json(result);
      } catch (err) {
        console.error('Erro na consulta ao MongoDB:', err);
        res.status(500).send('Erro na consulta ao MongoDB');
      }
    });

    // Rota para criar um novo usuário
    app.post('/criarUsers', async (req, res) => {
      const db = client.db('users');
      const collection = db.collection('ontimes');

      try {
        // Verifica se o corpo da solicitação contém os dados esperados
        const { name, cargo, areaInteresse } = req.body;

        if (!name || !cargo || !areaInteresse) {
          // Se algum dos campos estiver ausente, retorna um erro 400 - Bad Request
          return res.status(400).json({ result: 0, error: 'Todos os campos são obrigatórios.' });
        }

        const newUser = { name, cargo, areaInteresse };
        const result = await collection.insertOne(newUser);

        if (result.acknowledged && result.insertedId) {
          // Retorna o resultado com status 201 - Created
          res.status(201).json({ result: 1 });
        } else {
          // Se acknowledged ou insertedId não existirem, retorna um erro 500 - Internal Server Error
          res.status(500).json({ result: 0, error: 'Erro interno ao criar novo usuário. Operação de inserção falhou.' });
        }
      } catch (err) {
        console.error('Erro ao criar novo usuário:', err);

        // Retorna um erro 500 - Internal Server Error com uma mensagem mais detalhada
        res.status(500).json({ result: 0, error: 'Erro interno ao criar novo usuário.', details: err.message });
      }
    });

    // Rota para atualizar um usuário por ID
    app.put('/atualizarUsers/:id', async (req, res) => {
      const db = client.db('users');
      const collection = db.collection('ontimes');
      const userId = req.params.id;
      const updatedUser = req.body;
    
      try {
    
        const result = await collection.findOneAndUpdate(
          { _id: new ObjectId(userId) }, // Adicione 'new' aqui
          { $set: updatedUser },
          { returnDocument: 'after' }
        );
    
        if (result !== null && result.value !== null) {
          res.json({ result: 1 });
        } else {
          console.log('Usuário não encontrado para atualização.');
          res.status(404).json({ result: 0, error: 'Usuário não encontrado.' });
        }
      } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).json({ result: 0, error: 'Erro ao atualizar usuário' });
      }
    });

    // Rota para excluir um usuário por ID
    app.delete('/excluirUsers/:id', async (req, res) => {
      const db = client.db('users');
      const collection = db.collection('ontimes');
      const userId = req.params.id;

      try {
        const result = await collection.findOneAndDelete({ _id: new ObjectId(userId) });

        if (result !== null && result.value !== null) {
          // Retorna o resultado com status 200 - OK
          res.json({ result: 1 });
        } else {
          // Se o valor não existir, retorna um erro 404 - Not Found
          res.status(404).json({ result: 0, error: 'Usuário não encontrado.' });
        }
      } catch (err) {
        console.error('Erro ao excluir usuário:', err);
        res.status(500).json({ result: 0, error: 'Erro ao excluir usuário' });
      }
    });

    // Inicie o servidor após definir as rotas
    app.listen(3001, () => {
      console.log('Servidor Node.js em execução na porta 3001');
    });
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}

startServer();
