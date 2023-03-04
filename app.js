// Grab a couple of things

const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
const button = document.querySelector('button');
let playerLives = 8;

// Link text
playerLivesCount.textContent = playerLives;

const getData = () => [
	{ imgSrc: './images/cycling.jpg', id: 1, name: 'cycling' },
	{ imgSrc: './images/piano.jpg', id: 2, name: 'piano' },
	{ imgSrc: './images/fkatwigs.jpeg', id: 3, name: 'fka twigs' },
	{ imgSrc: './images/fleetwood.jpeg', id: 4, name: 'fleetwood' },
	{ imgSrc: './images/flowers.jpg', id: 5, name: 'flowers' },
	{ imgSrc: './images/ledzep.jpeg', id: 6, name: 'led zeppelin' },
	{ imgSrc: './images/ricardo.jpg', id: 7, name: 'ricardo' },
	{ imgSrc: './images/pinkfloyd.jpeg', id: 8, name: 'pink floyd' },
	{ imgSrc: './images/cycling.jpg', id: 9, name: 'cycling' },
	{ imgSrc: './images/piano.jpg', id: 10, name: 'piano' },
	{ imgSrc: './images/fkatwigs.jpeg', id: 11, name: 'fka twigs' },
	{ imgSrc: './images/fleetwood.jpeg', id: 12, name: 'fleetwood' },
	{ imgSrc: './images/flowers.jpg', id: 13, name: 'flowers' },
	{ imgSrc: './images/ledzep.jpeg', id: 14, name: 'led zeppelin' },
	{ imgSrc: './images/ricardo.jpg', id: 15, name: 'ricardo' },
	{ imgSrc: './images/pinkfloyd.jpeg', id: 16, name: 'pink floyd' },
];

//Randomize
const randomize = () => {
	const cardData = getData();
	cardData.sort(() => Math.random() - 0.5);
	return cardData;
};

// Card Generator
const cardGenerator = () => {
	const cardData = randomize();
	console.log(cardData);

	//Generate the HTML
	cardData.forEach((item) => {
		const card = document.createElement('div');
		const face = document.createElement('img');
		const back = document.createElement('div');
		card.classList = 'card';
		face.classList = 'face';
		back.classList = 'back';
		//Attach the info to the cards
		face.src = item.imgSrc;
		card.setAttribute('name', item.name);
		//Attach the cards to the section
		section.appendChild(card);
		card.appendChild(face);
		card.appendChild(back);

		card.addEventListener('click', (e) => {
			card.classList.toggle('toggleCard');
			checkCards(e);
		});
	});
};

//Check Cards
const checkCards = (e) => {
	console.log(e);

	const clickedCard = e.target;
	console.log(clickedCard);

	clickedCard.classList.add('flipped');
	const flippedCards = document.querySelectorAll('.flipped');
	const toggleCards = document.querySelectorAll('.toggleCard');

	//Logic
	if (flippedCards.length === 2) {
		if (
			flippedCards[0].getAttribute('name') ===
			flippedCards[1].getAttribute('name')
		) {
			console.log('match');
			flippedCards.forEach((card) => {
				card.classList.remove('flipped');
				card.style.pointerEvents = 'none';
			});
		} else {
			console.log('wrong');
			flippedCards.forEach((card) => {
				card.classList.remove('flipped');
				setTimeout(() => card.classList.remove('toggleCard'), 1150);
			});
			playerLives--;
			playerLivesCount.textContent = playerLives;
			if (playerLives === 0) {
				restart('😒😮 try again!');
			}
		}
	}
	//Run a check to see if we won the game
	if (toggleCards.length === 16) {
		restart('👍❤️ you won');
	}
};

//Restart
const restart = (text) => {
	let cardData = randomize();
	let faces = document.querySelectorAll('.face');
	let cards = document.querySelectorAll('.card');
	section.style.pointerEvents = 'none';
	cardData.forEach((item, index) => {
		cards[index].classList.remove('toggleCard');
		//Randomize
		setTimeout(() => {
			cards[index].style.pointerEvents = 'all';
			faces[index].src = item.imgSrc;
			cards[index].setAttribute('name', item.name);
			section.style.pointerEvents = 'all';
		}, 1000);
	});
	playerLives = 8;
	playerLivesCount.textContent = playerLives;
	setTimeout(() => alert(text), 100);
};

//Restart button message
button.addEventListener('click', () => alert('Aaand try again👌'));
cardGenerator();
