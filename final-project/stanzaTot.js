////Francesco Paris - matricola 453908
//Vico Magistretti - stanza

/*** function that normalizes between 0 and 1 rgb values ***/
var normalize = function(rgb){
    return [rgb[0]/255,rgb[1]/255,rgb[2]/255];
};


function circonferenzaTraslata (r, z, dx, dy) {  
  var mapping = function (v) {
    var a = v[0];
    return [dx + r*COS(a), dy + r*SIN(a), z];
  }  
  return mapping;
}




var sfera = function(r){
	return function (v){
		var a = v[0];
  		var b = v[1];
  		return [r*SIN(a)*COS(b), r*SIN(a)*SIN(b), r*COS(a)];
	}
};





var getGambaLetto = function(colore){

	var raggio = 3;

	//semisfera interna - parte bassa della gamba per permettere l'incastro
	var dominioSemiSfera = DOMAIN([[-(PI/2), PI/2], [-PI, PI]])([24,36]);
	var dominio2D = PROD1x1([INTERVALS(2*PI)(32),INTERVALS(1)(32)]);
	var semisfera = sfera(3);
	var semisferaModel = MAP(semisfera)(dominioSemiSfera);

	var c1 = circonferenzaTraslata(3,0,0,0);
	var c2 = circonferenzaTraslata(3,74,0,0);

	var c3 = circonferenzaTraslata(2,75,0,0);
	var c4 = circonferenzaTraslata(2,75.5,0,0);

	


	var s1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
	var outs1 = MAP(s1)(dominio2D);
	var s2 = CUBIC_HERMITE(S1)([c2,c3,[0,0,2],[2,0,0]]);
	var outs2 = MAP(s2)(dominio2D);
	var s3 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
	var outs3 = MAP(s3)(dominio2D);

	var tappo1 = DISK([2])();
	var tappo1T = T([2])([75.5])(tappo1);


	var gamba = STRUCT([semisferaModel,outs1,outs2,outs3,tappo1T]);
	var gambaColorata = COLOR(colore)(gamba);
	return gambaColorata;
};





var getStaffeAlteLetto = function(colore){

	//barre alte laterali
	var pezzo1 = SIMPLEX_GRID([[2],[88],[-63,10]]);
	var pezzo1T = T([0])([-1])(pezzo1);
	var pezzo2 = T([0])([206])(pezzo1T);

	//barra alta dietro
	var pezzo3 = SIMPLEX_GRID([[206],[-87,2],[-63,10]]);

	var staffe = STRUCT([pezzo1T,pezzo2,pezzo3]);
	var staffeColorate = COLOR(colore)(staffe);
	return staffeColorate;

};




var getStaffeBasseLetto = function(colore){
	//barre basse laterali
	var pezzo1 = SIMPLEX_GRID([[2],[88],[-20,10]]);
	var pezzo1T = T([0])([-1])(pezzo1);
	var pezzo2 = T([0])([206])(pezzo1T);

	//barra alta dietro
	var pezzo3 = SIMPLEX_GRID([[206],[-87,2],[-20,10]]);


	var staffe = STRUCT([pezzo1T,pezzo2,pezzo3]);
	var staffeColorate = COLOR(colore)(staffe);
	return staffeColorate;

};


var getReteLetto = function(colore){
	var p1 = SIMPLEX_GRID([[206],[-3,1],[-22,6]]);
	//piano sotto la rete del letto
	var piano = SIMPLEX_GRID([[206],[-4,83],[-27,1]]);

	var rete = STRUCT([p1,piano]);
	var reteColorata = COLOR(colore)(rete);
	return reteColorata;
};


var getMaterasso = function(colore){
	var domain = INTERVALS(1)(20);
	var domain2D = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(20)]);
	
	//parte alta davanti
	var c1 = CUBIC_HERMITE(S0)([[1,3,37],[205,3,37],[0,0,0],[0,0,0]])
	var outc1 = MAP(c1)(domain);
	//parte bassa davanti
	var c2 = CUBIC_HERMITE(S0)([[1,3,28],[205,3,28],[0,0,0],[0,0,0]])
	var outc2 = MAP(c2)(domain);

	//parte alta dietro
	var c3 = CUBIC_HERMITE(S0)([[1,85,37],[205,85,37],[0,0,0],[0,0,0]])
	var outc3 = MAP(c3)(domain);
	//parte bassa dietro
	var c4 = CUBIC_HERMITE(S0)([[1,85,28],[205,85,28],[0,0,0],[0,0,0]])
	var outc4 = MAP(c4)(domain);

	//parte laterale 
	var c5 = CUBIC_HERMITE(S0)([[1,3,37],[1,85,37],[0,0,0],[0,0,0]]);
	var outc5 = MAP(c5)(domain);
	var c6 = CUBIC_HERMITE(S0)([[1,3,28],[1,85,28],[0,0,0],[0,0,0]]);
	var outc6 = MAP(c6)(domain);
	

	var c7 = CUBIC_HERMITE(S0)([[205,3,37],[205,85,37],[0,0,0],[0,0,0]]);
	var outc7 = MAP(c7)(domain);
	var c8 = CUBIC_HERMITE(S0)([[205,3,28],[205,85,28],[0,0,0],[0,0,0]]);
	var outc8 = MAP(c8)(domain);


	//superfice
	var s1 = CUBIC_HERMITE(S1)([c1,c2,[0,-8,0],[0,8,0]])
	var outs1 = MAP(s1)(domain2D);
	var s2 = CUBIC_HERMITE(S1)([c3,c4,[0,8,0],[0,-8,0]])
	var outs2 = MAP(s2)(domain2D);
	var s3 = CUBIC_HERMITE(S1)([c1,c3,[0,0,0],[0,0,0]])
	var outs3 = MAP(s3)(domain2D);

	var s4 = CUBIC_HERMITE(S1)([c5,c6,[-8,0,0],[8,0,0]])
	var outs4 = MAP(s4)(domain2D);
	var s5 = CUBIC_HERMITE(S1)([c7,c8,[8,0,0],[-8,0,0]])
	var outs5= MAP(s5)(domain2D);

	

	var materasso = STRUCT([outs1,outs2,outs3,outs4,outs5]);
	var materassoColorato = COLOR(colore)(materasso);
	return materassoColorato;
};




