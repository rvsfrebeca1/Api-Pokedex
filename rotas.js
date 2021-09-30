const express = require('express')
const pokemons = require('./controladores/pokemons')
const usuarios = require('./controladores/usuarios')

const rotas = express()

//usuarios
rotas.post('/usuarios/cadastro', usuarios.cadastrarUsuario)
rotas.post('/usuarios/login', usuarios.logarUsuario)


//pokemons
rotas.post('/pokemons/cadastro', pokemons.cadastrarPokemon)
rotas.patch('/pokemons/edicao/:id', pokemons.atualizarPokemon)
rotas.get('/pokemons/listagem', pokemons.listarPokemons)
rotas.get('/pokemons/obter/:id', pokemons.obterPokemon)
rotas.delete('/pokemons/exclusao/:id', pokemons.deletarPokemon)


module.exports = rotas