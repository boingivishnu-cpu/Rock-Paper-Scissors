// =====================================
// Rock Paper Scissors - JavaScript
// =====================================

const userChoice = document.getElementById("userChoice");
const computerChoice = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");

const userScore = document.getElementById("userScore");
const computerScore = document.getElementById("computerScore");
const tieScore = document.getElementById("tieScore");
const round = document.getElementById("round");

// =====================================
// Play Game
// =====================================

async function playGame(choice) {

    try {

        const response = await fetch("/play", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                choice: choice
            })

        });

        const data = await response.json();

        userChoice.innerHTML = data.user_choice;
        computerChoice.innerHTML = data.computer_choice;

        resultText.innerHTML = data.result;

        userScore.innerHTML = data.user_score;
        computerScore.innerHTML = data.computer_score;
        tieScore.innerHTML = data.tie_score;
        round.innerHTML = data.round;

        // Change Result Color

        if (data.result === "You Win") {

            resultText.style.color = "#16a34a";

        }
        else if (data.result === "Computer Wins") {

            resultText.style.color = "#dc2626";

        }
        else {

            resultText.style.color = "#eab308";

        }

        // Animation

        resultText.classList.remove("animate");

        void resultText.offsetWidth;

        resultText.classList.add("animate");

    }

    catch (error) {

        alert("Something went wrong.");

        console.error(error);

    }

}

// =====================================
// Reset Game
// =====================================

async function resetGame() {

    if (!confirm("Do you want to reset the game?")) {
        return;
    }

    try {

        await fetch("/reset", {

            method: "POST"

        });

        userChoice.innerHTML = "-";
        computerChoice.innerHTML = "-";

        resultText.innerHTML = "Make Your Move";
        resultText.style.color = "#2563eb";

        userScore.innerHTML = "0";
        computerScore.innerHTML = "0";
        tieScore.innerHTML = "0";
        round.innerHTML = "0";

    }

    catch (error) {

        alert("Unable to reset game.");

        console.error(error);

    }

}

// =====================================
// Result Animation
// =====================================

const style = document.createElement("style");

style.innerHTML = `

.animate{

animation:popResult .5s ease;

}

@keyframes popResult{

0%{

transform:scale(.6);
opacity:.3;

}

50%{

transform:scale(1.2);

}

100%{

transform:scale(1);

opacity:1;

}

}

`;

document.head.appendChild(style);

// =====================================
// Keyboard Shortcuts
// =====================================

document.addEventListener("keydown", function (event) {

    const key = event.key.toLowerCase();

    if (key === "r") {

        playGame("rock");

    }

    if (key === "p") {

        playGame("paper");

    }

    if (key === "s") {

        playGame("scissors");

    }

});

// =====================================
// Welcome Message
// =====================================

window.onload = function () {

    console.log("Rock Paper Scissors Loaded Successfully!");

};