var winningArray = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,4,6], [2,5,8], [3,4,5], [6,7,8]];
var playerX = [
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0]
];
var playerO = [
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0]
];
function loopThrough(x){
	var indexofSquare = x;
	for(var i=0; i<winningArray.length; i++){
		for (j in winningArray[i]){
			if(winningArray[i][j] == indexofSquare){
				playerX[i][0] +=1;
			};
		};
	};
}
function loopThrougho(x){
	var indexofSquare = x;
	for(var i=0; i<winningArray.length; i++){
		for (j in winningArray[i]){
			if(winningArray[i][j] == indexofSquare){
				playerO[i][0] +=1;
			};
		};
	};
}
function checkthree(){
	for(var i = 0; i<playerX.length; i++){
		if(playerX[i][0]==3){
			console.log(  "X wins, i hate you group 5!!!");
		}
	}
	for(var i = 0; i<playerO.length; i++){
		if(playerO[i][0]==3){
			console.log(  "O wins!!!");
		}
	}
}


