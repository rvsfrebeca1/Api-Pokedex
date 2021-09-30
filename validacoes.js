const pool = require('./conexao')
const campoObrigatorio = async (campo, nome_do_campo, res) => {
  if (!campo) return res.json(`O campo ${nome_do_campo} é obrigatório`)
}


const campoUnico = async (tabela, campo, nome_do_campo, res) => {
  try {
    const query = `SELECT * FROM ${tabela} WHERE ${nome_do_campo} = $1`

    const { rowCount } = await pool.query(query, [campo])

    if (rowCount !== 0) return res.json(`Ja existe um usuário com esse ${nome_do_campo}`)

  } catch (error) {
    return res.json(error.message)
  }
}


const itemInexistente = async (tabela, id, res) => {
  try {
    const query = `SELECT * FROM ${tabela} WHERE id = $1`
    const { rowsCount } = pool.query(query, id)

    if (rowsCount === 0) return res.json("Item inexistente")
  } catch (error) {
    return res.json(error.message)
  }
}
module.exports = {
  campoObrigatorio,
  campoUnico,
  itemInexistente
}