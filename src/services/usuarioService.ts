import User from "../models/usuario";

const users: User[] = [];

function criarUsuario(nome: string, username: string): User {
  const newUser: User = {  nome, username, tecnologias: [] };
  users.push(newUser);
  return newUser;
}

function acharUsuarioPorNome(username: string): User | undefined {
  return users.find((user) => user.username === username);
}

export { criarUsuario, acharUsuarioPorNome };
