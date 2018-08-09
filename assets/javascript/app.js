// To initialize the .js file
$( document ).ready(function() {

// To start the game 
	$(".startQuiz").on("click", function (){
				$('.container').show();
				$(".startQuiz").hide();
			});


// Timer functions
	$('#timeRemaining').on('click', start);
	var timer = 30;

	function start(){
	  counter = setInterval(decrement, 1000);
	    };

	function decrement(){
		timer--;
		$('#timeRemaining').html('<h2>' + " Time Remaining : " + timer + " Seconds"+'</h2>');
		if (timer === 0){
		stop();
		$('#message').html('Time is up!');
		checkAnswers();
		}	
	};



	function stop(){
				clearInterval(counter);
		}
		start();


// Object holding all of the questions,choices and correct answers
	var quiz = {
		questions: [
		 {
			question: 'What is the capital of Michigan?',
			choices: ['Macinack Island', 'Lansing', 'Grand Rapids', 'Ann Arbor', 'Flint'],
			id: 'question-one',
			answer: 1
		}, {
			question: 'What is the capital of Washington State?',
			choices: ['Seattle', 'Bellevue', 'Spokane', 'Olympia', 'Bellingham'],
			id: 'question-two',
			answer: 3
		}, {
			question: 'What is the best kind of coffee?',
			choices: ['Intelligentsia', 'Blue Bottle', 'Starbucks', 'Caribou', 'none of the above'],
			id: 'question-three',
			answer: 4
		}
		]}


// Function to create Quiz data
function questionaire(data) {
	var q = "<form id='questionOne'>" + data.question +"<br>";
	var choices = data.choices;
	for (var i = 0; i < choices.length; i++) {
		var choice = 	choices[i];
		q = q + "<input type='radio' name='"+ data.id +"' value="+ i +">"+ choice;
	}
	return q + "</form>";
}
window.questionaire = questionaire;

// To append questions on the HTML page
function appendQuestions(){
	var questionsHTML = ''
	for (var i = 0; i<quiz.questions.length; i++) {
		questionsHTML = questionsHTML + questionaire(quiz.questions[i]);
	}
	$('#questionsContainer').append(questionsHTML);
}

//To check answers
function checkAnswers (){
		var correct = 0;
		var incorrect = 0;
		var unAnswered =0

		for (var i = 0; i < quiz.questions.length; i++) {
			if (correctAnswer(quiz.questions[i])) {
				correct++;
			} else {
				if (answered(quiz.questions[i])) {
					incorrect++;
				} else {
					unAnswered++;
				}
			}
		}
	$('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
}


// Function for a correct answer
function correctAnswer(question){
	var answer = $('[name='+question.id+']');
	var correct = answer.eq(question.answer);
	var checked = correct.is(':checked');
	return checked;
}
appendQuestions();

//To make sure there is an answer
function answered(question){
	var anyAnswer = false;
	var answer = $('[name='+question.id+']');

	for (var i = 0; i < answer.length; i++) {
		if (answer[i].checked) {
			anyAnswer = true;
		}
	}
	return anyAnswer;
}

// To check answers and stops the clock
	$('#finished').on('click', function() {
	checkAnswers();
	stop();
	$('#finished').hide()
	$('.container').hide()
	$("#message").html("All Done!!");
	})
});
	