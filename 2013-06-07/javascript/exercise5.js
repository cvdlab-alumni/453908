//FRANCESCO PARIS   matricola 453908

/*** function that normalizes between 0 and 1 rgb values ***/
var normalizzaColore = function(rgb){
    return [rgb[0]/255,rgb[1]/255,rgb[2]/255];
};


//idea creare una matrice quadrata (10x10) che contiene nell'elemento aij l'altezza. i e j rappresentano le coordinate y e x

var domain = INTERVALS(1)(32);
var domain2D = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);
var dominioCirconferenza = DOMAIN([[0,2*PI]])([40]);
var dominioFoglie = DOMAIN([[0,1],[0,2*PI]])([20,20]);

var matrix =[
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,40,0,0,0],
	[0,0,0,0,-5,-10,-3,-3,-8,0],
	[0,0,-2,0,0,0,-13,0,0,1],
	[0,0,0,0,25,0,0,0,0,0],
	[0,0,0,0,0,0,-7,0,0,0],
	[0,0,0,0,-7,-7,0,0,0,0],
	[0,0,0,0,0,25,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];

var curve = new Array();


var creaCurve = function(){
    
  for (i=0; i <= 9; i++ ) {
     var punto1 = new Array();
     var punto2 = new Array();
     var punto3 = new Array();
     var punto4 = new Array();
     var punto5 = new Array();
     var punto6 = new Array();
     var punto7 = new Array();
     var punto8 = new Array();
     var punto9 = new Array();
     var punto10 = new Array(); 
  	 
  	 
  	 for(j=0; j<=9; j++){  	 
  	 	if(j===0){   	 	 
  	 	 punto1.push(j);
  	 	 punto1.push(i);
  	 	 punto1.push(matrix[i][j]);  	 	
  	 	}
  	 	if(j===1){  	 	 
  	 	 punto2.push(j);
  	 	 punto2.push(i);
  	 	 punto2.push(matrix[i][j]);  	 	
  	 	}
  	 	if(j===2){  	 	 
  	 	 punto3.push(j);
  	 	 punto3.push(i);
  	 	 punto3.push(matrix[i][j]);  	 	   	 
  	    }
  	    if(j===3){  	 	 
  	 	 punto4.push(j);
  	 	 punto4.push(i);
  	 	 punto4.push(matrix[i][j]);  	 	   	 
  	    }
  	    if(j===4){  	 	 
  	 	 punto5.push(j);
  	 	 punto5.push(i);
  	 	 punto5.push(matrix[i][j]);  	 	   	 
  	    }
  	    if(j===5){  	 	 
  	 	 punto6.push(j);
  	 	 punto6.push(i);
  	 	 punto6.push(matrix[i][j]);  	 	   	 
  	    }
  	    if(j===6){  	 	 
  	 	 punto7.push(j);
  	 	 punto7.push(i);
  	 	 punto7.push(matrix[i][j]);  	 	   	 
  	    }
  	    if(j===7){  	 	 
  	 	 punto8.push(j);
  	 	 punto8.push(i);
  	 	 punto8.push(matrix[i][j]);  	 	   	 
  	    }
  	    if(j===8){  	 	 
  	 	 punto9.push(j);
  	 	 punto9.push(i);
  	 	 punto9.push(matrix[i][j]);  	 	   	 
  	    }
  	    if(j===9){  	 	 
  	 	 punto10.push(j);
  	 	 punto10.push(i);
  	 	 punto10.push(matrix[i][j]);  	 	   	 
  	    }
  	    
  	 }//fine for di j
  	 
  	 var puntiControllo = new Array();
  	 puntiControllo.push(punto1);
  	 puntiControllo.push(punto2);
  	 puntiControllo.push(punto3);
  	 puntiControllo.push(punto4);
  	 puntiControllo.push(punto5);
  	 puntiControllo.push(punto6);
  	 puntiControllo.push(punto7);
  	 puntiControllo.push(punto8);
  	 puntiControllo.push(punto9);
  	 puntiControllo.push(punto10);
  	
  	 var c = BEZIER(S0)(puntiControllo);
  	 curve.push(c); 		 
  
  }//fine for i

}//Fine funzione Crea Curve; 






var disegnaCurve = function(){
	for(i=0;i<=9;i++){
		var curva = MAP(curve[i])(domain);
		//DRAW(curva)
	}
}




