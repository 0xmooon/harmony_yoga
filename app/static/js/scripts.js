$(function () {
  var dialog;

  function openDialog() {
      dialog.dialog("open");
  }

  function closeDialog() {
      dialog.dialog("close");
  }

  function initializeDialog() {
      dialog = $("#dialog-form").dialog({
        width:'60vw',
        resizable: false,
          autoOpen: false,
          modal: false,
          close: function () {
              form[0].reset();
              allFields.removeClass("ui-state-error");
          }
      });

  }

  // Initialize the dialog
  initializeDialog();

  $("#open-window").button().on("click", function () {
      initializeDialog();
      openDialog();
  });

  $("#close-window").button().on("click", function () {
      closeDialog();
  });
});

$(document).ready(function () {

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 15,
        dots: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: true,
                loop: true,
            }
        }


    })


});

var a17_SVG_chica


/*------------------------------ EVENTOS DOM ------------------------------------- */
$(window).on("load", function () {
    console.log("[main.js](window.load)!")
    init();
});

/*------------------------------ EVENTOS DOM ------------------------------------- */




/*------------------------------ INIT------------------------------------- */

function init(){
    console.log("[main.js](a17_init)!")
    a17_SVG_chica = new ChicaMindfulness()
    a17_SVG_chica.init()
}
/*------------------------------ /INIT------------------------------------- */




















/* ------------------------------ CLASE CHICA SVG ---------------------------------*/
// Autor: Roberto Ferrero
// Fecha: 17-06-2019
function ChicaMindfulness(){
    console.log("[main.js](ChicaMindfulness.CONSTRUCTORA)!")
    this.snapSVG = Snap.select("#cont_svg_chica")

    //--
    this.snapSVG.select("#svg_suelo").attr({
        transform: "traslate(0, 350)"
    })
   
    this.snapSVG.select("#svg_sombra #scale_g").attr({
        transform: "scale(1.2)",
        opacity: 0
    })
    this.snapSVG.select("#svg_hojas").attr({
        transform: "traslate(0, 550)"
    })

    
    this.snapSVG.select("#svg_chica_cabeza #translate_g").attr({
        transform: "traslate(0, 15)"
    })
    this.snapSVG.select("#svg_chica_cabeza_cara #translate_g").attr({
        transform: "traslate(0, 15)"
    })
    
    //--

    this.snapSVG.select("#svg_chica_brazoIzq #rotate_g").attr({
        transform: "rotate(-20)"
    })
    this.snapSVG.select("#svg_chica_brazoDer #rotate_g").attr({
        transform: "rotate(20)"
    })

    this.snapSVG.select("#svg_chica_piernaIzq #rotate_g").attr({
        transform: "rotate(10)"
    })
    this.snapSVG.select("#svg_chica_piernaDer #rotate_g").attr({
        transform: "rotate(-10)"
    })


    this.snapSVG.select("#svg_chica #translate_g").attr({
        transform: "traslate(0, 550)"
    })

    for(var i=0; i<=7; i++){
        this.snapSVG.select("#icono_"+i+" #scale_g").attr({
            transform: "scale(0.5)",
            opacity:0
        })
        TweenMax.to("#infografia_a17 #area_infos #info_"+i, 0, {opacity:0})
    }
    //---
    $("#infografia_a17 #cont_svg_chica").removeClass("oculto")
    $("#infografia_a17 #cont2_svg_chica").removeClass("oculto")

    //--
    this.activarMirarRaton = false
    this.activarBrazosRaton = false
    //--
    this.mouseVector = new Vector2D(0, 0)
    this.ratioMagnitud = 0
    //--
    this.posActualCara = {x:0, y:0}
    this.posDeseadaCara = new Vector2D(0, 0)
    //--
    this.rotActualCabeza = 0
    this.rotDeseadaCabeza = 0
    //--
    
}


