const quizData = [
  { symbol: "H",  orbital2e: 0,  sOrbitals: 1, pOrbitals: 0, sElectrons: 1,  pElectrons: 0,  valence: 1, unpaired: 1 },
  { symbol: "He", orbital2e: 1,  sOrbitals: 1, pOrbitals: 0, sElectrons: 2,  pElectrons: 0,  valence: 0, unpaired: 0 },
  { symbol: "Li", orbital2e: 1,  sOrbitals: 2, pOrbitals: 0, sElectrons: 3,  pElectrons: 0,  valence: 1, unpaired: 1 },
  { symbol: "Be", orbital2e: 2,  sOrbitals: 2, pOrbitals: 0, sElectrons: 4,  pElectrons: 0,  valence: 2, unpaired: 0 },
  { symbol: "B",  orbital2e: 2,  sOrbitals: 2, pOrbitals: 1, sElectrons: 4,  pElectrons: 1,  valence: 3, unpaired: 1 },
  { symbol: "C",  orbital2e: 2,  sOrbitals: 2, pOrbitals: 2, sElectrons: 4,  pElectrons: 2,  valence: 4, unpaired: 2 },
  { symbol: "N",  orbital2e: 2,  sOrbitals: 2, pOrbitals: 3, sElectrons: 4,  pElectrons: 3,  valence: 5, unpaired: 3 },
  { symbol: "O",  orbital2e: 3,  sOrbitals: 2, pOrbitals: 3, sElectrons: 4,  pElectrons: 4,  valence: 6, unpaired: 2 },
  { symbol: "F",  orbital2e: 4,  sOrbitals: 2, pOrbitals: 3, sElectrons: 4,  pElectrons: 5,  valence: 7, unpaired: 1 },
  { symbol: "Ne", orbital2e: 5,  sOrbitals: 2, pOrbitals: 3, sElectrons: 4,  pElectrons: 6,  valence: 0, unpaired: 0 },
  { symbol: "Na", orbital2e: 5,  sOrbitals: 3, pOrbitals: 3, sElectrons: 5,  pElectrons: 6,  valence: 1, unpaired: 1 },
  { symbol: "Mg", orbital2e: 6,  sOrbitals: 3, pOrbitals: 3, sElectrons: 6,  pElectrons: 6,  valence: 2, unpaired: 0 },
  { symbol: "Al", orbital2e: 6,  sOrbitals: 3, pOrbitals: 4, sElectrons: 6,  pElectrons: 7,  valence: 3, unpaired: 1 },
  { symbol: "Si", orbital2e: 6,  sOrbitals: 3, pOrbitals: 5, sElectrons: 6,  pElectrons: 8,  valence: 4, unpaired: 2 },
  { symbol: "P",  orbital2e: 6,  sOrbitals: 3, pOrbitals: 6, sElectrons: 6,  pElectrons: 9,  valence: 5, unpaired: 3 },
  { symbol: "S",  orbital2e: 7,  sOrbitals: 3, pOrbitals: 6, sElectrons: 6,  pElectrons: 10, valence: 6, unpaired: 2 },
  { symbol: "Cl", orbital2e: 8,  sOrbitals: 3, pOrbitals: 6, sElectrons: 6,  pElectrons: 11, valence: 7, unpaired: 1 },
  { symbol: "Ar", orbital2e: 9,  sOrbitals: 3, pOrbitals: 6, sElectrons: 6,  pElectrons: 12, valence: 0, unpaired: 0 },
  { symbol: "K",  orbital2e: 9,  sOrbitals: 4, pOrbitals: 6, sElectrons: 7,  pElectrons: 12, valence: 1, unpaired: 1 },
  { symbol: "Ca", orbital2e: 10, sOrbitals: 4, pOrbitals: 6, sElectrons: 8,  pElectrons: 12, valence: 2, unpaired: 0 }
];

const questionTypes = [
  { key: "orbital2e",  text: "전자가 2개 들어있는 오비탈 수는?" },
  { key: "sOrbitals", text: "전자가 들어 있는 s 오비탈의 수는?" },
  { key: "pOrbitals", text: "전자가 들어 있는 p 오비탈의 수는?" },
  { key: "sElectrons", text: "s 오비탈에 들어 있는 전자 수는?" },
  { key: "pElectrons", text: "p 오비탈에 들어 있는 전자 수는?" },
  { key: "valence",    text: "원자가 전자 수는?" },
  { key: "unpaired",   text: "홀전자의 수는?" }
];

let correctCount = 0;
let attemptedCount = 0;
const answeredMap = new Map();

let currentQuestion;
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function loadQuestion() {
  const element = pickRandom(quizData);
  const qType = pickRandom(questionTypes);
  currentQuestion = {
    id: `${element.symbol}-${qType.key}`,
    answer: element[qType.key],
    html: `원소기호: <strong>${element.symbol}</strong><br>${qType.text}`
  };

  document.getElementById("question").innerHTML = currentQuestion.html;
  document.getElementById("answer").value = "";
  document.getElementById("result").innerText = "";
  updateScoreDisplay();
}

function updateScoreDisplay() {
  const acc = attemptedCount === 0 ? 0 : Math.round((correctCount / attemptedCount) * 100);
  document.getElementById("score").innerText = `점수: ${correctCount} / ${attemptedCount}`;
  document.getElementById("accuracy").innerText = `정답률: ${acc}%`;
}

function checkAnswer() {
  const input = document.getElementById("answer");
  const userAnswer = parseInt(input.value, 10);
  const resultBox = document.getElementById("result");
  const qid = currentQuestion.id;

  if (isNaN(userAnswer)) {
    resultBox.style.color = "#d9534f";
    resultBox.innerText = "숫자를 입력해주세요.";
    return;
  }

  let attempt = answeredMap.get(qid) || 0;
  if (attempt === 0) attemptedCount++;
  answeredMap.set(qid, attempt + 1);

  if (userAnswer === currentQuestion.answer) {
    if (attempt === 0) correctCount++;
    resultBox.style.color = "#28a745";
    resultBox.innerText = "정답입니다! 다음 문제로 넘어갑니다.";
    updateScoreDisplay();
    setTimeout(loadQuestion, 1200);
  } else {
    resultBox.style.color = "#d9534f";
    resultBox.innerText = "오답입니다. 다시 시도해 보세요.";
    updateScoreDisplay();
  }
}

window.onload = loadQuestion;
