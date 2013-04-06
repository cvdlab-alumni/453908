//non riuscita la conversione per mancanza di tempo


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











#north
#piano0
def cerchio (p):
    u,v = p
    return v*COS(u), v*SIN(u)


dom_u = INTERVALS(PI)(24)
dom_v = INTERVALS(0.5)(3)
dom = PROD([dom_u,dom_v])
domT = T([2])([2])(dom);



cerchio = MAP(cerchio)(domT);
cerchioEstruso = PROD([cerchio, Q(3)]);

cerchioEstrusoTraslato = T([1,2])([2.5,17.75])(cerchioEstruso);

muroFinoSettoreTondo = GRID([[0.5], [-15,2.75],[3]]);

muroOppostoSettoreTondo = GRID([[-4.5,0.5], [-15,2.75],[3]]);


muroInternoPreTondo = GRID([[-8.3,1],[-3, 0.5],[3]]);

def cerchio2 (p):
    u,v = p
    return v*COS(u), v*SIN(u)


dom_u2 = INTERVALS(PI)(24)
dom_v2 = INTERVALS(0.5)(3)
dom2 = PROD([dom_u2,dom_v2])
domT2 = T([2])([1])(dom2);

cerchio2 = MAP(cerchio2)(domT2);
cerchioEstruso2 = PROD([cerchio2, Q(3)]);
cerchioEstruso2R = R([1,2])(3*PI/2)(cerchioEstruso2);
cerchioEstrusoTraslato2R = T([1,2])([9.3,4.5])(cerchioEstruso2R);

muroDopoTondoPiccolo = GRID([[-8.3,0.5],[-5.5,5],[3]]);

muroChiusuraSotto = GRID([[-6.8,2],[-15.5,0.5],[3]]);



northPiano0 = STRUCT([cerchioEstrusoTraslato,muroOppostoSettoreTondo,muroFinoSettoreTondo,muroInternoPreTondo,cerchioEstrusoTraslato2R,muroDopoTondoPiccolo,muroChiusuraSotto]);

#piano 1
facciataSpionciniNord1P1 = GRID([[-1,1.5],[-20, 0.5],[-3.2,3]]);
vetroSpioncini1NordP1 = GRID([[-0.5,0.5],[-20, 0.5],[-3.2,3]]);
vetroSpioncini1NordP1Color = COLOR(BLUE)(vetroSpioncini1NordP1);

facciataSottofinestaNord1P1 = GRID([[-3,10],[-20, 0.5],[-3.2,1.5]]);

bordoSottoFinestraNord1P1 = GRID([[-3,9.9],[-20, 0.5],[-4.7,0.1]]);
bordoSottoFinestraNord1P1Color = COLOR(BLACK)(bordoSottoFinestraNord1P1);
bordoSopraFinestraNord1P1 = T([3])([1.4])(bordoSottoFinestraNord1P1Color);
vetroFinestraNord1P1 = GRID([[-3,9.9],[-20, 0.5],[-4.8,1.3]]);
vetroFinestraNord1P1Color = COLOR(BLUE)(vetroFinestraNord1P1);

finestraPiano1Nord = STRUCT([bordoSottoFinestraNord1P1Color,bordoSopraFinestraNord1P1,vetroFinestraNord1P1Color]);
northPiano1 = STRUCT([facciataSpionciniNord1P1,facciataSottofinestaNord1P1,finestraPiano1Nord,vetroSpioncini1NordP1Color]);

#piano 2
facciataSpionciniNord1P2 = T([3])([3.2])(facciataSpionciniNord1P1);
facciataSottofinestaNord1P2 = T([3])([3.2])(facciataSottofinestaNord1P1);
finestraPiano2Nord = T([3])([3.2])(finestraPiano1Nord);
vetroSpioncini1NordP2Color = T([3])([3.2])(vetroSpioncini1NordP1Color);
northPiano2 = STRUCT([facciataSpionciniNord1P2,facciataSottofinestaNord1P2,finestraPiano2Nord,vetroSpioncini1NordP2Color]);



