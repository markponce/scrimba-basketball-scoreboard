const buttonsEL = document.querySelectorAll(".team-btn-group button");
const scoresEL = document.querySelectorAll(".team-score");
const newGameEL = document.querySelector("#btn-new-game");
const scoreMap = new Map();
setScore("home", 0);
setScore("away", 0);

function showScore() {
  scoresEL[0].textContent = scoreMap.get("home");
  scoresEL[1].textContent = scoreMap.get("away");
}

function setScore(team = "home", score = 0) {
  scoreMap.set(team, score);
  showScore();
}

function getPoints(textContent) {
  let points;
  switch (textContent) {
    case "+1":
      points = 1;
      break;
    case "+2":
      points = 2;
      break;
    case "+3":
      points = 3;
      break;
    default:
      points = undefined;
  }

  if (points === undefined) {
    throw new Error("Invalid points");
  }

  return points;
}

function getTeam(element) {
  const teamEL = element.parentElement.parentElement.querySelector("h3");
  const team = teamEL.textContent.toLowerCase();
  const teams = ["home", "away"];
  if (!teams.includes(team)) {
    throw new Error("Invalid team");
  }
  return team;
}

buttonsEL.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const points = getPoints(event.currentTarget.textContent);
    const team = getTeam(event.currentTarget);

    const currentScore = scoreMap.get(team) ?? 0;
    const newScore = currentScore + points;

    setScore(team, newScore);
  });
});

newGameEL.addEventListener("click", (event) => {
  const confirmed = confirm("Both score will reset to zero. Are you sure?");
  if (confirmed) {
    setScore("home", 0);
    setScore("away", 0);
  }
});
