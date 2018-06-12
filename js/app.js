
 // Create an array that holds all of the cards
var cardsArray = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];

// define a mock array of objects. Each object holds a fake player name and a fake score.
var players = [{firstName:"Sam", score: 15}, {firstName:"John", score:23}, {firstName:"Jane", score:99}, {firstName:"Charlotte", score: 10}];

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
        cardsElements[i].tabIndex = 0;
    }
}

function flipCard (evt) {
    //console.log(evt);
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

 function sortPlayers (arr) {
    arr.sort(function(a, b)
    {
      return a[1]-b[1];
    });
    return players;
 }

function compareScores(a, b) {
    return a.score - b.score;
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

    // hide the leaderboard table.
    document.getElementById("leaderboard").style.display="none";

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

    // add the <i> tags after we have shuffled the cardsArray.
    buildCards();

    // reset the number of successful moves
    successfulMoves = 0;

    // reset the number of moves.
    document.getElementById("move").textContent = '';

    // reset the nick name input field
    document.getElementById("playerName").value = '';

    var scorePanel = document.getElementById('score');
    scorePanel.style.visibility = 'visible'; 

    var gameBoard = document.getElementById('cardsDeck');
    gameBoard.style.visibility = 'visible';

 }

 function closeModal() {
    var congratModal = document.getElementById('modal');
    congratModal.style.display = 'none';
 }

 function leaderboard (arr) {
    // Save name and score to the current local store
    var player = document.getElementById("playerName").value;
    if (player ==="") {
        player = "unknown";
    }
    localStorage.setItem("player", player);
    localStorage.setItem("score", counter);

    // save the name and score of the current player in a new object.
    var name = localStorage.getItem("player");
    var finalScore = localStorage.getItem("score");
    me = {firstName: name, score: finalScore};

    players.push(me);

    // clear the input field containing the nick name of the current player.
    localStorage.setItem("player", "");

    // sort the array of players.
    players.sort(compareScores);         

    document.getElementById("leaderboard").style.display="block";
    document.getElementById("firstName1").textContent = arr[0].firstName;
    document.getElementById("score1").textContent = arr[0].score;

    document.getElementById("firstName2").textContent = arr[1].firstName;
    document.getElementById("score2").textContent = arr[1].score;

    document.getElementById("firstName3").textContent = arr[2].firstName;
    document.getElementById("score3").textContent = arr[2].score;

    document.getElementById("firstName4").textContent = arr[3].firstName;
    document.getElementById("score4").textContent = arr[3].score;

    document.getElementById("firstName5").textContent = arr[4].firstName;
    document.getElementById("score5").textContent = arr[4].score;
 }

shuffle(cardsArray);


//Loop through the HTML collection to add a font awesome tag to each card element.
buildCards ();

//var adjacentCard;

document.getElementById("cardsDeck").addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'LI') { 
        flipCard(evt);
        var card = evt.target;

        // listen to specific keydown on the keyboard such as left, right, up and down keys. 
        document.addEventListener("keydown", function(e) {
            var keycode = e.keyCode;
            if (keycode === 39) { // right arrow  
                var adjacentCard = '';
                adjacentCard = card.nextElementSibling;
                //console.log(adjacentCard);
                adjacentCard.focus();
            }
        });
        
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

var allCards = document.getElementsByClassName('card');

for(var i = 0; i < allCards.length; i++) {
    allCards[i].addEventListener('keydown', function(ev) {
        var card = ev.target;
        var keycode = ev.keyCode;
        if (keycode === 13) { // enter key  
            card.click();
        }
    });
}

document.getElementById('leaderboardBut').addEventListener('click', function() {
    leaderboard(players);
})

document.getElementById('playAgain').addEventListener('click', function() {
    resetGame();
})

document.getElementById('closeBut').addEventListener('click', function() {
    // close the congratulations modal, hide the game's title and change its background image.
    closeModal();
    document.getElementById("leaderboard").style.display="none";
    document.getElementById("title").style.visibility = 'hidden';
    document.getElementById("body").style.backgroundImage = "url('img/gameOverBackground.png')";

})

document.getElementById('refresh').addEventListener('click', function() {
    resetGame();
})






