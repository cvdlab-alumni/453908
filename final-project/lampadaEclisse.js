//FRANCESCO PARIS - matricola 453908
//Vico Magistretti - Lampada Eclisse


/*** function that normalizes between 0 and 1 rgb values ***/
var normalize = function(rgb){
    return [rgb[0]/255,rgb[1]/255,rgb[2]/255];
};



var sfera = function(r){
	return function (v){
		var a = v[0];
  		var b = v[1];
  		return [r*SIN(a)*COS(b), r*SIN(a)*SIN(b), r*COS(a)];
	}
};


function circonferenzaTraslata (r, z, dx, dy) {  
  var mapping = function (v) {
    var a = v[0];
    return [dx + r*COS(a), dy + r*SIN(a), z];
  }  
  return mapping;
};





//funzione che restituisce la base (nera) ciclindrica della lampada
var getBaseLampada = function(){
	var raggio = 5.5;
	var altezza = 0.5;
	var superficieLateraleCilindro = CYL_SURFACE([raggio, altezza])();	
	var discoBase = DISK([raggio])();
	var result = STRUCT([superficieLateraleCilindro,discoBase]);
	var resultColorato = COLOR(normalize([18,19,20]))(result);
	return resultColorato;
};






var getSferaBaseLampada = function(colore){
	var raggio = 6;
	var dominioCirconferenza = DOMAIN([[0,2*PI]])([32]);
	var dominio2D = PROD1x1([INTERVALS(2*PI)(32),INTERVALS(1)(32)]);

	var circonferenza1 = circonferenzaTraslata(6,0.5,0,0);
	var circonferenza2 = circonferenzaTraslata(2,6.5,0,0);
	
	var superficieLaterale = CUBIC_HERMITE(S1)([circonferenza1,circonferenza2,[0,0,13],[0,0,0]]);
	var out1 = MAP(superficieLaterale)(dominio2D);

	//tappo della sfera di base
	var baseMezzaSfera = DISK([raggio])([32,2]);
	var baseMezzaSferaTrasl = T([2])([0.5])(baseMezzaSfera);

	//raccordo (a forma di ciclindro) tra la sfera alta e bassa
	var circonferenza3 = circonferenzaTraslata(2,6.5 + 0.25,0,0);
	var superficieLaterale2 = CUBIC_HERMITE(S1)([circonferenza2,circonferenza3,[0,0,0],[0,0,0]]);
	var out2 = MAP(superficieLaterale2)(dominio2D);

	var result = STRUCT([baseMezzaSferaTrasl,out1,out2]);
	var resultColorato = COLOR(colore)(result);
	return resultColorato;
};



var getSferaParteAltaLampada = function(colore){
	var dominioCirconferenza = DOMAIN([[0,2*PI]])([32]);
	var dominio2D = PROD1x1([INTERVALS(2*PI)(32),INTERVALS(1)(32)]);

	var punto = [0,0,6];
	var circonferenza1 = circonferenzaTraslata(6,0,0,0);
    //aggiungo un'altra circonferenza per disegnare più di mezza sfera
	var circonferenza2 = circonferenzaTraslata(5.75,-2,0,0);
	//var circonferenza2 = circonferenzaTraslata(5.75,-2,0,0);

	var superficieLaterale1 = CUBIC_HERMITE(S1)([circonferenza1,punto,[0,0,18],[0,0,0]]);
	var out1 = MAP(superficieLaterale1)(dominio2D);

	var superficieLaterale2 = CUBIC_HERMITE(S1)([circonferenza1,circonferenza2,[0,0,0],[0,0,0]]);
	var out2 = MAP(superficieLaterale2)(dominio2D);
 	
 	var result = STRUCT([out1,out2]);
 	var resultColore = COLOR(colore)(result);
   	return resultColore;
};



var getLampadina = function(){	
	var raggio = 1.25;
	var altezza = 4;
	var superficieLateraleCilindro = CYL_SURFACE([raggio, altezza])([32,2]);
	
	var dominioSfera = DOMAIN([[-PI,PI], [-(PI/2), PI/2]])([24,36]);
	var s = sfera(2.5);
	var sferaModel = MAP(s)(dominioSfera)
	var sferaTraslata = T([2])([5.5])(sferaModel);
	var sferaTraslataColorata = COLOR(normalize([243,188,0]))(sferaTraslata);
	

	var result = STRUCT([superficieLateraleCilindro,sferaTraslataColorata]);
	return result;
}



