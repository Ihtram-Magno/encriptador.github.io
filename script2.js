/*BOTONES Y AREAS DE TEXTO*/

const ingresarTexto = document.getElementById("ingTextAqui");
const salidaTexto = document.getElementById("msg");
const btnEncriptar = document.getElementById("btnEncriptar");
const btnDesencriptar = document.getElementById("btnDesencriptar");
const btnCopy = document.getElementById("btnCopy");
const btnReparar = document.querySelector("#reparar");
const borrar = document.getElementById("borrar");
const label = document.querySelector("label");
const imagen = document.getElementById("imagen");

ingresarTexto.focus();

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// COMPORTAMIENTO DE LA PAGINA

function estadoNormal(){
    label.style.border = " 2px solid #444";
    label.style.color = "#fc0";
    ingresarTexto.style.color = "#0f0";
    ingresarTexto.style.border = "2px solid #0f0";
    btnReparar.style.visibility = "hidden";
    proceder = true
}

function estadoError(){
    label.style.color = "#f00";
    label.style.border = " 2px solid #f00";
    ingresarTexto.style.color = "#f00";
    ingresarTexto.style.border = "2px solid #fc0";
    btnReparar.style.visibility = "visible";
    proceder = false
}

/*DESAPARECER IMAGEN*/

function ocultarImagen() {
    imagen.style.visibility = "hidden";
}

/*MOSTRAR IMAGEN*/

function mostrarImagen() {
    imagen.style.visibility = "visible";
}

/*REPARAR TEXTO*/

btnReparar.addEventListener("click",reparar);

function reparar(){
    let textoAreparar = removeAccents(ingresarTexto.value);
    textoAreparar = textoAreparar.toLowerCase();
    ingresarTexto.value = textoAreparar;
    estadoNormal();
    ingresarTexto.focus();
}

/*FUNCION PARA COMPROBAR ACENTOS Y MINUSCULAS*/

btnDesencriptar.addEventListener("click",desencriptar);
btnEncriptar.addEventListener("click",encriptar);
ingresarTexto.addEventListener("keyup",corregir);

let proceder = true;

function corregir(){
    let requisitos = ingresarTexto.value;
    let cumplir = removeAccents(ingresarTexto.value);
    let cumplir2 = ingresarTexto.value.toLowerCase();

    if(requisitos != cumplir){
        estadoError();
    }
    
    if(requisitos != cumplir2){
        estadoError();
    }
    
    if(requisitos == cumplir2 && requisitos == cumplir){
        estadoNormal();
    }
}

// diccionario

const vocal = ["e", "i", "a", "o", "u"];
const vocalEncriptada = ["enter", "imes", "ai", "ober", "uber"];

/*FUNCION DE ENCRIPTAR*/

function encriptar(){
    if(proceder){
        let texto = ingresarTexto.value
        for (let i = 0; i < vocal.length; i++) {
            texto = texto.replaceAll(vocal[i], vocalEncriptada[i]);
        }
        msg.value = texto;
        if(ingresarTexto.value != ""){
            ocultarImagen();
        }
        if(ingresarTexto.value == ""){
            mostrarImagen();
        }
    }
}

/*DESENCRIPTAR*/

function desencriptar(){
    if(proceder){
        let texto = ingresarTexto.value
        for (let i = 0; i < vocal.length; i++) {
            texto = texto.replaceAll(vocalEncriptada[i], vocal[i]);
        }
        msg.value = texto;
        if(ingresarTexto.value != ""){
            ocultarImagen();
        }
        if(ingresarTexto.value == ""){
            mostrarImagen();
        }
    }
}

/*FUNCION PARA COPIAR TEXTO*/

btnCopy.addEventListener("click", copiar);

function copiar(){
    if(msg.value != ""){
        ingresarTexto.value= msg.value;
        navigator.clipboard.writeText(msg.value);
        estadoNormal();
        ingresarTexto.select();
    }
    ingresarTexto.focus();
}

//BOTON DE BORRAR

borrar.addEventListener("click",borrarTexto);

function borrarTexto(){
    ingresarTexto.value = ""
    ingresarTexto.focus();
    estadoNormal();
}