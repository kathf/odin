function renderGrid(size) {
  var table = $('<table></table>');

  for(i=0; i<size; i++){
    var row = $('<tr></tr>');
    for(j=0; j< size; j++){
      var col = $('<td class="cell" id ="' + i + '-' + j + '"></td>');
      row.append(col);
    };
    table.append(row);
  };
  $('#grid').append(table);
}


var snake = {
  initialPosition : function(gridSize) {
    var middle = Math.floor( gridSize / 2 );
    this.headPosition(middle,middle);
    this.direction = 'right'
  },
  headPosition : function(x,y) {
    var idName = "#" + x + "-" + y;
    $(idName).addClass('snakeHead');
  },
  bodyPositions : [[20,20]],
  move : function() {
  }
}

var game = {
  start : function() {
    setInterval(snake.move(), 500);
  }
}

$(document).ready(function(){
  var gridSize = 20;
  renderGrid(gridSize);
  snake.initialPosition(gridSize);
  game.start();
  $(document).keydown(function(event){
    snake.direction = event.key.substring(5, event.key.length).toLowerCase();
    console.log(event.key.substring(5, event.key.length).toLowerCase())
  });
});


