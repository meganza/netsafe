angular.module('Netsafe').controller('netivityController',
  function($scope, ScenariosFactory) {
  $scope.scenarios = ScenariosFactory;

  $(".activity-alert").hide();
  $(".answer-modal").hide();

  $scope.answers = [null, null, null, null, null, null, null];
  $scope.correctAnswers = [2, 0, 3, 3, 0, 1, 3];

  $scope.currentScenario = -1;

  // Tabs for scenario difficulty
  $scope.showTab = function(id){
    $(".tab").removeClass("active");
    $(".tab-content").hide();
    $("#tab-"+ id).addClass("active");
    $("#tab-content-" + id).show();
    $scope.answers = [null, null, null, null, null, null, null];
  };

  $scope.showTab(1);

  $scope.showEasyScenario = function(index) {
    $(".button-num").removeClass("active");
    $("#button-num-"+ index).addClass("active");
    $scope.currentScenario = index;
    $scope.answers = [null, null, null, null, null, null, null];

    $(".answer-modal").hide();
  };

  $scope.showMedScenario = function(index) {

    $scope.currentScenario = index;
    $scope.answers = [null, null, null, null, null, null, null];

    $(".answer-modal").hide();
  };

  $scope.showHardScenario = function(index) {

    $scope.currentScenario = index;
    $scope.answers = [null, null, null, null, null, null, null];

    $(".answer-modal").hide();
  };

  $scope.clickAnswer = function(index){
    $("#answer-" + index).toggle();
  };

  $scope.checkAnswer = function(){
    for(var i = $scope.correctAnswers.length; i--;) {
      if($scope.correctAnswers[i] === $scope.answers[i])
        $scope.correct = true;
      else {
        i = 0;
        $scope.correct = false;
      }
    }

    if($scope.correct){
      $('.checkCorrect').show();
    } else {
      $('.checkWrong').show();
    }
  };

  $scope.questions = [
    "What is needed in the scenario?",
    "Who are involved in the scenario?",
    "Who and what are affected by the scenario?",
    "What tools are used in the scenario?",
    "What are the actions of the people involved?",
    "What guidelines are related to the scenario?",
    "Solution"
  ]

  $scope.easyScenarios = $scope.scenarios.easy;
  $scope.medScenarios = $scope.scenarios.med;
  $scope.hardScenarios = $scope.scenarios.hard;
});
