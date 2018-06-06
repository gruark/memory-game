/*
 * Create a list that holds all of your cards
 */
let deck = $('.deck');
let allCards = ["train", "bus", "ship", "bicycle", "car", "plane", "helicopter", "motorcycle", "train", "bus", "ship", "bicycle", "car", "plane", "helicopter", "motorcycle"];
let moves = 0;
const star = document.querySelectorAll(".fa-star");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

cards = shuffle(allCards);

//Initialize a new game
createDeck(cards);


// Create Deck
function createDeck(cards){
for (var i = 0; i < cards.length; i++) {
   deck.append($('<li class="card"><i class="fas fa-' + cards[i] + '"></i></li>'));
 }
 initCards(cards);
};

// Add event listeners
function initCards(cards){
  document.querySelectorAll('li.card').forEach(function(cards){
    cards.addEventListener('click', function() {
       cards.classList.toggle('open');
       cards.classList.toggle('show');
       moves++;
        });
     });
  };


// setting rates based on moves

function removeStars(moves) {
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                star[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                star[i].style.visibility = "collapse";
            }
        }
    }
  }


/*
function matchCards(cards){

}

function setTimer() {
  timer = setInterval(function(){
    time++;

  }
}
*/


/*
 * set up the event listener for a card. If a card is clicked:

 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


/*
//Set up Event Listener for a card and display Card's symbol

allCards.forEach(function(card){
    card.addEventListener('click', function cardClick(e) {
      this.classList.toggle("open");
      this.classList.toggle("show");
	       });
});


//Set timer.  Code modified from https://javascript.info/settimeout-setinterval

function initTime(){
	currentTime = setInterval(function () {
		$timer.text('${second}')
		second = second + 1
		}, 1000);
}

function resetTimer(timer) {
	if (timer) {
		clearInterval(timer);
	}
}
*/