var getCuscino = function(colore){
	var domain = INTERVALS(1)(32);
	var domain2D = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)]);

	var punti1 = [[2,5,40],[30,5,40]];
	var punti2 = [[2,80,40],[30,80,40]];

	var c1 = BEZIER(S0)(punti1);
	var outc1 = MAP(c1)(domain);
	var c2 = BEZIER(S0)(punti2);
	var outc2 = MAP(c2)(domain);


	//---punti sotto---
	var punti3 = [[2,10,40],[5,10,30],[27,10,30],[30,10,40]];
	var c3 = BEZIER(S0)(punti3);
	//var outc3 = MAP(c3)(domain);

	var punti4 = [[2,30,40],[5,30,30],[27,30,30],[30,30,40]];
	var c4 = BEZIER(S0)(punti4);
	//var outc4 = MAP(c4)(domain);

	var punti5 = [[2,60,40],[5,60,30],[27,60,30],[30,60,40]];
	var c5 = BEZIER(S0)(punti5);
	//var outc5 = MAP(c5)(domain);

	var punti6 = [[2,75,40],[5,75,30],[27,75,30],[30,75,40]];
	var c6 = BEZIER(S0)(punti6);
	//var outc6 = MAP(c6)(domain);


	var supSotto = BEZIER(S1)([c1,c3,c4,c5,c2]);
	var outSupSotto = MAP(supSotto)(domain2D);


	//---punti sopra---
	var punti3up = [[2,10,40],[5,10,50],[27,10,50],[30,10,40]];
	var c3up = BEZIER(S0)(punti3up);
	//var outc3up = MAP(c3up)(domain);

	var punti4up = [[2,30,40],[5,30,50],[27,30,50],[30,30,40]];
	var c4up = BEZIER(S0)(punti4up);
	//var outc4up = MAP(c4up)(domain);

	var punti5up = [[2,60,40],[5,60,50],[27,60,50],[30,60,40]];
	var c5up = BEZIER(S0)(punti5up);
	//var outc5up = MAP(c5up)(domain);

	var punti6up = [[2,75,40],[5,75,50],[27,75,50],[30,75,40]];
	var c6up = BEZIER(S0)(punti6up);
	//var outc6up = MAP(c6up)(domain);

	var supSopra = BEZIER(S1)([c1,c3up,c4up,c5up,c6up,c2]);
	var outSupSopra = MAP(supSopra)(domain2D);


	var cuscino = STRUCT([outSupSotto,outSupSopra]);
	var cuscinoColorato = COLOR(colore)(cuscino);
	return cuscinoColorato;
};


var getScaletta = function(colore){
	var raggio = 2;
	var dominio2D = PROD1x1([INTERVALS(2*PI)(32),INTERVALS(1)(32)]);

	

	var c1 = circonferenzaTraslata(raggio,2,0,0);
	var c2 = circonferenzaTraslata(raggio,102,0,0);


	var p1 = CUBIC_HERMITE(S1)([[0,0,0],c1,[0,0,0],[0,0,5]]);
	var outp1 = MAP(p1)(dominio2D);

	var p2 = CUBIC_HERMITE(S1)([[0,0,104],c2,[0,0,0],[0,0,-5]]);
	var outp2 = MAP(p2)(dominio2D);
	

	var s1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
	var outs1 = MAP(s1)(dominio2D);


	//cilindri che fanno da scala
	var cilindro = CYL_SURFACE([2,31])([32,2]);
	var cilindroR = R([1,2])([PI/2])(cilindro);
	var cilindroRR = R([0,1])([PI/2])(cilindroR);
	var cilindroRRT = T([0,1,2])([29.5,-16,15])(cilindroRR);
	var cilindroRRT2 = T([2])([20])(cilindroRRT);
	var cilindroRRT3 = T([2])([20])(cilindroRRT2);
	var cilindroRRT4 = T([2])([20])(cilindroRRT3);
	var cilindroRRT5 = T([2])([20])(cilindroRRT4);
	


	var s = STRUCT([outs1,outp1,outp2]);
	var scalaT = T([0,1])([30,-16])(s);
	var scala2 = T([0])([30])(scalaT);

	var scala = STRUCT([scalaT, scala2,cilindroRRT,cilindroRRT2,cilindroRRT3,cilindroRRT4,cilindroRRT5]);

	var scalaR = R([1,2])([-PI/20])(scala);

	var scalaColorata = COLOR(colore)(scalaR);
	return scalaColorata;
};







//----- ASSEMBLO PEZZI DELLA STANZA ---///


//-LETTO CASTELLO--//
var rosso = normalize([153,41,35]);
var bianco = normalize([231,214,182]);
var nero = normalize([29,28,29]);
var lilla = normalize([124,99,153]);
var giallo = normalize([237,160,78]);

//gambe davanti
var g1 = getGambaLetto(rosso);
var g2 = T([0])([206])(g1);
//gambe dietro
var g3 = T([1])([88])(g1);
var g4 = T([1])([88])(g2);

var staffe = getStaffeAlteLetto(rosso);
var staffeBasse = getStaffeBasseLetto(rosso);

