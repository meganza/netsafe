angular.module('Netsafe').controller('fundamentalController', function($scope) {
	console.log('you are in fundamentalController');

  $scope.playerVars = {
    controls: 1,
    rel: 0
  };

  $scope.digitalTattooVid = 'https://www.youtube.com/watch?v=lljOiBv4V6w';
  $scope.internetPrivacyVid = 'https://www.youtube.com/watch?v=AsidPDo6icM';
  $scope.respectingOthersVid = 'https://www.youtube.com/watch?v=H0TQIJdJw_U';

  var pauseCount = 0;

  $scope.$on('youtube.player.playing', function($event, player){
    console.log(player.getVideoData().video_id); // get the video id of the playing video

    if(player.getVideoData().video_id == "lljOiBv4V6w"){
      if (pauseCount == 0){
        // pause at first pause time
        setTimeout($scope.pauseVideo = function(){
                    player.pauseVideo();
                  }, 3000);   // pauses at 0:02 [0, 1, 2]
        pauseCount++;
      } else if (pauseCount == 1){
        setTimeout($scope.pauseVideo = function(){
                    player.pauseVideo();
                  }, 6000);   // pauses at 0:08 [3, 4, 5, 6, 7, 8]
        // second pause time
        pauseCount++;
      } else if (pauseCount == 2){
        // third pause count
        setTimeout($scope.pauseVideo = function(){
                    player.pauseVideo();
                  }, 2000);   // pauses at 0:08 [9, 10]
        // if last,
        pauseCount = 10;
      }
    } else if (player.getVideoData().video_id == "AsidPDo6icM"){
      console.log("hello, internet privacy vid is playing");
    } else {
      console.log("hello, respecting others  vid is playing");
    }

    // problem: its not at a SPECIFIC time, pause @ ___ seconds, play, pauses @ ___ seconds
    // if the pause is by the teacher, then it will work up everything
    console.log(pauseCount);
  });

  // puts pauseCount counter back to 0
  $scope.$on('youtube.player.ended', function($event, player){
    pauseCount = 0;
    console.log(pauseCount);
  });

	$scope.showTab = function(id){
    $(".tab").removeClass("active");
    $(".tab-content").hide();

    $("#tab-"+ id).addClass("active");
    $("#tab-content-" + id).show();
	};

  $scope.showTab(1);
  $(".CYO-video").hide();

  $("#CYO-video-1").show();
  $("#cyo-btn-1").addClass("active");

  $scope.showCYOVid = function(id){
    $(".CYO-video").hide();
    $("#CYO-video-" + id).show();

    $(".cyo-btn").removeClass("active");
    $("#cyo-btn-" + id).addClass("active");
  };

});