#piano3
facciataSpionciniNord1P3 = T([3])([3.2])(facciataSpionciniNord1P2);
facciataSottofinestaNord1P3 = T([3])([3.2])(facciataSottofinestaNord1P2);
finestraPiano3Nord = T([3])([3.2])(finestraPiano2Nord);
vetroSpioncini1NordP3Color = T([3])([3.2])(vetroSpioncini1NordP2Color);
northPiano3 = STRUCT([facciataSpionciniNord1P3,facciataSottofinestaNord1P3,finestraPiano3Nord,vetroSpioncini1NordP3Color]);



north = STRUCT([northPiano0,northPiano1,northPiano2,northPiano3]);

#south
#piano3
muroTerrazzoSouth1P3 = GRID([[2.5,-0.3,10.1],[0.5],[-9.6, 1.5]]);



southPiano3 = STRUCT([muroTerrazzoSouth1P3]);
#piano2
facciataChiusaSouth1P2 = GRID([[2.5],[0.5],[-6.4,3]]);

bordoFinestra1SudP2 = GRID([[-3, 9.9],[0.5],[-6.4,0.1]]);
bordoFinestra1SudP2Color = COLOR(BLACK)(bordoFinestra1SudP2);

bordoAltoFinestraSudP2Color = T([3])([1.5])(bordoFinestra1SudP2Color);
bordoAlto2FinestraSudP2Color = T([3])([1.4])(bordoAltoFinestraSudP2Color);

vetroFinestra1SudPiano2 = GRID([[-3, 9.9],[0.5],[-6.5,1.4]]);
vetroFinestra1SudPiano2Color = COLOR(BLUE)(vetroFinestra1SudPiano2);
vetroFinestra2SudPiano2 = GRID([[-3, 9.9],[0.5],[-8,1.3]]);
vetro2Finestra1SudPiano2Color = COLOR(BLUE)(vetroFinestra2SudPiano2);

finestra1Piano2Sud = STRUCT([bordoFinestra1SudP2Color,bordoAltoFinestraSudP2Color,bordoAlto2FinestraSudP2Color,vetroFinestra1SudPiano2Color,vetro2Finestra1SudPiano2Color]);


southPiano2 = STRUCT([facciataChiusaSouth1P2,finestra1Piano2Sud]);

#piano1
bordoFinestra1SudP1 = GRID([[-3, 9.9],[0.5],[-3.2,0.1]]);
bordoFinestra1SudP1Color = COLOR(BLACK)(bordoFinestra1SudP1);

bordoAltoFinestraSudP1Color = T([3])([1.5])(bordoFinestra1SudP1Color);
bordoAlto2FinestraSudP1Color = T([3])([1.4])(bordoAltoFinestraSudP1Color);

vetroFinestra1SudPiano1 = GRID([[-3, 9.9],[0.5],[-3.3,1.4]]);
vetroFinestra1SudPiano1Color = COLOR(BLUE)(vetroFinestra1SudPiano1);
vetroFinestra2SudPiano1 = GRID([[-3, 9.9],[0.5],[-4.8,1.3]]);
vetro2Finestra1SudPiano1Color = COLOR(BLUE)(vetroFinestra2SudPiano1);

finestra1Piano1Sud = STRUCT([bordoFinestra1SudP1Color,bordoAltoFinestraSudP1Color,bordoAlto2FinestraSudP1Color,vetroFinestra1SudPiano1Color,vetro2Finestra1SudPiano1Color]);

muroTerrazzoSudPiano1 = GRID([[2.2],[0.2],[1.5]]);
muroTerrazzoSudPiano1T = T([1,2,3])([0.5,-2.3,3.2])(muroTerrazzoSudPiano1);

