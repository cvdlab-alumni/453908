//FRANCESCO PARIS matricola 453908
//MODELLO AEREO MACCHI 202 FOLGORE
//http://www.rcaeromodellismo.it/main/2011/macchi-202-folgore-build-log-by-daniele/


/*** function that normalizes between 0 and 1 rgb values ***/
var normalize = function(rgb){
    return [rgb[0]/255,rgb[1]/255,rgb[2]/255];
};



var domain = INTERVALS(1)(32);
var domain2 = DOMAIN([[0,1],[0,1]])([30,60]);
var domain2D = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)]);

//distanza tra le varie sezioni che formano la fusoliera
var t = 0.88


//--cono elica ---
var puntoInizioConoElica = [[0,-0.6,0],[0,-0.6,0],[0,0,0],[0,0,0]];
var cpuntoInizioConoElica = CUBIC_HERMITE(S0)(puntoInizioConoElica);




//---prima sezione--- larga 0.6 alta 0.6
var p01 = [[-0.3,0,0],[0,0,0.3],[0,0,0.5],[0.5,0,0]];
var c01 = CUBIC_HERMITE(S0)(p01);

var p11 = [[0,0,0.3],[0.3,0,0],[0.5,0,0],[0,0,-0.5]];
var c11 = CUBIC_HERMITE(S0)(p11);

var p21 = [[0.3,0,0],[0,0,-0.3],[0,0,-0.5],[-0.5,0,0]];
var c21 = CUBIC_HERMITE(S0)(p21);

var p31 = [[0,0,-0.3],[-0.3,0,0],[-0.5,0,0],[0,0,0.5]];
var c31 = CUBIC_HERMITE(S0)(p31);




//---seconda sezione --- larga 0.8, alta 1
var p02 = [[-0.4,t,0],[0,t,0.5],[0,0,1],[1,0,0]];
var c02 = CUBIC_HERMITE(S0)(p02);

var p12 = [[0,t,0.5],[0.4,t,0],[1,0,0],[0,0,-1]];
var c12 = CUBIC_HERMITE(S0)(p12);

var p22 = [[0.4,t,0],[0,t,-0.5],[0,0,-1],[-1,0,0]];
var c22 = CUBIC_HERMITE(S0)(p22);

var p32 = [[0,t,-0.5],[-0.4,t,0],[-1,0,0],[0,0,1]];
var c32 = CUBIC_HERMITE(S0)(p32);


//---terza sezione --- larga 1, alta 1.2
var p03 = [[-0.5,t*2,0],[0,t*2,0.6],[0,0,1],[1,0,0]];
var c03 = CUBIC_HERMITE(S0)(p03);

var p13 = [[0,t*2,0.6],[0.5,t*2,0],[1,0,0],[0,0,-1]];
var c13 = CUBIC_HERMITE(S0)(p13);

var p23 = [[0.5,t*2,0],[0,t*2,-0.6],[0,0,-1],[-1,0,0]];
var c23 = CUBIC_HERMITE(S0)(p23);

var p33 = [[0,t*2,-0.6],[-0.5,t*2,0],[-1,0,0],[0,0,1]];
var c33 = CUBIC_HERMITE(S0)(p33);


//---quarta sezione --- larga 1.05, alta 1.25
var p04 = [[-0.525,t*3,0],[0,t*3,0.625],[0,0,1],[1,0,0]];
var c04 = CUBIC_HERMITE(S0)(p04);

var p14 = [[0,t*3,0.625],[0.525,t*3,0],[1,0,0],[0,0,-1]];
var c14 = CUBIC_HERMITE(S0)(p14);

var p24 = [[0.525,t*3,0],[0,t*3,-0.625],[0,0,-1],[-1,0,0]];
var c24 = CUBIC_HERMITE(S0)(p24);

var p34 = [[0,t*3,-0.625],[-0.525,t*3,0],[-1,0,0],[0,0,1]];
var c34 = CUBIC_HERMITE(S0)(p34);


//---quinta sezione --- larga 1.05, alta 1.25
var p05 = [[-0.525,t*4,0],[0,t*4,0.625],[0,0,1],[1,0,0]];
var c05 = CUBIC_HERMITE(S0)(p05);

var p15 = [[0,t*4,0.625],[0.525,t*4,0],[1,0,0],[0,0,-1]];
var c15 = CUBIC_HERMITE(S0)(p15);

