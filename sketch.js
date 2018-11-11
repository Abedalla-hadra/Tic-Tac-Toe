
grid = new Array();
current_player = 'X'
game_is_over = false;
winner = "";
moves_count = 0;
function setup() {
	createCanvas(500, 300);
	background(125);
	strokeWeight(6);
	stroke(60);
	line(195,50,195,260);
	line(265,50,265,260);
	line(125,120,335,120);
	line(125,190,335,190);
	var x = 125;
	var y = 50;
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3;j++){
			grid.push(new gridSquare(x+70*j,y+70*i,x+70*j+70,y+70*i+70));

		}
	}
	output = select('#output');

	// textSize(25);
 //    textAlign(CENTER, CENTER);

}

function draw() {

	if(mouseIsPressed){
		if(current_player === 'X'){
			if(drawX(mouseX,mouseY) === true){
				current_player = 'O';
				moves_count++;
				result = checkIfThereIsWinner();
	            if(result === true){
					printWinner();
	            }
	            if(moves_count === 9 && result != true){
	            	// fill(20);
	            	// stroke(255);
	            	output.html("IT'S A DRAW");
					//text("IT'S A DRAW",225,25);
					noLoop();
	            }
				
			}
		}else if(current_player === 'O'){
			if(drawO(mouseX,mouseY) === true){
				current_player = 'X';
				moves_count++;
				result = checkIfThereIsWinner();
				if(result === true){
					printWinner();
				} 
				if(moves_count === 9 && result != true){
	            	// fill(20);
	            	// stroke(255);
	            	output.html("IT'S A DRAW");
					//text("IT'S A DRAW",225,25);
					noLoop();
	            }
				
			}
		}
	}
	
}

class gridSquare{
	constructor(p1x,p1y,p2x,p2y){
		this.min_x = (p1x < p2x)? p1x : p2x;
		this.min_y = (p1y < p2y)? p1y : p2y;
		this.max_x = (p1x < p2x)? p2x : p1x;
		this.max_y = (p1y < p2y)? p2y : p1y;
		this.avalible = true;
		this.symbol = "";
	}
	inBounds(x,y){
		if(x < this.max_x && x > this.min_x && y > this.min_y && y < this.max_y){
			return true;
		}
		return false;
	}

}


function drawX(x,y){
	for(var i = 0; i < 9;i++){
		if(grid[i].inBounds(x,y) && grid[i].avalible === true ){
			line(grid[i].min_x+10,grid[i].max_y-10,grid[i].max_x-10,grid[i].min_y+10);
			line(grid[i].min_x+10,grid[i].min_y+10,grid[i].max_x-10,grid[i].max_y-10);
			grid[i].avalible = false;
			grid[i].symbol = 'X';
			return true;


		}
	}
	return false;
}

function drawO(x,y){
for(var i = 0; i < 9;i++){
		if(grid[i].inBounds(x,y) && grid[i].avalible === true ){
			noFill();
			ellipse((grid[i].min_x+grid[i].max_x)/2,(grid[i].min_y+grid[i].max_y)/2,50,50);
			grid[i].avalible = false;
			grid[i].symbol = 'O';
			return true;


		}
	}
	return false;	
}

function checkIfThereIsWinner(){
	for(var i = 0; i < 3;i++){
		var O_count = 0,X_count = 0;
		for(var j = 0; j < 3;j++){
			if(grid[j+3*i].symbol === 'X'){
				X_count++;
			}else if(grid[j+3*i].symbol === 'O'){
				O_count++;
			}
		}
		if (X_count === 3) {
			winner = 'X';
			strokeWeight(3);
			stroke(60);
			line(125,50+i*70+35,335,50+i*70+35);
			return true;
		}else if(O_count === 3){
			winner = 'O';
			strokeWeight(3);
			stroke(60);
			line(125,50+i*70+35,335,50+i*70+35);
			return true;
		}
	}
	for(var i = 0; i < 3;i++){
		var O_count = 0,X_count = 0;
		for(var j = 0; j < 3;j++){
			if(grid[j*3+i].symbol === 'X'){
				X_count++;
			}else if(grid[j*3+i].symbol === 'O'){
				O_count++;
			}
		}
		if (X_count === 3) {
			winner = 'X';
			strokeWeight(3);
			stroke(60);
			line(125+i*70+34,50,125+i*70+35,260);
			return true;
		}else if(O_count === 3){
			winner = 'O';
			strokeWeight(3);
			stroke(60);
			line(125+i*70+34,50,125+i*70+35,260);
			return true;
		}
	}
	
	var O_count = 0,X_count = 0;
	for(var j = 0; j < 3;j++){
		if(grid[j*3+j].symbol === 'X'){
			X_count++;
		}else if(grid[j*3+j].symbol === 'O'){
			O_count++;
		}
	}
	if (X_count === 3) {
		winner = 'X';
		strokeWeight(3);
		stroke(60);
		line(125,50,335,260);
		return true;
	}else if(O_count === 3){
		winner = 'O';
		strokeWeight(3);
		stroke(60);
		line(125,50,335,260);
		return true;
	}
	O_count = 0;
	X_count = 0;
	if(grid[6].symbol === 'X'){
		X_count++;
	}else if(grid[6].symbol === 'O'){
		O_count++;
	}
	if(grid[4].symbol === 'X'){
		X_count++;
	}else if(grid[4].symbol === 'O'){
		O_count++;
	}
	if(grid[2].symbol === 'X'){
		X_count++;
	}else if(grid[2].symbol === 'O'){
		O_count++;
	}
	if (X_count === 3) {
		winner = 'X';
		strokeWeight(3);
		stroke(60);
		line(125,260,335,50);
		return true;
	}else if(O_count === 3){
		winner = 'O';
		strokeWeight(3);
		stroke(60);
		line(125,260,335,50);
		return true;
	}

	return false;
}

function printWinner(){
	// fill(20);
	// stroke(255);
	output.html(winner+" "+"WINNER!");
	//text(winner+" "+"WINNER!",220,25);
	noLoop();
}