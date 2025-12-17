let quizzes = JSON.parse(localStorage.getItem("quiz")) || [];
let index = 0;
let score = 0;
let attempted = 0;

function register() {
  let user = document.getElementById("username").value;
  localStorage.setItem("user", user);
  alert("Registered successfully!");
}

function login() {
  alert("Login successful!");
}

function saveQuiz() {
  let quiz = {
    q: question.value,
    options: [opt1.value, opt2.value, opt3.value, opt4.value],
    ans: answer.value
  };

  quizzes.push(quiz);
  localStorage.setItem("quiz", JSON.stringify(quizzes));
  alert("Quiz saved successfully!");
}

function loadQuiz() {
  if (quizzes.length === 0) {
    document.getElementById("q").innerText = "No quiz available";
    return;
  }

  let quiz = quizzes[index];
  document.getElementById("q").innerText = quiz.q;

  let html = "";
  quiz.options.forEach((opt, i) => {
    html += `
      <div class="option">
        <input type="radio" name="opt" value="${i+1}"> ${opt}
      </div>`;
  });

  document.getElementById("options").innerHTML = html;
}

function next() {
  let selected = document.querySelector('input[name="opt"]:checked');

  if (selected) {
    attempted++;
    if (selected.value == quizzes[index].ans) {
      score++;
    }
  }

  index++;

  if (index < quizzes.length) {
    loadQuiz();
  } else {
    localStorage.setItem("score", score);
    localStorage.setItem("attempted", attempted);
    localStorage.setItem("total", quizzes.length);
    window.location = "result.html";
  }
}

if (location.pathname.includes("quiz")) {
  loadQuiz();
}