var rete = getReteLetto(nero);
var materasso = getMaterasso(lilla);

var cuscino = getCuscino(giallo);


var letto1 = STRUCT([g1,g2,g3,g4,staffe,staffeBasse,rete,materasso,cuscino]);


var scala = getScaletta(rosso);

var letto2 = T([2])([74.5])(letto1);


var lettoCastello= STRUCT([letto1,letto2,scala]);

var lettoCastelloT = T([1])([300])(lettoCastello);



//-TAVOLO-//
var getGambaTavolo = function(colore){

	var dominio2D = PROD1x1([INTERVALS(2*PI)(32),INTERVALS(1)(32)]);

	var raggio = 3;
	var raggio2 = 4; //raggio della parte più grande della gamba
	var altezzaCilindro = 2;

	//tappo base della gamba
	var tappo1 = DISK([raggio])();

	var circonferenza1 = circonferenzaTraslata(raggio,0,0,0);
	var circonferenza2 = circonferenzaTraslata(raggio,60,0,0);
	var circonferenza3 = circonferenzaTraslata(raggio2,62,0,0);
	var circonferenza4 = circonferenzaTraslata(raggio2,70,0,0);

	var s1 = CUBIC_HERMITE(S1)([circonferenza1,circonferenza2,[0,0,0],[0,0,0]]);
	var outS1 = MAP(s1)(dominio2D);

	var s2 = CUBIC_HERMITE(S1)([circonferenza2,circonferenza3,[0,0,0],[0,0,0]]);
	var outS2 = MAP(s2)(dominio2D);
	 
	var s3 = CUBIC_HERMITE(S1)([circonferenza3,circonferenza4,[0,0,0],[0,0,0]]);
	var outS3 = MAP(s3)(dominio2D);

	var tappo2 = DISK([raggio2])();
	var tappo2Trasl = T([2])([70])(tappo2);

	//ciclindro che collega la gamba al piano del tavolo
	var cilindro = CYL_SURFACE([raggio,altezzaCilindro])([32,2]);
	var cilindroTraslato = T([2])([70])(cilindro);

	//tappo alto
	var tappo2 = T([2])([72])(tappo1);

	var result = STRUCT([tappo1,outS1, outS2,outS3,tappo2Trasl,cilindroTraslato, tappo2]);
	var resultColorato = COLOR(colore)(result);
	return resultColorato;
}




