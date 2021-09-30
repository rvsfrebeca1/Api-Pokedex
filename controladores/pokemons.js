const pool = require('../conexao')
const validacao = require('../validacoes')
const jwt = require('jsonwebtoken')
const chave = require('./jwt-secure')

const cadastrarPokemon = async (req, res) => {
  const { nome, habilidades, imagem, apelido, token } = req.body
  await validacao.campoObrigatorio(token, "token", res)
  await validacao.campoObrigatorio(nome, "nome", res)
  await validacao.campoObrigatorio(habilidades, "habilidades", res)


  try {
    const usuario = jwt.verify(token, chave.toString())
    await validacao.itemInexistente("usuarios", usuario.id, res)

    const query = 'INSERT INTO pokemons (usuario_id, nome, apelido, habilidades, imagem) VALUES ($1, $2, $3, $4, $5)'

    await pool.query(query, [usuario.id, nome, apelido, habilidades, imagem])

    return res.json("Pokemon cadastrado com sucesso")

  } catch (error) {
    return res.json("Token inválido ou usuário não logado")
  }

}