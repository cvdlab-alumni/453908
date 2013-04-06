from pyplasm import *
GRID = COMP([INSR(PROD),AA(QUOTE)])



radius = 0.25;
h = 3;

#pillars0
cylinder = CYLINDER([radius,h])(20);
cylinderTrasl1 = T([1,2])([2.75,0.25])(cylinder);
cylinder2 = T([1,2])([13.15,0.25])(cylinder);
rowCylinder = STRUCT(NN(5)([cylinder2, T([2])([5])]));
cylinderTot = STRUCT([cylinderTrasl1,cylinder2,rowCylinder]);

cuboid = CUBOID([0.5,0.5, h]);

cuboid1 = T([1,2])([2.5,3])(cuboid);
cuboid2 = T([1,2])([2.5,5])(cuboid);
cuboidRow = STRUCT(NN(3)([cuboid2, T([2])([5])]));

cuboidTot = STRUCT([cuboid1, cuboid2, cuboidRow]);


pillars0 = STRUCT([cylinderTot, cuboidTot]);



#pillars1
pillars1Floor2 = T([1,3])([2.5,3.2])(cuboid);

pillars1OrFloor2 = STRUCT(NN(3)([pillars1Floor2, T([2])([5])]));

pillars2Floor2 = T([1,3])([12.9,3.2])(cuboid);
pillars2OrFloor2 = STRUCT(NN(5)([pillars2Floor2, T([2])([5])]));

#pilastro fuori quadrato
pillars3OrFloor2 = T([1,2,3])([2.5,20,3.2])(cuboid);


pillarsCylinderOrFloor2 = T([1,2,3])([2.75,15.25,3.2])(cylinder);

cuboidSmall =  CUBOID([0.3,0.3, 3]);
pillarsSmallFloor2 = T([1,2,3])([2.7,1.5,3.2])(cuboidSmall);

cannaFumaria = CUBOID([1.2,1.5,3]);
cannaFumariaT = T([1,2,3])([6.1,8.6,3.2])(cannaFumaria);



pillars1 = STRUCT([pillarsSmallFloor2, pillarsCylinderOrFloor2,pillars2OrFloor2, pillars1OrFloor2,pillars3OrFloor2, cannaFumariaT]);


#pillars2  (floor3)
pillars1OrFloor3 = T([1,3])([2.5,6.4])(cuboid);
pillars1OrFloor3Repl = STRUCT(NN(5)([pillars1OrFloor3, T([2])([5])]));

pillars2OrFloor3 = T([1,3])([12.9,6.4])(cuboid);
pillars2OrFloor3Repl = STRUCT(NN(5)([pillars2OrFloor3, T([2])([5])]));

cannaFumaria3 = CUBOID([1.2,1.5,3.2]);
cannaFumaria3T = T([1,2,3])([6.1,8.6,6.2])(cannaFumaria3);


pillars2 = STRUCT([pillars1OrFloor3Repl, pillars2OrFloor3Repl, cannaFumaria3T]);



#pillars3 (floor4)
pillars1OrFloor4 = T([1,2,3])([2.5,10,9.6])(cuboid);
pillars1OrFloor4Repl = STRUCT(NN(3)([pillars1OrFloor4, T([2])([5])]));

pillars2OrFloor4 = T([1,2,3])([12.9,10,9.6])(cuboid);
pillars2OrFloor4Repl = STRUCT(NN(3)([pillars2OrFloor4, T([2])([5])]));

cannaFumaria4 = CUBOID([1.2,1.5,3]);
cannaFumaria4T = T([1,2,3])([6.1,8.6,9.6])(cannaFumaria3);

cuboidSmall1Floor4 = CUBOID([0.3,0.3, 3]);
cuboidSmall1Floor4T = T([1,3])([2.5,9.6])(cuboidSmall1Floor4);
cuboidSmall2Floor4T = T([1,2,3])([2.5,5,9.6])(cuboidSmall1Floor4);


pillars3 = STRUCT([pillars1OrFloor4Repl,pillars2OrFloor4Repl, cuboidSmall1Floor4T,cuboidSmall2Floor4T, cannaFumaria4T]);





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



#stairs1
pedata = 0.5 # pedata 
alzata = 3.2/14 # alzata  
p = [[0,0],[pedata,0.2],[pedata,0.2+alzata],[0,0.2+alzata]];
c = [[1,2,3,4]];
scalino = MKPOL([p,c,None]);
scalinoEstruso = PROD([scalino,Q(2)]);
scalini = STRUCT(NN(14)([scalinoEstruso,T([1,2])([pedata,alzata])]));
#scambio assi
scalinir = MAP([S3,S1,S2])(scalini);
stairs1 = T([1,2,3])([0.5,2.3,-0.2])(scalinir);




#stair2
stair2 = T([2,3])([-0.75,3.2])(stairs1);


#strair3
stair3 = T([2,3])([7.75,3.2])(stair2);


building = STRUCT([pillars0, pillars1, pillars2,pillars3,floor0, floor1,floor2, floor3, floor4, stairs1,stair2,stair3]);
VIEW(building);









