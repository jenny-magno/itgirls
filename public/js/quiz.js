var Quiz = function(){
var self = this;

this.init = function(){
  self._bindEvents();
}

this.answerMapping = {
  '1': {
    'a': [3,2,2], 'b': [3,1,2], 'c': [2,3,2], 'd': [1,3,1], 'e': [2,2,3], 'f': [1,1,3]
  },
  '2': {
    'a': [3,1,2], 'b': [3,1,2], 'c': [2,3,1], 'd': [2,3,1], 'e': [1,2,3], 'f': [1,2,3]
  },
  '3': {
    'a': [3,1,2], 'b': [3,2,1], 'c': [2,3,1], 'd': [1,3,2], 'e': [2,1,3], 'f': [1,2,3]
  },
  '4': {
    'a': [3,1,2], 'b': [3,2,1], 'c': [2,3,2], 'd': [1,3,1], 'e': [2,2,3], 'f': [1,1,3]
  },
  '5': {
    'a': [3,2,2], 'b': [3,1,2], 'c': [2,3,2], 'd': [1,3,2], 'e': [2,1,3], 'f': [1,2,3]
  },
  '6': {
    'a': [3,2,1], 'b': [3,1,2], 'c': [2,3,1], 'd': [2,3,1], 'e': [1,2,3], 'f': [2,1,3]
  },
  '7': {
    'a': [3,1,2], 'b': [3,2,1], 'c': [1,3,1], 'd': [2,3,1], 'e': [1,1,3], 'f': [2,1,3]
  },
  '8': {
    'a': [3,1,2], 'b': [3,2,1], 'c': [2,3,1], 'd': [1,3,2], 'e': [1,2,3], 'f': [2,1,3]
  },
  '9': {
    'a': [3,2,2], 'b': [3,2,1], 'c': [2,3,1], 'd': [1,3,2], 'e': [2,1,3], 'f': [2,1,3]
  },
  '10': {
    'a': [3,2,1], 'b': [3,1,2], 'c': [2,3,1], 'd': [2,3,1], 'e': [2,2,3], 'f': [2,1,3]
  }
};

this._DESIGNER_IDX = 0;
this._DEV_IDX = 1;
this._BA_IDX = 2;

this.CODES = ['track-designer', 'track-developer', 'track-business'];


this._pickAnswer = function($answer, $answers){
  $answers.find('.quiz-answer').removeClass('active');
  $answer.addClass('active');
}

this._calcResult = function(){
  var totalDesigner = 0; 
  var totalDev = 0; var _DEV_IDX = 1;
  var totalBA = 0; var _BA_IDX = 2;

  $('[data-quiz-question]').each(function(i){
    var $this = $(this),
        chosenAnswer = $this.find('.quiz-answer.active').data('quiz-answer'),
        correctAnswer;

    var questionNo = $this.data('quiz-question');

    var answerValues = self.answerMapping[questionNo][chosenAnswer];

    totalDesigner += answerValues[self._DESIGNER_IDX];
    totalDev += answerValues[self._DEV_IDX];
    totalBA += answerValues[self._BA_IDX];

  });

  var maxIdx = self._getMax([totalDesigner, totalDev, totalBA]);
  return {code: self.CODES[maxIdx[0]]};
}

this._isComplete = function(){
  var answersComplete = 0;
  $('[data-quiz-question]').each(function(){
    if ( $(this).find('.quiz-answer.active').length ) {
      answersComplete++;
    }
  });
  if ( answersComplete >= 10 ) {
    return true;
  }
  else {
    return false;
  }
}
this._showResult = function(result){
  $('.quiz-result#' + result.code).show();
  $('#lets-go').show();
}

this._getMax = function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = [0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = [i];
      max = arr[i];
    } else if (arr[i] == max) {
      maxIndex.push(i);
    }
  }

  return maxIndex;
}

this._bindEvents = function(){
  $('.quiz-answer').on('click', function(){
    var $this = $(this),
        $answers = $this.closest('[data-quiz-question]');
    self._pickAnswer($this, $answers);
    if ( self._isComplete() ) {
      
      // scroll to answer section
      $('html, body').animate({
        scrollTop: $('.results-section').offset().top
      });
      
      self._showResult( self._calcResult() );
      $('.quiz-answer').off('click');
      
    } else {
      $('html, body').animate({
        scrollTop: $this.closest('.quiz-choices').next('.quiz-question').offset().top - 50
      });
    }
  });
}
}
var quiz = new Quiz();
quiz.init();