var p25 = [[0.525,t*4,0],[0,t*4,-0.625],[0,0,-1],[-1,0,0]];
var c25 = CUBIC_HERMITE(S0)(p25);

var p35 = [[0,t*4,-0.625],[-0.525,t*4,0],[-1,0,0],[0,0,1]];
var c35 = CUBIC_HERMITE(S0)(p35);


//---sesta sezione --- larga 1.05, alta 1.6
var p06 = [[-0.525,t*5,0],[0,t*5,0.975],[0,0,1],[1,0,0]];
var c06 = CUBIC_HERMITE(S0)(p06);

var p16 = [[0,t*5,0.975],[0.525,t*5,0],[1,0,0],[0,0,-1]];
var c16 = CUBIC_HERMITE(S0)(p16);

var p26 = [[0.525,t*5,0],[0,t*5,-0.625],[0,0,-1],[-1,0,0]];
var c26 = CUBIC_HERMITE(S0)(p26);

var p36 = [[0,t*5,-0.625],[-0.525,t*5,0],[-1,0,0],[0,0,1]];
var c36 = CUBIC_HERMITE(S0)(p36);


//---settima sezione --- larga 1.05, alta 1.5
var p07 = [[-0.525,t*6,0],[0,t*6,0.875],[0,0,1],[1,0,0]];
var c07 = CUBIC_HERMITE(S0)(p07);

var p17 = [[0,t*6,0.875],[0.525,t*6,0],[1,0,0],[0,0,-1]];
var c17 = CUBIC_HERMITE(S0)(p17);

var p27 = [[0.525,t*6,0],[0,t*6,-0.625],[0,0,-1],[-1,0,0]];
var c27 = CUBIC_HERMITE(S0)(p27);

var p37 = [[0,t*6,-0.625],[-0.525,t*6,0],[-1,0,0],[0,0,1]];
var c37 = CUBIC_HERMITE(S0)(p37);



//---ottava sezione --- larga 1, alta 1.25
var p08 = [[-0.5,t*7,0],[0,t*7,0.625],[0,0,1],[1,0,0]];
var c08 = CUBIC_HERMITE(S0)(p08);

var p18 = [[0,t*7,0.625],[0.5,t*7,0],[1,0,0],[0,0,-1]];
var c18 = CUBIC_HERMITE(S0)(p18);

var p28 = [[0.5,t*7,0],[0,t*7,-0.625],[0,0,-1],[-1,0,0]];
var c28 = CUBIC_HERMITE(S0)(p28);

var p38 = [[0,t*7,-0.625],[-0.5,t*7,0],[-1,0,0],[0,0,1]];
var c38 = CUBIC_HERMITE(S0)(p38);




//---nona sezione --- larga 0.6, alta 0.8
var p09 = [[-0.3,t*8,0],[0,t*8,0.4],[0,0,1],[1,0,0]];
var c09 = CUBIC_HERMITE(S0)(p09);

var p19 = [[0,t*8,0.4],[0.3,t*8,0],[1,0,0],[0,0,-1]];
var c19 = CUBIC_HERMITE(S0)(p19);

var p29 = [[0.3,t*8,0],[0,t*8,-0.4],[0,0,-1],[-1,0,0]];
var c29 = CUBIC_HERMITE(S0)(p29);

var p39 = [[0,t*8,-0.4],[-0.3,t*8,0],[-1,0,0],[0,0,1]];
var c39 = CUBIC_HERMITE(S0)(p39);





//---decima sezione --- larga 0.4, alta 0.4
var p010 = [[-0.2,t*9,0],[0,t*9,0.2],[0,0,0.4],[0.4,0,0]];
var c010 = CUBIC_HERMITE(S0)(p010);

var p110 = [[0,t*9,0.2],[0.2,t*9,0],[0.4,0,0],[0,0,-0.4]];
var c110 = CUBIC_HERMITE(S0)(p110);

var p210 = [[0.2,t*9,0],[0,t*9,-0.2],[0,0,-0.4],[-0.4,0,0]];
var c210 = CUBIC_HERMITE(S0)(p210);

var p310 = [[0,t*9,-0.2],[-0.2,t*9,0],[-0.4,0,0],[0,0,0.4]];
var c310 = CUBIC_HERMITE(S0)(p310);



