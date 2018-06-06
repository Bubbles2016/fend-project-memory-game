
 // Create an array that holds all of the cards
var cardsArray = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];

//define an HTML collection that contains all elements with class name: card.
var cardsElements = document.getElementsByClassName("card");

var openedCards = [];
var counter = 0;
var successfulMoves = 0;
var unsuccessfulMoves = 0;
var numbOfStars = 3

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
        // TODO: add a new <i> inside every <li> element in the HTML collection 'cardsElements'.
        var faTag = document.createElement('i');
        var faIconName = cardsArray[i];
        faTag.classList.add("fa");
        faTag.classList.add(faIconName);
        cardsElements[i].appendChild(faTag);
    }
}

function flipCard (evt) {
    evt.target.classList.add("open");
    evt.target.classList.add("show");
 }

 function matchingCards (arr) {
    successfulMoves = successfulMoves + 1;

    // TODO: add match, animated and swing animation classes when both cards match.
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

    // add classes animated and shake on both cards.
    arr[0].classList.add("animated");
    arr[0].classList.add("shake");

    arr[1].classList.add("animated");
    arr[1].classList.add("shake");

    // remove all classes after 1 second. i.e: CSS animation ends
    setTimeout(function() {
        arr[0].classList.remove("open");
        arr[0].classList.remove("show");
        arr[0].classList.remove("animated");
        arr[0].classList.remove("shake");
        arr[1].classList.remove("open");
        arr[1].classList.remove("show");
        arr[1].classList.remove("animated");
        arr[1].classList.remove("shake");
        arr.pop();
        arr.pop();
    }, 1000);

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
    document.getElementById('motivation-message').textContent ='woohooo!';
 }

 function resetGame() {
    closeModal();

    // Reset the successful moves counter.
    counter = 0;

    // reset the game board. Remove the classes including animation classes for matching cards.
    for (var i = 0; i < cardsElements.length; i++) {
        cardsElements[i].classList.remove('open', 'show', 'match', 'animated', 'swing');
        //remove all <i> tags inside the <li> tags
        cardsElements[i].removeChild(cardsElements[i].childNodes[0]);
    }

    // shuffle the array to change the order of strings randomly inside the cardsArray.
    shuffle(cardsArray);

    // Add the <i> tags after we have shuffled the cardsArray.
    buildCards();

    // reset the number of successful moves
    successfulMoves = 0;

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

shuffle(cardsArray);


//Loop through the HTML collection to add a font awesome tag to each card element.
buildCards ();

//document.getElementById("test").style.backgroundImage = "url('./background2.jpg')";

document.getElementById("cardsDeck").addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'LI') { 
        flipCard(evt);
        var card = evt.target;
        
        openedCards.push(card);

        if (openedCards.length === 2) {
            counter = movesCounter(counter);
            if (openedCards[0].firstChild.className === openedCards[1].firstChild.className) {
                successfulMoves = matchingCards(openedCards);

                // if successfulMoves is equal to 8, the player wins the game.
                if (successfulMoves === 1) {
                    setTimeout(gameOver, 500);
                }
            }
            else {
                unsuccessfulMoves = unmatchingCards(openedCards);

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
    // close the congratulations modal, hide the game's title and change its background image.
    closeModal();
    document.getElementById("title").style.visibility = 'hidden';
    document.getElementById("body").style.backgroundImage = "url('./img/gameOverBackground.png')";
})

document.getElementById('refresh').addEventListener('click', function() {
    resetGame();
})