var getPianoTavolo = function(colore1,colore2){
	var domain = INTERVALS(1)(20);
	var domain2D = PROD1x1([INTERVALS(1)(14),INTERVALS(1)(14)]);

	//var punti1 = [[4,0,72],[126,0,72]];
	//var punti2 = [[4,0,75],[126,0,75]];

	//linee davanti
	var c1 = CUBIC_HERMITE(S0)([[0,-4,72],[130,-4,72],[0,0,0],[0,0,0]]);
	//var outc1 = MAP(c1)(domain);
	//DRAW(outc1);

	var c2 = CUBIC_HERMITE(S0)([[0,-4,75],[130,-4,75],[0,0,0],[0,0,0]]);
	//var outc2 = MAP(c2)(domain);
	//DRAW(outc2);

	//linee laterali
	var c3 = CUBIC_HERMITE(S0)([[-4,0,72],[-4,85,72],[0,0,0],[0,0,0]]);
	//var outc3 = MAP(c3)(domain);
	//DRAW(outc3);

	var c4 = CUBIC_HERMITE(S0)([[-4,0,75],[-4,85,75],[0,0,0],[0,0,0]]);
	//var outc4 = MAP(c4)(domain);
	//DRAW(outc4);

	//linee orizzontali dietro
	var c5 = CUBIC_HERMITE(S0)([[0,89,72],[130,89,72],[0,0,0],[0,0,0]]);
	//var outc5 = MAP(c5)(domain);
	//DRAW(outc5);

	var c6 = CUBIC_HERMITE(S0)([[0,89,75],[130,89,75],[0,0,0],[0,0,0]]);
	//var outc6 = MAP(c6)(domain);
	//DRAW(outc6);

	//linee laterali
	var c7 = CUBIC_HERMITE(S0)([[134,0,72],[134,85,72],[0,0,0],[0,0,0]]);
	//var outc7 = MAP(c7)(domain);
	//DRAW(outc7);

	var c8 = CUBIC_HERMITE(S0)([[134,0,75],[134,85,75],[0,0,0],[0,0,0]]);
	//var outc8 = MAP(c8)(domain);
	//DRAW(outc8);

	//raccordi
	//c1-c3
	var c1c3 = CUBIC_HERMITE(S0)([[0,-4,72],[-4,0,72],[-8,0,0],[0,8,0]]);
	//var outc1c3 = MAP(c1c3)(domain);
	//DRAW(outc1c3);

	//c2-c4
	var c2c4 = CUBIC_HERMITE(S0)([[0,-4,75],[-4,0,75],[-8,0,0],[0,8,0]]);
	//var outc2c4 = MAP(c2c4)(domain);
	//DRAW(outc2c4);


	//c3-c5
	var c3c5 = CUBIC_HERMITE(S0)([[-4,85,72],[0,89,72],[0,8,0],[8,0,0]]);
	//var outc3c5 = MAP(c3c5)(domain);
	//DRAW(outc3c5);

	//c4-c6
	var c4c6 = CUBIC_HERMITE(S0)([[-4,85,75],[0,89,75],[0,8,0],[8,0,0]]);
	//var outc4c6 = MAP(c4c6)(domain);
	//DRAW(outc4c6);

	//c1-c7
	var c1c7 = CUBIC_HERMITE(S0)([[130,-4,72],[134,0,72],[8,0,0],[0,8,0]]);
	//var outc1c7 = MAP(c1c7)(domain);
	//DRAW(outc1c7);

	//c2-c8
	var c2c8 = CUBIC_HERMITE(S0)([[130,-4,75],[134,0,75],[8,0,0],[0,8,0]]);
	//var outc2c8 = MAP(c2c8)(domain);
	//DRAW(outc2c8);

	//c5-c7
	var c5c7 = CUBIC_HERMITE(S0)([[130,89,72],[134,85,72],[8,0,0],[0,-8,0]]);
	//var outc5c7 = MAP(c5c7)(domain);
	//DRAW(outc5c7);

	//c6-c8
	var c6c8 = CUBIC_HERMITE(S0)([[130,89,75],[134,85,75],[8,0,0],[0,-8,0]]);
	//var outc6c8 = MAP(c6c8)(domain);
	//DRAW(outc6c8);



	//superfici del bordo del tavolo
	var s1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
	var outs1 = MAP(s1)(domain2D);

	var s2 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
	var outs2 = MAP(s2)(domain2D);

	var s3 = CUBIC_HERMITE(S1)([c5,c6,[0,0,0],[0,0,0]]);
	var outs3 = MAP(s3)(domain2D);

	var s4 = CUBIC_HERMITE(S1)([c7,c8,[0,0,0],[0,0,0]]);
	var outs4 = MAP(s4)(domain2D);

	//superfici dei raccordi del bordo del tavolo
	var s5 = CUBIC_HERMITE(S1)([c1c3,c2c4,[0,0,0],[0,0,0]]);
	var outs5 = MAP(s5)(domain2D);

	var s6 = CUBIC_HERMITE(S1)([c3c5,c4c6,[0,0,0],[0,0,0]]);
	var outs6 = MAP(s6)(domain2D);

	var s7 = CUBIC_HERMITE(S1)([c1c7,c2c8,[0,0,0],[0,0,0]]);
	var outs7 = MAP(s7)(domain2D);

	var s8 = CUBIC_HERMITE(S1)([c5c7,c6c8,[0,0,0],[0,0,0]]);
	var outs8 = MAP(s8)(domain2D);


	//superfici del tavolo sopra
	var s9 = CUBIC_HERMITE(S1)([c2,c6,[0,0,0],[0,0,0]]);
	var outs9 = MAP(s9)(domain2D);

	var s10 = CUBIC_HERMITE(S1)([c1,c5,[0,0,0],[0,0,0]]);
	var outs10 = MAP(s10)(domain2D);

	var s11 = CUBIC_HERMITE(S1)([c3,c7,[0,0,0],[0,0,0]]);
	var outs11 = MAP(s11)(domain2D);

	//chisura tra superfici laterali
	var s12 = CUBIC_HERMITE(S1)([c4,c8,[0,0,0],[0,0,0]]);
	var outs12 = MAP(s12)(domain2D);

	//chiusura dei raccordi
	var s13 = CUBIC_HERMITE(S1)([c1c3,[0,0,72],[0,0,0],[0,0,0]]);
	var outs13 = MAP(s13)(domain2D);

	var s14 = CUBIC_HERMITE(S1)([c2c4,[0,0,75],[0,0,0],[0,0,0]]);
	var outs14 = MAP(s14)(domain2D);

	var s15 = CUBIC_HERMITE(S1)([c3c5,[0,85,72],[0,0,0],[0,0,0]]);
	var outs15 = MAP(s15)(domain2D);

	var s16 = CUBIC_HERMITE(S1)([c4c6,[0,85,75],[0,0,0],[0,0,0]]);
	var outs16 = MAP(s16)(domain2D);

	var s17 = CUBIC_HERMITE(S1)([c1c7,[130,0,72],[0,0,0],[0,0,0]]);
	var outs17 = MAP(s17)(domain2D);

	var s18 = CUBIC_HERMITE(S1)([c2c8,[130,0,75],[0,0,0],[0,0,0]]);
	var outs18 = MAP(s18)(domain2D);

	var s19 = CUBIC_HERMITE(S1)([c5c7,[130,85,72],[0,0,0],[0,0,0]]);
	var outs19 = MAP(s19)(domain2D);

	var s20 = CUBIC_HERMITE(S1)([c6c8,[130,85,75],[0,0,0],[0,0,0]]);
	var outs20 = MAP(s20)(domain2D);



	//parte bassa sotto il tavolo
	//pezzo laterale
	var pezzo1 = SIMPLEX_GRID([[-4,14],[2],[-64,4]]);
	var pezzo1T = T([0])([-1])(pezzo1);
	var pezzo1TR = R([0,1])([PI/4])(pezzo1T);

	//var pezzo2 = SIMPLEX_GRID([[-117,10],[2],[-64,4]]);
	var pezzo2 = R([0,1])([PI*3/4])(pezzo1T);
	var pezzo2T = T([0])([130])(pezzo2);

	var pezzo3 = R([0,1])([-PI/4])(pezzo1T);
	var pezzo3T = T([1])([85])(pezzo3);

	var pezzo4 = T([0,1])([116,73])(pezzo1TR);
	//rettangolo
	var rett1 = SIMPLEX_GRID([[-11,106],[-11,3],[-64,8]]);
	var rett2 = T([1])([62])(rett1);

	
	var rett3 = SIMPLEX_GRID([[3],[-11,65],[-64,8]]);
	var rett3T = T([0])([8])(rett3);
	var rett4 = T([0])([109])(rett3T);


	var parteBassaTavolo = STRUCT([pezzo1TR,pezzo2T,pezzo3T,pezzo4,rett1,rett2,rett3T,rett4]);
	var parteBassaTavoloColor = COLOR(colore1)(parteBassaTavolo);

	var pianoTavoloTot = STRUCT([outs1,outs2,outs3,outs4,outs5,outs6,outs7,outs8,outs9,outs10,outs11,outs12,outs13,outs14,outs15,
		         outs16,outs17,outs18,outs19,outs20]);
	var pianoTavoloTotColor = COLOR(colore2)(pianoTavoloTot);

	var result = STRUCT([parteBassaTavoloColor,pianoTavoloTotColor]);
	
	return result;
}