//---undicesima sezione --- 
var p011 = [[0,t*10,0],[0,t*10,0],[0,0,0],[0,0,0]];
var c011 = CUBIC_HERMITE(S0)(p011);



//aggrego le parti della fusoliera
var sConoElica1 = MAP(CUBIC_HERMITE(S1)([c01,cpuntoInizioConoElica,[0,0,0],[0,0,0]]))(domain2);
var sConoElica2 = MAP(CUBIC_HERMITE(S1)([c11,cpuntoInizioConoElica,[0,0,0],[0,0,0]]))(domain2);
var sConoElica3 = MAP(CUBIC_HERMITE(S1)([c21,cpuntoInizioConoElica,[0,0,0],[0,0,0]]))(domain2);
var sConoElica4 = MAP(CUBIC_HERMITE(S1)([c31,cpuntoInizioConoElica,[0,0,0],[0,0,0]]))(domain2);
var conoElica = STRUCT([sConoElica1,sConoElica2,sConoElica3,sConoElica4]);
var coloreConoElica = [255,255,240];
var conoElicaColorato = COLOR(normalize(coloreConoElica))(conoElica);

var s0 = MAP(CUBIC_HERMITE(S1)([c01,c02,[0,0,0],[0,0,0]]))(domain2);
var s1 = MAP(CUBIC_HERMITE(S1)([c11,c12,[0,0,0],[0,0,0]]))(domain2);
var s2 = MAP(CUBIC_HERMITE(S1)([c21,c22,[0,0,0],[0,0,0]]))(domain2);
var s3 = MAP(CUBIC_HERMITE(S1)([c31,c32,[0,0,0],[0,0,0]]))(domain2);
var sezioneUno = STRUCT([s0,s1,s2,s3]);
var sezioneUnoColorata = COLOR(normalize([210,180,140]))(sezioneUno);

var s4 = MAP(CUBIC_HERMITE(S1)([c02,c03,[0,0,0],[0,0,0]]))(domain2);
var s5 = MAP(CUBIC_HERMITE(S1)([c12,c13,[0,0,0],[0,0,0]]))(domain2);
var s6 = MAP(CUBIC_HERMITE(S1)([c22,c23,[0,0,0],[0,0,0]]))(domain2);
var s7 = MAP(CUBIC_HERMITE(S1)([c32,c33,[0,0,0],[0,0,0]]))(domain2);
var sezioneDue = STRUCT([s4,s5,s6,s7]);
var sezioneDueColorata = COLOR(normalize([210,180,140]))(sezioneDue);

var s8 = MAP(CUBIC_HERMITE(S1)([c03,c04,[0,0,0],[0,0,0]]))(domain2);
var s9 = MAP(CUBIC_HERMITE(S1)([c13,c14,[0,0,0],[0,0,0]]))(domain2);
var s10 = MAP(CUBIC_HERMITE(S1)([c23,c24,[0,0,0],[0,0,0]]))(domain2);
var s11 = MAP(CUBIC_HERMITE(S1)([c33,c34,[0,0,0],[0,0,0]]))(domain2);
var sezioneTre = STRUCT([s8,s9,s10,s11]);
var sezioneTreColorata = COLOR(normalize([210,180,140]))(sezioneTre);

var s12 = MAP(CUBIC_HERMITE(S1)([c04,c05,[0,0,0],[0,0,0]]))(domain2);
var s13 = MAP(CUBIC_HERMITE(S1)([c14,c15,[0,0,0],[0,0,0]]))(domain2);
var s14 = MAP(CUBIC_HERMITE(S1)([c24,c25,[0,0,0],[0,0,0]]))(domain2);
var s15 = MAP(CUBIC_HERMITE(S1)([c34,c35,[0,0,0],[0,0,0]]))(domain2);
var sezioneQuattro = STRUCT([s12,s13,s14,s15]);
var sezioneQuattroColorata = COLOR(normalize([210,180,140]))(sezioneQuattro);

var s16 = MAP(CUBIC_HERMITE(S1)([c25,c26,[0,0,0],[0,0,0]]))(domain2);
var s17 = MAP(CUBIC_HERMITE(S1)([c35,c36,[0,0,0],[0,0,0]]))(domain2);
var sezioneCinque = STRUCT([s16,s17]);
var sezioneCinqueColorata = COLOR(normalize([210,180,140]))(sezioneCinque);

