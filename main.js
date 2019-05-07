const main = document.getElementById("main");
let ctx = main.getContext("2d");

import {data} from "./data.js"


let jdor = [{ "nombre": "Uno", "marca": "O", "turno": true, "linea": "","gdos":0 }, { "nombre": "Dos", "marca": "X", "turno": false, "linea": "","gdos":0 }];

let gana = [
    { "linea": 1, "secu": "123" },
    { "linea": 2, "secu": "456" },
    { "linea": 3, "secu": "789" },
    { "linea": 4, "secu": "147" },
    { "linea": 5, "secu": "258" },
    { "linea": 6, "secu": "369" },
    { "linea": 7, "secu": "159" },
    { "linea": 8, "secu": "357" }];


initData();

function marcar(jugd) {
    let enco = data.find(e => e.posicion == jugd);
    if(enco.select === false){
        enco.select = true;
        let jA = jdor.find(e => e.turno === true);
        let jB = jdor.find(e => e.turno === false);
        enco.jugador = jA.marca;
        jA.linea = jA.linea + enco.posicion.toString();;
        jA.turno = false;
        jB.turno = true;
        verGana()
        initData();
    }
}


function initData() {
    let yy = 15;
    ctx.clearRect(10,0,200,70);
    for (let j = 0; j < jdor.length; j++) {
        let jega = jdor[j].turno? "** Juega **":"";
        ctx.beginPath();
        ctx.font = "20px sans-serif";
        ctx.fillStyle = "rgb(240,240,240)";
        ctx.fillText(jdor[j].nombre + " "+jdor[j].marca  + ":  "+ jdor[j].gdos.toString()  +" "+ jega, 10, yy);   
        yy +=25;     
    }
   

    ctx.rect(50, 50, 210, 210);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fill();
    ctx.rect(120, 50, 70, 210);
    ctx.strokeStyle = "rgb(240,240,240)";
    ctx.stroke();
    ctx.rect(50, 120, 210, 70);
    ctx.stroke();


    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        ctx.beginPath();
        ctx.font = "30px sans-serif";
        ctx.fillStyle = "rgb(240,240,240)";
        let texto = element.posicion;
        if (element.select) {
            texto = element.jugador;
        }
        ctx.fillText(texto, element.cordenadas.x, element.cordenadas.y);
        ctx.stroke();
    }
}

function verGana() {

    for (let j = 0; j < jdor.length; j++) {
        for (let i = 0; i < gana.length; i++) {
            let g = gana[i];
            let a = jdor[j].linea.indexOf(g.secu.charAt(0));
            let b = jdor[j].linea.indexOf(g.secu.charAt(1));
            let c = jdor[j].linea.indexOf(g.secu.charAt(2));
            if (a !== -1 && b !== -1 && c !== -1) {
                alert("si" + g.secu);
                jdor[j].gdos +=1;               
            }
        }
    }

}


function limpiar(){
    data.filter(e => e.select = false);
    jdor.filter(e => e.linea ="");
    initData();
}


const pantalla = document.addEventListener("keydown", (data) => {
    const poss = "123456789";
    if (poss.indexOf(data.key) !== -1) {
        marcar(data.key);
    }

});

const btn = document.getElementById("btnNew");
btn.addEventListener("click",()=>{
     limpiar();
});