ChicaMindfulness.prototype.init = function(){
    console.log("[main.js](ChicaMindfulness.init)!")
    TweenMax.ticker.addEventListener("tick", this.onTick, this);
    //--
    this.animInicial_paso0(0) // Suelo
    this.animInicial_paso1(0) // Chica
    this.animInicial_paso1b(0.5) // hojas
    this.animInicial_paso1c(1.2) // sombra
    this.animInicial_paso2(1) // cara/cabeza
    this.animInicial_paso3(1.5) //piernas y brazos
    this.animInicial_paso4(3) //ohmm

    var pausaBaseIcono = 3.5
    var incrIcono = 0.1
    this.mostrarIcono(pausaBaseIcono+(incrIcono*0), "#icono_0")
    this.mostrarIcono(pausaBaseIcono+(incrIcono*1), "#icono_1")
    this.mostrarIcono(pausaBaseIcono+(incrIcono*2), "#icono_2")
    this.mostrarIcono(pausaBaseIcono+(incrIcono*3), "#icono_3")
    this.mostrarIcono(pausaBaseIcono+(incrIcono*4), "#icono_4")
    this.mostrarIcono(pausaBaseIcono+(incrIcono*5), "#icono_5")
    this.mostrarIcono(pausaBaseIcono+(incrIcono*6), "#icono_6")
    this.mostrarIcono(pausaBaseIcono+(incrIcono*7), "#icono_7")

    //--
    TweenMax.delayedCall(5, this.activarMouseMove, [0], this) 

}


ChicaMindfulness.prototype.mostrarIcono = function(pausaSec, iconoId){
    var escalatemp = 1
    if(pausaSec == null || pausaSec == undefined || pausaSec == 0){
       
        this.snapSVG.select(iconoId+" #scale_g").stop()
        this.snapSVG.select(iconoId+" #scale_g").animate({
            transform: "scale("+escalatemp+")",
            opacity: 1
        }, 500, mina.backout)

        var posX = this.snapSVG.select(iconoId).attr("transform").localMatrix.e
        var posY = this.snapSVG.select(iconoId).attr("transform").localMatrix.f
        //console.log(this.snapSVG.select(iconoId).attr("transform"))
        this.actualizarMouseVector(posX, posY)


    }else{
        TweenMax.delayedCall(pausaSec, this.mostrarIcono, [0, iconoId], this) 
    }
}


ChicaMindfulness.prototype.animInicial_paso0 = function(pausaSec){
    if(pausaSec == null || pausaSec == undefined || pausaSec == 0){
        this.snapSVG.select("#svg_suelo").stop()
        this.snapSVG.select("#svg_suelo").animate({
            transform: "traslate(0, 174)"
        }, 1000, mina.easeout)

    }else{
        TweenMax.delayedCall(pausaSec, this.animInicial_paso0, [0], this) 
    }
}

ChicaMindfulness.prototype.animInicial_paso1 = function(pausaSec){
    if(pausaSec == null || pausaSec == undefined || pausaSec == 0){
        this.snapSVG.select("#svg_chica #translate_g").stop()
        this.snapSVG.select("#svg_chica #translate_g").animate({
            transform: "traslate(0, 0)"
        }, 2000, mina.backout)

    }else{
        TweenMax.delayedCall(pausaSec, this.animInicial_paso1, [0], this) 
    }
}

ChicaMindfulness.prototype.animInicial_paso1b = function(pausaSec){
    if(pausaSec == null || pausaSec == undefined || pausaSec == 0){
        this.snapSVG.select("#svg_hojas").stop()
        this.snapSVG.select("#svg_hojas").animate({
            transform: "traslate(0, 207)"
        }, 1500, mina.backout)

    }else{
        TweenMax.delayedCall(pausaSec, this.animInicial_paso1b, [0], this) 
    }
}

ChicaMindfulness.prototype.animInicial_paso1c = function(pausaSec){
    if(pausaSec == null || pausaSec == undefined || pausaSec == 0){
        this.snapSVG.select("#svg_sombra #scale_g").stop()
        this.snapSVG.select("#svg_sombra #scale_g").animate({
            transform: "scale(1)",
            opacity:1
        }, 700, mina.easeout)

    }else{
        TweenMax.delayedCall(pausaSec, this.animInicial_paso1c, [0], this) 
    }
}