var s18 = MAP(CUBIC_HERMITE(S1)([c06,c07,[0,0,0],[0,0,0]]))(domain2);
var s19 = MAP(CUBIC_HERMITE(S1)([c16,c17,[0,0,0],[0,0,0]]))(domain2);
var s20 = MAP(CUBIC_HERMITE(S1)([c26,c27,[0,0,0],[0,0,0]]))(domain2);
var s21 = MAP(CUBIC_HERMITE(S1)([c36,c37,[0,0,0],[0,0,0]]))(domain2);
var sezioneSei = STRUCT([s18,s19,s20,s21]);
var sezioneSeiColorata = COLOR(normalize([210,180,140]))(sezioneSei);


var s22 = MAP(CUBIC_HERMITE(S1)([c07,c08,[0,0,0],[0,0,0]]))(domain2);
var s23 = MAP(CUBIC_HERMITE(S1)([c17,c18,[0,0,0],[0,0,0]]))(domain2);
var s24 = MAP(CUBIC_HERMITE(S1)([c27,c28,[0,0,0],[0,0,0]]))(domain2);
var s25 = MAP(CUBIC_HERMITE(S1)([c37,c38,[0,0,0],[0,0,0]]))(domain2);
var sezioneSette = STRUCT([s22,s23,s24,s25]);
var sezioneSetteColorata = COLOR(normalize([255,255,240]))(sezioneSette);



var s26 = MAP(CUBIC_HERMITE(S1)([c08,c09,[0,0,0],[0,0,0]]))(domain2);
var s27 = MAP(CUBIC_HERMITE(S1)([c18,c19,[0,0,0],[0,0,0]]))(domain2);
var s28 = MAP(CUBIC_HERMITE(S1)([c28,c29,[0,0,0],[0,0,0]]))(domain2);
var s29 = MAP(CUBIC_HERMITE(S1)([c38,c39,[0,0,0],[0,0,0]]))(domain2);
var sezioneOtto = STRUCT([s26,s27,s28,s29]);
var sezioneOttoColorata = COLOR(normalize([210,180,140]))(sezioneOtto);




var s30 = MAP(CUBIC_HERMITE(S1)([c09,c010,[0,0,0],[0,0,0]]))(domain2);
var s31 = MAP(CUBIC_HERMITE(S1)([c19,c110,[0,0,0],[0,0,0]]))(domain2);
var s32 = MAP(CUBIC_HERMITE(S1)([c29,c210,[0,0,0],[0,0,0]]))(domain2);
var s33 = MAP(CUBIC_HERMITE(S1)([c39,c310,[0,0,0],[0,0,0]]))(domain2);
var sezioneNove = STRUCT([s30,s31,s32,s33]);
var sezioneNoveColorata = COLOR(normalize([210,180,140]))(sezioneNove);



var s34 = MAP(CUBIC_HERMITE(S1)([c010,c011,[0,0,0],[0,0,0]]))(domain2);
var s35 = MAP(CUBIC_HERMITE(S1)([c110,c011,[0,0,0],[0,0,0]]))(domain2);
var s36 = MAP(CUBIC_HERMITE(S1)([c210,c011,[0,0,0],[0,0,0]]))(domain2);
var s37 = MAP(CUBIC_HERMITE(S1)([c310,c011,[0,0,0],[0,0,0]]))(domain2);
var sezioneDieci = STRUCT([s34,s35,s36,s37]);
var sezioneDieciColorata = COLOR(normalize([210,180,140]))(sezioneDieci);



var fusoliera = STRUCT([conoElicaColorato,sezioneUnoColorata,sezioneDueColorata,sezioneTreColorata,sezioneQuattroColorata,sezioneCinqueColorata,
sezioneSeiColorata,sezioneSetteColorata,sezioneOttoColorata,sezioneNoveColorata,sezioneDieciColorata]);





//---ALA---

var tala = 0.385;

var p0ala = [[1.3,0,0],[-0.4,0,-0.2],[-0.4,0,0.3],[1.3,0,0]];

var p1ala = [[1.3,tala,0],[-0.4,tala,-0.2],[-0.4,tala,0.3],[1.3,tala,0]];

var p2ala = [[1.3,tala*2,0],[-0.4,tala*2,-0.2],[-0.4,tala*21,0.3],[1.3,tala*2,0]];

