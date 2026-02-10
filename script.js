console.log("Your Valentine site is alive. ");

const pilePhotos = document.querySelectorAll(".spiral .card-photo");
const container = document.querySelector(".spiral");

//messy pile
pilePhotos.forEach((photo, index) => {
	const angle = (Math.random() * 30) - 15;
	const x = (Math.random() * 40) - 20;
	const y = (Math.random() * 40) - 20;

	photo.dataset.angle = angle;
	photo.dataset.x = x;
	photo.dataset.y = y;

	photo.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`;
	photo.style.zIndex = index;
});

//pick up / put down (mouse + touch)
pilePhotos.forEach(photo => { 
	// prevent ghost drag image
	photo.addEventListener("dragstart", e => e.preventDefault()); 

	// mouse click 
	photo.addEventListener("mousedown", () => { 
	photo.classList.toggle("grabbed"); }); 

	// touch tap 
	photo.addEventListener("touchstart", () => { 
		photo.classList.toggle("grabbed"); 
	});
  });


//spread-out effect
function spreadCards() {
	pilePhotos.forEach((photo, index) => {
		const spreadX = (index - pilePhotos.length / 2) * 60;
		const spreadY = (Math.random() * 20) * 10;

		photo.style.transform = `translate(-50%, -50%) translate(${spreadX}px, ${spreadY}px) rotate(${photo.dataset.angle}deg)`;
	});
};

//collapse back to messy pile
function collapseCards() {
	pilePhotos.forEach(photo => {
		photo.style.transform = `translate(-50%, -50%) translate(${photo.dataset.x}px, ${photo.dataset.y}px) rotate(${photo.dataset.angle}deg)`;
	});
}

pilePhotos.forEach(photo => {
	photo.addEventListener("click", () => {
		photo.classList.toggle("grabbed");
	});
});

//desktop hover
container.addEventListener("mouseenter", spreadCards);
container.addEventListener("mouseleave", collapseCards);

//mobile touch
container.addEventListener("touchstart", spreadCards);
container.addEventListener("touchend", collapseCards);

//phone tilt effect
window.addEventListener("deviceorientation", (event) => {
	const tilt = event.gamma;

	pilePhotos.forEach(photo => {
		const x = parseFloat(photo.dataset.x);
		const y = parseFloat(photo.dataset.y);
		const angle = parseFloat(photo.dataset.angle);

		const tiltShift = tilt * 0.5; //sensitivity

		photo.style.transform = `translate(-50%, -50%) translate(${x + tiltShift}px, ${y}px) rotate(${angle}deg)`;

	});
});

pilePhotos.forEach(photo => { 
// prevent ghost drag image 
	photo.addEventListener("dragstart", e => e.preventDefault()); 

// mouse click 
photo.addEventListener("mousedown", () => { 
photo.classList.toggle("grabbed"); }); 

// touch tap 
photo.addEventListener("touchstart", () => { 
	photo.classList.toggle("grabbed"); 
	}); 
});


//navigation
const navButtons = document.querySelectorAll('.nav button');
const allSections = document.querySelectorAll('.section');

navButtons.forEach(btn => {
	btn.addEventListener('click', () => {
		clickNormal.play();
		
	const target = btn.getAttribute('data-section');

	//reset message when leaving tab
	if (target !== "message") { 
		resetMessagePage(); 
	}

	allSections.forEach(sec => sec.classList.remove('visible'));

	document.getElementById(target).classList.add('visible');

	if (target === "photos") {
		document.querySelector(".photo-spiral").classList.add("show");
	}

  })
});

//jokes for click button
let revealStep = 0;
let jokeClicks = 0;

const jokesTier1 = [
	"Okay wow, you really like clicking.", 
	"Babe… it’s not a video game.", 
	"You’re just clicking to see if something else happens, aren’t you.",
	 "Alright calm down clicky fingers."
];1

const jokesTier2 = [
	"This button is tired. Please stop.", 
	"Sir. Sir. Please.", 
	"You’re adorable but also chaotic.", 
	"Why are you like this.",
	"Fool!"
];

const jokesTier3 = [
	"STOP. CLICKING. ME.", 
	"I swear if you click me one more time—", 
	"I’m calling tech support.",
	 "This is harassment."
];

const finalMessage = "...okay fine. You win.";

document.getElementById("revealBtn").onclick = function() {

	if(revealStep === 0) {
		clickNormal.play();
		document.getElementById("messageCard").style.display = "block";
		this.textContent = "Click again";
		revealStep = 1;
		return;
	}

	if (revealStep === 1) {
		clickNormal.play();
		document.getElementById("secret").style.display = "block";
		this.textContent = '...again'
		revealStep = 2;
		return;
	}

	
	const jokeBox = document.getElementById("jokeMessage");
	jokeBox.style.display = "block";

	jokeClicks++;

	this.classList.add("shake");
	setTimeout(() => this.classList.remove("shake"), 300);

	let joke;

	if (jokeClicks <= 4) {
		clickJoke.play();
		joke = jokesTier1[Math.floor(Math.random() * jokesTier1.length)];
	}

	else if (jokeClicks <= 8) {
		clickJoke.play();
	 	joke = jokesTier2[Math.floor(Math.random() * jokesTier2.length)];
	}
		
	else if (jokeClicks <= 12) {
		clickJoke.play();
		joke = jokesTier1[Math.floor(Math.random() * jokesTier1.length)];
	}

	else {
		clickFinal.play();
		joke = finalMessage;
	}

	jokeBox.textContent = joke;

};

function resetMessagePage() { 
	// Reset counters 
	revealStep = 0; 
	jokeClicks = 0; 

	// Hide the message card + secret 
	const messageCard = document.getElementById("messageCard"); 
	const secret = document.getElementById("secret"); 
	const jokeBox = document.getElementById("jokeMessage"); 

	if (messageCard) messageCard.style.display = "none"; 
	if (secret) secret.style.display = "none"; 
	if (jokeBox) { 
		jokeBox.style.display = "none"; 
		jokeBox.textContent = ""; 
		} 

		// Reset the button text 
		const btn = document.getElementById("revealBtn");
		 if (btn) btn.textContent = "Click me"; 
}

homeButton.addEventListener("click", () => { 
	resetMessagePage(); 
	showHome(); }); 

messageButton.addEventListener("click", () => { 
	resetMessagePage(); // optional — only if you want it fresh even when re-entering 
	showMessage(); }); 

photosButton.addEventListener("click", () => { 
	resetMessagePage();
 	showPhotos(); 
});