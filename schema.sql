CREATE TABLE usuarios
(
  id serial PRIMARY KEY,
  nome varchar(60) NOT NULL,
  email varchar(60) NOT NULL UNIQUE,
  senha text NOT NULL
);



CREATE TABLE pokemons
(
  id serial PRIMARY KEY,
  usuario_id int REFERENCES usuarios (id) NOT NULL,
  nome varchar(60) NOT NULL,
  habilidades text NOT NULL,
  imagem text,
  apelido varchar
);

