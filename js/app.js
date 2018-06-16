/*
 * Create a list that holds all of your cards
 */
const allCards = ["train", "bus", "ship", "bicycle", "car", "plane", "helicopter", "motorcycle", "train", "bus", "ship", "bicycle", "car", "plane", "helicopter", "motorcycle"];
let moves = 0;
let matchedCards = [];
let open = [];
const star = document.querySelectorAll('.fa-star');



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

deck = shuffle(allCards);

newGame(deck);
initCards(deck);

// Create Deck by shuffling initial card array and adding each card dynamically.
function newGame(deck){

  moves = 0;
  matchedCards = [];
  open = [];
  resetGame(matchCards);
  updateMoves(moves);

  
for (var i = 0; i < deck.length; i++) {
   $('.deck').append($('<li class="card"><i class="fas fa-' + deck[i] + '"></i></li>'));
 }
};

// Add event listeners for click functionality
function initCards(deck){
document.querySelectorAll('li.card').forEach(function(card){
    card.addEventListener('click', function() {
       card.classList.add('open');
       matchCards(card);
        });
     });
  }


  // Open two cards and determine whether there's a match.
function matchCards(card){
  if(!card.classList.contains('show')){
  open.push(card.firstChild.classList[1]);
     card.classList.add('show');
	if(open.length === 2){
       if(open[0] === open[1]){
       match(open);
       open = [];
       moves++;
     	}
	  else {
       if(open.length === 2){
         moves++;
       }
       setTimeout(noMatch, 1000);
       open = [];
	  }
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

//Display modal at the end of a completed game.
function gameOver(matchCards){
   if(matchedCards === 8){
    //Display Modal
     console.log("You Win!")
   }
}


/*  These are the auxillary functions that perform 
other updates throughout the game  */

//  Update rating system

function removeStars(moves) {
     if ((moves) > 10 && (moves) < 20){
      for(i = 0; i < star.length; i++){
		  if( i > 1){
               $(star[i]).remove();
			   }
          }
       }
    else if (moves > 20){
       for( i= 0; i < star.length; i++){
           if(i > 0){
               $(star[i]).remove();
			   }
	       }
    }
  }

//Update Number of Moves

function updateMoves(moves){
   $('#num').html(moves);
}

// Set up timer function



//Reset to start new game

function resetGame () {
      var resetButton = document.getElementById('reset');
      resetButton.addEventListener('click', function(){
       newGame();
      });
}

