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


const cors=require("cors")
app.use(cors())

const arquivoID = JSON.parse(fs.readFileSync("id.json", "utf8"))
let id = arquivoID.id

function atualizarID() { 
    id = id + 1
    fs.writeFileSync("id.json", JSON.stringify({id: id}), "utf8")
}

// CADASTRO
app.post("/aulas", (req, res) => {
  try {
    const aula = req.body
    const aulas = JSON.parse(fs.readFileSync("aulas.json", "utf8"))

    atualizarID()
    aula.Id = id   

    aulas.push(aula)
    fs.writeFileSync("aulas.json", JSON.stringify(aulas, null, 2), "utf8")
    
    res.status(201).json({ mensagem: "aula cadastrada!", id: id })
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

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
  const id = req.params.id
  try {
    const bd = JSON.parse(fs.readFileSync("aulas.json", "utf8"))
    
    const indiceID = bd.findIndex((aula) => aula.Id == id)  
    
    if (indiceID === -1) {
      return res.status(404).json({ erro: "A aula não existe" })
    }
    
    bd.splice(indiceID, 1)
    fs.writeFileSync("aulas.json", JSON.stringify(bd, null, 2), "utf8")
    
    res.status(200).json({ resposta: "Aula removida com sucesso!" })
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

app.get("/aulas/:Dia",(req,res)=>{
    const Dia=req.params.Dia

    try{
        const aula = JSON.parse(fs.readFileSync("aulas.json","utf8"))
        const aula_dia = aula.filter((aula)=> aula.Dia.toLowerCase()===Dia.toLowerCase())
        const ordem = aula_dia.sort((a, b) => a.ordem - b.ordem)
        if(aula_dia.length===0){
            return res.status(400).json({resposta: aula_dia})
        }
    
        res.status(200).json({resposta:aula_dia})

    }catch(erro){
            res.status(500).json({erro:"Erro interno do servidor"})
        }
    })




// Execução da API:
app.listen(port, ()=>{
    console.log("API rodando na porta " + port)
})