ChicaMindfulness.prototype.animInicial_paso2 = function(pausaSec){
    if(pausaSec == null || pausaSec == undefined || pausaSec == 0){
        this.snapSVG.select("#svg_chica_cabeza #translate_g").stop()
        this.snapSVG.select("#svg_chica_cabeza #translate_g").animate({
            transform: "traslate(0, 0)"
        }, 2000, mina.easeinout)
        
        this.snapSVG.select("#svg_chica_cabeza_cara #translate_g").stop()
        this.snapSVG.select("#svg_chica_cabeza_cara #translate_g").animate({
            transform: "traslate(0, 0)"
        }, 2000, mina.easeinout)
    }else{
        TweenMax.delayedCall(pausaSec, this.animInicial_paso2, [0], this) 
    }
}
ChicaMindfulness.prototype.animInicial_paso3 = function(pausaSec){
    if(pausaSec == null || pausaSec == undefined || pausaSec == 0){

        this.activarMirarRaton = true 
        this.snapSVG.select("#svg_chica_piernaIzq #rotate_g").stop()
        this.snapSVG.select("#svg_chica_piernaIzq #rotate_g").animate({
            transform: "rotate(0)"
        }, 700, mina.easeout)

        this.snapSVG.select("#svg_chica_piernaDer #rotate_g").stop()
        this.snapSVG.select("#svg_chica_piernaDer #rotate_g").animate({
            transform: "rotate(0)"
        }, 700, mina.easeout)

        this.snapSVG.select("#svg_chica_brazoIzq #rotate_g").stop()
        this.snapSVG.select("#svg_chica_brazoIzq #rotate_g").animate({
            transform: "rotate(0)"
        }, 1000, mina.easeout)

        this.snapSVG.select("#svg_chica_brazoDer #rotate_g").stop()
        this.snapSVG.select("#svg_chica_brazoDer #rotate_g").animate({
            transform: "rotate(0)"
        }, 1000, mina.easeout)
        
       
    }else{
        TweenMax.delayedCall(pausaSec, this.animInicial_paso3, [0], this) 
    }
}

ChicaMindfulness.prototype.animInicial_paso4 = function(pausaSec){
    if(pausaSec == null || pausaSec == undefined || pausaSec == 0){
        /*
        this.snapSVG.select("#svg_chica_brazoIzq #rotate_g").stop()
        this.snapSVG.select("#svg_chica_brazoIzq #rotate_g").animate({
            transform: "rotate(0)"
        }, 500, mina.easeinout)

        this.snapSVG.select("#svg_chica_brazoDer #rotate_g").stop()
        this.snapSVG.select("#svg_chica_brazoDer #rotate_g").animate({
            transform: "rotate(0)"
        }, 500, mina.easeinout)
*/
        this.activarBrazosRaton = true
        this.actualizarMouseVector(-122, 64)
        //--
        this.snapSVG.select("#svg_chica_indiceDer #rotate_g").stop()
        this.snapSVG.select("#svg_chica_indiceDer #rotate_g").animate({
            transform: "rotate(-55)"
        }, 500, mina.easeinout)
        
        this.snapSVG.select("#svg_chica_pulgarDer #rotate_g").stop()
        this.snapSVG.select("#svg_chica_pulgarDer #rotate_g").animate({
            transform: "rotate(35)"
        }, 500, mina.easeinout)
        //--
        this.snapSVG.select("#svg_chica_indiceIzq #rotate_g").stop()
        this.snapSVG.select("#svg_chica_indiceIzq #rotate_g").animate({
            transform: "rotate(55)"
        }, 500, mina.easeinout)
        
        this.snapSVG.select("#svg_chica_pulgarIzq #rotate_g").stop()
        this.snapSVG.select("#svg_chica_pulgarIzq #rotate_g").animate({
            transform: "rotate(-45)"
        }, 500, mina.easeinout)
        
       
    }else{
        TweenMax.delayedCall(pausaSec, this.animInicial_paso4, [0], this) 
    }
}

