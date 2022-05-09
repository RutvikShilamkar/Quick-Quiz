const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const hudQuestion = document.getElementById("questionCounter");
const hudScore = document.getElementById("score");
const hudProgressBar = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

// fetch("questions.json").then(res=>{
//     return res.json();
// }).then(loadedQuestions => {
//     // console.log(loadedQuestions);
//     questions = loadedQuestions;
//     startGame();
// }).catch(err=>{
//     console.error(err);
// })

fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple").then(res=>{
    return res.json();
}).then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map( loadedQuestion => {
        const formattedQuestion = {
            question: loadedQuestion.question
        };
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3)+ 1;
        answerChoices.splice( formattedQuestion.answer-1, 0, loadedQuestion.correct_answer);

        answerChoices.forEach((choice, index)=>{
            formattedQuestion["choice"+(index+1)]= choice;
        });
        return formattedQuestion;
    });
    startGame();
}).catch(err=>{
    console.error(err);
})

// constatns 
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];  //spread operator
    getNewQuestion();
    loader.classList.add("hidden");
    game.classList.remove("hidden");
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        localStorage.setItem('finalScore', score);
        return window.location.assign("/end.html");
    }
    questionCounter++;
    hudQuestion.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    progressbarPercent = (questionCounter/MAX_QUESTIONS)*100;
    hudProgressBar.style.width = `${progressbarPercent}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        // console.log(selectedAnswer == currentQuestion.answer);
        // const classToApply = 'incorrect';
        // if(selectedAnswer == currentQuestion.answer){
        //     classToApply = 'correct';
        // }
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct'){
            incrementScore();
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore= ()=>{
    score = score + CORRECT_BONUS;
    hudScore.innerText = score;
}

