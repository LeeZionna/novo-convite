// ======================================================
// LOADER
// ======================================================


window.addEventListener("load",()=>{


    const loader = document.getElementById("loader");


    if(loader){


        setTimeout(()=>{


            loader.style.opacity="0";


            loader.style.pointerEvents="none";



            setTimeout(()=>{


                loader.style.display="none";


            },1000);



        },1500);


    }


});









// ======================================================
// MÚSICA
// ======================================================


const musica = document.getElementById("musica");

const musicButton = document.getElementById("musicButton");


let tocando = false;





if(musica && musicButton){



musicButton.addEventListener("click",()=>{



    if(!tocando){



        musica.play()

        .then(()=>{


            tocando=true;



            musicButton.innerHTML = 
            '<i class="fa-solid fa-volume-high"></i>';



        })

        .catch((erro)=>{


            console.log(
            "Erro ao tocar música:",
            erro
            );


        });




    }else{



        musica.pause();


        tocando=false;



        musicButton.innerHTML =

        '<i class="fa-solid fa-music"></i>';



    }



});



}









// ======================================================
// HEADER SCROLL
// ======================================================


const header = document.getElementById("header");





window.addEventListener("scroll",()=>{


    if(!header) return;




    if(window.scrollY > 50){



        header.classList.add(
        "scrolled"
        );



    }else{



        header.classList.remove(
        "scrolled"
        );



    }



});









// ======================================================
// CONTADOR CASAMENTO
// ======================================================


const dataCasamento = 
new Date(
"October 10, 2026 16:00:00"
).getTime();





function atualizarContador(){



    const agora =
    new Date().getTime();



    const distancia =
    dataCasamento - agora;





    const dias =
    document.getElementById("dias");

    const horas =
    document.getElementById("horas");

    const minutos =
    document.getElementById("minutos");

    const segundos =
    document.getElementById("segundos");






    if(
    !dias ||
    !horas ||
    !minutos ||
    !segundos
    ){

        return;

    }







    if(distancia <= 0){



        dias.innerHTML="000";

        horas.innerHTML="00";

        minutos.innerHTML="00";

        segundos.innerHTML="00";


        return;


    }







    const tempoDias =
    Math.floor(

        distancia /
        (1000*60*60*24)

    );






    const tempoHoras =
    Math.floor(

        (distancia %
        (1000*60*60*24))

        /

        (1000*60*60)

    );






    const tempoMinutos =
    Math.floor(

        (distancia %
        (1000*60*60))

        /

        (1000*60)

    );






    const tempoSegundos =
    Math.floor(

        distancia /
        1000

    )

    % 60;









    dias.innerHTML =
    String(tempoDias)
    .padStart(3,"0");



    horas.innerHTML =
    String(tempoHoras)
    .padStart(2,"0");



    minutos.innerHTML =
    String(tempoMinutos)
    .padStart(2,"0");



    segundos.innerHTML =
    String(tempoSegundos)
    .padStart(2,"0");



}





setInterval(
atualizarContador,
1000
);



atualizarContador();

// ======================================================
// ANIMAÇÕES AO APARECER
// ======================================================


const elementosAnimados = document.querySelectorAll(

    `
    .timeline-item,
    .gallery-item,
    .gift-card,
    .count-box,
    .manual-card,
    .versiculo-card,
    .frase-dia,
    .luxury-divider
    `

);




const observer = new IntersectionObserver((entradas)=>{


    entradas.forEach((entrada)=>{


        if(entrada.isIntersecting){


            entrada.target.classList.add("show");


        }


    });


},{

    threshold:0.15

});





elementosAnimados.forEach((elemento)=>{


    observer.observe(elemento);


});







// ======================================================
// RSVP
// ======================================================


const formRSVP = 
document.getElementById("formRSVP");





if(formRSVP){



formRSVP.addEventListener(
"submit",
async(e)=>{



    e.preventDefault();





    const nome =
    document.getElementById("nome").value;





    const quantidade =
    document.getElementById("quantidade").value;





    const presenca =
    document.querySelector(
    'input[name="presenca"]:checked'
    )?.value;





    const mensagem =
    document.getElementById(
    "mensagemRSVP"
    );








    const acompanhantes = [];



    document
    .querySelectorAll(
    "#nomesExtras input"
    )
    .forEach((input)=>{


        if(input.value.trim() !== ""){


            acompanhantes.push(
            input.value
            );


        }


    });










    try{





        const resposta =
        await fetch(
        "/confirmar",
        {



            method:"POST",



            headers:{



                "Content-Type":
                "application/json"



            },




            body:JSON.stringify({


                nome,


                quantidade,


                presenca,


                acompanhantes



            })



        });









        const dados =
        await resposta.json();








        if(dados.sucesso){





            mensagem.innerHTML =

            "✅ Presença confirmada com sucesso!";





            mensagem.classList.add(
            "ativo"
            );







            if(typeof confetti === "function"){



                confetti({


                    particleCount:180,


                    spread:90,


                    origin:{


                        y:0.6


                    }



                });



            }







            formRSVP.reset();





            document.getElementById(
            "nomesExtras"
            ).innerHTML="";







        }else{





            mensagem.innerHTML =

            "❌ Não foi possível confirmar.";





        }









    }catch(erro){





        console.log(
        erro
        );





        mensagem.innerHTML =

        "❌ Erro ao conectar com servidor.";





    }





});



}