//funzione che crea un albero dato il raggio del tronco, l'altezza totale dell'albero ed il raggio del cono che rappresenta le foglie
//la funzione randomicamente modifica l'altezza dell'albero ed il raggio del cono del rappresenta le foglie
var creaAlbero = function(rAlbero,altezzaAlbero, rCoronaFoglie){
	
	//tronco
	var baseAlbero = DISK([rAlbero])();
	var altezzaTronco = (altezzaAlbero/2) - (Math.random()/100);
	var troncoAlbero = EXTRUDE([altezzaTronco])(baseAlbero);
	var troncoAlberoColor = COLOR(normalizzaColore([99,51,45]))(troncoAlbero);
		
	//foglie
	var altezzaConoFoglie = altezzaAlbero - altezzaTronco;
	var raggioCoronaFoglieMod = rCoronaFoglie + (Math.random()/100);
	var baseFoglie = DISK([raggioCoronaFoglieMod])();
	var baseFoglieTrasl = T([2])([altezzaTronco])(baseFoglie);
	var puntiControllo = [[-raggioCoronaFoglieMod,raggioCoronaFoglieMod,-altezzaConoFoglie],[0,0,0]];
	var contornoFoglie = BEZIER(S0)(puntiControllo);
	var cFoglie = ROTATIONAL_SURFACE(contornoFoglie);
	var superficieFoglie = MAP(cFoglie)(dominioFoglie);
	var superficieFoglieTrasl = T([2])([altezzaConoFoglie + altezzaTronco])(superficieFoglie);
	var foglieAlbero = STRUCT([baseFoglieTrasl,superficieFoglieTrasl]);
	var foglieAlberoColor = COLOR(normalizzaColore([77,156,53]))(foglieAlbero);
	
	var result = STRUCT([troncoAlberoColor,foglieAlberoColor]);
	return result;
}//fine funzione creaAlbero






//lancio CreaCurve che inizializza l'array che contiene le varie curve di profilo
creaCurve();
//disegno le curve di livello
disegnaCurve();








//poi disegnare la superficie totale
var superficieTerreno = BEZIER(S1)([curve[0],curve[1],curve[2],curve[3],curve[4],curve[5],curve[6],curve[7],curve[8],curve[9]]);
var outSuperficieTerreno = MAP(superficieTerreno)(domain2D);
var outSuperficieTerrenoColor = COLOR(normalizzaColore([122,84,59]))(outSuperficieTerreno);


//lago
var dx = 2.4;
var dy = 2.4;
var dz = 0.01;

var lago = CUBOID([dx,dy,dz]);
//traslo il lago in corrispondenza della depressione (dove nella matrice ci sono i numeri negativi)
var lagoTraslato = T([0,1,2])([6,3.5,-0.5])(lago);
var lagoTraslatoColorato = COLOR(normalizzaColore([116,184,181]))(lagoTraslato);


//albero 
var raggioAlbero = 0.025;
var altezzaTotaleAlbero = 0.5
var raggioCoronaFoglie = 0.1

var albero0 = creaAlbero(raggioAlbero,altezzaTotaleAlbero,raggioCoronaFoglie);
var albero0T = T([0,1])([8.2,0.025])(albero0);

var albero1 = creaAlbero(raggioAlbero,altezzaTotaleAlbero,raggioCoronaFoglie);
var albero1T = T([0,1])([8.5,0.025])(albero1);

var albero2 = creaAlbero(raggioAlbero,altezzaTotaleAlbero,raggioCoronaFoglie);
var albero2T = T([0,1])([8.8,0.025])(albero2);

var albero3 = STRUCT([albero0T, albero1T, albero2T]);
var albero3T = T([1])([0.5,0.025])(albero3);

var albero4 = creaAlbero(raggioAlbero,altezzaTotaleAlbero,raggioCoronaFoglie);
var albero4T = T([0,1])([5,4])(albero4);

var albero5 = creaAlbero(raggioAlbero,altezzaTotaleAlbero,raggioCoronaFoglie);
var albero5T = T([0,1])([5,3.7])(albero5);

var albero6 = creaAlbero(raggioAlbero,altezzaTotaleAlbero,raggioCoronaFoglie);
var albero6T = T([0,1,2])([5.3,3.85,-0.1])(albero6);

var albero7 = creaAlbero(raggioAlbero,altezzaTotaleAlbero,raggioCoronaFoglie);
var albero7T = T([0,1,2])([7,7,0.05])(albero7);

var albero8T = T([0])([-0.3])(albero7T);

var albero9 = STRUCT([albero7T, albero8T]);
var albero9T = T([1,2])([-0.3,-0.2])(albero9);



var albero10 = creaAlbero(raggioAlbero,altezzaTotaleAlbero,raggioCoronaFoglie);
var albero10T = T([0,1,2])([8,8,0])(albero10);

var albero11T = T([0])([0.3])(albero10T);
var albero12T = T([0])([0.3])(albero11T);

var albero13 = STRUCT([albero10T,albero11T,albero12T]);
var albero13T = T([1])([0.3])(albero13);