ChicaMindfulness.prototype.activarMouseMove = function(pausaSec){
    var donde = this
    $("body").mousemove(function(e){
        var parentOffset = $(this).parent().offset(); 
        //or $(this).offset(); if you really just want the current element's offset
        var origenX = 373
        var origenY = 457
        var offset = $('body').offset();
        var relX = e.pageX - offset.left - origenX;
        var relY = e.pageY - offset.top - origenY;
        //--
        donde.actualizarMouseVector(relX, relY)
      });
    //--
    
    //--
    this.activarMirarRaton = true
}






ChicaMindfulness.prototype.actualizarMouseVector = function(_relX, _relY){
    //console.log("[main.js](ChicaMindfulness.actualizarMouseVector)!")
    this.mouseVector.x = _relX
    this.mouseVector.y = _relY
    this.ratioMagnitud = this.getRatio(this.mouseVector.componente, 230)
    //--
    var rangoMovCara = 10
    this.posDeseadaCara = this.mouseVector.clonar()
    this.posDeseadaCara.componente = rangoMovCara*this.ratioMagnitud
    //--
    var rangoRotCabeza = 15

}
ChicaMindfulness.prototype.actualizarCabeza = function(){
    //console.log("[main.js](ChicaMindfulness.actualizarCabeza)!")
    if(this.activarMirarRaton){
        var caraX = this.posActualCara.x+((this.posDeseadaCara.x - this.posActualCara.x)/30)
        this.posActualCara.x = caraX
        var caraY = this.posActualCara.y+((this.posDeseadaCara.y - this.posActualCara.y)/30)
        this.posActualCara.y = caraY


        this.snapSVG.select("#svg_chica_cabeza_cara #translate_g").attr({
            transform: "traslate("+caraX+", "+caraY+")"
        })


        var rotCabeza = -(caraX/2)
        this.snapSVG.select("#svg_chica_cabeza #rotate_g").attr({
            transform: "rotate("+rotCabeza+")"
        })

        var cabezaY = (caraY/1)
        this.snapSVG.select("#svg_chica_cabeza #translate_g").attr({
            transform: "traslate(0, "+cabezaY+")"
        })
    }

    if(this.activarBrazosRaton){
        var rotBrazoIzq = caraX/2
        this.snapSVG.select("#svg_chica_brazoIzq #rotate_g").attr({
            transform: "rotate("+rotBrazoIzq+")"
        })

        var rotBrazoDer = caraX/2
        //console.log("---")
        //console.log(rotBrazoIzq)
        //console.log(rotBrazoDer)
        this.snapSVG.select("#svg_chica_brazoDer #rotate_g").attr({
            transform: "rotate("+rotBrazoDer+")"
        })
    }


        
    

}
ChicaMindfulness.prototype.getRatio = function(valor, base){
    var temp = valor
    if(temp > base){
        temp = base
    }
    var ratio = temp/base
    return ratio
}

ChicaMindfulness.prototype.onTick = function(){
    //console.log("[main.js](ChicaMindfulness.onTick)!")
    this.actualizarCabeza()
}
/* ------------------------------ /CLASE CHICA SVG ---------------------------------*/





/* ----------------------------------------------*/
/*
    * Clase Vector2D.
    * CREADA: 2019-03-26
    * AUTOR: Roberto Ferrero (hola@robertoferrero.es)
    */
   function Vector2D(_x, _y){
    //console.log("(Vector2D.CONSTRUCTORA)!");
    this.x = _x || 0;
    this.y = _y || 0;
    //this.trace()
};

