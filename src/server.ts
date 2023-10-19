const app = require("./index.ts")

const porta = process.env.API_PORT

appts.listen(porta, () => {console.log(`aplicativo rodando na porta ${porta}`)})