//assemblo pezzi tavolo
var rosso = normalize([153,41,35]);
var bianco = normalize([231,214,182]);
var nero = normalize([29,28,29]);
var bianco2 = normalize([228,219,197]);


var gamba1 = getGambaTavolo(rosso);
var gamba2 = T([0])([130])(gamba1);
var gamba3 = T([1])([85])(gamba1);
var gamba4 = T([1])([85])(gamba2);

var piano = getPianoTavolo(rosso,bianco2);

var tavolo = STRUCT([gamba1, gamba2, gamba3, gamba4, piano]);
var tavoloT = T([0,1])([50,-300])(tavolo);






//--LAMPADA--//



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
var lampadaT = T([0,1,2])([120,-260,75])(lampada);













//--SEDIA---//


var getGambaDavantiSedia = function(colore){
	var raggio = 2;
	var raggio2 = 3; //raggio grande
	var dominioCirconferenza = DOMAIN([[0,2*PI]])([32]);
	var dominio2D = PROD1x1([INTERVALS(2*PI)(32),INTERVALS(1)(32)]);

	var c1 = circonferenzaTraslata(raggio,0,0,0);
	var c2 = circonferenzaTraslata(raggio,31,0,0);
	var c3 = circonferenzaTraslata(raggio2,32,0,0);
	var c4 = circonferenzaTraslata(raggio2,44,0,0);
	var c5 = circonferenzaTraslata(raggio,45,0,0);
	var c6 = circonferenzaTraslata(raggio,66,0,0);

	var s1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
	var outS1 = MAP(s1)(dominio2D);
	var s2 = CUBIC_HERMITE(S1)([c2,c3,[0,0,0],[0,0,0]]);
	var outS2 = MAP(s2)(dominio2D);
	var s3 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
	var outS3 = MAP(s3)(dominio2D);
	var s4 = CUBIC_HERMITE(S1)([c4,c5,[0,0,0],[0,0,0]]);
	var outS4 = MAP(s4)(dominio2D);
	var s5 = CUBIC_HERMITE(S1)([c5,c6,[0,0,0],[0,0,0]]);
	var outS5 = MAP(s5)(dominio2D);

	var tappo1 = DISK([raggio])();
	var tappo2 = T([2])([66])(tappo1);


	var gamba = STRUCT([outS1,outS2,outS3,outS4,outS5,tappo1,tappo2]);
	var gambaColorata = COLOR(colore)(gamba);
	return gambaColorata;

}


var getGambaDietroSedia = function(colore){
	var raggio = 2;
	var raggio2 = 3; //raggio grande
	var dominioCirconferenza = DOMAIN([[0,2*PI]])([32]);
	var dominio2D = PROD1x1([INTERVALS(2*PI)(32),INTERVALS(1)(32)]);

	var c1 = circonferenzaTraslata(raggio,0,0,0);
	var c2 = circonferenzaTraslata(raggio,31,0,0);
	var c3 = circonferenzaTraslata(raggio2,32,0,0);
	var c4 = circonferenzaTraslata(raggio2,44,0,0);
	var c5 = circonferenzaTraslata(raggio,45,0,0);
	var c6 = circonferenzaTraslata(raggio,66,0,0);
	var c7 = circonferenzaTraslata(raggio,75,0,0);

	var s1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
	var outS1 = MAP(s1)(dominio2D);
	var s2 = CUBIC_HERMITE(S1)([c2,c3,[0,0,0],[0,0,0]]);
	var outS2 = MAP(s2)(dominio2D);
	var s3 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
	var outS3 = MAP(s3)(dominio2D);
	var s4 = CUBIC_HERMITE(S1)([c4,c5,[0,0,0],[0,0,0]]);
	var outS4 = MAP(s4)(dominio2D);
	var s5 = CUBIC_HERMITE(S1)([c5,c6,[0,0,0],[0,0,0]]);
	var outS5 = MAP(s5)(dominio2D);
	var s6 = CUBIC_HERMITE(S1)([c6,c7,[0,0,0],[0,0,0]]);
	var outS6 = MAP(s6)(dominio2D);

	var tappo1 = DISK([raggio])();
	var tappo2 = T([2])([75])(tappo1);

	var gamba = STRUCT([outS1,outS2,outS3,outS4,outS5,outS6,tappo2]);
	var gambaColorata = COLOR(colore)(gamba);
	return gambaColorata;

}




var getContorniSedia = function(colore){

	var contorno1Davanti = SIMPLEX_GRID([[58],[1],[-34,8]]);
	var contorno1DavantiT = T([1])([-0.5])(contorno1Davanti);

	var contorno2Dietro = T([1])([52])(contorno1DavantiT);

	var contorno1Laterale = SIMPLEX_GRID([[1],[52],[-34,8]]);
	var contorno1LateraleT = T([0])([-0.5])(contorno1Laterale);

	var contorno2Laterale = T([0])([58])(contorno1LateraleT);

	var contorni = STRUCT([contorno1DavantiT,contorno2Dietro,contorno1LateraleT,contorno2Laterale]);
	var contorniColore = COLOR(colore)(contorni);
	return contorniColore;
}