ringhieraTerrazzoSudPiano1 = GRID([[0.05],[2.1],[0.05]]);
ringhieraTerrazzoSudPiano1T = T([1,2,3])([0.5,-2.1,4.5])(ringhieraTerrazzoSudPiano1);
ringhieraTerrazzoSudPiano2T = T([1,2,3])([0.5,-2.1,4])(ringhieraTerrazzoSudPiano1);
ringhieraTerrazzoSudPiano3T = T([1,2,3])([0.5,-2.1,3.5])(ringhieraTerrazzoSudPiano1);

ringhieraTerrazzoSudPiano4T = T([1,2,3])([0.5+2.15,-2.1,4.5])(ringhieraTerrazzoSudPiano1);
ringhieraTerrazzoSudPiano5T = T([1,2,3])([0.5+2.15,-2.1,4])(ringhieraTerrazzoSudPiano1);
ringhieraTerrazzoSudPiano6T = T([1,2,3])([0.5+2.15,-2.1,3.5])(ringhieraTerrazzoSudPiano1);

southPiano1 = STRUCT([muroTerrazzoSudPiano1T,ringhieraTerrazzoSudPiano1T,ringhieraTerrazzoSudPiano2T,ringhieraTerrazzoSudPiano3T,ringhieraTerrazzoSudPiano4T,ringhieraTerrazzoSudPiano5T,ringhieraTerrazzoSudPiano6T,finestra1Piano1Sud]);


south = STRUCT([southPiano1, southPiano2, southPiano3]);

#east
#piano1, facciata chiusa
facciataChiusaEst1P1 = GRID([[-12.9,0.5],[-0.5,4.5],[-3.2, 3]]);
facciataChiusaEst2P1 = GRID([[-12.9,0.5],[-5.5,4.5],[-3.2, 3]]);
facciataChiusaEst3P1 = GRID([[-12.9,0.5],[-15.5,4.5],[-3.2, 3]]);
facciataChiusaSottoFinestra1P1 = GRID([[-12.9,0.5],[-10.5,4.5],[-3.2, 1.5]]);

bordoSottoFinestraEast1P1 = GRID([[-12.9,0.5],[-10.5,4.5],[-4.7, 0.1]]);
bordoSottoFinestraEast1P1Color = COLOR(BLACK)(bordoSottoFinestraEast1P1);
bordoSopraFinestraEast1P1Color = T([3])([1.4])(bordoSottoFinestraEast1P1Color);
vetroFinestraEast1P1 = GRID([[-12.9,0.5],[-10.5,4.5],[-4.8, 1.3]]);
vetroFinestraEast1P1Color = COLOR(BLUE)(vetroFinestraEast1P1);
finestraEast1Piano1 = STRUCT([bordoSottoFinestraEast1P1Color,bordoSopraFinestraEast1P1Color,vetroFinestraEast1P1Color]);

eastPiano1 = STRUCT([facciataChiusaEst1P1,facciataChiusaEst2P1,facciataChiusaEst3P1,facciataChiusaSottoFinestra1P1,finestraEast1Piano1]);

#piano2, facciata chiusa
facciataChiusaEst1P2 = T([3])([3.2])(facciataChiusaEst1P1);
facciataChiusaEst2P2 = T([3])([3.2])(facciataChiusaEst2P1);
facciataChiusaEst3P2 = T([3])([3.2])(facciataChiusaEst3P1);
facciataChiusaSottoFinestra1P2 = T([3])([3.2])(facciataChiusaSottoFinestra1P1);

finestraEast1Piano2 = T([3])([3.2])(finestraEast1Piano1);

eastPiano2 = STRUCT([facciataChiusaEst1P2,facciataChiusaEst2P2,facciataChiusaEst3P2,facciataChiusaSottoFinestra1P2,finestraEast1Piano2]);

#piano3
facciataChiusaEst1P3 = T([3])([3.2])(facciataChiusaEst3P2);
facciataChiusaSottoFinestra1P3 = T([3])([3.2])(facciataChiusaSottoFinestra1P2);
muroTerrazzo1P3 = GRID([[-12.9, 0.5],[10],[-9.6, 1.5]]);
colonnaAngoloTerrazzo = CYLINDER([0.1,1.5])(20);
colonnaAngoloTerrazzoT = T([1,2,3])([13.15,0.25,9.6+1.5])(colonnaAngoloTerrazzo);

