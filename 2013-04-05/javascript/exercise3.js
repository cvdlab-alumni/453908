
var radius = 0.25;
var h = 3;


// annulus sector (settore di corona circolare)

function annulus_sector (alpha, r, R) {
  var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}

var circleFull = annulus_sector(2*PI, 0, radius);










//pillars0

var cylinder = EXTRUDE([h])(circleFull);
var cylinderTrasl1 = T([0,1])([2.75,0.25])(cylinder);
var cylinder2 = T([0,1])([13.15,0.25])(cylinder);
var rowCylinder = STRUCT(REPLICA(5)([cylinder2, T([1])([5])]));
var cylinderTot = STRUCT([cylinderTrasl1,cylinder2,rowCylinder]);

var cuboid = CUBOID([0.5,0.5, h]);

var cuboid1 = T([0,1])([2.5,3])(cuboid);
var cuboid2 = T([0,1])([2.5,5])(cuboid);
var cuboidRow = STRUCT(REPLICA(3)([cuboid2, T([1])([5])]));

var cuboidTot = STRUCT([cuboid1, cuboid2, cuboidRow]);


var pillars0 = STRUCT([cylinderTot, cuboidTot]);




//pillars1
var pillars1Floor2 = T([0,2])([2.5,3.2])(cuboid);

var pillars1OrFloor2 = STRUCT(REPLICA(3)([pillars1Floor2, T([1])([5])]));

var pillars2Floor2 = T([0,2])([12.9,3.2])(cuboid);
var pillars2OrFloor2 = STRUCT(REPLICA(5)([pillars2Floor2, T([1])([5])]));

//pilastro fuori quadrato
var pillars3OrFloor2 = T([0,1,2])([2.5,20,3.2])(cuboid);


var pillarsCylinderOrFloor2 = T([0,1,2])([2.75,15.25,3.2])(cylinder);

var cuboidSmall =  CUBOID([0.3,0.3, 3]);
var pillarsSmallFloor2 = T([0,1,2])([2.7,1.5,3.2])(cuboidSmall);

var cannaFumaria = CUBOID([1.2,1.5,3]);
var cannaFumariaT = T([0,1,2])([6.1,8.6,3.2])(cannaFumaria);



var pillars1 = STRUCT([pillarsSmallFloor2, pillarsCylinderOrFloor2,pillars2OrFloor2, pillars1OrFloor2,pillars3OrFloor2, cannaFumariaT]);



//pillars2  (floor3)
var pillars1OrFloor3 = T([0,2])([2.5,6.4])(cuboid);
var pillars1OrFloor3Repl = STRUCT(REPLICA(5)([pillars1OrFloor3, T([1])([5])]));

var pillars2OrFloor3 = T([0,2])([12.9,6.4])(cuboid);
var pillars2OrFloor3Repl = STRUCT(REPLICA(5)([pillars2OrFloor3, T([1])([5])]));

var cannaFumaria3 = CUBOID([1.2,1.5,3.2]);
var cannaFumaria3T = T([0,1,2])([6.1,8.6,6.2])(cannaFumaria3);


var pillars2 = STRUCT([pillars1OrFloor3Repl, pillars2OrFloor3Repl, cannaFumaria3T]);



//pillars3 (floor4)
var pillars1OrFloor4 = T([0,1,2])([2.5,10,9.6])(cuboid);
var pillars1OrFloor4Repl = STRUCT(REPLICA(3)([pillars1OrFloor4, T([1])([5])]));

var pillars2OrFloor4 = T([0,1,2])([12.9,10,9.6])(cuboid);
var pillars2OrFloor4Repl = STRUCT(REPLICA(3)([pillars2OrFloor4, T([1])([5])]));

var cannaFumaria4 = CUBOID([1.2,1.5,3]);
var cannaFumaria4T = T([0,1,2])([6.1,8.6,9.6])(cannaFumaria3);

var cuboidSmall1Floor4 = CUBOID([0.3,0.3, 3]);
var cuboidSmall1Floor4T = T([0,2])([2.5,9.6])(cuboidSmall1Floor4);
var cuboidSmall2Floor4T = T([0,1,2])([2.5,5,9.6])(cuboidSmall1Floor4);


