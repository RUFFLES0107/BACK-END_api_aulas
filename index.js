/* 
Instale as bibliotecas e o cliente de API:
npm init
npm i express
Procure pela extensão RapidAPI Client no VSCode.
*/
// Para executar a API no terminal: node index.js
// Link para testar a API: http://localhost:3000/rota
const express = require("express")
const app = express()
const port = 3000
app.use(express.json()) // configura API para usar JSON.
const fs = require('fs') // importa leitura e escrita de arquivos.

// Cadastrar aula (ID automático usando id.json)
app.post("/aulas", (req, res) => {
    try {
        // Lê o último ID
        const idData = JSON.parse(fs.readFileSync("id.json", "utf8"))
        const novoId = idData.ultimoId + 1

        // Atualiza o contador de ID
        idData.ultimoId = novoId
        fs.writeFileSync("id.json", JSON.stringify(idData, null, 2), "utf8")

        // Lê as aulas
        const bd = JSON.parse(fs.readFileSync("aulas.json", "utf8"))

        const aula = {
            id: novoId,
            ...req.body
        }

app.get("/aulas", (req, res) => {
    try{
    // abrir arquivo 
    const bd = JSON.parse(fs.readFileSync("aulas.json","utf8"))
      res.status(200).json({resposta: bd})
    }catch{
        res.status(500).json({erro: erro.message})
    }
})

app.delete("/aulas/:id", (req, res) => {
    // pegar o id da rota
    const id = req.params.id
    try {
        // abrir o banco de dados
        const bd = JSON.parse(fs.readFileSync("aulas.json", "utf8"))
        // encontrar o índice do cliente a ser excluido
        const indiceID = bd.findIndex((aula) => aula.id == id)
        // remover o indice da lista
        if (indiceID == -1) {
            return res.status(404).json({erro: "A aula não existe"})
        }
        bd.splice(indiceID, 1)
        // atualizar o arquivo
        fs.writeFileSync("aulas.json", JSON.stringify(bd), "utf8")
        // dar uma resposta para o cliente
        res.status(200).json({resposta: "Aula removida com sucesso!"})
    } catch (error){
        res.status(500).json({erro: erro.message})
    }
})






// Execução da API:
app.listen(port, ()=>{
    console.log("API rodando na porta " + port)
})