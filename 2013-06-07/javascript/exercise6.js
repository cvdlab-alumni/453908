//FRANCESCO PARIS  matricola 453098
//esercizio6


//Un file object (obj) rappresenta un formato sviluppato da Wavefront Techonologies usato per definire la
//geometria a altre proprietà di oggetti grafici. Tramite questo formato possono essere elencate tutte le
//informazioni per la definizione di linee, poligoni, curve e superfici freeform. Le linee e i poligoni sono
//descritti in termini dei loro vertici mentre curve e superfici sono definite tramite speciali punti di controllo e
//altri parametri che dipendono dal tipo di curva (Bezier, B-Spline, ecc.).

//dati di ingresso
var FV = [[5,6,7,8],
[0,5,8],
[0,4,5],
[1,2,4,5],
[2,3,5,6],
[0,8,7], [3,6,7], [1,2,3], [0,1,4]
];

var V = [[0,6],
[0,0],
[3,0],
[6,0],
[0,3],
[3,3],
[6,3],
[6,6],
[3,6]];


// V-> array vertici del modello; FV ->matrice compatta delle facce 2d del modello



var lar_to_obj = function(v,fv){  	 	 
  	
  	var risultato = "#Esercizio6" +'\n';
  	//Aggiungo i vertici
  	risultato = risultato + "#Lista dei Vertici" +'\n';
  	
  	for(i=0; i < v.length; i++){  		
  		risultato = risultato + "v   " + v[i][0] + "   " + v[i][1] + "   ";
  	}
  	
  	risultato = risultato + "#Lista delle Facce" +'\n';
  	for(i=0; i < fv.length; i++){ 
  		risultato = risultato + "f   ";
  			for(j=0; j< fv[i].length; j++){ 	
  		        risultato = risultato + fv[i][j] + "   ";
  		        if(j === (fv[i].length)-1 ) 
  		        	risultato = risultato + "\n"
  			}
  	}
  	return risultato; 		 	
}//fine funzione lat_to_obj





//richiamo la funzione
var esercizio6 = lar_to_obj(V,FV);
document.write(esercizio6);