var pillars3 = STRUCT([pillars1OrFloor4Repl,pillars2OrFloor4Repl, cuboidSmall1Floor4T,cuboidSmall2Floor4T, cannaFumaria4T]);













//floor0
var piattaformaFondamentaGrande = SIMPLEX_GRID([[15],[25.1],[0.6]]);
var floor0 = T([0,1,2])([-0.8,-1.3,-0.6])(piattaformaFondamentaGrande);

//floor1
var pianoTerrazzo = SIMPLEX_GRID([[2.2],[2.3],[-3,0.2]]);
var pianoTerrazzoT = T([0,1])([0.5,-2.3])(pianoTerrazzo);

var pianoGrande = SIMPLEX_GRID([[-3,10.4],[20.5],[-3,0.2]]);


var pianoPreScale = SIMPLEX_GRID([[3],[2.3],[-3,0.2]]);
var pianoDopoScale = SIMPLEX_GRID([[3],[-9.3,11.2],[-3,0.2]]);
var cordoloAffiancoScale = SIMPLEX_GRID([[0.5],[-2.3,7],[-3,0.2]]);
var cordoloInterno = SIMPLEX_GRID([[-2.5,0.5],[-2.3,7],[-3,0.2]]);


var floor1 = STRUCT([pianoTerrazzoT, pianoGrande, pianoPreScale, pianoDopoScale,cordoloAffiancoScale,cordoloInterno]);


//floor2
var perimetroDavanti = SIMPLEX_GRID([[13.4],[0.5],[-6.2,0.2]]);
var perimetroLaterale = SIMPLEX_GRID([[0.5],[-0.5,8.8],[-6.2,0.2]]);
var perimetroInterno = SIMPLEX_GRID([[-2.5,0.5],[-0.5,8.8],[-6.2,0.2]]);
var perimetroLaterale2 = SIMPLEX_GRID([[-12.9,0.5],[-0.5,10],[-6.2,0.2]]);

//completo
var completoPerimetroLaterale1 = SIMPLEX_GRID([[-0.5,2],[-8.55, 0.75],[-6.2,0.2]]);
var completoPerimetroLaterale2 = SIMPLEX_GRID([[3],[-9.3, 0.7],[-6.2,0.2]]);


var piano2AreaGrande = SIMPLEX_GRID([[13.4],[-10,10.5],[-6.2,0.2]]); 

var floor2 = STRUCT([perimetroDavanti, perimetroLaterale,piano2AreaGrande,perimetroInterno,perimetroLaterale2, completoPerimetroLaterale1,completoPerimetroLaterale2]);


//floor3

var areaGrandeDavanti = SIMPLEX_GRID([[13.4],[10.5],[-9.4, 0.2]]);
var areaMediaDestraScale = SIMPLEX_GRID([[-2.5,10.9],[-10.5, 10],[-9.4, 0.2]]);
//areaDietroScale
var areaDietroScaleF3 = SIMPLEX_GRID([[2.5],[-16.3,4.2],[-9.4, 0.2]]);
var cordoloLatoSxScaleF3 = SIMPLEX_GRID([[0.5],[-10.5, 5.8],[-9.4, 0.2]]);

var floor3 = STRUCT([areaGrandeDavanti,areaMediaDestraScale,areaDietroScaleF3,cordoloLatoSxScaleF3]);


//floor4
var areaPiccolaTetto = SIMPLEX_GRID([[2.8],[10],[-12.6,0.2]]);
var areaGrandeTetto = SIMPLEX_GRID([[13.4],[-10,10.5],[-12.6,0.2]]);
var bordinoDavanti = SIMPLEX_GRID([[-2.8,10.6],[0.5],[-12.6,0.2]]);
var bordinoLaterale = SIMPLEX_GRID([[-12.9,0.5],[-0.5,10],[-12.6,0.2]]);

var floor4 = STRUCT([areaPiccolaTetto,areaGrandeTetto,bordinoDavanti,bordinoLaterale]);



#floor0
piattaformaFondamentaGrande = GRID([[15],[25.1],[0.6]]);
floor0 = T([1,2,3])([-0.8,-1.3,-0.6])(piattaformaFondamentaGrande);

#floor1
pianoTerrazzo = GRID([[2.2],[2.3],[-3,0.2]]);
pianoTerrazzoT = T([1,2])([0.5,-2.3])(pianoTerrazzo);