var p3ala = [[1.3,tala*3,0],[-0.4,tala*3,-0.2],[-0.4,tala*3,0.3],[1.3,tala*3,0]];

var p4ala = [[1.3,tala*4,0],[-0.4,tala*4,-0.2],[-0.4,tala*4,0.3],[1.3,tala*4,0]];

var p5ala = [[1.3,tala*5,0],[-0.4,tala*5,-0.2],[-0.4,tala*5,0.3],[1.3,tala*5,0]];

var p6ala = [[1.3,tala*6,0],[-0.4,tala*6,-0.2],[-0.4,tala*6,0.3],[1.3,tala*6,0]];

var p7ala = [[1.3,tala*7,0],[-0.4,tala*7,-0.2],[-0.4,tala*7,0.3],[1.3,tala*7,0]];

var p8ala = [[1.3,tala*8,0],[-0.4,tala*8,-0.2],[-0.4,tala*8,0.3],[1.3,tala*8,0]];

var p9ala = [[1.3,tala*9,0],[-0.4,tala*9,-0.2],[-0.4,tala*9,0.3],[1.3,tala*9,0]];


var p10ala = [[0.5,tala*10,0],[0.3,tala*10,0],[0.3,tala*10,0],[0.5,tala*10,0]];

var c0ala = BEZIER(S0)(p0ala);
var c1ala = BEZIER(S0)(p1ala);
var c2ala = BEZIER(S0)(p2ala);
var c3ala = BEZIER(S0)(p3ala);
var c4ala = BEZIER(S0)(p4ala);
var c5ala = BEZIER(S0)(p5ala);
var c6ala = BEZIER(S0)(p6ala);
var c7ala = BEZIER(S0)(p7ala);
var c8ala = BEZIER(S0)(p8ala);
var c9ala = BEZIER(S0)(p9ala);
var c10ala = BEZIER(S0)(p10ala);

var curveControlloala = [c0ala, c1ala, c2ala, c3ala, c4ala, c5ala, c6ala, c7ala, c8ala, c9ala,c10ala];

var ala = MAP(BEZIER(S1)(curveControlloala))(domain2D);
var alaRuotata = R([0,1])([PI/2])(ala);
var alaRuotataTraslata = T([0,1,2])([-0.45,2.8,-0.3])(alaRuotata);
var ala2 = S([0])([-1])(alaRuotataTraslata);


var ali = STRUCT([ala2,alaRuotataTraslata]);
var aliColorate = COLOR(normalize([210,180,140]))(ali);








// --- Stabilizzatori ---
var tAlaDietro = 0.2;

var p0AlaDietro = [[0.88,0,0],[-0.4,0,-0.2],[-0.4,0,0.3],[0.88,0,0]];
var p1AlaDietro = [[0.88,tAlaDietro,0],[-0.4,tAlaDietro,-0.2],[-0.4,tAlaDietro,0.3],[0.88,tAlaDietro,0]];
var p2AlaDietro = [[0.88,tAlaDietro*2,0],[-0.4,tAlaDietro*2,-0.2],[-0.4,tAlaDietro*2,0.3],[0.88,tAlaDietro*2,0]];
var p3AlaDietro = [[0.88,tAlaDietro*3,0],[-0.4,tAlaDietro*3,-0.2],[-0.4,tAlaDietro*3,0.3],[0.88,tAlaDietro*3,0]];
var p4AlaDietro = [[0.88,tAlaDietro*4,0],[-0.4,tAlaDietro*4,-0.2],[-0.4,tAlaDietro*4,0.3],[0.88,tAlaDietro*4,0]];
var p5AlaDietro = [[0.88,tAlaDietro*5,0],[-0.4,tAlaDietro*5,-0.2],[-0.4,tAlaDietro*5,0.3],[0.88,tAlaDietro*5,0]];



var p6AlaDietro = [[0.46,tAlaDietro*6,0],[0.32,tAlaDietro*6,0],[0.32,tAlaDietro*6,0],[0.46,tAlaDietro*6,0]];


var c0AlaDietro = BEZIER(S0)(p0AlaDietro);

var c1AlaDietro = BEZIER(S0)(p1AlaDietro);

var c2AlaDietro = BEZIER(S0)(p2AlaDietro);

var c3AlaDietro = BEZIER(S0)(p3AlaDietro);

