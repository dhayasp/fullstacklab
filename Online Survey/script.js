// Array of survey questions
const questions = [
    { question: "What is your favorite color?", type: "checkbox", options: ["Red", "Blue", "Green", "Yellow"] },
    { question: "Which countries would you like to visit?", type: "checkbox", options: ["USA", "Canada", "Australia", "Japan"] },
    { question: "Do you prefer cats or dogs?", type: "checkbox", options: ["Cats", "Dogs"] },
    { question: "What is your favorite hobby?", type: "checkbox", options: ["Reading", "Sports", "Music", "Traveling"] },
    { question: "What types of food do you enjoy?", type: "checkbox", options: ["Pizza", "Burgers", "Sushi", "Pasta"] }
];

let selectedQuestions = [];
let userAnswers = [];
let currentQuestionIndex = 0;
let chart = null; // Store the chart instance to reset it

// Function to select 5 random questions from the list
function selectRandomQuestions() {
    selectedQuestions = [];
    while (selectedQuestions.length < 5) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        if (!selectedQuestions.includes(questions[randomIndex])) {
            selectedQuestions.push(questions[randomIndex]);
        }
    }
}

// Function to render the current question
function renderQuestion() {
    const questionContainer = document.getElementById('question-container');
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    questionContainer.innerHTML = ''; // Clear previous content

    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    const questionText = document.createElement('h3');
    questionText.textContent = currentQuestion.question;

    questionElement.appendChild(questionText);

    if (currentQuestion.type === 'checkbox') {
        currentQuestion.options.forEach(option => {
            const label = document.createElement('label');
            label.textContent = option;
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.name = `question-${currentQuestionIndex}`;
            input.value = option;
            label.prepend(input);
            questionElement.appendChild(label);
        });
    }

    questionContainer.appendChild(questionElement);

    // Update the "Next" button text if it's the last question
    if (currentQuestionIndex === selectedQuestions.length - 1) {
        document.getElementById('next-button').textContent = "Submit Survey";
    }
}

// Function to handle "Next" button click
function nextQuestion() {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const inputs = document.querySelectorAll(`[name="question-${currentQuestionIndex}"]`);
    let answer = [];

    inputs.forEach(input => {
        if (input.checked) answer.push(input.value);
    });

    if (answer.length > 0) {
        userAnswers.push(answer);
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            renderQuestion();
        } else {
            submitSurvey();
        }
    } else {
        alert("Please answer the question before proceeding.");
    }
}

// Function to submit the survey and show results
function submitSurvey() {
    document.getElementById('survey-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';

    const answersCount = {};
    selectedQuestions.forEach((question, index) => {
        const answer = userAnswers[index];
        answer.forEach(a => {
            answersCount[a] = (answersCount[a] || 0) + 1;
        });
    });

    // Calculate percentages for each option
    const totalAnswers = Object.values(answersCount).reduce((acc, count) => acc + count, 0);
    const percentages = {};
    for (let option in answersCount) {
        percentages[option] = ((answersCount[option] / totalAnswers) * 100).toFixed(2);
    }

    // If there's an existing chart, destroy it before creating a new one
    if (chart) {
        chart.destroy();
    }

    // Draw results on canvas
    const ctx = document.getElementById('surveyCanvas').getContext('2d');
    const labels = Object.keys(answersCount);
    const data = labels.map(label => answersCount[label]);
    const chartLabels = labels.map(label => `${label} (${percentages[label]}%)`);

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: chartLabels,
            datasets: [{
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF5733'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF5733']
            }]
        }
    });
}

// Function to restart the survey
function restartSurvey() {
    currentQuestionIndex = 0;
    userAnswers = [];
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('survey-container').style.display = 'block';
    selectRandomQuestions();
    renderQuestion();
}

// Start the survey
selectRandomQuestions();
renderQuestion();

// Event listener for "Next" button
document.getElementById('next-button').addEventListener('click', nextQuestion);

// Event listener for "Restart Survey" button
document.getElementById('restart-button').addEventListener('click', restartSurvey);