var getBraccioloSedia = function(colore){
	var domain = INTERVALS(1)(20);
	var domain2D = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(20)]);


	var pezzoDritto = SIMPLEX_GRID([[2],[3],[-66,8]]);
	var pezzoDrittoT = T([0,1])([-1,49])(pezzoDritto);

	//disegno le due curve che congiungono le due gambe
	//curva sinistra alta
	var punti1 = [[-1,49,74],[-1,1,65],[0,0,-30],[0,-30,0]];
	var c1 = CUBIC_HERMITE(S0)(punti1);
	//var outc1 = MAP(c1)(domain);
	//curva destra alta
	var punti2 = [[1,49,74],[1,1,65],[0,0,-30],[0,-30,0]];
	var c2 = CUBIC_HERMITE(S0)(punti2);
	//var outc2 = MAP(c2)(domain);

	//curva sinistra bassa
	var punti3 = [[-1,50,66],[-1,1,57],[0,0,-30],[0,-30,0]];
	var c3 = CUBIC_HERMITE(S0)(punti3);
	//var outc3 = MAP(c3)(domain);
	//curva destra bassa
	var punti4 = [[1,50,66],[1,1,57],[0,0,-30],[0,-30,0]];
	var c4 = CUBIC_HERMITE(S0)(punti4);
	//var outc4 = MAP(c4)(domain);

	//disegno superfici
	var s1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
	var outs1 = MAP(s1)(domain2D);
	var s2 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
	var outs2 = MAP(s2)(domain2D);
	var s3 = CUBIC_HERMITE(S1)([c1,c3,[0,0,0],[0,0,0]]);
	var outs3 = MAP(s3)(domain2D);
	var s4 = CUBIC_HERMITE(S1)([c2,c4,[0,0,0],[0,0,0]]);
	var outs4 = MAP(s4)(domain2D);


	var bracciolo = STRUCT([pezzoDrittoT,outs1,outs2,outs3,outs4]);
	var braccioloColorato = COLOR(colore)(bracciolo);
	return braccioloColorato;

}




var getSchienaleSedia = function(colore){
	var domain = INTERVALS(1)(20);
	var domain2D = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(20)]);

	//parte alta schienale curva esterna
	var punti1 = [[0,53,74],[58,53,74],[0,20,0],[0,-20,0]];
	var c1 = CUBIC_HERMITE(S0)(punti1);
	//parte alta schienale curva interna
	var punti2 = [[0,51,74],[58,51,74],[0,20,0],[0,-20,0]];
	var c2 = CUBIC_HERMITE(S0)(punti2);
	//parte bassa schienale curva esterna
	var punti3 = [[0,53,66],[58,53,66],[0,20,0],[0,-20,0]];
	var c3 = CUBIC_HERMITE(S0)(punti3);
	//parte bassa schienale curva interna
	var punti4 = [[0,51,66],[58,51,66],[0,20,0],[0,-20,0]];
	var c4 = CUBIC_HERMITE(S0)(punti4);

	//disegno superfici
	var s1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
	var outs1 = MAP(s1)(domain2D);
	var s2 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
	var outs2 = MAP(s2)(domain2D);
	var s3 = CUBIC_HERMITE(S1)([c1,c3,[0,0,0],[0,0,0]]);
	var outs3 = MAP(s3)(domain2D);
	var s4 = CUBIC_HERMITE(S1)([c2,c4,[0,0,0],[0,0,0]]);
	var outs4 = MAP(s4)(domain2D);
	

	var schienale = STRUCT([outs1,outs2,outs3,outs4]);
	var schienaleColorato = COLOR(colore)(schienale);
	return schienaleColorato;

}




var getCuscinoSedia = function(colore){
	var domain = INTERVALS(1)(32);
	var domain2D = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);
	//davanti
	var p1 = [[0,0,42],[58,0,42]];
	var c1 = BEZIER(S0)(p1);
	//dietro
	var p2 = [[0,52,42],[58,52,42]];
	var c2 = BEZIER(S0)(p2);
	//mezzo
	var p3 = [[0,25,42],[29,25,60],[58,25,42]];
	var c3 = BEZIER(S0)(p3);

	var out1 = MAP(BEZIER(S1)([c1,c2]))(domain2D);
	var out2 = MAP(BEZIER(S1)([c1,c3,c2]))(domain2D);


	var cuscino = STRUCT([out1,out2]);
	var cuscinoColorato = COLOR(colore)(cuscino);
	return cuscinoColorato;

}




//assemblo pezzi sedia
var rosso = normalize([153,41,35]);
var bianco = normalize([231,214,182]);
var nero = normalize([29,28,29]);



//gambe davanti
var g1 = getGambaDavantiSedia(rosso);
var g2 = T([0])([58])(g1);
//gambe dietro
var g3 = getGambaDietroSedia(rosso);
var g3T = T([1])([52])(g3);
var g4 = T([0])([58])(g3T);

//contorni sedia
var contorni = getContorniSedia(rosso);

//bracciolo
var b1 = getBraccioloSedia(rosso);
var b2 = T([0])([58])(b1);

var schienale = getSchienaleSedia(rosso);

var cuscino = getCuscinoSedia(nero);

var sedia = STRUCT([g1,g2,g3T,g4,contorni,b1,b2,schienale,cuscino]);

var sedia1T = T([0,1])([85,-180])(sedia);




//--DIVANO --//