pianoGrande = GRID([[-3,10.4],[20.5],[-3,0.2]]);


pianoPreScale = GRID([[3],[2.3],[-3,0.2]]);
pianoDopoScale = GRID([[3],[-9.3,11.2],[-3,0.2]]);
cordoloAffiancoScale = GRID([[0.5],[-2.3,7],[-3,0.2]]);
cordoloInterno = GRID([[-2.5,0.5],[-2.3,7],[-3,0.2]]);


floor1 = STRUCT([pianoTerrazzoT, pianoGrande, pianoPreScale, pianoDopoScale,cordoloAffiancoScale,cordoloInterno]);


#floor2
perimetroDavanti = GRID([[13.4],[0.5],[-6.2,0.2]]);
perimetroLaterale = GRID([[0.5],[-0.5,8.8],[-6.2,0.2]]);
perimetroInterno = GRID([[-2.5,0.5],[-0.5,8.8],[-6.2,0.2]]);
perimetroLaterale2 = GRID([[-12.9,0.5],[-0.5,10],[-6.2,0.2]]);

#completo
completoPerimetroLaterale1 = GRID([[-0.5,2],[-8.55, 0.75],[-6.2,0.2]]);
completoPerimetroLaterale2 = GRID([[3],[-9.3, 0.7],[-6.2,0.2]]);


piano2AreaGrande = GRID([[13.4],[-10,10.5],[-6.2,0.2]]); 

floor2 = STRUCT([perimetroDavanti, perimetroLaterale,piano2AreaGrande,perimetroInterno,perimetroLaterale2, completoPerimetroLaterale1,completoPerimetroLaterale2]);


#floor3

areaGrandeDavanti = GRID([[13.4],[10.5],[-9.4, 0.2]]);
areaMediaDestraScale = GRID([[-2.5,10.9],[-10.5, 10],[-9.4, 0.2]]);
#areaDietroScale
areaDietroScaleF3 = GRID([[2.5],[-16.3,4.2],[-9.4, 0.2]]);
cordoloLatoSxScaleF3 = GRID([[0.5],[-10.5, 5.8],[-9.4, 0.2]]);

floor3 = STRUCT([areaGrandeDavanti,areaMediaDestraScale,areaDietroScaleF3,cordoloLatoSxScaleF3]);


#floor4
areaPiccolaTetto = GRID([[2.8],[10],[-12.6,0.2]]);
areaGrandeTetto = GRID([[13.4],[-10,10.5],[-12.6,0.2]]);
bordinoDavanti = GRID([[-2.8,10.6],[0.5],[-12.6,0.2]]);
bordinoLaterale = GRID([[-12.9,0.5],[-0.5,10],[-12.6,0.2]]);

floor4 = STRUCT([areaPiccolaTetto,areaGrandeTetto,bordinoDavanti,bordinoLaterale]);






function cerchio (alpha, r, R) {
  var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}






//north
//piano0

var cerchio = cerchio(PI,2,2.5);

var cerchioEstruso = EXTRUDE([3])(cerchio);

var cerchioEstrusoTraslato = T([0,1])([2.5,17.75])(cerchioEstruso);

var muroFinoSettoreTondo = SIMPLEX_GRID([[0.5], [-15,2.75],[3]]);

var muroOppostoSettoreTondo =  SIMPLEX_GRID([[-4.5,0.5], [-15,2.75],[3]]);


var muroInternoPreTondo = SIMPLEX_GRID([[-8.3,1],[-3, 0.5],[3]]);



var cerchio2 = cerchio(PI,1,1.5);
var cerchioEstruso2 = EXTRUDE([3])(cerchio2);
var cerchioEstruso2R = R([1,2])(3*PI/2)(cerchioEstruso2);
var cerchioEstrusoTraslato2R = T([0,1])([9.3,4.5])(cerchioEstruso2R);

var muroDopoTondoPiccolo = SIMPLEX_GRID([[-8.3,0.5],[-5.5,5],[3]]);

var muroChiusuraSotto = SIMPLEX_GRID([[-6.8,2],[-15.5,0.5],[3]]);



var northPiano0 = STRUCT([cerchioEstrusoTraslato,muroOppostoSettoreTondo,muroFinoSettoreTondo,muroInternoPreTondo,cerchioEstrusoTraslato2R,muroDopoTondoPiccolo,muroChiusuraSotto]);

