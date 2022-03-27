// game variables
const holes = document.querySelectorAll('.square');
const board = document.querySelector('#board');
const score = document.querySelector('#score');
const time = document.querySelector('#time');
const button = document.getElementById('play-again');
let gameInterval = null;
let totalPoints = 0;
let moleLocation = null;
let timeInterval = null;
let timeLeft = 31;

// event listener
board.addEventListener('click', handleUserSelection);

// game setup
updateScore(totalPoints);
startGame();

// functions
function moveMole(){
	holes.forEach(hole => hole.setAttribute('src', 'img/hole.png'));
	moleLocation = Math.floor(Math.random()*9);
	let randomHole = holes[moleLocation];
	randomHole.setAttribute('src', 'img/mole.png');
}

function handleUserSelection(event){
	if(event.target.id == moleLocation){
		updateScore(++totalPoints);
		moleLocation = null;
	}
}

function updateScore(num){
	score.textContent = num;
}

function countDown(){
	timeLeft--;
	time.textContent = timeLeft;

	if(timeLeft === 0){
		clearInterval(timeInterval);
		clearInterval(gameInterval);
		showPlayAgain();
	}
}

function showPlayAgain(){
	button.className = 'btn-able';
	button.addEventListener('click', startGame);
}

function startGame(){
	timeInterval = setInterval(countDown, 1000);
	gameInterval = setInterval(moveMole, 800);
	totalPoints = 0;
	timeLeft = 31;
	button.removeEventListener('click', startGame);
	button.className = 'btn-unable';
}