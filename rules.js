
1,2,3
1,4,7
1,5,9
2,5,8
3,5,6
3,6,9
4,5,6
7,8,9

0,1,2 
0,3,6 
0,4,8
1,4,7 
2,4,6
2,5,8 
3,4,5 
6,7,8 

3%3=0
4%3=1

2%3=2
1%3=1
var apple = 0;
var pineapple = false;
for(var i=0; i<block.length; i+=3){
	if(block[i]==block[i+1]==block[i+2]){
		pineapple = true;
	};
	};
for(var i=0; i<3; i++){
	if(block[i]== block[i+3] == block [i+6]){
		pineapple = true;
	};
};
if(block[0]==block[4]==block[8]){
	pineapple = true;
};
if(block[2]==block[4]==block[6]){
	pineapple = true
}
