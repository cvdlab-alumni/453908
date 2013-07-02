//Francesco Paris - matricola 453908
//Vico Magistretti - Sedia 892


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




var getGambaDavanti = function(colore){
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


var getGambaDietro = function(colore){
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


var getBracciolo = function(colore){
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




var getSchienale = function(colore){
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




var getCuscino = function(colore){
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
var g1 = getGambaDavanti(rosso);
var g2 = T([0])([58])(g1);
//gambe dietro
var g3 = getGambaDietro(rosso);
var g3T = T([1])([52])(g3);
var g4 = T([0])([58])(g3T);

//contorni sedia
var contorni = getContorniSedia(rosso);

//bracciolo
var b1 = getBracciolo(rosso);
var b2 = T([0])([58])(b1);

var schienale = getSchienale(rosso);

var cuscino = getCuscino(nero);

var sedia = STRUCT([g1,g2,g3T,g4,contorni,b1,b2,schienale,cuscino]);
DRAW(sedia);




