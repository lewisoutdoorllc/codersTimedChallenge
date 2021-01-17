// variables for page elements
// time and score
let time = document.querySelector(".timer");
let secondsLeft = 75;
let score = document.querySelector("#score");
// start button 
const start = document.querySelector("#start");
// intro
const codersIntro = document.querySelector("#coders-challenge-intro");
// questions
const questionsEl = document.querySelector("#questions");
//where question goes
let questionEl = document.querySelector("#question");
let questionCount = 0;
const correctWrong = document.querySelector("#correct-wrong");
// final-scores
const finalEl = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");
// high-scores
const highscoresEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector("#high-scores-list");
let scoreList = [];
// answer button class
const ansBtn = document.querySelectorAll("button.ans-btn")
// answers
const ans1Btn = document.querySelector("#answer-1");
const ans2Btn = document.querySelector("#answer-2");
const ans3Btn = document.querySelector("#answer-3");
const ans4Btn = document.querySelector("#answer-4");
// submit score button
const submitScrBtn = document.querySelector("#submit-score");
// goBack button
const goBackBtn = document.querySelector("#goBack");
// clearScores button
const clearScrBtn = document.querySelector("#clearScores");
// view-score button
const viewScrBtn = document.querySelector("#view-score");
// questions; the correct answer is chosen based on the array starting with 0 but allowing the answers to be numbered properly //
const questions = [ 
    {
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "1"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    }
];
// timer
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}
// start quiz fuction
function startQuiz() {
    codersIntro.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// function to set question; takes in a count and displays the next question/answers
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

// function to check answer and then move to next question
function checkAnswer(event) {
    event.preventDefault();

// show section for correct-wrong and displays message
    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

// time out after 1 second
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

// answer checker; if answer is right it goes to the next without deduction; if wrong -10 and to the next question
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }
// allows to go to the next question
    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

// sorts score list
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

// add to local storage
    storeScores();
    displayScores();
}
// storing scores to local 
function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

// update the scorelist array to it
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// clear scores
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}
// start timer
start.addEventListener("click", startQuiz);

// check answer
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// add the score with a click
submitScrBtn.addEventListener("click", addScore);

// go back button and reset timer
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    codersIntro.style.display = "block";
    secondsLeft = 75;
    time.textContent = `Time:${secondsLeft}s`;
});
// clear the scores
clearScrBtn.addEventListener("click", clearScores);

// View/Hide High Scores Button
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});