finestraEast1Piano3 = T([3])([3.2])(finestraEast1Piano2);

eastPiano3 = STRUCT([facciataChiusaEst1P3,facciataChiusaSottoFinestra1P3,muroTerrazzo1P3,colonnaAngoloTerrazzoT,finestraEast1Piano3]);


east = STRUCT([eastPiano1, eastPiano2,eastPiano3]);

#west
#piano0
facciataChiusaWest1P0 = GRID([[0.5],[10.5],[3]]);
facciataChiusaSottoFinestraPiccWest1P0 = GRID([[0.5],[-10.5, 4.5],[1.7]]);
muroIntornoFinestraPiccWest1P0 = GRID([[0.5],[-10.5,1,-1,2.5],[-1.7,1]]);
muroSopraFinestraPiccWest1P0 =  GRID([[0.5],[-10.5,4.5],[-2.7,0.3]]);
finestra1WestPiano0 = GRID([[0.5],[-11.5,1],[-1.7,1]]);
finestra1WestPiano0Color = COLOR(BLUE)(finestra1WestPiano0);
westPiano0 = STRUCT([facciataChiusaWest1P0,facciataChiusaSottoFinestraPiccWest1P0,muroSopraFinestraPiccWest1P0,muroIntornoFinestraPiccWest1P0,finestra1WestPiano0Color]);
#piano1 
facciataChiusaWest1P1 = T([3])([3.2])(facciataChiusaWest1P0);
muroSottoFinestraWest1P1 = GRID([[0.5],[-10.5,4],[-3.2,1.5]]);
muroDopoFinestraWest1P1 = GRID([[0.5],[-14.5, 6],[-3.2,3]]);

vetroFinestra1WestPiano1 = GRID([[0.5],[-10.5,4],[-4.7,1.5]]);
vetroFinestra1WestPiano1Color = COLOR(BLUE)(vetroFinestra1WestPiano1);


westPiano1 = STRUCT([facciataChiusaWest1P1,muroSottoFinestraWest1P1,muroDopoFinestraWest1P1,vetroFinestra1WestPiano1Color]);
#piano2
facciataChiusaWest1P2 = T([3])([3.2])(facciataChiusaWest1P1);
facciataChiusaWest2P2 = GRID([[0.5],[-10.5,4.5],[-6.4, 3]]);
muroSottoSpionciniWest1P2 = GRID([[0.5],[-15, 5.5],[-6.4, 1.5]]);
muroSpionciniWest1P2 = GRID([[0.5],[-15,1,-0.5,1,-0.5,2.5],[-7.9, 1.5]]);

vetro1SpioncinoWestPiano2 = GRID([[0.5],[-16, 0.5],[-7.9,1.5]]);
vetro1SpioncinoWestPiano2Color = COLOR(BLUE)(vetro1SpioncinoWestPiano2);
vetro2SpioncinoWestPiano2Color = T([2])([1.5])(vetro1SpioncinoWestPiano2Color);


westPiano2 = STRUCT([facciataChiusaWest1P2,facciataChiusaWest2P2,muroSottoSpionciniWest1P2,muroSpionciniWest1P2,vetro1SpioncinoWestPiano2Color,vetro2SpioncinoWestPiano2Color]);



#piano3
facciataChiusaWest1P3 = T([3])([3.2])(facciataChiusaWest1P2);
facciataChiusaWest2P3 = T([2])([10])(facciataChiusaWest1P3);
westPiano3 = STRUCT([facciataChiusaWest1P3,facciataChiusaWest2P3]);


west = STRUCT([westPiano0,westPiano1,westPiano2,westPiano3]);




building = STRUCT([pillars0, pillars1, pillars2,pillars3,floor0, floor1,floor2, floor3, floor4, east, south, west, north]);
VIEW(building);

