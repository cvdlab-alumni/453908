//CASA 3D
//mura
var p = [   
[0,0], [1,0], [1,1], [2,1], [2,0], [3,0], [3,1], [3,3], [0,3], [0,1]
];

var c = [
[0,9,2], [0,1,2], [3,4,6], [4,5,6], [9,6,7], [9,7,8]
];

var s = SIMPLICIAL_COMPLEX(p)(c); 
var e = EXTRUDE([3])(s);

var coloreMura = COLOR([1,1,1,1])(e);

//tetto
var ptetto = [
[0,3],[3,3],[1.5,4]
];

var ctetto =[
[0,1,2]
];

var simplTetto = SIMPLICIAL_COMPLEX(ptetto)(ctetto); 
var eTetto = EXTRUDE([3])(simplTetto);

var coloreTetto = COLOR([1,0,0,1])(eTetto);

//prato

var prato = CUBOID([7,0,7]);
prato = T([0,2])([-2,-2])(prato);
var colorePrato = COLOR([0,0.545,0,1])(prato);



//unisco tetto, mura e prato
//var casa = STRUCT([e, eTetto]);
var casa = STRUCT([coloreMura, coloreTetto, colorePrato]);
DRAW(casa);