var getGambaDavantiDivano = function(colore){
	var raggio = 2;
	var raggio2 = 3; //raggio grande
	var dominioCirconferenza = DOMAIN([[0,2*PI]])([32]);
	var dominio2D = PROD1x1([INTERVALS(2*PI)(32),INTERVALS(1)(32)]);

	var c1 = circonferenzaTraslata(raggio,0,0,0);
	var c2 = circonferenzaTraslata(raggio,31,0,0);
	var c3 = circonferenzaTraslata(raggio2,32,0,0);
	var c4 = circonferenzaTraslata(raggio2,44,0,0);
	var c5 = circonferenzaTraslata(raggio,45,0,0);
	var c6 = circonferenzaTraslata(raggio,66,0,0);

	var s1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
	var outS1 = MAP(s1)(dominio2D);
	var s2 = CUBIC_HERMITE(S1)([c2,c3,[0,0,0],[0,0,0]]);
	var outS2 = MAP(s2)(dominio2D);
	var s3 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
	var outS3 = MAP(s3)(dominio2D);
	var s4 = CUBIC_HERMITE(S1)([c4,c5,[0,0,0],[0,0,0]]);
	var outS4 = MAP(s4)(dominio2D);
	var s5 = CUBIC_HERMITE(S1)([c5,c6,[0,0,0],[0,0,0]]);
	var outS5 = MAP(s5)(dominio2D);

	var tappo1 = DISK([raggio])();
	var tappo2 = T([2])([66])(tappo1);


	var gamba = STRUCT([outS1,outS2,outS3,outS4,outS5,tappo1,tappo2]);
	var gambaColorata = COLOR(colore)(gamba);
	return gambaColorata;

}




var getGambaDietroDivano = function(colore){
	var raggio = 2;
	var raggio2 = 3; //raggio grande
	var dominioCirconferenza = DOMAIN([[0,2*PI]])([32]);
	var dominio2D = PROD1x1([INTERVALS(2*PI)(32),INTERVALS(1)(32)]);

	var c1 = circonferenzaTraslata(raggio,0,0,0);
	var c2 = circonferenzaTraslata(raggio,31,0,0);
	var c3 = circonferenzaTraslata(raggio2,32,0,0);
	var c4 = circonferenzaTraslata(raggio2,44,0,0);
	var c5 = circonferenzaTraslata(raggio,45,0,0);
	var c6 = circonferenzaTraslata(raggio,66,0,0);
	var c7 = circonferenzaTraslata(raggio,75,0,0);

	var s1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
	var outS1 = MAP(s1)(dominio2D);
	var s2 = CUBIC_HERMITE(S1)([c2,c3,[0,0,0],[0,0,0]]);
	var outS2 = MAP(s2)(dominio2D);
	var s3 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
	var outS3 = MAP(s3)(dominio2D);
	var s4 = CUBIC_HERMITE(S1)([c4,c5,[0,0,0],[0,0,0]]);
	var outS4 = MAP(s4)(dominio2D);
	var s5 = CUBIC_HERMITE(S1)([c5,c6,[0,0,0],[0,0,0]]);
	var outS5 = MAP(s5)(dominio2D);
	var s6 = CUBIC_HERMITE(S1)([c6,c7,[0,0,0],[0,0,0]]);
	var outS6 = MAP(s6)(dominio2D);

	var tappo1 = DISK([raggio])();
	var tappo2 = T([2])([75])(tappo1);

	var gamba = STRUCT([outS1,outS2,outS3,outS4,outS5,outS6,tappo2]);
	var gambaColorata = COLOR(colore)(gamba);
	return gambaColorata;

}



var getContorniDivano = function(colore){

	var contorno1Davanti = SIMPLEX_GRID([[115],[1],[-34,8]]);
	var contorno1DavantiT = T([1])([-0.5])(contorno1Davanti);

	var contorno2Dietro = T([1])([52])(contorno1DavantiT);

	var contorno1Laterale = SIMPLEX_GRID([[1],[52],[-34,8]]);
	var contorno1LateraleT = T([0])([-0.5])(contorno1Laterale);

	var contorno2Laterale = T([0])([115])(contorno1LateraleT);

	var contorni = STRUCT([contorno1DavantiT,contorno2Dietro,contorno1LateraleT,contorno2Laterale]);
	var contorniColore = COLOR(colore)(contorni);
	return contorniColore;
}




var getBraccioloDivano = function(colore){
	var domain = INTERVALS(1)(20);
	var domain2D = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(20)]);


	var pezzoDritto = SIMPLEX_GRID([[2],[3],[-66,8]]);
	var pezzoDrittoT = T([0,1])([-1,49])(pezzoDritto);

	//disegno le due curve che congiungono le due gambe
	//curva sinistra alta
	var punti1 = [[-1,49,74],[-1,1,65],[0,0,-30],[0,-30,0]];
	var c1 = CUBIC_HERMITE(S0)(punti1);
	//var outc1 = MAP(c1)(domain);
	//curva destra alta
	var punti2 = [[1,49,74],[1,1,65],[0,0,-30],[0,-30,0]];
	var c2 = CUBIC_HERMITE(S0)(punti2);
	//var outc2 = MAP(c2)(domain);

	//curva sinistra bassa
	var punti3 = [[-1,50,66],[-1,1,57],[0,0,-30],[0,-30,0]];
	var c3 = CUBIC_HERMITE(S0)(punti3);
	//var outc3 = MAP(c3)(domain);
	//curva destra bassa
	var punti4 = [[1,50,66],[1,1,57],[0,0,-30],[0,-30,0]];
	var c4 = CUBIC_HERMITE(S0)(punti4);
	//var outc4 = MAP(c4)(domain);

	//disegno superfici
	var s1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
	var outs1 = MAP(s1)(domain2D);
	var s2 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
	var outs2 = MAP(s2)(domain2D);
	var s3 = CUBIC_HERMITE(S1)([c1,c3,[0,0,0],[0,0,0]]);
	var outs3 = MAP(s3)(domain2D);
	var s4 = CUBIC_HERMITE(S1)([c2,c4,[0,0,0],[0,0,0]]);
	var outs4 = MAP(s4)(domain2D);


	var bracciolo = STRUCT([pezzoDrittoT,outs1,outs2,outs3,outs4]);
	var braccioloColorato = COLOR(colore)(bracciolo);
	return braccioloColorato;

}


