import sql from 'mssql';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const dbConfig = {
  user: 'IN\jonatas.pessoa',
  server: 'localhost',
  database: 'dbpessoa_exemplo',
  options: {
    encrypt: true, // para conexões criptografadas
    trustServerCertificate: true // desativa a verificação do certificado SSL
  }
}

sql.connect(dbConfig)
  .then(() => console.log('Conexão bem sucedida!'))
  .catch(err => console.error(err))

async function openDb () {
  const pool = await sql.connect(dbConfig)
  return pool
}

export async function createTable(){
  const db = await openDb()
  await db.request().query(`
    CREATE TABLE IF NOT EXISTS Pessoa (
      id INT PRIMARY KEY IDENTITY,
      nome NVARCHAR(50),
      cpf NVARCHAR(14),
      data_nascimento DATETIME,
      matricula NVARCHAR(20),
      email NVARCHAR(100),
      id_unidade INT
    )
  `)
}

export async function selectPessoas(req, res){
  const db = await openDb()
  const result = await db.request().query('SELECT * FROM Pessoa')
  res.json(result.recordset)
}

export async function selectPessoa(req, res){
  const db = await openDb()
  const id = req.body.id
  const result = await db.request().input('id', id).query('SELECT * FROM Pessoa WHERE id = @id')
  res.json(result.recordset[0])
}

export async function insertPessoa(req , res){
  const db = await openDb()
  const pessoa = req.body
  const result = await db.request().input('nome', pessoa.nome)
    .input('cpf', pessoa.cpf)
    .input('data_nascimento', pessoa.data_nascimento)
    .input('matricula', pessoa.matricula)
    .input('email', pessoa.email)
    .input('id_unidade', pessoa.id_unidade)
    .query('INSERT INTO Pessoa (nome, cpf, data_nascimento, matricula, email, id_unidade) VALUES (@nome, @cpf, @data_nascimento, @matricula, @email, @id_unidade)')
  res.json({
    "statusCode": 200
  })
}

export async function updatePessoa(req, res) {
  const db = await openDb()
  const pessoa = req.body
  const result = await db.request().input('id', pessoa.id)
    .input('nome', pessoa.nome)
    .input('cpf', pessoa.cpf)
    .input('data_nascimento', pessoa.data_nascimento)
    .input('matricula', pessoa.matricula)
    .input('email', pessoa.email)
    .input('id_unidade', pessoa.id_unidade)
    .query('UPDATE Pessoa SET nome=@nome, cpf=@cpf, data_nascimento=@data_nascimento, matricula=@matricula, email=@email, id_unidade=@id_unidade WHERE id=@id')
  console.log(`Pessoa ${pessoa.id} atualizada com sucesso!`);
  res.json({
    "statusCode": 200
  })
}

export async function deletePessoa(req, res){
  const db = await openDb()
  const id = req.body.id
  await db.request().input('id', id).query('DELETE FROM Pessoa WHERE id = @id')
  res.json({
    "statusCode": 200
  })
}


