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

var terrenoConLago = STRUCT([outSuperficieTerrenoColor,lagoTraslatoColorato, alberi]);
DRAW(terrenoConLago);