var getRondellaLuminosita = function(){
	var raggio = 2;
	var altezza = 0.8;
	var superficieLateraleCilindro = CYL_SURFACE([raggio, altezza])([16,2]);
	var discoBase = DISK([raggio])();
	var discoAlto = DISK([raggio])();
	var discoAltoTraslato = T([2])([altezza])(discoAlto)
	var result = STRUCT([superficieLateraleCilindro, discoBase, discoAltoTraslato]);
	var resultColorato = COLOR(normalize([18,19,20]))(result);
	return resultColorato;
}

//funzione con piu' particolari (migliora la semisfera interna)
var getSemisferaInterna = function(){
	var raggio = 5.5;
	var dominioSemiSfera = DOMAIN([[-(PI/2), PI/2], [-PI, PI]])([24,36]);
	var dominio2D = PROD1x1([INTERVALS(2*PI)(32),INTERVALS(1)(32)]);
	var semisfera = sfera(raggio);
	var semisferaModel = MAP(semisfera)(dominioSemiSfera);
	var circonferenza1 = circonferenzaTraslata(5.5,0,0,0);
	var circonferenza2 = circonferenzaTraslata(5.25,-2,0,0);
	var superficieLaterale = CUBIC_HERMITE(S1)([circonferenza1,circonferenza2,[0,0,0],[0,0,0]]);
	var out1 = MAP(superficieLaterale)(dominio2D);
	var semisferaResult = STRUCT([semisferaModel,out1]);
	var semisferaRuotata = R([1,2])(PI/2)(semisferaResult);
	var result = COLOR(normalize([231,214,182]))(semisferaRuotata);
	return result;
}

//funzione con meno particolari
var getSemisferaInterna2 = function(){
	var raggio = 5.5;
	var dominioSemiSfera = DOMAIN([[-(PI/2), PI/2], [-PI, PI]])([24,36]);
	var semisfera = sfera(raggio);
	var semisferaModel = MAP(semisfera)(dominioSemiSfera);
	var semisferaRuotata = R([1,2])(PI/2)(semisferaModel);
	var result = COLOR(normalize([231,214,182]))(semisferaRuotata);
	return result;
}



var assemblaLampada = function(colore){
	var altezzaBaseCilindrica = 0.5;
	var raggioSemiSferaBase = 6;

	var baseLampada = getBaseLampada();
	var semisfera = getSferaBaseLampada(colore);	
	var semisferaTraslata = T([2])([0])(semisfera);

	var sferaParteAlta = getSferaParteAltaLampada(colore);
	var sferaParteAltaRuotata = R([1,2])(PI/2)(sferaParteAlta);
	var sferaParteAltaRuotataTraslata = T([0,1,2])([0,0,12.45])(sferaParteAltaRuotata);

	var lampadina = getLampadina();
	var lampadinaTraslata = T([2])([5])(lampadina);

	var rondellaLuminosita = getRondellaLuminosita();
	var rondellaLuminositaTraslata = T([2])([6.7])(rondellaLuminosita);

	var semisferaInterna = getSemisferaInterna();
	var semisferaInternaTraslata = T([0,1,2])([0,0,12.2])(semisferaInterna);
	//eseguo una rotazione della semisfera interna per dare l'effetto di chiusura
	//var semisferaInternaTraslataRuotata = R([0,1])([PI/2])(semisferaInternaTraslata);
	var semisferaInternaTraslataRuotata = R([0,1])([PI/4])(semisferaInternaTraslata);


	var lampada = STRUCT([baseLampada,semisferaTraslata,sferaParteAltaRuotataTraslata, lampadinaTraslata,
		          rondellaLuminositaTraslata,semisferaInternaTraslataRuotata]);
	
	return lampada;
}




var coloreRosso = normalize([153,41,35]);
var lampada = assemblaLampada(coloreRosso);
DRAW(lampada);