// GETTERS Y SETTERS    
Object.defineProperty(Vector2D.prototype, "componente", {
    get: function(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    },
    set: function(valor){
        var r = this.componente;
        r ? this.escalar(valor/r) : this.x = valor;
    },
});
Object.defineProperty(Vector2D.prototype, "magnitud", {
    get: function(){
        return Vector2D.componente
    },
    set: function(valor){
        Vector2D.componente = valor
    },
});
Object.defineProperty(Vector2D.prototype, "anguloRad", {
    get: function(){
        return Math.atan2(this.y, this.x)
    },
    set: function(valor){
        var r = this.componente;
        this.x = r * Math.cos(valor);
        this.y = r * Math.sin(valor);
    },
});
Object.defineProperty(Vector2D.prototype, "anguloDeg", {
    get: function(){
        return Math.atan2(this.y, this.x)*(180/Math.PI);
    },
    set: function(valor){
        var r = this.componente;
        this.x = r * Math.cos(valor*(Math.PI/180));
        this.y = r * Math.sin(valor*(Math.PI/180));
    },
});

Vector2D.prototype.clonar = function() {
  // Devuelve un punto clon del actual
  return new Vector2D(this.x, this.y);
}
Vector2D.prototype.trace = function() {
    console.log("Vector2D: x:"+this.x+" y:"+this.y)
}


Vector2D.prototype.sumar = function(v) {
    this.x += v.x;
    this.y += v.y;
}
Vector2D.prototype.restar = function(v) {
    this.x -= v.x;
    this.y -= v.y;
}

Vector2D.prototype.dividir = function (vector) {
    this.x /= vector.x;
    this.y /= vector.y;
};

Vector2D.prototype.multiplicar = function (vector) {
    this.x *= vector.x;
    this.y *= vector.y;
};



Vector2D.prototype.invertir = function() {
    this.x = -this.x;
    this.y = -this.y;
}
Vector2D.prototype.escalar = function(e) {
    this.x *= e;
    this.y *= e;
}

Vector2D.prototype.rotarDeg = function(grados) {
    var ca = Math.cos(grados*(Math.PI/180));
    var sa = Math.sin(grados*(Math.PI/180));

    var rx = this.x * ca - this.y * sa;
    var ry = this.x * sa + this.y * ca;
    this.x = rx;
    this.y = ry;
}
Vector2D.prototype.rotarRad = function(radianes) {
    var ca = Math.cos(radianes);
    var sa = Math.sin(radianes);

    var rx = this.x * ca - this.y * sa;
    var ry = this.x * sa + this.y * ca;
    this.x = rx;
    this.y = ry;
}

Vector2D.prototype.dot = function(v) {
    return this.x * v.x + this.y * v.y;
}

Vector2D.prototype.esPerpendicular = function(v) { // Boolean
    return (this.dot (v) == 0);
}

Vector2D.prototype.anguloMedioDeg = function(v) { // Grados
    var dp = this.dot (v);
    var cosAngle = dp / (this.componente * v.componente);
    return Math.acos(cosAngle)*(180/Math.PI);
}
Vector2D.prototype.anguloMedioRad = function(v) { // Radianes
    var dp = this.dot (v);
    var cosAngle = dp / (this.componente * v.componente);
    return Math.acos(cosAngle);
}

Vector2D.prototype.normalizar = function() {
    // Modifica el vector a uno de de igual orientacion pero de componente=1
    // Modifica el original
    var length = this.componente;
    if (length === 0) {
        this.x = 1;
        this.y = 0;
    } else {
        var vAux = new Vector2D(length, length)
        this.dividir(vAux);
    }
}
Vector2D.prototype.get_normalizado = function() {
    // Modifica el vector a uno de de igual orientacion pero de componente=1
    // NO modifica el original. Devuele un Vector2D
    //
    var cloneV = this.clonar()
    var length = cloneV.componente;
    if (length === 0) {
        cloneV.x = 1;
        cloneV.y = 0;
    } else {
        var vAux = new Vector2D(length, length)
        cloneV.dividir(vAux);
    }
    return cloneVV
}

/* ----------------------------------------------*/