//piano 1
var facciataSpionciniNord1P1 = SIMPLEX_GRID([[-1,1.5],[-20, 0.5],[-3.2,3]]);
var facciataSottofinestaNord1P1 = SIMPLEX_GRID([[-3,10],[-20, 0.5],[-3.2,1.5]]);

var northPiano1 = STRUCT([facciataSpionciniNord1P1,facciataSottofinestaNord1P1]);

//piano 2
var facciataSpionciniNord1P2 = T([2])([3.2])(facciataSpionciniNord1P1);
var facciataSottofinestaNord1P2 = T([2])([3.2])(facciataSottofinestaNord1P1);
var northPiano2 = STRUCT([facciataSpionciniNord1P2,facciataSottofinestaNord1P2]);



//piano3
var facciataSpionciniNord1P3 = T([2])([3.2])(facciataSpionciniNord1P2);
var facciataSottofinestaNord1P3 = T([2])([3.2])(facciataSottofinestaNord1P2);
var northPiano3 = STRUCT([facciataSpionciniNord1P3,facciataSottofinestaNord1P3]);



var north = STRUCT([northPiano0,northPiano1,northPiano2,northPiano3]);

//south
//piano3
var muroTerrazzoSouth1P3 = GRID([[2.5,-0.3,10.1],[0.5],[-9.6, 1.5]]);



var southPiano3 = STRUCT([muroTerrazzoSouth1P3]);
//piano2
var facciataChiusaSouth1P2 = SIMPLEX_GRID([[2.5],[0.5],[-6.4,3]]);
var southPiano2 = STRUCT([facciataChiusaSouth1P2]);

//piano1
var muroTerrazzoSudPiano1 = SIMPLEX_GRID([[2.2],[0.2],[1.5]]);
var muroTerrazzoSudPiano1T = T([0,1,2])([0.5,-2.3,3.2])(muroTerrazzoSudPiano1);

var ringhieraTerrazzoSudPiano1 = SIMPLEX_GRID([[0.05],[2.1],[0.05]]);
var ringhieraTerrazzoSudPiano1T = T([0,1,2])([0.5,-2.1,4.5])(ringhieraTerrazzoSudPiano1);
var ringhieraTerrazzoSudPiano2T = T([0,1,2])([0.5,-2.1,4])(ringhieraTerrazzoSudPiano1);
var ringhieraTerrazzoSudPiano3T = T([0,1,2])([0.5,-2.1,3.5])(ringhieraTerrazzoSudPiano1);

var ringhieraTerrazzoSudPiano4T = T([0,1,2])([0.5+2.15,-2.1,4.5])(ringhieraTerrazzoSudPiano1);
var ringhieraTerrazzoSudPiano5T = T([0,1,2])([0.5+2.15,-2.1,4])(ringhieraTerrazzoSudPiano1);
var ringhieraTerrazzoSudPiano6T = T([0,1,2])([0.5+2.15,-2.1,3.5])(ringhieraTerrazzoSudPiano1);

var southPiano1 = STRUCT([muroTerrazzoSudPiano1T,ringhieraTerrazzoSudPiano1T,ringhieraTerrazzoSudPiano2T,ringhieraTerrazzoSudPiano3T,ringhieraTerrazzoSudPiano4T,ringhieraTerrazzoSudPiano5T,ringhieraTerrazzoSudPiano6T]);


var south = STRUCT([southPiano1, southPiano2, southPiano3]);

//east
//piano1, facciata chiusa
var facciataChiusaEst1P1 = SIMPLEX_GRID([[-12.9,0.5],[-0.5,4.5],[-3.2, 3]]);
var facciataChiusaEst2P1 = SIMPLEX_GRID([[-12.9,0.5],[-5.5,4.5],[-3.2, 3]]);
var facciataChiusaEst3P1 = SIMPLEX_GRID([[-12.9,0.5],[-15.5,4.5],[-3.2, 3]]);
var facciataChiusaSottoFinestra1P1 = SIMPLEX_GRID([[-12.9,0.5],[-10.5,4.5],[-3.2, 1.5]]);

var eastPiano1 = STRUCT([facciataChiusaEst1P1,facciataChiusaEst2P1,facciataChiusaEst3P1,facciataChiusaSottoFinestra1P1]);