var c4AlaDietro = BEZIER(S0)(p4AlaDietro);

var c5AlaDietro = BEZIER(S0)(p5AlaDietro);

var c6AlaDietro = BEZIER(S0)(p6AlaDietro);


var curveControlloAlaDietro = [c0AlaDietro,c1AlaDietro,c2AlaDietro,c3AlaDietro,c4AlaDietro,c5AlaDietro,c6AlaDietro];

var wingAlaDietro = MAP(BEZIER(S1)(curveControlloAlaDietro))(domain2D);


var wingAlaDietroRuotata = R([0,1])([PI/2])(wingAlaDietro);


var wingAlaDietroRuotataTraslata = T([0,1,2])([-0.1,7.5,0])(wingAlaDietroRuotata);
var wingAlaDietro2 = S([0])([-1])(wingAlaDietroRuotataTraslata);

var alaDietroAlta = R([1,2])([PI/2])(wingAlaDietro);
var alaDietroAltaRuotata2 = R([0,1])([PI/2])(alaDietroAlta);

var alaDietroAltaRuotata2Traslata = T([0,1,2])([0,7.5,0])(alaDietroAltaRuotata2);

var aliDietro = STRUCT([wingAlaDietroRuotataTraslata,wingAlaDietro2,alaDietroAltaRuotata2Traslata]);

var aliDietroColorate = COLOR(normalize([210,180,140]))(aliDietro);





//--Dettagli Cabina --

var limiteQuadroPilota1 = [[-0.525,t*4,0],[0,t*4,0],[0,0,0],[0,0,0]];
var lineaLimiteQuadroPilota1 = CUBIC_HERMITE(S0)(limiteQuadroPilota1);
var limiteQuadroPilota2 = [[0,t*4,0],[0.525,t*4,0],[0,0,0],[0,0,0]];
var lineaLimiteQuadroPilota2 = CUBIC_HERMITE(S0)(limiteQuadroPilota2);



var quadroPilota1 = MAP(CUBIC_HERMITE(S1)([lineaLimiteQuadroPilota1,c05,[0,0,0],[0,0,0]]))(domain2);
var quadroPilota2 = MAP(CUBIC_HERMITE(S1)([lineaLimiteQuadroPilota2,c15,[0,0,0],[0,0,0]]))(domain2);
var quadroPilota = STRUCT([quadroPilota1,quadroPilota2]);
var quadroPilotaColor = COLOR(normalize([5,4,2]))(quadroPilota);

//vetro cabina pilota
var v1 = MAP(CUBIC_HERMITE(S1)([c05,c06,[0,0,0],[0,0,0]]))(domain2);
var v2 = MAP(CUBIC_HERMITE(S1)([c15,c16,[0,0,0],[0,0,0]]))(domain2);
var vetro = STRUCT([v1,v2]);
var vetroColorato = COLOR([17/255, 128/255, 180/255,0.5])(vetro);

//elementi quadro pilota
var cubo1 = CUBOID([0.3,0.1,0.2]);
var cubo1T = T([0,1,2])([-0.15,(t*4)-0.09,0.3])(cubo1);
var cubo1TCol = COLOR(normalize([0,71,133]))(cubo1T);

var cubo2 = CUBOID([0.15,0.1,0.15]);
var cubo2T = T([0,1,2])([-0.3,(t*4)-0.09,0.1])(cubo2);
var cubo2TCol = COLOR(normalize([190,17,16]))(cubo2T);

var cubo3TCol = T([0])([0.45])(cubo2TCol);

//cloche pilota
var dominioCirconferenza = DOMAIN([[0,2*PI]])([40]);
var dominio2D = PROD1x1([INTERVALS(2*PI)(40),INTERVALS(1)(40)]);


function circonferenzaTraslata (r, z, dx, dy) {  
  var mapping = function (v) {
    var a = v[0];
    return [dx + r*COS(a), dy + r*SIN(a), z];
  }  
  return mapping;
}

//asta della cloche
var baseAstaCloche1 = circonferenzaTraslata(0.05,0,0,0);
var baseAstaCloche2 = circonferenzaTraslata(0.05,0.35,0,0);

var astaCloche = CUBIC_HERMITE(S1)([baseAstaCloche1,baseAstaCloche2,[0,0,0],[0,0,0]]);
var outAstaCloche = MAP(astaCloche)(dominio2D);

