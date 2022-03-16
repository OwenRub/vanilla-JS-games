let selectedCards = [];
let totalAttemps = 0;
let totalPairsFound = 0;
const imagesArray = [
	{
		name: 'cheeseburger',
		img: 'img/cheeseburger.png',
	},
	{
		name: 'fries',
		img: 'img/fries.png',
	},
	{
		name: 'hotdog',
		img: 'img/hotdog.png',
	},
	{
		name: 'ice-cream',
		img: 'img/ice-cream.png',
	},
	{
		name: 'milkshake',
		img: 'img/milkshake.png',
	},
	{
		name: 'pizza',
		img: 'img/pizza.png',
	},
	{
		name: 'cheeseburger',
		img: 'img/cheeseburger.png',
	},
	{
		name: 'fries',
		img: 'img/fries.png',
	},
	{
		name: 'hotdog',
		img: 'img/hotdog.png',
	},
	{
		name: 'ice-cream',
		img: 'img/ice-cream.png',
	},
	{
		name: 'milkshake',
		img: 'img/milkshake.png',
	},
	{
		name: 'pizza',
		img: 'img/pizza.png',
	}
];

setupBoard();

function setupImagesArray(){
	imagesArray.sort(() => 0.5 - Math.random());
}

function setupBoard(){
	setupImagesArray();
	document.getElementById('btn').className = 'disabled';
	totalPairsFound = 0;
	totalAttemps = 0;
	updateScore(totalAttemps);
	const board = document.querySelector('#board');
	board.innerHTML = "";
	for(let i=0; i<imagesArray.length; i++){
		board.appendChild( createCard(imagesArray[i], i) );
	}
}

function clickOnCardEvent(e){
	selectedCards.push(e.target);
	e.target.setAttribute('src', imagesArray[e.target.id].img);
	if(selectedCards.length == 2) setTimeout(checkMatch, 500);
}

function createCard(image, i){
	const card = document.createElement('img');
	card.setAttribute('src', 'img/blank.png');
	card.setAttribute('id', i);
	card.setAttribute('alt', image.name);
	card.addEventListener('click', clickOnCardEvent);
	return card;
}

function checkMatch() {
	let [cardOne, cardTwo] = selectedCards;
	if(cardOne.id == cardTwo.id){
		alert('You can´t select the same card');
		selectedCards.pop();
	}
	else if(imagesArray[cardOne.id].name == imagesArray[cardTwo.id].name){
		totalPairsFound++;
		console.log(totalPairsFound)
		handleSelectedCards(true);
	}
	else
		handleSelectedCards(false);
}

function updateScore(num){
	document.getElementById('score').innerHTML = num;
}

function handleSelectedCards(flag){
	updateScore(++totalAttemps);
	selectedCards.forEach(card => {
		if(flag){
			card.src = 'img/white.png';
			card.setAttribute('class', 'dead-img');
			card.removeEventListener('click', clickOnCardEvent);
			showPlayAgainButton();
		}
		else{
			card.src = 'img/blank.png';
		}
	});
	selectedCards = [];
}

function showPlayAgainButton(){
	console.log(totalPairsFound)
	if(totalPairsFound == 6){
		document.getElementById('btn').className = 'play-again';
		document.getElementById('btn').addEventListener('click', setupBoard);
	}
}