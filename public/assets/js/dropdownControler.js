$(document).ready(function(){
  //uzupelnia liste poprzez zapytanie do msql
  $.ajax({
    type: 'GET',
    dataType: "json",
    url: './index.php/main/nazwyPlikow',
    success: function(data) {
      for(var i = 0;i<data.length;i++){
        $("<option value="+data[i][0]+">"+data[i][1]+"</option>").appendTo("#dropdown");
      }
    }
  });

  $("#dropdown ").change(function(){
        $.ajax({
          type: "GET",
          dataType: "json",
          url: "./index.php/main/wykres/"+$('#dropdown option:selected').val(),
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
      });
});