var outAstaClocheRuotata = R([1,2])(PI/2)(outAstaCloche);
var outAstaClocheRuotataTraslata = T([1,2])([(t*4)+0.3,0.2])(outAstaClocheRuotata);

//corpo della cloche
var baseCloche1 = circonferenzaTraslata(0.07,0,0,0);
var baseCloche2 = circonferenzaTraslata(0.07,0,0.3,0);

var p1baseCloche1 = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
var c1baseCloche1 = CUBIC_HERMITE(S0)(p1baseCloche1);

var p2baseCloche2 = [[0.3,0,0],[0.3,0,0],[0,0,0],[0,0,0]];
var c2baseCloche2 = CUBIC_HERMITE(S0)(p2baseCloche2);

var tappo1 = CUBIC_HERMITE(S1)([baseCloche1,c1baseCloche1,[0,0,0],[0,0,0]]);
var outtappo1 = MAP(tappo1)(dominio2D);

var tappo2 = CUBIC_HERMITE(S1)([baseCloche2,c2baseCloche2,[0,0,0],[0,0,0]]);
var outtappo2 = MAP(tappo2)(dominio2D);

var corpoCloche = CUBIC_HERMITE(S1)([baseCloche1,baseCloche2,[0,0,-0.7],[0,0,0.7]]);
var outCorpoCloche = MAP(corpoCloche)(dominio2D);


var corpoCloche = STRUCT([outCorpoCloche, outtappo1, outtappo2]);
var corpoClocheTraslato = T([0,1,2])([-0.15,(t*4)+0.3,0.35])(corpoCloche);
var cloche = STRUCT([outAstaClocheRuotataTraslata,corpoClocheTraslato]);



var clocheColorata = COLOR(normalize([33,35,38]))(cloche);



var cabinaPilota = STRUCT([quadroPilotaColor,vetroColorato,cubo1TCol,cubo2TCol,cubo3TCol,clocheColorata]);





//---Elica ---
var puntiControlloElica1 = [[1.4,0,0],[-0.47,0,0.3],[-0.47,0,-0.1],[1.4,0,0]];
var puntiControlloElica2 = [[1.4,0,0]];

var curvaElica1 = BEZIER(S0)(puntiControlloElica1);
var curvaElica2 = BEZIER(S0)(puntiControlloElica2);

var el1 = MAP(BEZIER(S1)([curvaElica1,curvaElica2]))(domain2);
var el2 = T([0])([3])(R([0,2])(PI)(el1));


var eliche = STRUCT([el1,el2]);
var elicheTraslate = T([0])([-1.5])(eliche);

var elicheTraslateRuotate = R([0,2])([PI/4])(elicheTraslate);


//mitragliatrici
var p1ArcoMit = [[0,t,0.1],[0,t,-0.1],[1,0,0],[-1,0,0]];
var c1ArcoMit = CUBIC_HERMITE(S0)(p1ArcoMit);

var segMit = [[0,t,0.1],[0,t,-0.1],[0,0,0],[0,0,0]];
var csegMit = CUBIC_HERMITE(S0)(segMit);

var p2ArcoMit = [[0,t*2,0],[0,t*2,0],[0,0,0],[0,0,0]];
var c2ArcoMit = CUBIC_HERMITE(S0)(p2ArcoMit);

var sMitr = MAP(CUBIC_HERMITE(S1)([c1ArcoMit,c2ArcoMit,[0,0,0],[0,0,0]]))(domain2);
var sMitrColor = COLOR(normalize([210,180,140]))(sMitr);

var chiusuraInternaMit = MAP(CUBIC_HERMITE(S1)([csegMit,c1ArcoMit,[0,0,0],[0,0,0]]))(domain2);
var chiusuraInternaMitColor = COLOR(normalize([5,4,2]))(chiusuraInternaMit);

var mitragliatrice = STRUCT([sMitrColor,chiusuraInternaMitColor]);

var mitragliatriceTrasl = T([0])([0.4])(mitragliatrice);

var mitragliatrice2 = S([0])([-1])(mitragliatriceTrasl);

var mitragliatrici = STRUCT([mitragliatriceTrasl, mitragliatrice2]);




var model = STRUCT([fusoliera,aliColorate,aliDietroColorate,cabinaPilota,elicheTraslateRuotate,mitragliatrici]);
