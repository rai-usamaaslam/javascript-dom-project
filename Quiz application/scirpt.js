const quizData = [
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Management",
      "Desktop Oriented Mode",
      "Digital Ordinance Method"
    ],
    correct: 0
  },
  {
    question: "Which method adds an element to the end of an Array?",
    options: [
      "push()",
      "pop()",
      "shift()",
      "unshift()"
    ],
    correct: 0
  },
  {
    question: "Which keyword is used to declare a constant variable?",
    options: [
      "var",
      "let",
      "const",
      "static"
    ],
    correct: 2
  }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;

const quizCard = document.querySelector(".quiz-card");
const questionText = document.querySelector("#Question");
const optionContainer = document.querySelector(".option-cotainer");
const errorMsg = document.querySelector("#error-msg");
const nextBtn = document.querySelector(".nextBtn");

function loadQuestion() {
  selectedOptionIndex = null;
  errorMsg.style.display = "none";

  const currentData = quizData[currentQuestionIndex];

  questionText.textContent = currentData.question;

  optionContainer.innerHTML = "";

  currentData.options.forEach((optionText, index) => {
    const button = document.createElement("button");

    button.classList.add("option-btn");
    button.textContent = optionText;

    button.addEventListener("click", () => {
      document.querySelectorAll(".option-btn").forEach((btn) => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");

      selectedOptionIndex = index;

      errorMsg.style.display = "none";
    });

    optionContainer.appendChild(button);
  });
}

nextBtn.addEventListener("click", () => {
  if (selectedOptionIndex === null) {
    errorMsg.style.display = "block";
    return;
  }

  if (
    selectedOptionIndex === quizData[currentQuestionIndex].correct
  ) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizCard.innerHTML = `
    <div class="score-container">
      <h2>Quiz Completed</h2>
      <p>Your Final Score is:</p>
      <h3>${score} / ${quizData.length}</h3>
      <button class="next-btn" onclick="location.reload()">
        Restart Quiz
      </button>
    </div>
  `;
}

loadQuestion();