//piano2, facciata chiusa
var facciataChiusaEst1P2 = T([2])([3.2])(facciataChiusaEst1P1);
var facciataChiusaEst2P2 = T([2])([3.2])(facciataChiusaEst2P1);
var facciataChiusaEst3P2 = T([2])([3.2])(facciataChiusaEst3P1);
var facciataChiusaSottoFinestra1P2 = T([2])([3.2])(facciataChiusaSottoFinestra1P1);

var eastPiano2 = STRUCT([facciataChiusaEst1P2,facciataChiusaEst2P2,facciataChiusaEst3P2,facciataChiusaSottoFinestra1P2]);

//piano3
var facciataChiusaEst1P3 = T([2])([3.2])(facciataChiusaEst3P2);
var facciataChiusaSottoFinestra1P3 = T([2])([3.2])(facciataChiusaSottoFinestra1P2);
var muroTerrazzo1P3 = SIMPLEX_GRID([[-12.9, 0.5],[10],[-9.6, 1.5]]);
var colonnaAngoloTerrazzo = CYLINDER([0.1,1.5])(20);
var colonnaAngoloTerrazzoT = T([0,1,2])([13.15,0.25,9.6+1.5])(colonnaAngoloTerrazzo);


var eastPiano3 = STRUCT([facciataChiusaEst1P3,facciataChiusaSottoFinestra1P3,muroTerrazzo1P3,colonnaAngoloTerrazzoT]);


var east = STRUCT([eastPiano1, eastPiano2,eastPiano3]);

//west
//piano0
var facciataChiusaWest1P0 = SIMPLEX_GRID([[0.5],[10.5],[3]]);
var facciataChiusaSottoFinestraPiccWest1P0 = SIMPLEX_GRID([[0.5],[-10.5, 4.5],[1.7]]);
var muroIntornoFinestraPiccWest1P0 = SIMPLEX_GRID([[0.5],[-10.5,1,-1,2.5],[-1.7,1]]);
var muroSopraFinestraPiccWest1P0 =  SIMPLEX_GRID([[0.5],[-10.5,4.5],[-2.7,0.3]]);
var westPiano0 = STRUCT([facciataChiusaWest1P0,facciataChiusaSottoFinestraPiccWest1P0,muroSopraFinestraPiccWest1P0,muroIntornoFinestraPiccWest1P0]);
//piano1 
var facciataChiusaWest1P1 = T([2])([3.2])(facciataChiusaWest1P0);
var muroSottoFinestraWest1P1 = SIMPLEX_GRID([[0.5],[-10.5,4],[-3.2,1.5]]);
var muroDopoFinestraWest1P1 = SIMPLEX_GRID([[0.5],[-14.5, 6],[-3.2,3]]);


var westPiano1 = STRUCT([facciataChiusaWest1P1,muroSottoFinestraWest1P1,muroDopoFinestraWest1P1]);
//piano2
var facciataChiusaWest1P2 = T([2])([3.2])(facciataChiusaWest1P1);
var facciataChiusaWest2P2 = SIMPLEX_GRID([[0.5],[-10.5,4.5],[-6.4, 3]]);
var muroSottoSpionciniWest1P2 = SIMPLEX_GRID([[0.5],[-15, 5.5],[-6.4, 1.5]]);
var muroSpionciniWest1P2 = SIMPLEX_GRID([[0.5],[-15,1,-0.5,1,-0.5,2.5],[-7.9, 1.5]]);

var westPiano2 = STRUCT([facciataChiusaWest1P2,facciataChiusaWest2P2,muroSottoSpionciniWest1P2,muroSpionciniWest1P2]);



//piano3
var facciataChiusaWest1P3 = T([2])([3.2])(facciataChiusaWest1P2);
var facciataChiusaWest2P3 = T([1])([10])(facciataChiusaWest1P3);
var westPiano3 = STRUCT([facciataChiusaWest1P3,facciataChiusaWest2P3]);


var west = STRUCT([westPiano0,westPiano1,westPiano2,westPiano3]);




var building = STRUCT([pillars0, pillars1, pillars2,pillars3,floor0, floor1,floor2, floor3, floor4, east, south, west, north]);
VIEW(building);
