var albero14 = creaAlbero(raggioAlbero,altezzaTotaleAlbero,raggioCoronaFoglie);
var albero14T = T([0,1,2])([2,1,0])(albero14);

var albero15T = T([1])([-0.3])(albero14T);
var albero16T = T([1])([-0.3])(albero15T);

var albero17 = STRUCT([albero14T,albero15T,albero16T]);
var albero17T = T([0])([0.3])(albero17);
var albero18T = T([0])([0.3])(albero17T);

var alberi = STRUCT([albero0T,albero1T, albero2T,albero3T, albero4T,albero5T,albero6T,
albero7T,albero8T, albero9T,albero10T,albero11T, albero12T, albero13T,albero14T,albero15T,
albero16T, albero17T, albero18T
]);



//edifici

//funzione che data l'altezza, la profondita' e l'altezza crea un edificio
//l'edificio casualmente puo' essere un palazzo o una casa
//l'edificio avra' una altezza di poco variabile
var creaEdificio = function(l,p, h){
	var numeroCasuale = Math.random();
	var colore = new Array();
	if(numeroCasuale <= 0.5){ //restituisco una casetta
		var hcasa = h + ((Math.random())/10);
		var punti = [[0,0],[l,0],[0,l],[l,l],[l/2,hcasa]];
		var cells = [[0,1,2],[1,3,2],[2,3,4]];
		var casa = SIMPLICIAL_COMPLEX(punti)(cells);
		var casaEstrusa = EXTRUDE([p])(casa);
		var casaEstrusaRuotata = R([1,2])(PI/2)(casaEstrusa);
		var casaEstrusaRuotataTraslata = T([1])([p])(casaEstrusaRuotata);
		var casaEstrusaRuotataTraslataColorata = COLOR(normalizzaColore([237,160,78]))(casaEstrusaRuotataTraslata)
		return casaEstrusaRuotataTraslataColorata;
	}
	if(numeroCasuale > 0.5){ //restituisco un palazzo
		var dx = l;
		var dy = p;
		var dz = h + ((Math.random())/10) + 0.05;

		var palazzo = CUBOID([dx,dy,dz]);
		var palazzoColorato = COLOR(normalizzaColore([222,154,164]))(palazzo)
		return palazzoColorato;
	}
}//fine funzione creaEdificio



//estendo la superficie
var estendo1 = SIMPLEX_GRID([[4],[9]]);
var estendo1T = T([0])([-4])(estendo1);
var estendo1TCol = COLOR(normalizzaColore([122,84,59]))(estendo1T);

var estendo2 = SIMPLEX_GRID([[13],[-9,4]]);
var estendo2T = T([0])([-4])(estendo2);
var estendo2TCol = COLOR(normalizzaColore([122,84,59]))(estendo2T);




var creaInsediamento1 = function(){
	//prima fila
	var edificio1 = creaEdificio(0.3,0.4,0.5);
	var edificio1T = T([0])([-0.5])(edificio1);
	
	var edificio2 = creaEdificio(0.3,0.4,0.5);
	var edificio2T = T([0])([-1.3])(edificio2);
	
	var edificio3 = creaEdificio(0.3,0.4,0.5);
	var edificio3T = T([0])([-2.1])(edificio3);
	
	var edificio4 = creaEdificio(0.3,0.4,0.5);
	var edificio4T = T([0])([-2.9])(edificio4);
	
	//seconda fila
	var edificio5 = creaEdificio(0.3,0.4,0.5);
	var edificio5T = T([0,1])([-0.5, 0.9])(edificio5);
	
	var edificio6 = creaEdificio(0.3,0.4,0.5);
	var edificio6T = T([0,1])([-1.3, 0.9])(edificio6);
	
	var edificio7 = creaEdificio(0.3,0.4,0.5);
	var edificio7T = T([0,1])([-2.1,0.9])(edificio7);
	
	var edificio8 = creaEdificio(0.3,0.4,0.5);
	var edificio8T = T([0,1])([-2.9,0.9])(edificio8);
	
	//terza fila
	var edificio9 = creaEdificio(0.3,0.4,0.5);
	var edificio9T = T([0,1])([-0.5, 1.8])(edificio9);
	
	var edificio10 = creaEdificio(0.3,0.4,0.5);
	var edificio10T = T([0,1])([-1.3, 1.8])(edificio10);
	
	var edificio11 = creaEdificio(0.3,0.4,0.5);
	var edificio11T = T([0,1])([-2.1, 1.8])(edificio11);
	
	var edificio12 = creaEdificio(0.3,0.4,0.5);
	var edificio12T = T([0,1])([-2.9, 1.8])(edificio12);
	
	
	var insediamento = STRUCT([edificio1T,edificio2T,edificio3T,edificio4T,
	edificio5T, edificio6T, edificio7T,edificio8T,
	edificio9T, edificio10T, edificio11T, edificio12T ]);
	
	
	return insediamento;
}


