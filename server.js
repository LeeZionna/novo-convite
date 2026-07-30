const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;



// ======================================================
// CONFIGURAÇÕES
// ======================================================


app.use(express.json());

app.use(express.static(__dirname));



const DB =
path.join(
__dirname,
"convidados.json"
);





// ======================================================
// BANCO
// ======================================================


function criarBanco(){


if(!fs.existsSync(DB)){


fs.writeFileSync(

DB,

JSON.stringify([],null,2)

);


}


}



criarBanco();







function lerConvidados(){


const dados =

fs.readFileSync(

DB,

"utf8"

);



return JSON.parse(dados);



}







function salvarConvidados(dados){


fs.writeFileSync(

DB,

JSON.stringify(
dados,
null,
2
)

);



}









// ======================================================
// SITE
// ======================================================


app.get("/",(req,res)=>{


res.sendFile(

path.join(
__dirname,
"index.html"
)

);


});









// ======================================================
// CONFIRMAR PRESENÇA
// ======================================================


app.post("/confirmar",(req,res)=>{


try{


const {

nome,

quantidade,

presenca,

acompanhantes

}=req.body;






if(
!nome ||
!quantidade ||
!presenca
){


return res.status(400).json({

erro:
"Dados incompletos"

});


}






const convidados =
lerConvidados();





convidados.push({



id:
Date.now(),



nome:
nome.trim(),



quantidade:
Number(quantidade),



presenca,



acompanhantes:
acompanhantes || [],



data:
new Date()
.toLocaleString("pt-BR")



});







salvarConvidados(
convidados
);







res.json({

sucesso:true

});



}



catch(error){



console.log(error);



res.status(500).json({

erro:
"Erro interno"

});



}



});









// ======================================================
// ADMIN
// ======================================================


app.get("/admin",(req,res)=>{


res.sendFile(

path.join(
__dirname,
"admin.html"
)

);


});









// ======================================================
// API LISTA
// ======================================================


app.get(
"/api/convidados",
(req,res)=>{


try{


res.json(
lerConvidados()
);


}

catch(error){


res.status(500).json({

erro:
"Erro ao carregar"

});


}



});









// ======================================================
// EDITAR CONVIDADO
// ======================================================


app.put(
"/api/convidados/:id",
(req,res)=>{


try{


const id =
Number(req.params.id);



let convidados =
lerConvidados();





const index =

convidados.findIndex(

c=>c.id===id

);





if(index===-1){


return res.status(404).json({

erro:
"Convidado não encontrado"

});


}







convidados[index]={


...convidados[index],



nome:
req.body.nome || convidados[index].nome,



quantidade:

Number(
req.body.quantidade
)

|| convidados[index].quantidade,



presenca:

req.body.presenca

|| convidados[index].presenca,



acompanhantes:

req.body.acompanhantes

|| convidados[index].acompanhantes



};







salvarConvidados(
convidados
);







res.json({

sucesso:true

});



}

catch(error){


res.status(500).json({

erro:
"Erro ao editar"

});


}



});











// ======================================================
// EXCLUIR CONVIDADO
// ======================================================


app.delete(
"/api/convidados/:id",
(req,res)=>{


try{


const id =
Number(req.params.id);



let convidados =
lerConvidados();





convidados =

convidados.filter(

c=>c.id!==id

);





salvarConvidados(
convidados
);





res.json({

sucesso:true

});




}

catch(error){



res.status(500).json({

erro:
"Erro ao excluir"

});



}



});











// ======================================================
// ERRO 404
// ======================================================

app.use((req,res)=>{

    res.status(404).send(
        "Página não encontrada"
    );

});




// ======================================================
// SERVIDOR
// ======================================================

app.listen(PORT,()=>{


    console.log(`

=================================
💍 Ryan & Diane

Servidor online:
http://localhost:${PORT}

Painel:
http://localhost:${PORT}/admin

=================================

    `);


});