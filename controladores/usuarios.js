const securePassword = require('secure-password')
const jwt = require('jsonwebtoken')
const chave = require('./jwt-secure')
const pwd = securePassword()
const pool = require('../conexao')
const validacao = require('../validacoes')


const criarToken = async (rows) => {
  const resultado = await jwt.sign({
    id: rows[0].id,
    nome: rows[0].nome,
    email: rows[0].email
  }, chave.toString())
  return resultado
}


const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body
  await validacao.campoObrigatorio(nome, "nome", res)
  await validacao.campoObrigatorio(email, "email", res)
  await validacao.campoObrigatorio(senha, "senha", res)
  await validacao.campoUnico("usuarios", email, "email", res)


  const sennhaCript = Buffer.from(senha)
  const hash = (await pwd.hash(sennhaCript)).toString("hex")

  try {
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)'
    await pool.query(query, [nome, email, hash])
    return res.json("Usuário cadastrado com sucesso")
  } catch (error) {
    return res.json(error.message)
  }
}