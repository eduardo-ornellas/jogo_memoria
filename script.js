document.addEventListener("DOMContentLoaded", function() {
    const gameBoard = document.getElementById("game-board");
    const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"];
    const cards = [...emojis, ...emojis];
    let firstCard = null;
    let secondCard = null;
    let pairsFound = 0;
    let canFlip = true;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCard(emoji) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = "❓"; // Virado para baixo
        card.addEventListener("click", () => {
            if (!canFlip || card === firstCard || card.classList.contains("matched")) return;
            card.textContent = emoji;
            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
                checkForMatch();
            }
        });
        gameBoard.appendChild(card);
    }

    function checkForMatch() {
        canFlip = false;
        if (firstCard.textContent === secondCard.textContent) {
            pairsFound++;
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = null;
            secondCard = null;
            canFlip = true;
            if (pairsFound === emojis.length) {
                setTimeout(() => {
                    alert("Parabéns! Você encontrou todos os pares.");
                }, 500);
            }
        } else {
            setTimeout(() => {
                firstCard.textContent = "❓"; // Virado para baixo
                secondCard.textContent = "❓"; // Virado para baixo
                firstCard = null;
                secondCard = null;
                canFlip = true;
            }, 1000);
        }
    }

    function resetGame() {
        gameBoard.innerHTML = "";
        firstCard = null;
        secondCard = null;
        pairsFound = 0;
        canFlip = true;
        shuffleArray(cards);
        cards.forEach(createCard);
    }

    // Garante que o número total de cartas seja par
    if (cards.length % 2 !== 0) {
        cards.pop();
    }

    shuffleArray(cards);
    cards.forEach(createCard);
});
