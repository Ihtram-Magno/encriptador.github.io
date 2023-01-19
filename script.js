// FONDO RESPONSIVO

var pantalla = document.querySelector("#canvas");
var W,H;       
pantalla.height = 2000; 
pantalla.width = 1800; 

function inicializarCanvas(){ 
    if (pantalla && pantalla.getContext) {
        var pincel = pantalla.getContext("2d");
        if (pincel) {
            var s = getComputedStyle(pantalla);
            var n = s.width;
            w = pantalla.width = n.split("px")[0]

            var canvasW = pantalla.width = 2000;
            var canvasH = pantalla.height = 1800;

            if(w <= 1024){
                canvasW = pantalla.width = 800;
                canvasH = pantalla.height = 2000;
            }
            
            if(w >= 1024){
                canvasW = pantalla.width = 2000;
                canvasH = pantalla.height = 1800;
            }

            W = canvasW;
            H = canvasH;

        }
    }
}

setTimeout(function() 
{
    inicializarCanvas();
    addEventListener("resize", inicializarCanvas);
}, 15);


// FONDO DE MATRIX

var fondo = 30;
// OPACIDAD
var desvanecer = 0.05;

var pincel;

    
var columnas = [];
var maxCantidadLetras;

function iniciar(){
    pantalla = document.getElementById( 'canvas' );
    pincel = pantalla.getContext('2d');
    
    iniciarMatrix();

    // INICIA LA CASCADA
    cascada();
}    

function iniciarMatrix(){
    maxCantidadLetras = Math.ceil(pantalla.height/fondo);

    // DIVIDE EL CANVAS EN COLUMNAS
    for ( let i = 0 ; i < pantalla.width/fondo ; ++i ){
        var columna = {};
        // POSCISION X DE LA COLUMNA
        columna.x = i*fondo;
        // CREA UNA COLUMNA DE UNA ALTURA RANDOM
        columna.letras = 10+Math.random()*maxCantidadLetras;
        //CONTARDOR DE LA ALTURA
        columna.contador = 0;
        // AÑADE UNA COLUMNA
        columnas.push(columna);


    }    
}    

function letrasRandom(){
    // CREA UN RECTANGULO NEGRO SEMITRANSPARENTE QUE HACE QUE SE DESVANESCAN LAS LETRAS MAS ANTIGUAS
    pincel.fillStyle = "rgba( 0 , 0 , 0 , "+desvanecer+" )";
    pincel.fillRect( 0 , 0 , pantalla.width , pantalla.height );

    // ESTABLACE EL TAMAÑO DE LA LETRA
    pincel.font = (fondo-2)+"px DotGothic16";
    pincel.fillStyle = "rgb( 0 , 255 , 0 )";
    for ( let indice = 0 ; indice < columnas.length ; ++indice ){
        // GENERA UNA LETRA AL AZAR
        var letraRandom = String.fromCharCode( 33+Math.floor(Math.random()*94) );
        pincel.fillText( letraRandom , columnas[indice].x , columnas[indice].contador*fondo+fondo );

        //REINICIA EL CONTADOR CUANDO LLEGA AL LIMITE
        if ( ++columnas[indice].contador >= columnas[indice].letras ){
            columnas[indice].letras = 10+Math.random()*maxCantidadLetras;
            columnas[indice].contador = 0;
        }    
    }    
}    

    

// FUNCION QUE DA LA SENSACION DE MOVIMIENTO
function cascada(){    
    letrasRandom();
    setTimeout( cascada , 50);
}    
