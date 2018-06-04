
 // Create an array that holds all of the cards
var cardsArray = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];

//define an HTML collection that contains all elements with class name: card.
var cardsElements = document.getElementsByClassName("card");


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

function buildCards () {
    for (var i = 0; i < cardsElements.length; i++) {
        var faTag = document.createElement('i');
        var faIconName = cardsArray[i];
        faTag.classList.add("fa");
        faTag.classList.add(faIconName);
        cardsElements[i].appendChild(faTag);
    }
}


shuffle(cardsArray);


//Loop through the HTML collection to add a font awesome tag to each card element.
buildCards ();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function flipCard (evt) {
    evt.target.classList.add("open");
    evt.target.classList.add("show");
 }

 function matchingCards (arr) {
    successfulMoves = successfulMoves + 1;
    arr[0].classList.add("match");
    arr[0].classList.add("animated");
    arr[0].classList.add("swing");
    arr[1].classList.add("match");
    arr[1].classList.add("animated");
    arr[1].classList.add("swing");
    
    arr.pop();
    arr.pop();
    return successfulMoves;
 }

 function unmatchingCards (arr) {
    unsuccessfulMoves = unsuccessfulMoves + 1;

    var card = arr[0];
    var card2 = arr[1];

    arr[0].classList.remove("open");
    arr[0].classList.remove("show");
    arr[1].classList.remove("open");
    arr[1].classList.remove("show");
    arr.pop();
    arr.pop();
    return unsuccessfulMoves;
 }

 function movesCounter (num) {
    num = num + 1;
    document.getElementById("move").textContent = num;
    return num;
 }

 function gameOver () {
    var scorePanel = document.getElementById('score');
    scorePanel.style.visibility = 'hidden';

    var deck = document.getElementById('cardsDeck');
    deck.style.visibility = 'hidden';

    document.getElementById('statistics').textContent = 'With ' + counter + ' moves and ' + numbOfStars + ' star(s)!';
    var winModal = document.getElementById('modal');
    winModal.style.display='block';
    document.getElementById('motivation-message').textContent ='wohooo!';
 }

 function resetGame() {
    closeModal();

    // Reset the successful moves counter.
    counter = 0;

    // reset the game board. Remove the classes. 
    for (var i = 0; i < cardsElements.length; i++) {
        cardsElements[i].classList.remove('open', 'show', 'match');
        //remove all <i> tags.
        cardsElements[i].removeChild(cardsElements[i].childNodes[0]);
    }

    // shuffle the array.
    shuffle(cardsArray);

    // Add the <i> tags after we have shuffled the cardsArray
    buildCards();


    // Reset the number of moves.
    document.getElementById("move").textContent = '';

    var scorePanel = document.getElementById('score');
    scorePanel.style.visibility = 'visible'; 

    var gameBoard = document.getElementById('cardsDeck');
    gameBoard.style.visibility = 'visible';

 }

 function closeModal() {
    var congratModal = document.getElementById('modal');
    congratModal.style.display = 'none';
 }

// Create an array to hold the opened cards
var openedCards = [];
var counter = 0;
var successfulMoves = 0;
var unsuccessfulMoves = 0;
var numbOfStars = 3
var indexes = [];

document.getElementById("cardsDeck").addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'LI') { 
        flipCard(evt);
        var card = evt.target;
        var index = card.selectedIndex;
        indexes.push(index);
        
        openedCards.push(card);

        if (openedCards.length === 2) {
            counter = movesCounter(counter);
            if (openedCards[0].firstChild.className === openedCards[1].firstChild.className) {
                successfulMoves = matchingCards(openedCards);

                // if successfulMoves is equal to 8, the player wins the game.
                if (successfulMoves === 8) {
                    setTimeout(gameOver, 500);
                }
            }
            else {
                setTimeout(function() {
                    unsuccessfulMoves = unmatchingCards(openedCards);
                }, 500);

                if (unsuccessfulMoves === 9) {
                    numbOfStars = numbOfStars - 1;
                }
                else if (unsuccessfulMoves === 18) {
                    numbOfStars = numbOfStars -1;
                }
            }
        }
    }
});

document.getElementById('playAgain').addEventListener('click', function() {
    resetGame();
})

document.getElementById('closeBut').addEventListener('click', function() {
    closeModal();
})

document.getElementById('refresh').addEventListener('click', function() {
    resetGame();
})






