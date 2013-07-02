//Francesco Paris - matricola 453908
//Vico Magistretti - tavolo 772

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




var getGamba = function(colore){

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
	var outc1 = MAP(c1)(domain);
	//DRAW(outc1);

	var c2 = CUBIC_HERMITE(S0)([[0,-4,75],[130,-4,75],[0,0,0],[0,0,0]]);
	var outc2 = MAP(c2)(domain);
	//DRAW(outc2);

	//linee laterali
	var c3 = CUBIC_HERMITE(S0)([[-4,0,72],[-4,85,72],[0,0,0],[0,0,0]]);
	var outc3 = MAP(c3)(domain);
	//DRAW(outc3);

	var c4 = CUBIC_HERMITE(S0)([[-4,0,75],[-4,85,75],[0,0,0],[0,0,0]]);
	var outc4 = MAP(c4)(domain);
	//DRAW(outc4);

	//linee orizzontali dietro
	var c5 = CUBIC_HERMITE(S0)([[0,89,72],[130,89,72],[0,0,0],[0,0,0]]);
	var outc5 = MAP(c5)(domain);
	//DRAW(outc5);

	var c6 = CUBIC_HERMITE(S0)([[0,89,75],[130,89,75],[0,0,0],[0,0,0]]);
	var outc6 = MAP(c6)(domain);
	//DRAW(outc6);

	//linee laterali
	var c7 = CUBIC_HERMITE(S0)([[134,0,72],[134,85,72],[0,0,0],[0,0,0]]);
	var outc7 = MAP(c7)(domain);
	//DRAW(outc7);

	var c8 = CUBIC_HERMITE(S0)([[134,0,75],[134,85,75],[0,0,0],[0,0,0]]);
	var outc8 = MAP(c8)(domain);
	//DRAW(outc8);

	//raccordi
	//c1-c3
	var c1c3 = CUBIC_HERMITE(S0)([[0,-4,72],[-4,0,72],[-8,0,0],[0,8,0]]);
	var outc1c3 = MAP(c1c3)(domain);
	//DRAW(outc1c3);

	//c2-c4
	var c2c4 = CUBIC_HERMITE(S0)([[0,-4,75],[-4,0,75],[-8,0,0],[0,8,0]]);
	var outc2c4 = MAP(c2c4)(domain);
	//DRAW(outc2c4);


	//c3-c5
	var c3c5 = CUBIC_HERMITE(S0)([[-4,85,72],[0,89,72],[0,8,0],[8,0,0]]);
	var outc3c5 = MAP(c3c5)(domain);
	//DRAW(outc3c5);

	//c4-c6
	var c4c6 = CUBIC_HERMITE(S0)([[-4,85,75],[0,89,75],[0,8,0],[8,0,0]]);
	var outc4c6 = MAP(c4c6)(domain);
	//DRAW(outc4c6);

	//c1-c7
	var c1c7 = CUBIC_HERMITE(S0)([[130,-4,72],[134,0,72],[8,0,0],[0,8,0]]);
	var outc1c7 = MAP(c1c7)(domain);
	//DRAW(outc1c7);

	//c2-c8
	var c2c8 = CUBIC_HERMITE(S0)([[130,-4,75],[134,0,75],[8,0,0],[0,8,0]]);
	var outc2c8 = MAP(c2c8)(domain);
	//DRAW(outc2c8);

	//c5-c7
	var c5c7 = CUBIC_HERMITE(S0)([[130,89,72],[134,85,72],[8,0,0],[0,-8,0]]);
	var outc5c7 = MAP(c5c7)(domain);
	//DRAW(outc5c7);

	//c6-c8
	var c6c8 = CUBIC_HERMITE(S0)([[130,89,75],[134,85,75],[8,0,0],[0,-8,0]]);
	var outc6c8 = MAP(c6c8)(domain);
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


var gamba1 = getGamba(rosso);
var gamba2 = T([0])([130])(gamba1);
var gamba3 = T([1])([85])(gamba1);
var gamba4 = T([1])([85])(gamba2);

var piano = getPianoTavolo(rosso,bianco2);

var tavolo = STRUCT([gamba1, gamba2, gamba3, gamba4, piano]);
DRAW(tavolo);