const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: '108.167.188.73',
  user: 'apella22_admin',
  password: '32366308',
  database: 'apella22_ontime'
};

// Conectar ao banco de dados MySQL
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    throw err;
  }
  console.log('Conexão bem-sucedida ao MySQL');
});

app.get('/registros', (req, res) => {
  const query = 'SELECT codigo_registro, name, area_interesse, cargo, data_hora FROM registro';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erro na consulta ao MySQL:', error);
      res.status(500).send('Erro na consulta ao MySQL');
    } else {
      res.json(results);
    }
  });
});

app.post('/registrar', (req, res) => {
  const { name, cargo, area_interesse } = req.body;
  const data_hora = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = 'INSERT INTO registro (name, cargo, area_interesse, data_hora) VALUES (?, ?, ?, ?)';
  const values = [name, cargo, area_interesse, data_hora];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erro ao inserir novo registro no MySQL:', error);
      res.status(500).json({ result: 0, error: 'Erro ao inserir novo registro.' });
    } else {
      res.status(201).json({ result: 1 });
    }
  });
});

app.put('/editar/:id', (req, res) => {
  const id = req.params.id;
  const { name, cargo, area_interesse } = req.body;
  const data_hora = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = 'UPDATE registro SET name = ?, cargo = ?, area_interesse = ?, data_hora = ? WHERE codigo_registro = ?';
  const values = [name, cargo, area_interesse, data_hora, id];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erro ao atualizar registro no MySQL:', error);
      res.status(500).json({ result: 0, error: 'Erro ao atualizar registro.' });
    } else {
      if (results.affectedRows > 0) {
        res.json({ result: 1 });
      } else {
        res.status(404).json({ result: 0, error: 'Registro não encontrado.' });
      }
    }
  });
});

app.delete('/excluir/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM registro WHERE codigo_registro = ?';
  
  connection.query(query, id, (error, results) => {
    if (error) {
      console.error('Erro ao excluir registro no MySQL:', error);
      res.status(500).json({ result: 0, error: 'Erro ao excluir registro.' });
    } else {
      if (results.affectedRows > 0) {
        res.json({ result: 1 });
      } else {
        res.status(404).json({ result: 0, error: 'Registro não encontrado.' });
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor Node.js em execução na porta ${PORT}`);
});
