/*BOTONES Y AREAS DE TEXTO*/

let ingresarTexto = document.getElementById("ingTextAqui");
let salidaTexto = document.getElementById("msg");
let btnEncriptar = document.getElementById("btnEncriptar");
let btnDesencriptar = document.getElementById("btnDesencriptar");
let btnCopy = document.getElementById("btnCopy");

ingresarTexto.focus();

/*FUNCION PARA COMPROBAR ACENTOS Y MINUSCULAS*/

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

btnDesencriptar.addEventListener("click",desencriptar);
btnEncriptar.addEventListener("click",encriptar);
ingresarTexto.addEventListener("keyup",corregir);

let proceder = true
function corregir(){
    let requisitos = ingresarTexto.value;
    let cumplir = removeAccents(ingresarTexto.value);
    let cumplir2 = ingresarTexto.value.toLowerCase();
    proceder = true
    document.querySelector("label").style.color = "#777";

    if(requisitos != cumplir){
        document.querySelector("label").style.color = "red";
        proceder = false
    }
    
    if(requisitos != cumplir2){
        document.querySelector("label").style.color = "red";
        proceder = false
    }
    
    if(requisitos == cumplir2 && requisitos == cumplir){
        document.querySelector("label").style.color = "#777";
        proceder = true
    }
}

/*FUNCION DE ENCRIPTAR*/

function encriptar(){

    if(proceder){
        let texto=ingresarTexto.value
            texto=texto.replaceAll("e", "enter");
            texto=texto.replaceAll("i", "imes");
            texto=texto.replaceAll("a", "ai");
            texto=texto.replaceAll("o", "ober");
            texto=texto.replaceAll("u", "ufat");
        msg.value=texto;
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
        let texto=ingresarTexto.value
            texto=texto.replaceAll("enter", "e");
            texto=texto.replaceAll("imes", "i");
            texto=texto.replaceAll("ai", "a");
            texto=texto.replaceAll("ober", "o");
            texto=texto.replaceAll("ufat", "u");
        msg.value=texto;
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
    ingresarTexto.value= msg.value;
    navigator.clipboard.writeText(msg.value);
    ingresarTexto.focus();
}

/*DESAPARECER IMAGEN*/

function ocultarImagen() {
    document.getElementById("imagen").style.visibility = "hidden";
}

/*MOSTRAR IMAGEN*/

function mostrarImagen() {
    document.getElementById("imagen").style.visibility = "visible";
}

//BOTON DE BORRAR

let borrar = document.getElementById("borrar");

borrar.addEventListener("click",borrarTexto);

function borrarTexto(){
    ingresarTexto.value = ""
    ingresarTexto.focus();
    document.querySelector("label").style.color = "#777";

}