var creaInsediamento2 = function(){

	var edificio1 = creaEdificio(0.3,0.4,0.5);
	var edificio1T = T([0,1])([8.7,9.5])(edificio1);
	
	var edificio2 = creaEdificio(0.3,0.4,0.5);
	var edificio2T = T([0,1])([8.7,10.4])(edificio2);
	
	var edificio3 = creaEdificio(0.3,0.4,0.5);
	var edificio3T = T([0,1])([8.7,11.3])(edificio3);
	
	var fila1 = STRUCT([edificio1T,edificio2T, edificio3T]);
	var fila2 = T([0])([-0.8])(fila1);
	var fila3 = T([0])([-0.8])(fila2);
	var fila4 = T([0])([-0.8])(fila3);
	var fila5 = T([0])([-0.8])(fila4);
	
	var insediamento = STRUCT([fila1,fila2,fila3, fila4,fila5]);
	return insediamento;
}



insediamento1 = creaInsediamento1();
insediamento2 = creaInsediamento2();




//strade
var stradeInsediamento1 = function(){
	var s1 = SIMPLEX_GRID([[0.5],[2.2],[0.01]]);
	var s1T = T([0,2])([-1,0.01])(s1);
	var s2T = T([0])([-0.8])(s1T);
	var s3T = T([0])([-0.8])(s2T);
	
	var s4 = SIMPLEX_GRID([[0.3],[-0.4,0.5],[0.01]]);
	var s4T = T([0,2])([-0.5,0.01])(s4);
	
	var s5T = T([1])([0.9])(s4T);
	
	var sp = STRUCT([s4T,s5T]);
	var sp1 = T([0])([-0.8])(sp);
	var sp2 = T([0])([-0.8])(sp1);
	var sp3 = T([0])([-0.8])(sp2);
	
	var strada = STRUCT([s1T,s2T,s3T,sp,sp1,sp2,sp3]);
	return strada;
}

var stradeInsediamento2 = function(){
	var s1 = SIMPLEX_GRID([[0.5],[2.2],[0.01]]);
	var s1T = T([0,1,2])([8.2,9.5,0.01])(s1);
	var s2T = T([0])([-0.8])(s1T);
	var s3T = T([0])([-0.8])(s2T);
	var s4T = T([0])([-0.8])(s3T);
	
	var s5 = SIMPLEX_GRID([[0.3],[0.5],[0.01]]);
	var s5T = T([0,1,2])([8.7,9.9,0.01])(s5);
	
	var s6T = T([1])([0.9])(s5T);
	
	var sp = STRUCT([s5T,s6T]);
	var sp1 = T([0])([-0.8])(sp);
	var sp2 = T([0])([-0.8])(sp1);
	var sp3 = T([0])([-0.8])(sp2);
	var sp4 = T([0])([-0.8])(sp3);

	var strada = STRUCT([s1T,s2T,s3T,s4T,sp,sp1,sp2,sp3,sp4]);
	return strada;
}


var strada1 = stradeInsediamento1();
var strada2 = stradeInsediamento2();

var stradaCollegamento1 = SIMPLEX_GRID([[0.5],[-2.0, 8.4],[0.01]]);
var stradaCollegamento1T = T([0,2])([-1.8,0.01])(stradaCollegamento1);

var stradaCollegamento2 = SIMPLEX_GRID([[6.8],[-9.9, 0.5],[0.01]]);
var stradaCollegamento2T = T([0,2])([-1.3,0.01])(stradaCollegamento2);

//abbellisco con alberi
var albero19 = creaAlbero(raggioAlbero,altezzaTotaleAlbero,raggioCoronaFoglie);
var albero19T = T([0,1,2])([0,4,0])(albero19);
var albero20T = T([1])([0.3])(albero19T);
var albero21T = T([1])([0.3])(albero20T);
var albero22 = STRUCT([albero19T,albero20T,albero21T]);
var albero22T = T([0])([0.3])(albero22);
var albero23T = T([1])([4])(albero22T);

var alberiAbbellimento = STRUCT([albero19T,albero20T,albero21T, albero22T,albero23T]);


var model = STRUCT([outSuperficieTerrenoColor,lagoTraslatoColorato, alberi,estendo1TCol,estendo2TCol,
insediamento1, insediamento2, strada1, strada2,stradaCollegamento1T,stradaCollegamento2T,alberiAbbellimento
]);
DRAW(model);





