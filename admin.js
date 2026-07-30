
// ======================================================
// VARIÁVEIS
// ======================================================


let convidados = [];

let filtroAtual = "todos";

let ultimaQuantidade = 0;





// ======================================================
// PARTÍCULAS DOURADAS
// ======================================================


const particles =
document.getElementById("particles");



if(particles){


for(let i = 0; i < 90; i++){


const p =
document.createElement("div");


p.className="particle";


const tamanho =
Math.random()*7+3;


p.style.width =
tamanho+"px";


p.style.height =
tamanho+"px";


p.style.left =
Math.random()*100+"%";


p.style.animationDuration =
(6 + Math.random()*12)+"s";


p.style.animationDelay =
Math.random()*8+"s";


particles.appendChild(p);


}


}









// ======================================================
// RELÓGIO
// ======================================================


function relogio(){


const hora =
document.getElementById("hora");


if(hora){


hora.innerHTML =
new Date()
.toLocaleTimeString("pt-BR");


}


}


setInterval(relogio,1000);

relogio();









// ======================================================
// CARREGAR CONVIDADOS
// ======================================================


async function carregarConvidados(){


try{


const resposta =
await fetch("/api/convidados");



convidados =
await resposta.json();



if(
ultimaQuantidade &&
convidados.length >
ultimaQuantidade
){

festa();


}



ultimaQuantidade =
convidados.length;



atualizarDashboard();


mostrarLista();



}

catch(erro){


console.log(
"Erro:",
erro
);


}



}








// ======================================================
// DASHBOARD
// ======================================================


function atualizarDashboard(){



const totalPessoas =

convidados.reduce(

(soma,c)=>

soma + Number(c.quantidade),

0

);





const confirmados =

convidados.filter(

c=>c.presenca==="sim"

).length;





const nao =

convidados.filter(

c=>c.presenca==="nao"

).length;





document.getElementById(
"totalConvidados"
).innerHTML =
totalPessoas;




document.getElementById(
"confirmados"
).innerHTML =
confirmados;




document.getElementById(
"naoConfirmados"
).innerHTML =
nao;




document.getElementById(
"convites"
).innerHTML =
convidados.length;



}









// ======================================================
// MOSTRAR LISTA
// ======================================================


function mostrarLista(){



const area =
document.getElementById(
"listaConvidados"
);



area.innerHTML="";



let lista =
[...convidados];





if(filtroAtual==="sim"){


lista =
lista.filter(

c=>c.presenca==="sim"

);


}



if(filtroAtual==="nao"){


lista =
lista.filter(

c=>c.presenca==="nao"

);


}






lista.forEach(c=>{



let acompanhantes =

"Sem acompanhantes";




if(
c.acompanhantes &&
c.acompanhantes.length
){


acompanhantes =

c.acompanhantes
.map(nome=>

`

<p>
<i class="fa-solid fa-user"></i>
${nome}
</p>

`

)
.join("");



}





area.innerHTML += `



<div class="convidado">


<h3>

${c.nome}

</h3>



<p>

<i class="fa-solid fa-users"></i>

Quantidade:

${c.quantidade}

</p>





<h4>

Acompanhantes

</h4>


<div>

${acompanhantes}

</div>





<div class="status ${c.presenca}">


${

c.presenca==="sim"

?

"✓ Confirmado"

:

"✕ Não irá"

}


</div>



</div>



`;



});



}









// ======================================================
// FILTROS
// ======================================================


document
.querySelectorAll(".filtros button")
.forEach(botao=>{


botao.addEventListener(
"click",

()=>{



document
.querySelectorAll(".filtros button")
.forEach(b=>{

b.classList.remove("ativo");

});




botao.classList.add("ativo");



filtroAtual =
botao.dataset.filtro;




mostrarLista();



}


);



});









// ======================================================
// PESQUISA
// ======================================================


const pesquisar =
document.getElementById(
"pesquisar"
);



if(pesquisar){



pesquisar.addEventListener(
"input",

()=>{



const texto =

pesquisar.value
.toLowerCase();



const area =
document.getElementById(
"listaConvidados"
);



area.innerHTML="";




convidados

.filter(c=>

c.nome
.toLowerCase()
.includes(texto)

)

.forEach(c=>{


area.innerHTML += `


<div class="convidado">


<h3>

${c.nome}

</h3>


<p>

Quantidade:
${c.quantidade}

</p>



<div class="status ${c.presenca}">

${c.presenca==="sim"
?
"✓ Confirmado"
:
"✕ Não irá"}

</div>


</div>


`;


});




}


);



}









// ======================================================
// FESTA
// ======================================================


function festa(){



const notificacao =
document.getElementById(
"notificacao"
);



if(notificacao){


notificacao.style.display =
"block";


setTimeout(()=>{


notificacao.style.display =
"none";


},5000);



}





if(typeof confetti==="function"){



confetti({

particleCount:300,

spread:180,

origin:{
y:.5
}


});




setTimeout(()=>{


confetti({

particleCount:200,

angle:60,

spread:100,

origin:{
x:0
}


});



confetti({

particleCount:200,

angle:120,

spread:100,

origin:{
x:1
}


});



},700);



}





criarCoracoes();



}









// ======================================================
// CORAÇÕES
// ======================================================


function criarCoracoes(){



for(let i=0;i<60;i++){



const coracao =
document.createElement("div");



coracao.className =
"coracao";


coracao.innerHTML =
"❤";



coracao.style.left =

Math.random()*100+"vw";



coracao.style.animationDuration =

(3+
Math.random()*5)

+"s";



document.body.appendChild(
coracao
);





setTimeout(()=>{


coracao.remove();


},8000);



}



}









// ======================================================
// EXPORTAR CSV
// ======================================================


const exportar =
document.getElementById(
"exportar"
);



if(exportar){



exportar.onclick = ()=>{



let csv =

"Nome,Quantidade,Presença,Acompanhantes\n";




convidados.forEach(c=>{



csv +=

`${c.nome},${c.quantidade},${c.presenca},${

c.acompanhantes
?
c.acompanhantes.join(" / ")
:
""

}\n`;



});





const arquivo =
new Blob(
[csv],
{
type:"text/csv"
}
);




const link =
document.createElement("a");



link.href =
URL.createObjectURL(arquivo);



link.download =
"convidados-casamento.csv";



link.click();



};



}









// ======================================================
// INICIAR
// ======================================================


carregarConvidados();


setInterval(

carregarConvidados,

5000

);



console.log(
"💍 Painel Ryan & Diane carregado"
);

