let currentQuestion = 0;
let score = 0;
let lifeLine = 2;
let questions = [
  {
    question: "In what year was badminton invented?",
    a: "1870",
    b: "1960",
    c: "1890",
    d: "1990",
    image: "quizimages/q1.jpg",
    answer: "a",
    wrong: "cd",
  },
  {
    question:
      "The rules for modern badminton were developed in which country during the 19th century?",
    a: "China",
    b: "Britain",
    c: "Denmark",
    d: "India",
    image: "quizimages/q2.jpg",
    answer: "b",
    wrong: "ad",
  },
  {
    question:
      "What is the name of the international governing body for badminton recognised by the International Olympic Committee?",
    a: "BWF",
    b: "BWO",
    c: "IBA",
    d: "FIFA",
    image: "quizimages/q3.jpg",
    answer: "a",
    wrong: "bd",
  },
  {
    question:
      "When does the umpire call the score out loud during a badminton game?",
    a: "Before the game starts",
    b: "in the middle of the rally",
    c: "after the rally finishes",
    d: "after the game finishes",
    image: "quizimages/q4.jpg",
    answer: "c",
    wrong: "bd",
  },
  {
    question: "Which term is used when a player violates the rules?",
    a: "an error",
    b: "a fault",
    c: "a accident",
    d: "a mistake",
    image: "quizimages/q5.jpg",
    answer: "b",
    wrong: "cd",
  },
  {
    question:
      "What do we call a shot that is hit high and deep into the court of the opponent?",
    a: "a lift",
    b: "a drive",
    c: "a drop",
    d: "a clear",
    image: "quizimages/q6.jpg",
    answer: "d",
    wrong: "ac",
  },
  {
    question:
      "When a rally is stopped and replayed without change to the score, what does it call?",
    a: "A redo",
    b: "A replay",
    c: "A let",
    d: "A draw",
    image: "quizimages/q7.jpg",
    answer: "c",
    wrong: "bd",
  },
  {
    question:
      "Widely considered the greatest singles player of all time, which Chinese badminton player won the men's singles at the Badminton World Championships in 2006, 2007, 2009, 2011 and 2013?",
    a: "Li Chong Wei",
    b: "Lin Dan",
    c: "Kenta Momoto",
    d: "Victor Axelson",
    image: "quizimages/q8.jpg",
    answer: "b",
    wrong: "ad",
  },
  {
    question: "How many feathers should be in a shuttle?",
    a: "12",
    b: "20",
    c: "18",
    d: "16",
    image: "quizimages/q9.jpg",
    answer: "d",
    wrong: "ab",
  },
  {
    question: " What is the legal height you are allowed to serve from?",
    a: "above your weist",
    b: "below your weist",
    c: "over your head",
    d: "below your chest",
    image: "quizimages/q10.jpg",
    answer: "b",
    wrong: "ad",
  },
];

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

function loadQuestion() {
  if (lifeLine > 0) {
    document.getElementById("chance").style.display = "block";
  }
  document.getElementById("a").style.display = "block";
  document.getElementById("b").style.display = "block";
  document.getElementById("c").style.display = "block";
  document.getElementById("d").style.display = "block";
  // close light box for first question
  if (currentQuestion == 0) {
    closeLightBox();
  }

  // load the image
  let img = document.getElementById("image");
  img.src = questions[currentQuestion].image;
  img.style.maxWidth = "70vh";
  img.style.maxHeight = "80vh";

  // load the question and answers
  document.getElementById("question").innerHTML =
    questions[currentQuestion].question;
  document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
  document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
  document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
  document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;
} // loadQuestion

function markIt(ans) {
  let message = "";

  if (ans == questions[currentQuestion].answer) {
    // add 1 to score
    score++;

    // display score
    document.getElementById("score").innerHTML =
      score + " / " + questions.length;

    message =
      "Correct!!!! <br>Your score is " + score + " / " + questions.length;
  } else {
    message =
      "Incorrect. <br>Your score is " + score + " / " + questions.length;
  } // else

  // move to the next question
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    if (score > 5) {
      message =
        "CONGRATS! <br> you have somewhat mastered the basic knowledge of badminton <br>" +
        score +
        " / " +
        questions.length;
    } else {
      message =
        "don't argue badminton with other people with your bare knowledge of badminton! <br> you only got " +
        score +
        " / " +
        questions.length;
    }
  } else {
    loadQuestion();
  }

  // show the lightbox
  document.getElementById("lightbox").style.display = "block";
  document.getElementById("message").innerHTML = message;
} // markIt

function closeLightBox() {
  document.getElementById("lightbox").style.display = "none";
} // closeLightbox

function chanceIt() {
  if (lifeLine > 0) {
    if (questions[currentQuestion].wrong == "cd") {
      document.getElementById("c").style.display = "none";
      document.getElementById("d").style.display = "none";
      lifeLine -= 1;
    } else if (questions[currentQuestion].wrong == "ad") {
      document.getElementById("a").style.display = "none";
      document.getElementById("d").style.display = "none";
      lifeLine -= 1;
    } else if (questions[currentQuestion].wrong == "bd") {
      document.getElementById("b").style.display = "none";
      document.getElementById("d").style.display = "none";
      lifeLine -= 1;
    } else if (questions[currentQuestion].wrong == "ab") {
      document.getElementById("a").style.display = "none";
      document.getElementById("b").style.display = "none";
      lifeLine -= 1;
    } else if (questions[currentQuestion].wrong == "ac") {
      document.getElementById("a").style.display = "none";
      document.getElementById("c").style.display = "none";
      lifeLine -= 1;
    }
  }
  document.getElementById("chance").innerHTML =
    "50/50 CHANCE&nbsp&nbsp&nbsp" + lifeLine + "/2";
  document.getElementById("chance").style.display = "none";
}
