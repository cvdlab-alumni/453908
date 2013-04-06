from pyplasm import *

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



building = STRUCT([pillars0, pillars1, pillars2,pillars3]);
VIEW(building);







