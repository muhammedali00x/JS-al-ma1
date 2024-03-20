const questions = [
    { question: "Başkentimiz hangi şehrimizdir?", answer: "Ankara", difficulty: "kolay" },
    { question: "Dünyanın en uzun nehri hangisidir?", answer: "Nil", difficulty: "kolay" },
    { question: "En yüksek dağ hangisidir?", answer: "Everest", difficulty: "orta" },
    { question: "Kedi familyasının bilimsel adı nedir?", answer: "Felidae", difficulty: "orta" },
    { question: "Atomun çekirdeğini keşfeden bilim adamı kimdir?", answer: "Rutherford", difficulty: "zor" },
    { question: "En çok nüfusa sahip ülke hangisidir?", answer: "Çin", difficulty: "zor" },
    { question: "İlk insan hangi gezegene ayak basmıştır?", answer: "Ay", difficulty: "kolay" },
    { question: "Dünyanın en büyük okyanusu hangisidir?", answer: "Pasifik", difficulty: "orta" },
    { question: "İlk yazılı anayasa hangi ülkede kabul edilmiştir?", answer: "Amerika", difficulty: "orta" },
    { question: "Matematikte 'pi' sayısı için kullanılan sembol nedir?", answer: "π", difficulty: "zor" }
];

let currentQuestionIndex = 0;
let score = 20; // Başlangıçta 20 puan ile başla
let remainingClicks = 3;

function displayQuestion() {
    const questionElement = document.getElementById("question");
    questionElement.textContent = questions[currentQuestionIndex].question;
    
    const answerLength = questions[currentQuestionIndex].answer.length;
    const guessContainer = document.getElementById("guess-container");
    guessContainer.innerHTML = "";
    for (let i = 0; i < answerLength; i++) {
        const letterBox = document.createElement("div");
        letterBox.classList.add("letter-box", "hidden");
        letterBox.textContent = "_";
        letterBox.dataset.index = i;
        letterBox.onclick = revealLetter;
        guessContainer.appendChild(letterBox);
    }

    // Harfleri göstermek için "revealed" sınıfını ekle
    const answerChars = questions[currentQuestionIndex].answer.split('');
    guessContainer.querySelectorAll('.letter-box').forEach((box, index) => {
        box.dataset.letter = answerChars[index];
    });
}

function revealLetter(event) {
    if (remainingClicks > 0) {
        const letterBox = event.target;
        letterBox.classList.remove("hidden");
        letterBox.classList.add("revealed"); // Harfleri göstermek için "revealed" sınıfını ekle
        remainingClicks--;
        score -= 10; // Her harf açma işlemi başına 10 puan kes
        updateScore();
    }

    if (remainingClicks === 0) {
        document.querySelectorAll(".letter-box").forEach(box => {
            box.onclick = null;
        });
    }
}

function checkAnswer() {
    const guess = document.getElementById("guessInput").value.trim();
    const correctAnswer = questions[currentQuestionIndex].answer.toUpperCase();
    
    if (guess.toUpperCase() === correctAnswer) {
        score += 20; // Doğru cevapta 20 puan ekle
        document.getElementById("result").textContent = "Doğru cevap!";
    } else {
        document.getElementById("result").textContent = "Yanlış cevap!";
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        remainingClicks = 3;
        displayQuestion();
        document.getElementById("guessInput").value = "";
    } else {
        endGame();
    }

    updateScore();
}

function endGame() {
    document.getElementById("question-container").innerHTML = "<h2>Oyun Bitti!</h2><p>Toplam Puanınız: " + score + "</p>";
    document.getElementById("result").style.display = "none";
    document.getElementById("score").style.display = "none";
}

function updateScore() {
    document.getElementById("scoreValue").textContent = score;
}

// Oyunu başlat
displayQuestion();
updateScore();

