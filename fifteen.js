/* 								Extra Features Added to be marked
	
	- Added game logic to check if the user has won the game
		This feature will prompt the user if they have won the game.

	- Added animation for moving the puzzle pieces
	 	
*/

"use strict"; // Added to make the code more JSLint compliant
window.onload = function()
{
	var puzzlearea;
	var squares;
	var shufflebutton;
	var validMoves=[];
	var emptySpaceX = '300px'; // Initial values for the empty space
	var emptySpaceY = '300px';


	puzzlearea = document.getElementById("puzzlearea");
	squares = puzzlearea.getElementsByTagName("div");
	shufflebutton = document.getElementById("shufflebutton");
	
	initializeGrid();
	shufflebutton.onclick = shufflePieces;
	

	calcValidMoves();



	function initializeGrid()
	{

		for (var i=0; i<squares.length; i++)
		{
	 
			squares[i].className = "puzzlepiece";
			


			// Used to arrange the pieces into a grid formation
			squares[i].style.left = (i % 4 * 100) + "px";
			squares[i].style.top = (parseInt(i / 4) * 100) + "px";

			squares[i].style.backgroundPosition = "-" + squares[i].style.left + " " + "-" + squares[i].style.top;
			
			
	
			squares[i].onclick = function()
			{
			// Code to check if the piece can be moved
			if (isValidMove(this.style.left, this.style.top))
			{
				animatedSwitchPieces(parseInt(this.innerHTML-1));
			}
		};
			

			// Used to show the user if a piece can be moved when hovered
			// by changing the colour of the piece
			squares[i].onmouseover = function()
			{
			// Code to check if the piece can be moved
			if (isValidMove(this.style.left, this.style.top))
			{
				this.classList.add("movablepiece");
			}
		};

			// Used to revert the colour of the piece back to default 
			// when the user's cursor leaves the piece
			squares[i].onmouseout = function()
			{
				this.classList.remove("movablepiece");
			};
		}
	}

	// Function used to shuffle pieces 
	function shufflePieces() 
	{
		var rndNum;

		for (var i = 0; i < 150; i++) 
		{

			rndNum = Math.floor(Math.random() * validMoves.length);


			for (var x = 0; x < squares.length; x++)
			{
				if ((validMoves[rndNum][0] === parseInt(squares[x].style.left)) && 
					(validMoves[rndNum][1] === parseInt(squares[x].style.top)))
				{

					switchPieces(parseInt(squares[x].innerHTML-1));
					calcValidMoves();


					break; 
				}
			}
		}
	}

	// Animation for moving the pieces
	function animatedSwitchPieces(puzzlePiece)
	{
		var posX = squares[puzzlePiece].style.left;
	  	var posY = squares[puzzlePiece].style.top;	  	
	  	var xFinished = (squares[puzzlePiece].style.left === emptySpaceX); // Evaluates to either true or false
	  	var yFinished = (squares[puzzlePiece].style.top === emptySpaceY);
	  	
	  	var movement = setInterval(MovePiece, 1); // Executes the animation

		function MovePiece() 
		{
			if ((xFinished) && (yFinished))
			{
				emptySpaceX = posX;
				emptySpaceY = posY;
				clearInterval(movement);
				calcValidMoves();
				checkWin();
			} 
			else 
			{

				if (!(xFinished))
				{
					if (parseInt(squares[puzzlePiece].style.left) < parseInt(emptySpaceX))
					{
						squares[puzzlePiece].style.left = ((parseInt(squares[puzzlePiece].style.left) + 10) + 'px');
					}
					else
					{
						squares[puzzlePiece].style.left = ((parseInt(squares[puzzlePiece].style.left) - 10) + 'px');	
					}


					if (squares[puzzlePiece].style.left === emptySpaceX)
					{
						xFinished = true;
					}
				}


				if (!(yFinished))
				{
					if (parseInt(squares[puzzlePiece].style.top) < parseInt(emptySpaceY))
					{
						squares[puzzlePiece].style.top = ((parseInt(squares[puzzlePiece].style.top) + 10) + 'px');
					}
					else
					{
						squares[puzzlePiece].style.top = ((parseInt(squares[puzzlePiece].style.top) - 10) + 'px');	
					}


					if (squares[puzzlePiece].style.top === emptySpaceY)
					{
						yFinished = true;
					}
				}
			}
		}
	}


	function switchPieces(puzzlePiece)
	{

		var temp = squares[puzzlePiece].style.left;
		squares[puzzlePiece].style.left = emptySpaceX;
		emptySpaceX = temp;


		temp = squares[puzzlePiece].style.top;
		squares[puzzlePiece].style.top = emptySpaceY;
		emptySpaceY = temp;
	}


	function calcValidMoves()
	{

		var tempX = parseInt(emptySpaceX);
		var tempY = parseInt(emptySpaceY);


		validMoves = [];


		if (tempY != 0)
		{
			validMoves.push([tempX, tempY - 100]);
		}


		if (tempX != 300)
		{
			validMoves.push([tempX + 100, tempY]);
		}


		if (tempY != 300)
		{
			validMoves.push([tempX, tempY + 100]);
		}


		if (tempX != 0)
		{
			validMoves.push([tempX - 100, tempY]);
		}
	}

	// Checks the validMoves array 
	function isValidMove(pieceX, pieceY)
	{
		pieceX = parseInt(pieceX);
		pieceY = parseInt(pieceY);

		for (var i = 0; i < validMoves.length; i++)
		{
			if ((validMoves[i][0] === pieceX) && (validMoves[i][1] === pieceY))
			{
				return true;
			}
		}
		return false;	
	}

	// Checks if the puzzle pieces are in the correct positions 
	// to prompt the user that they have won the game
	function checkWin() 
	{
		var win = true;


		if ((emptySpaceX === "300px") && (emptySpaceY === "300px")) 
		{
			for (var i = 0; i < squares.length; i++) 
			{
				if ((squares[i].style.left !== (parseInt((i % 4) * 100) + "px")) &&
					(squares[i].style.top !== (parseInt((i / 4) * 100) + "px")))
				{
					win = false;
					break;
				}
			}
			if (win) 
			{
				gameWon();
			}
		}
	}

	// This prompts the user that they have won the game. 
	function gameWon()
	{
		alert("CONGRATS!!! YOU ARE A WINNER!!!");
	} 	
};

