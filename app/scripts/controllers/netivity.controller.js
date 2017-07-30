angular.module('Netsafe').controller('netivityController',
  function($scope, $timeout, ScenariosFactory) {
  $scope.scenarios = ScenariosFactory;
  $scope.contentScenarios = $scope.scenarios.content;
  $scope.solutionModal = false;

  $scope.elementsTable = true;
  $scope.isCEDisabled = true;
  $scope.isCDisabled = true;

  $(".activity-alert").hide();
  $(".answer-modal").hide();

  $scope.openTable = function (num){
    if(num === 1){
      $scope.elementsTable = !$scope.elementsTable;
    } else if (num === 2){
      $scope.causeEffectTable = !$scope.causeEffectTable;
    } else {
      $scope.comparisonTable = !$scope.comparisonTable;
    }
  };

  $scope.elementsAnswers = [[], [], [], [], []];
  $scope.correctAnswers = [];

  $timeout(function() {
    $scope.currentScenario = 0;
  }, 1);

  $scope.addAnswer = function (selectIndex){
    console.log(selectIndex);
    console.log($scope.elementsAnswers);
  };

  $scope.checkElements = function(pIndex){
    console.log("hello");
    $scope.correctAnswers = $scope.contentScenarios[pIndex].answersOrder;
    console.log($scope.correctAnswers.length);

    $scope.wrongAnswers = [];

    for(var i = 0; i < $scope.correctAnswers.length; i++){
      for(var j = 0; j < $scope.correctAnswers[i].length; j++){
        if($scope.correctAnswers[i][j] !== $scope.elementsAnswers[i][j]){
          $scope.wrongAnswers.push(i + 1);
        }
      }
    }

    $scope.correct = !$scope.wrongAnswers.length;
    if($scope.correct){
      $('.checkCorrect').show();
      $scope.isCEDisabled = false;
    } else {
      $('.checkWrong').show();
    }

    console.log($scope.wrongAnswers);
  };

  $scope.causeEffectAnswers = [];
  $scope.correctCauseEffectAnswers = [];

  $scope.addCEAnswer = function (pIndex){
    console.log(pIndex);
    $scope.correctCauseEffectAnswers = $scope.contentScenarios[pIndex].laborsOrder;
    console.log($scope.correctCauseEffectAnswers);
    console.log($scope.causeEffectAnswers);
  };

  $scope.checkCauseEffectAnswer = function(pIndex){
    $scope.wrongAnswers = [];

    for(var i = 0; i < $scope.correctCauseEffectAnswers.length; i++){
        if($scope.correctCauseEffectAnswers[i] !== $scope.causeEffectAnswers[i]){
          $scope.wrongAnswers.push(i + 1);
      }
    }

    $scope.correct = !$scope.wrongAnswers.length;
    if($scope.correct){
      $('.checkCorrect').show();
      $scope.isCDisabled = false;
    } else {
      $('.checkWrong').show();
    }
  };

  $scope.highlightTogg = [];

  $scope.highlight = function(index, pIndex){
    $scope.currentScenarioRuleHighlights = $scope.contentScenarios[pIndex].correctRules[index].highlights;
    $scope.currentScenarioLaborsLength = $scope.contentScenarios[pIndex].labors.length;

    if(!$scope.highlightTogg[index]){
      $scope.highlightTogg[index] = true;
      $('#highlight-'+index).addClass("active");

      for(var i = 0; i < $scope.currentScenarioLaborsLength; i++){
        for(var j = 0; j< $scope.currentScenarioRuleHighlights.length; j++){
          if(i === $scope.currentScenarioRuleHighlights[j] && !$scope.laborClicked[i])
            $(".action-" + i).addClass("highlighted");
        }
      }
    } else {
      $('.highlight').removeClass("active");
      $scope.highlightTogg[index] = false;
      $(".action").removeClass("highlighted");
    }
  };

  $scope.laborClicked = [];
  $scope.firstChecker = false;
  $scope.allowSolution = false;

  $scope.negateLabor = function (index, pIndex){
    console.log(pIndex);
    if(!$scope.firstChecker){
      $scope.laborLength = $scope.contentScenarios[pIndex].correctLabors.length;
      $scope.laborLength--;
      $scope.firstChecker = true;
      console.log("inside not first checker");
    }
    console.log("curent length: " + $scope.laborLength);

    if($scope.laborLength === index && index != $scope.contentScenarios[pIndex].negateStop){
       $scope.laborClicked[index] = !$scope.laborClicked[index];
       $scope.laborLength--;
    }

    // stops on the number of where the negation ends
    if($scope.laborLength === $scope.contentScenarios[pIndex].negateStop){
        console.log($scope.laborLength);
        $scope.allowSolution = true;
    }
  };

  $scope.showScenario = function(index) {
    $scope.currentScenario = index;
    $scope.currentRule = index;
    $scope.elementsAnswers = [];
    $scope.causeEffectAnswers = [];
    $scope.wrongAnswers = [];
    $scope.laborClicked = [];
    $scope.openedAll = false;

    $(".answer-modal").hide();
  };

  $scope.viewSolution = function (){
    if($scope.allowSolution){
      $scope.solutionModal = !$scope.solutionModal;
    }
  };

  var prevID = 0;

  $scope.showHelpTab = function(id){
    if(prevID === id){
      $(".malwr-help-btn").removeClass("active");
      $scope.showHelpTab(10);

      prevID = 0;
    } else {
      $(".malwr-help-btn").removeClass("active");
      $(".tab-help-content").hide();

      $("#malwr-help-btn-"+ id).addClass("active");
      $("#tab-help-content-" + id).show();

      prevID = id;
    }
  };

  $scope.showHelpTab(1);

  $scope.elements = [
    { value: 1,
      name: 'Remember the Human'
    }, {
      value: 2,
      name: 'Adhere to the Same Standards of Behavior Online and Offline'
    }, {
      value: 3,
      name: 'Know where you are in Cyberspace'
    }, {
      value: 4,
      name: 'Respecting Other People\'s Time and Bandwidth'
    }, {
      value: 5,
      name: 'Make Yourself Look Good Online'
    }, {
      value: 6,
      name: 'Share Expert Knowledge'
    }, {
      value: 7,
      name: 'Help Keep Flame Wars Under Control'
    }, {
      value: 8,
      name: 'Respect Other People\'s Privacy'
    }, {
      value: 9,
      name: 'Don\'t Abuse Your Power'
    }, {
      value: 10,
      name: 'Be Forgiving of Other People\'s Mistakes'
    }
  ];

  $scope.guidelines1 = [
    {name: "Sender and/or Receiver"},
    {name: "When the sender makes a statement or posted something on the online platform"},
    {name: "Sender and/or Receiver"},
    {name: "Online platform"},
    {name: "Remember the human"}
  ];

  $scope.guidelines2 = [
    {name: "Netizen/s"},
    {name: "When the netizen posts online"},
    {name: "Netizen/s"},
    {name: "Online platform"},
    {name: "Adhere to the same standards of behavior online that you follow in real life"}
  ];

  $scope.guidelines3 = [
    {name: "Netizen/s"},
    {name: "When you start participating in a new community online"},
    {name: "New netizen and/or netizens native to the domain"},
    {name: "Online platform"},
    {name: "Know where you are in cyberspace"}
  ];

  $scope.guidelines4 = [
    {name: "Sender and/or receiver"},
    {name: "When you are sending information on the online platform"},
    {name: "Sender, receiver, and/or netizens in the online community"},
    {name: "Online platform"},
    {name: "Respect other people’s time and bandwidth"}
  ];

  $scope.guidelines5 = [
    {name: "Netizen/s"},
    {name: "When you are posting your own content on the online platform"},
    {name: "Other netizens following the netizen on the online platform"},
    {name: "Online platform"},
    {name: "Make yourself look good online"}
  ];

  $scope.guidelines6 = [
    {name: "Sender and receiver"},
    {name: "When you’re asking for or  exchanging expert information"},
    {name: "Sender and receiver"},
    {name: "Online platform"},
    {name: "Share expert knowledge"}
  ];

  $scope.guidelines7 = [
    {name: "Sender and/or receiver"},
    {name: "Posting or making a statement online"},
    {name: "Sender and/or receiver"},
    {name: "Online platform"},
    {name: "Help keep flame wars under control"}
  ];

  $scope.guidelines8 = [
    {name: "Owner and infiltrator"},
    {name: "When you access other people's private information without their full consent "},
    {name: "Owner and infiltrator"},
    {name: "Access to online account of other netizen"},
    {name: "Respect other people’s privacy"}
  ];

  $scope.guidelines9 = [
    {name: "Subordinate and/or Admin"},
    {name: "When there is a need to access admin features"},
    {name: "Subordinate/s and/or Boss"},
    {name: "Company network, company online platform"},
    {name: "Don’t abuse your power"}
  ];

  $scope.guidelines10 = [
    {name: "Sender and/or receiver"},
    {name: "Posting or making a statement online"},
    {name: "Receiver"},
    {name: "Online platform"},
    {name: "Be forgiving of other people’s mistakes"}
  ];

  $scope.questions = [
    "Subject (internal factors / people active in the scenario)",
    "Objective (what action triggered/stimulated the series of events?)",
    "Community (Who are involved whether active or inactive)",
    "Tools (what tools explicitly used in the scenario)",
    "Rules / Guidelines Applied (based on the element of comparison, what rules apply)"
  ];

  $scope.elementsGuide = [
    {content: "The subject is/are the people who are active in the scenario. Their actions have direct impact in the scenario. "},
    {content: "The objective is the first action that triggered the series of events. The objective is what causes everything that happens in the scenario. "},
    {content: "The community is/are the people who are affected in the scenario whether they are active or inactive. "},
    {content: "The tool is the objects that are directly related to cyberspace or the type of media explicitly used in the scenario."},
    {content: "The rules / guidelines are the specific ones that violate the scenario in discussion."}
  ];

  $scope.tutLaborClick = function(num){
    if(num === 3){
      $scope.thirdAction = true;
    } else if (num === 2 && $scope.thirdAction){
      $scope.secondAction = true;
    }
  };

});
