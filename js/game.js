const MAX_OPERAND = 50;
const MATH_SYMBOLS = {add: '+', subtract: '-', multiply: '\u00d7'};

document.addEventListener('DOMContentLoaded', function() {
    setMathOperation('add');
    poseNewQuestion();
});

function setMathOperation(operation) {
    let symbol = MATH_SYMBOLS[operation];
    if (!symbol) {
        alert(`Unimplemented operation: ${operation}`);
        throw `Unimplemented operation ${operation}, aborting`;
    }
    document.getElementById('operator').innerText = symbol;
    document.getElementById('answer').focus();
}

function randomIntUpTo(max) {
    return Math.floor(Math.random() * (max + 1));
}

function poseNewQuestion() {
    document.getElementById('operand1').innerText = randomIntUpTo(MAX_OPERAND);
    document.getElementById('operand2').innerText = randomIntUpTo(MAX_OPERAND);
    document.getElementById('answer').value = '';
}

function calculateRightAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);

    let symbol = document.getElementById('operator').innerText;
    if (symbol == MATH_SYMBOLS['add']) {
        return operand1 + operand2;
    } else if (symbol == MATH_SYMBOLS['subtract']) {
        return operand1 - operand2;
    } else if (symbol == MATH_SYMBOLS['multiply']) {
        return operand1 * operand2;
    } else {
        alert `Unimplemented operator: ${symbol}`;
        throw `Unimplemented operator ${symbol}, aborting`;
    }
}

function incrementScore() {
    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = oldScore + 1;
}

function addToAnswerHistory(isCorrect) {
    let newFace = document.createElement('i');
    newFace.classList.add('fas');
    if (isCorrect) {
        newFace.classList.add('fa-grin-beam', 'answer-correct');
    } else {
        newFace.classList.add('fa-frown-open', 'answer-incorrect');
    }
    document.getElementById('answer-history').appendChild(newFace);
}

function checkAnswer(event) {
    event.preventDefault();
    let userAnswer = parseInt(document.getElementById('answer').value) || 0;
    let rightAnswer = calculateRightAnswer();
    let isCorrect = userAnswer === rightAnswer;
    if (isCorrect) {
        alert('Hey! You got it right :)');
        incrementScore();
    } else {
        alert(`Bummer, you answered ${userAnswer}, but the right answer is ${rightAnswer}`);
    }
    addToAnswerHistory(isCorrect);

    poseNewQuestion();
}
