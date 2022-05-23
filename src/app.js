import { openDb } from './configDB.js';
import { createTable, insertPessoa, updatePessoa, selectPessoas, selectPessoa, deletePessoa} from './Controler/pessoa.js'


import express from 'express';
const app = express();
app.use(express.json())
//const adminRouter = require("../router")
//app.use('/admin',adminRouter)

createTable();

openDb();

// o '/' faz ir para a raiz, 
app.get('/' , function(req, res){
    // res significa response, ele mostra na tela o que esta dentro do metodo send()
    res.send("Hello world");
})
// pega todos os posts da lista que existe
app.get('/pessoas' ,async function(req, res){
    let pessoas = await selectPessoas();
    res.json(pessoas);

})
//apenas um item da lista
app.get('/pessoa' ,async function(req, res){
    let pessoa = await selectPessoa(req.body.id);
    res.json(pessoa);

})

// se eu escrever alguma coisa no postman com o metodo post, com o '/pessoa' no final do localhost, ele 
app.post('/pessoa', function(req, res){
    insertPessoa(req.body)
    res.json({
        "statucCode" : 200
    })
});

app.put('/pessoa', function(req, res){
    if(req.body && !req.body.id){
        res.json({
            "statusCode" : 400,
            "msg": "Voce precisa informar um id"
        })
    } else{
        updatePessoa(req.body)
        res.json({
            "statusCode" : 200
        }) 
    }

});

app.delete('/pessoa' ,async function(req, res){
    let pessoa = await deletePessoa(req.body.id);
    res.json(pessoa);

})

//depois que a porta for aberta, vai escrever no console o que esta no metodo log
//o nodemon ajuda a nao ter que abrir a porta toda vez
app.listen(3000, () => console.log("Api rodando"))