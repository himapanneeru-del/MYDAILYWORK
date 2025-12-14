let quizzes = JSON.parse(localStorage.getItem("quiz")) || [];
let index = 0;
let score = 0;

function register() {
  localStorage.setItem("user", username.value);
  alert("Registered Successfully");
}

function login() {
  alert("Login Successful");
}

function saveQuiz() {
  quizzes.push({
    q: question.value,
    options: [opt1.value, opt2.value, opt3.value, opt4.value],
    ans: answer.value
  });
  localStorage.setItem("quiz", JSON.stringify(quizzes));
  alert("Quiz Saved");
}

function loadQuiz() {
  let quiz = quizzes[index];
  q.innerText = quiz.q;
  options.innerHTML = "";
  quiz.options.forEach((opt, i) => {
    options.innerHTML +=
      `<input type="radio" name="opt" value="${i+1}">${opt}<br>`;
  });
}

function next() {
  let selected = document.querySelector('input[name="opt"]:checked');
  if (selected && selected.value == quizzes[index].ans) {
    score++;
  }
  index++;
  if (index < quizzes.length) loadQuiz();
  else {
    localStorage.setItem("score", score);
    window.location = "result.html";
  }
}

if (location.pathname.includes("quiz")) loadQuiz();

