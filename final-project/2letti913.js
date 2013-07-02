//Francesco Paris - matricola 453908
//Vico Magistretti - Letto 913


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
};


var sfera = function(r){
	return function (v){
		var a = v[0];
  		var b = v[1];
  		return [r*SIN(a)*COS(b), r*SIN(a)*SIN(b), r*COS(a)];
	}
};





var getGamba = function(colore){

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





var getStaffeAlte = function(colore){

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




var getStaffeBasse = function(colore){
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







//assemblo i pezzi
var rosso = normalize([153,41,35]);
var bianco = normalize([231,214,182]);
var nero = normalize([29,28,29]);
var lilla = normalize([124,99,153]);
var giallo = normalize([237,160,78]);

//gambe davanti
var g1 = getGamba(rosso);
var g2 = T([0])([206])(g1);
//gambe dietro
var g3 = T([1])([88])(g1);
var g4 = T([1])([88])(g2);

var staffe = getStaffeAlte(rosso);
var staffeBasse = getStaffeBasse(rosso);

var rete = getReteLetto(nero);
var materasso = getMaterasso(lilla);

var cuscino = getCuscino(giallo);


var letto1 = STRUCT([g1,g2,g3,g4,staffe,staffeBasse,rete,materasso,cuscino]);


var scala = getScaletta(rosso);

var letto2 = T([2])([74.5])(letto1);


var model = STRUCT([letto1,letto2,scala]);
DRAW(model);