// ======================================================
// CAMPOS DE ACOMPANHANTES
// ======================================================


const quantidadeInput =
document.getElementById(
"quantidade"
);




const nomesExtras =
document.getElementById(
"nomesExtras"
);







if(
quantidadeInput &&
nomesExtras
){






quantidadeInput.addEventListener(
"change",
()=>{



    nomesExtras.innerHTML="";





    const quantidade =
    Number(
    quantidadeInput.value
    );






    if(quantidade > 1){






        for(
        let i = 2;
        i <= quantidade;
        i++
        ){





            const campo =
            document.createElement(
            "div"
            );





            campo.className =
            "campo";







            campo.innerHTML = `

            <label>
            
            Nome do acompanhante ${i}

            </label>


            <input 

            type="text"

            placeholder="Digite o nome">

            `;







            nomesExtras.appendChild(
            campo
            );






        }






    }







});





}

// ======================================================
// MENU MOBILE
// ======================================================


const menuButton =
document.getElementById("menuButton");



const nav =
document.querySelector("nav");





if(menuButton && nav){



menuButton.addEventListener(
"click",
()=>{



    nav.classList.toggle(
    "ativo"
    );



});





nav.querySelectorAll("a")
.forEach((link)=>{



    link.addEventListener(
    "click",
    ()=>{



        nav.classList.remove(
        "ativo"
        );



    });



});



}









// ======================================================
// SCROLL SUAVE DOS LINKS
// ======================================================


document
.querySelectorAll(
'a[href^="#"]'
)
.forEach((link)=>{



link.addEventListener(
"click",
(e)=>{



    const destino =
    document.querySelector(
    link.getAttribute("href")
    );





    if(destino){



        e.preventDefault();




        destino.scrollIntoView({



            behavior:"smooth"



        });



    }



});



});









// ======================================================
// PAUSA AUTOMÁTICA DA MÚSICA AO SAIR
// ======================================================


document.addEventListener(
"visibilitychange",
()=>{



    if(document.hidden){



        if(musica && tocando){



            musica.pause();



        }



    }else{



        if(musica && tocando){



            musica.play()
            .catch(()=>{});



        }



    }



});









// ======================================================
// EFEITO DE ENTRADA DO HERO
// ======================================================


window.addEventListener(
"load",
()=>{



    const hero =
    document.querySelector(
    ".hero-content"
    );





    if(hero){



        hero.style.opacity="0";

        hero.style.transform=
        "translateY(30px)";




        setTimeout(()=>{



            hero.style.transition=
            "1s ease";



            hero.style.opacity="1";



            hero.style.transform=
            "translateY(0)";



        },1700);



    }



});









// ======================================================
// EVITAR ERROS DE IMAGEM
// ======================================================


document
.querySelectorAll("img")
.forEach((imagem)=>{



imagem.addEventListener(
"error",
()=>{



    imagem.style.opacity="0";



});



});









// ======================================================
// RESET DE ANIMAÇÕES AO REDIMENSIONAR
// ======================================================


window.addEventListener(
"resize",
()=>{



    if(window.innerWidth > 900 && nav){



        nav.classList.remove(
        "ativo"
        );



    }



});









// ======================================================
// FINALIZAÇÃO
// ======================================================


console.log(
"💍 Convite Ryan & Diane carregado com sucesso."
);

// ======================================================
// EFEITO EXTRA NOS ELEMENTOS DOURADOS
// ======================================================


const elementosDourados = document.querySelectorAll(
    
    ".luxury-divider, .gold-decoration, .manual-card i"

);



elementosDourados.forEach((elemento)=>{


    elemento.addEventListener("mouseenter",()=>{


        elemento.style.transform =
        "scale(1.15)";


    });



    elemento.addEventListener("mouseleave",()=>{


        elemento.style.transform =
        "scale(1)";


    });



});