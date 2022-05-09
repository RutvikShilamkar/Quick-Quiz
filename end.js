const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");

finalScore.innerText = localStorage.getItem('finalScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

username.addEventListener("keyup",()=>{
    saveScoreBtn.disabled = !username.value;
});


saveHighScore= (e)=>{
    console.log("clicked save button");
    e.preventDefault();

    data = {
        score : Math.floor(Math.random() *100),
        name : username.value
    };
    highScores.push(data);
    highScores.sort((a,b) => {
        return b.score-a.score;
    })
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
}