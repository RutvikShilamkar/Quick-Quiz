const highScoresList = document.getElementById("highScoresList");

const highScoresArray =JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScoresArray);

let str = "";
highScoresArray.forEach((data,index) => {
    str+=`<li class="high-score">${data.name} - ${data.score}</li>`;
});
console.log(str);
highScoresList.innerHTML = str;