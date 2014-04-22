angular.module('tickingApp', ['ngRoute']);
angular.module('tickingApp',['ngResource']);
function TickTime($scope, $resource, $timeout){
	$scope.board = [{row:0, column:0, resident:0, xoxo:null, pos:0, wc: 0},
	{row:0, column:1, resident:0, xoxo:null, pos:1, wc: 0},
	{row:0, column:2, resident:0, xoxo:null, pos:2, wc: 0},
	{row:1, column:0, resident:0, xoxo:null, pos:3, wc: 0},
	{row:1, column:1, resident:0, xoxo:null, pos:4, wc: 0},
	{row:1, column:2, resident:0, xoxo:null, pos:5, wc: 0},
	{row:2, column:0, resident:0, xoxo:null, pos:6, wc: 0},
	{row:2, column:1, resident:0, xoxo:null, pos:7, wc: 0},
	{row:2, column:2, resident:0, xoxo:null, pos:8, wc: 0}
	];
	$scope.gameOptions = [{type: 'Difficult Computer', play: false}, {type: 'Intermediate Computer', play: false}, {type:'Easy Computer', play:false}, {type:'Two Player', play:false } ];
	$scope.clearBoard = function(x){
		var ret = "";
		if(x.column == 0){
			ret+= "leftColumn "
		}
		if(x.column == 2){
			ret+= "rightColumn ";
		};
		if( x.row == 0){
			ret+= "topLine ";
		};
		if( x.row == 2){
			ret+= "bottomLine ";
		}
		if(x.wc == 1){
			ret+= "winning ";
		}
		if(x.resident>0){
			ret += "occupied";
		}
		return ret;
	}
	var winningCombos = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,4,6], [2,5,8], [3,4,5], [6,7,8]];
	var turnCount = 1;
	var compSq = null;
	var gameOver = 0;
	$scope.choosePlay = function(x){
		if($scope.gamePlay == $scope.gameOptions[0]){
			$scope.aigameSmarter(x);
		};
		if($scope.gamePlay == $scope.gameOptions[1]){
			$scope.aigameintermediate(x);
		}
		if($scope.gamePlay == $scope.gameOptions[2]){
			$scope.aigame(x);
		};
		if($scope.gamePlay == $scope.gameOptions[3]){
			$scope.markBox(x);
		}
	}
	$scope.isaie = false;
	$scope.isaii = false;
	$scope.isaih = false;
	$scope.isnai = false;
	$scope.markBox = function(x){
		$scope.isaie = false;
		$scope.isaii = false;
		$scope.isaih = false;
		$scope.isnai = true;
		if($scope.lastWinner != 3){
			if(x.resident==0){
				turnCount +=1;
				if(turnCount%2==1){
					x.resident = 3;
					x.xoxo = "X";
					winCheck();
				}
				else{
					x.resident = 5;
					x.xoxo = "O";
					winCheck();
				};
			};
			}
		else{
			if(x.resident==0){
				turnCount +=1;
				if(turnCount%2==1){
					x.resident = 5;
					x.xoxo = "O";
					winCheck();
				}
				else{
					x.resident = 3;
					x.xoxo = "X";
					winCheck();
				};
			};
		}
	}
	$scope.aigame = function(x){
		$scope.isaie = true;
		$scope.isaii = false;
		$scope.isaih = false;
		$scope.isnai = false;
		if(gameOver ==0){
			if(x.resident==0){
				x.resident = 3;
				x.xoxo = "X";
				winCheck();
				if (gameOver == 0){
				$timeout(function(){rcomputerChoice();}, 500);
				};
			};
		}
	};
	$scope.aigameintermediate = function(x){
		$scope.isaie = false;
		$scope.isaii = true;
		$scope.isaih = false;
		$scope.isnai = false;
		if(gameOver==0){
			if(x.resident==0){
				turnCount +=2;
				x.resident = 3;
				x.xoxo = "X";
				winCheck();
				if (gameOver == 0){
				$timeout(function(){icomputerChoice();}, 500);
				};
			};
		};
	}
	$scope.aigameSmarter = function(x){
		$scope.isaie = false;
		$scope.isaii = false;
		$scope.isaih = true;
		$scope.isnai = false;
		if(gameOver==0){
			if(x.resident==0){
				turnCount +=2;
				x.resident = 3;
				x.xoxo = "X";
				winCheck();
				if (gameOver == 0){
				$timeout(function(){computerChoice();}, 500);
				};
			};
		};
	}
	//chooses a random index for the computer to play
	function rcomputerChoice(){
		do{
		compSq = Math.floor($scope.board.length*Math.random());
		}
		while ($scope.board[compSq].resident !==0);
		$scope.board[compSq].resident = 5;
		$scope.board[compSq].xoxo = "0";
		winCheck();
		
	}
	//chooses an index based on blocking and completing win
	function icomputerChoice(){
		//adds counter after executes prioritized conditions
		var turnwent = 0;
		//will chooose space to win
		for(var i=0; i<winningCombos.length; i++){
			var total = 0;
			for(var j in winningCombos[i]){
				total += $scope.board[winningCombos[i][j]].resident;
				if(total == 10){
					for(var k in winningCombos[i]){
						if($scope.board[winningCombos[i][k]].resident ==0){
							compSq = winningCombos[i][k];
							turnwent = 1;
						};
					};
				};
			};	
		};
		//will choose space to block;
		if (turnwent == 0){
			for(var i=0; i<winningCombos.length; i++){
				var total = 0;
				for(var j in winningCombos[i]){
					total += $scope.board[winningCombos[i][j]].resident;
					if(total == 6){
						for(var k in winningCombos[i]){
							if($scope.board[winningCombos[i][k]].resident ==0){
								compSq = winningCombos[i][k];
								turnwent = 1;
							};
						};
					};
				};	
			};
		};		
		//choose the center if available
		if (turnwent == 0){
			if($scope.board[4].resident ==0){
					compSq = 4;
					turnwent = 1;
			};
		};
		//chose a random square
		if (turnwent == 0){
			do{
				compSq = Math.floor($scope.board.length*Math.random());
			}
			while ($scope.board[compSq].resident !==0);
		};
		$scope.board[compSq].resident = 5;
		$scope.board[compSq].xoxo = "0";
		winCheck();
	}
	//chooses an index based on really complicated shit for the computer to play
	function computerChoice(){
		//adds counter after executes prioritized conditions
		var turnwent = 0;
		//will chooose space to win
		for(var i=0; i<winningCombos.length; i++){
			var total = 0;
			for(var j in winningCombos[i]){
				total += $scope.board[winningCombos[i][j]].resident;
				if(total == 10){
					for(var k in winningCombos[i]){
						if($scope.board[winningCombos[i][k]].resident ==0){
							compSq = winningCombos[i][k];
							turnwent = 1;
						};
					};
				};
			};	
		};
		//will choose space to block;
		if (turnwent == 0){
			for(var i=0; i<winningCombos.length; i++){
				var total = 0;
				for(var j in winningCombos[i]){
					total += $scope.board[winningCombos[i][j]].resident;
					if(total == 6){
						for(var k in winningCombos[i]){
							if($scope.board[winningCombos[i][k]].resident ==0){
								compSq = winningCombos[i][k];
								turnwent = 1;
							};
						};
					};
				};	
			};
		};
		//will choose space to fork
		if (turnwent == 0){
			var arrayone = [];
			var total = 0;
			for(var i=0; i<winningCombos.length; i++){
				total = 0;
				total = total + $scope.board[winningCombos[i][0]].resident + $scope.board[winningCombos[i][1]].resident + $scope.board[winningCombos[i][2]].resident
				if(total ==5){
					arrayone.push(winningCombos[i]);
				};
				
			};
			var commonindex = null;
			var matchArr = arrayone[0];
			for(var i=1; i<arrayone.length; i++){
				for(var j in arrayone[i]){
					if(arrayone[i][j] == matchArr[0]||arrayone[i][j] == matchArr[1]||arrayone[i][j] == matchArr[2]){
						if($scope.board[arrayone[i][j]].resident ==0){
							compSq = arrayone[i][j];
							turnwent = 1;
						};
					};
				marchArr = arrayone[i];
				};
			};
		};
		// prevent fork
		if (turnwent == 0){
			var arrayone = [];
			var total = 0;
			for(var i=0; i<winningCombos.length; i++){
				total = 0;
				total = total + $scope.board[winningCombos[i][0]].resident + $scope.board[winningCombos[i][1]].resident + $scope.board[winningCombos[i][2]].resident
				if(total ==5){
					arrayone.push(winningCombos[i]);
				};
				
			};
			var commonindex = null;
			var matchArr = arrayone[0];
			for(var i=1; i<arrayone.length; i++){
				for(var j in arrayone[i]){
					if(arrayone[i][j] == matchArr[0]||arrayone[i][j] == matchArr[1]||arrayone[i][j] == matchArr[2]){
						if($scope.board[winningCombos[i][j]].resident ==0){
									for(var l=0; l<winningCombos.length; l++){
										var totalhere = $scope.board[winningCombos[l][0]].resident + $scope.board[winningCombos[l][1]].resident + $scope.board[winningCombos[l][2]].resident;
										if(totalhere == 5){
											for(var p in winningCombos[l]){
												if((winningCombos[i][j] == winningCombos[l][p]) &&($scope.board[winningCombos[l][p]].resident == 0)) {
													compSq = winningCombos[l][p];
													turnwent = 1;
												};
											};
										};		
									};
								};
					};
				marchArr = arrayone[i];
				};
			};
		};
		//choose the center if available
		if (turnwent == 0){
			if($scope.board[4].resident ==0){
					compSq = 4;
					turnwent = 1;
			};
		};
		//choose the opposite corner
		if (turnwent == 0){
			if($scope.board[0].resident ==3){
				if($scope.board[8].resident ==0){
					compSq = 8;
					turnwent = 1;
				};
			}
			else if($scope.board[2].resident ==3){
				if($scope.board[6].resident ==0){
					compSq = 6;
					turnwent = 1;
				};
			}
			else if($scope.board[6].resident ==3){
				if($scope.board[2].resident ==0){
					compSq = 2;
					turnwent = 1;
				};
			}
			else if($scope.board[8].resident ==3){
				if($scope.board[0].resident ==0){
					compSq = 0;
					turnwent = 1;
				};
			};		
		};
		//choose an empty corner
		if (turnwent == 0){
			if($scope.board[0].resident ==0){
					compSq = 0;
					turnwent = 1;
			}
			else if($scope.board[2].resident ==0){
					compSq = 2;
					turnwent = 1;
			}
			else if($scope.board[6].resident ==0){
					compSq = 6;
					turnwent = 1;
			}
			else if($scope.board[8].resident ==0){
					compSq = 8;
					turnwent = 1;
			};
		};
		//choose an empty side
		if (turnwent == 0){
			if($scope.board[0].resident + $scope.board[1].resident + $scope.board[2].resident ==0){
					compSq = 1;
					turnwent = 1;
			}
			else if($scope.board[0].resident + $scope.board[3].resident + $scope.board[6].resident ==0){
					compSq = 3;
					turnwent = 1;
			}
			else if($scope.board[2].resident + $scope.board[5].resident + $scope.board[8].resident ==0){
					compSq = 5;
					turnwent = 1;
			}
			else if($scope.board[6].resident + $scope.board[7].resident + $scope.board[8].resident ==0){
					compSq = 7;
					turnwent = 1;
			};
		};
		//chose a random square
		if (turnwent == 0){
			do{
				compSq = Math.floor($scope.board.length*Math.random());
			}
			while ($scope.board[compSq].resident !==0);
		};
		$scope.board[compSq].resident = 5;
		$scope.board[compSq].xoxo = "0";
		winCheck();
	}
	$scope.winResult = null;
	var win = false;
	$scope.xwins = 0;
	$scope.owins = 0;
	$scope.lastWinner = null;
	function winCheck(){
		var theb = $scope.board;
		//finds win
		for( var i=0; i< winningCombos.length; i++){
			var total = 0;
			for (var j in winningCombos[i]){
				var position = winningCombos[i][j];
				total += theb[position].resident;
			};
			if(total == 9){
				var index = winningCombos[i][0];
				var index1 = winningCombos[i][1];
				var index2 = winningCombos[i][2];
				win = true;
				gameOver = 1;
				$scope.winResult = theb[index].xoxo + " WINS!!!";
				theb[index].wc = 1;
				theb[index1].wc = 1;
				theb[index2].wc = 1;
				$scope.xwins +=1;
				$scope.lastWinner = 3;
				$timeout(function(){resetBoard()}, 2000);
			};
			if(total == 15){
				var index = winningCombos[i][0];
				var index1 = winningCombos[i][1];
				var index2 = winningCombos[i][2];
				win = true;
				gameOver = 1;
				$scope.winResult = theb[index].xoxo + " WINS!!!";
				theb[index].wc = 1;
				theb[index1].wc = 1;
				theb[index2].wc = 1;
				$scope.owins +=1;
				$scope.lastWinner = 5;
				$timeout(function(){resetBoard()}, 2000);
			};
		};
		//check for tie
		var tieCheck = 0;
		var tieTot = 0;
		for( var i=0; i< winningCombos.length; i++){
			tieTot = 0;
			var tiepos = winningCombos[i];
			tieTot = theb[tiepos[0]].resident + theb[tiepos[1]].resident + theb[tiepos[2]].resident;
			if((tieTot %3 != 0) && (tieTot %5 != 0)){
				tieCheck +=1;
			};
			if(tieCheck == 8){
				gameOver = 1;
				$scope.winResult = "It's a tie!";
				$timeout(function(){resetBoard()}, 2000);
			}
		};
	};
	function resetBoard(){
		$scope.board = 
		[{row:0, column:0, resident:0, xoxo:null, pos:0, wc: 0},
		{row:0, column:1, resident:0, xoxo:null, pos:1, wc: 0},
		{row:0, column:2, resident:0, xoxo:null, pos:2, wc: 0},
		{row:1, column:0, resident:0, xoxo:null, pos:3, wc: 0},
		{row:1, column:1, resident:0, xoxo:null, pos:4, wc: 0},
		{row:1, column:2, resident:0, xoxo:null, pos:5, wc: 0},
		{row:2, column:0, resident:0, xoxo:null, pos:6, wc: 0},
		{row:2, column:1, resident:0, xoxo:null, pos:7, wc: 0},
		{row:2, column:2, resident:0, xoxo:null, pos:8, wc: 0}
		];
		gameOver = 0;
		if($scope.lastWinner == 5 && $scope.isaie==true){
			$timeout(function(){rcomputerChoice();}, 500);
		};
		if($scope.lastWinner == 5 && $scope.isaih==true){
			$timeout(function(){computerChoice();}, 500);
		};
		if($scope.lastWinner == 5 && $scope.isaii==true){
			$timeout(function(){icomputerChoice();}, 500);
		};

	}


	$scope.username = "Melanie";
	$scope.message = "hi";
	$scope.chats=[{yourName:$scope.username, yourMessage:$scope.message}];
	$scope.addChat = function(){
		console.log('executed');
		$scope.chats.push({yourName:$scope.username, yourMessage:$scope.message});
	};
	
	

	
};