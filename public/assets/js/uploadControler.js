$(document).ready(function(){
  var stan = 0;
  var element = document.body //let's just use body for now
  element.addEventListener("dragover", activate);
  $(".dropzone").on(
    'drop',function(e){
        deactivate();
    }
  );
  $(".dropzone").on(
    'dragleave',function(e){
        deactivate();
    }
  );
  $(".dropzone").on(
    'dragend',function(e){
        deactivate();
    }
  );
  function activate(){
    if(stan==0){
      $(".dropzone").css({position: 'fixed'});
      $(".dropzone").css({top: '0'});
      $(".dropzone").css({left: '0'});
      $(".dropzone").width($(window).width()).height($(window).height());
      $(".dropzone").css('background-color', '#A5A7A8');
      $(".fs-upload-target").width($(window).width()).height($(window).height());
      //$(".fs-upload-target").css({position: 'fixed'});
      $(".fs-upload-target").css('background-color', '#A5A7A8');
      $(".fs-upload-input").width($(window).width()).height($(window).height());
      //$(".fs-upload-input").css({position: 'fixed'});
      $(".fs-upload-input").css('background-color', '#A5A7A8');
      stan=1;
    }
  }
  function deactivate(){
    $(".dropzone").css({position: 'relative'});
    $(".dropzone").width('auto');
    $(".dropzone").height('80px');
    $(".dropzone").css('background-color', 'white');
    $(".fs-upload-target").width('auto');
    $(".fs-upload-target").height('auto');
    $(".fs-upload-target").css('background-color', 'white');
    $(".fs-upload-input").width('auto');
    $(".fs-upload-input").height('auto');
    $(".fs-upload-input").css('background-color', 'white');
    stan=0;
  }
  var action = $(".dropzone").attr('action');
  $(".dropzone").upload({
    action: action
  }).on("complete.upload", onFileComplete)
  function onFileComplete(e, file, response) {
    $.ajax({
      type: 'GET',
      dataType: "json",
      url: './index.php/main/returnId',
      success: function(data) {
        $.ajax({
          type: "GET",
          dataType: "json",
          url: "./index.php/main/wykres/"+data.id,
          //funkcja wyświetlająca wykres
          success: function (data) {
            var data1 = {
              labels: data['time'],
              datasets: [
                {
                  fillColor: "rgba(120,120,120,0.2)",
                  strokeColor: "rgba(220,220,220,1)",
                  pointColor: "rgba(000,000,000,1)",
                  pointStrokeColor: "#000",
                  pointHighlightFill: "#000",
                  pointHighlightStroke: "rgba(220,220,120,1)",
                  data: data['ping']
                }
              ]
            };
            var ctx = document.getElementById("wykres").getContext("2d");
            var options = {
              pointDot : false,
              pointHitDetectionRadius : 0,
            };
            window.myPie = new Chart(ctx).Line(data1,options);
          }
        });
      }
    });}

  });
