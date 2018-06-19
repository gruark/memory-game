/*
 * Create a list that holds all of your cards
 */
const allCards = ["train", "bus", "ship", "bicycle", "car", "plane", "helicopter", "motorcycle", "train", "bus", "ship", "bicycle", "car", "plane", "helicopter", "motorcycle"];

//Additional Global variables
  let moves = 0;
  let matchedCards = [];
  let open = [];
  let totalSeconds = 0;
  const star = document.querySelectorAll('.fa-star');
  let stars = 3;
  document.querySelector('.fa-redo').addEventListener('click', resetGame);
  document.querySelector('.modalRestart').addEventListener('click', playAgain);


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

//Shuffles deck cards and prepares for a new game

function newGame(){
  deck = shuffle(allCards);
  initCards(deck);
  sec = 0;
  min = 0;
  moves = 0;
  resetMoves(moves);
  matchedCards = [];
  open = [];
};

// Create Deck by adding each card dynamically and adding event listeners

function initCards(deck){
for (var i = 0; i < deck.length; i++) {
   $('.deck').append($('<li class="card"><i class="fas fa-' + deck[i] + '"></i></li>'));
 }
document.querySelectorAll('li.card').forEach(function(card){
    card.addEventListener('click', function() {
       card.classList.add('open');
       matchCards(card);
        });
     });
    startTimer();
  }


 // Open two cards and determine whether there's a match

function matchCards(card){
  if(!card.classList.contains('show')){
  open.push(card.firstChild.classList[1]);
     card.classList.add('show');
	if(open.length === 2){
       if(open[0] === open[1]){
         match(open);
         open = [];
         moves++;
         gameOver();
    	   }
	     else{
         moves++;
         setTimeout(noMatch, 500);
         open = [];
      }
    }
   else if (open.length > 2){  // Clear array in the case more than 2 cards are selected
       setTimeout(noMatch, 100);
         open = [];
    }
      removeStars(moves);
      updateMoves(moves);
    }
}



// If cards match

function match(open){
   $('.card.open').addClass('match');
   $('.card').off();
   matchedCards.push(open[0]);
   matchedCards.push(open[1]);
   }

// If cards don't match

function noMatch(open){
    $('.card.open').removeClass('open show');
}

//Displays modal at the end of a completed game.

function gameOver(){
   if(matchedCards.length === 16){
     toggleModal();
     stopTimer();
   }
}


/*  These are the auxillary functions that perform
other updates throughout the game  */

//  Update rating system

function removeStars(moves) {
     if (moves > 15  && moves < 29) {
      for(i = 0; i < star.length; i++){
		  if( i > 1){
               $(star[i]).hide();
			   }
          }
       }
   else if (moves >= 30){
       for( i= 0; i < star.length; i++){
           if(i > 0){
               $(star[i]).hide();
			   }
	       }
    }
}
 

function resetStars(){
   $(star).show();
}
// Dipslay the ending number of stars 

function displayStars(moves){
   if ((moves) > 15 && moves < 30){
       stars--;
       }
    else if (moves > 29){
       stars--;
       }
	  $('.rating').html(stars);

}

//Display the number of moves

function updateMoves(moves){
   $('.num').html(moves);
}

function resetMoves(moves){
   moves = 0;
   updateMoves(moves);
}
// Timer function was modified from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
function startTimer(){
     totalSeconds = 0;
     timer = setInterval(function() {
     ++totalSeconds;
     displayTime();
   }, 1000);
     return timer;
}

function displayTime(timer){
     let seconds = pad(totalSeconds % 60);
     let minutes = pad(parseInt(totalSeconds / 60));
     $('.min').html(minutes);
     $('.sec').html(seconds);

}

function pad(val){
   let valString = val + "";
   if (valString.length < 2){
     return "0" + valString;
   } else {
     return valString;
   }
}

// Clear the timer for displaying game time and resetting game
function stopTimer(){
    clearInterval(timer);
}

// Modal display modified from https://sabe.io/tutorials/how-to-create-modal-popup-box

var modal = document.querySelector(".modal");


function toggleModal(){
  modal.classList.toggle("show-modal");
  updateMoves(moves);
  stopTimer();
  displayTime(timer);
  displayStars(moves);
  closeModal();
}

function closeModal(){
   var closeButton = document.querySelector(".close-button");
  
   closeButton.addEventListener("click", toggleModal);
  
}

//Reset to start new game
         
function resetGame(){
   for (var i = 0; i < deck.length; i++) {
      $(".card").remove();
    }
       resetStars();
       deck = [];
	   moves = 0;
       stopTimer();
       resetMoves(moves);
       newGame(); 
    }

function playAgain(){
	   modal.classList.toggle("show-modal");
       resetGame();
    }

newGame();