var getSchienaleDivano = function(colore){
	var domain = INTERVALS(1)(20);
	var domain2D = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(20)]);

	//parte alta schienale curva esterna
	var punti1 = [[0,53,74],[115,53,74],[0,20,0],[0,-20,0]];
	var c1 = CUBIC_HERMITE(S0)(punti1);
	//parte alta schienale curva interna
	var punti2 = [[0,51,74],[115,51,74],[0,20,0],[0,-20,0]];
	var c2 = CUBIC_HERMITE(S0)(punti2);
	//parte bassa schienale curva esterna
	var punti3 = [[0,53,66],[115,53,66],[0,20,0],[0,-20,0]];
	var c3 = CUBIC_HERMITE(S0)(punti3);
	//parte bassa schienale curva interna
	var punti4 = [[0,51,66],[115,51,66],[0,20,0],[0,-20,0]];
	var c4 = CUBIC_HERMITE(S0)(punti4);

	//disegno superfici
	var s1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]);
	var outs1 = MAP(s1)(domain2D);
	var s2 = CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]);
	var outs2 = MAP(s2)(domain2D);
	var s3 = CUBIC_HERMITE(S1)([c1,c3,[0,0,0],[0,0,0]]);
	var outs3 = MAP(s3)(domain2D);
	var s4 = CUBIC_HERMITE(S1)([c2,c4,[0,0,0],[0,0,0]]);
	var outs4 = MAP(s4)(domain2D);
	

	var schienale = STRUCT([outs1,outs2,outs3,outs4]);
	var schienaleColorato = COLOR(colore)(schienale);
	return schienaleColorato;

}


var getCuscinoDivano = function(colore){
	var domain = INTERVALS(1)(32);
	var domain2D = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);
	//davanti
	var p1 = [[0,0,42],[115,0,42]];
	var c1 = BEZIER(S0)(p1);
	//dietro
	var p2 = [[0,52,42],[115,52,42]];
	var c2 = BEZIER(S0)(p2);
	//mezzo
	var p3 = [[0,25,42],[57.5,25,60],[115,25,42]];
	var c3 = BEZIER(S0)(p3);

	var out1 = MAP(BEZIER(S1)([c1,c2]))(domain2D);
	var out2 = MAP(BEZIER(S1)([c1,c3,c2]))(domain2D);


	var cuscino = STRUCT([out1,out2]);
	var cuscinoColorato = COLOR(colore)(cuscino);
	return cuscinoColorato;

}








//assemblo pezzi sedia
var rosso = normalize([153,41,35]);
var bianco = normalize([231,214,182]);
var nero = normalize([29,28,29]);



//gambe davanti
var g1 = getGambaDavantiDivano(rosso);
var g2 = T([0])([115])(g1);
//gambe dietro
var g3 = getGambaDietroDivano(rosso);
var g3T = T([1])([52])(g3);
var g4 = T([0])([115])(g3T);

//contorni sedia
var contorni = getContorniDivano(rosso);

//bracciolo
var b1 = getBraccioloDivano(rosso);
var b2 = T([0])([115])(b1);

var schienale = getSchienaleDivano(rosso);

var cuscino = getCuscinoDivano(nero);

var divano = STRUCT([g1,g2,g3T,g4,contorni,b1,b2,schienale,cuscino]);

var divanoR = R([0,1])([PI])(divano);

var divanoRT = T([0,1])([170,-340])(divanoR);





//aggiungo altro letto
//-LETTO CASTELLO--//
//-LETTO CASTELLO--//
//var rosso = normalize([153,41,35]);
//var bianco = normalize([231,214,182]);
//var nero = normalize([29,28,29]);
//var lilla = normalize([124,99,153]);
//var giallo = normalize([237,160,78]);

//gambe davanti
var g11 = getGambaLetto(rosso);
var g21 = T([0])([206])(g11);
//gambe dietro
var g31 = T([1])([88])(g11);
var g41 = T([1])([88])(g21);

var staffe1 = getStaffeAlteLetto(rosso);
var staffeBasse1 = getStaffeBasseLetto(rosso);

var rete1 = getReteLetto(nero);
var materasso1 = getMaterasso(lilla);

var cuscino1 = getCuscino(giallo);


var letto11 = STRUCT([g11,g21,g31,g41,staffe1,staffeBasse1,rete1,materasso1,cuscino1]);
var letto11R = R([0,1])([PI/2])(letto11);
var letto11RT = T([0])([-300])(letto11R);




//piano terreno
var lunghezzaPiano = 1000;
var larghezzaPiano = 1000;
var altezzaPiano = 2;
var pt = SIMPLEX_GRID([[lunghezzaPiano],[larghezzaPiano],[altezzaPiano]]);
var ptT = T([0,1,2])([-(larghezzaPiano/2),-(lunghezzaPiano/2),-altezzaPiano])(pt);
var ptTColor = COLOR(normalize([200,186,128]))(ptT);

var par1 = SIMPLEX_GRID([[2],[1000],[300]]);
var par1T = T([0,1,2])([-500,-500,-2])(par1);

var par2 = SIMPLEX_GRID([[1000],[2],[300]]);
var par2T = T([0,1,2])([-500,-500,-2])(par2);


var stanza = STRUCT([lettoCastelloT, tavoloT,lampadaT,sedia1T,divanoRT,ptTColor,par1T,par2T,letto11RT]);

DRAW(stanza);