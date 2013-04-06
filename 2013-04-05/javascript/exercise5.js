
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


















//stairs1
var pedata = 0.5; //pedata 
var alzata = 3.2/14; // alzata  
var p = [[0,0],[pedata,0.2],[pedata,0.2+alzata],[0,0.2+alzata]];
var c = [[0,1,3],[1,2,3]];
var scalino = SIMPLICIAL_COMPLEX(p)(c);
var scalinoEstruso = EXTRUDE([2])(scalino);
var scalini = STRUCT(REPLICA(14)([scalinoEstruso,T([0,1])([pedata,alzata])]));
//doppia rotazione per sistemare la scala
var scalinir = R([1,2])([PI/2])(scalini);
var scalinirr = R([0,1])([PI/2])(scalinir);
var  stairs1= T([0,1,2])([0.5,2.3,-0.2])(scalinirr);

//stair2
var stair2 = T([1,2])([-0.75,3.2])(stairs1);

//strair3
var stair3 = T([1,2])([7.75,3.2])(stair2);






var building = STRUCT([pillars0, pillars1, pillars2,pillars3,floor0, floor1,floor2, floor3, floor4, stairs1,stair2,stair3]);
DRAW(building);







