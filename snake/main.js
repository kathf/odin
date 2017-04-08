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
    snake.headPosition = [middle,middle];
    snake.direction = 'right';
  },
  render : function() {
    var x = snake.headPosition[0];
    var y = snake.headPosition[1];
    var idName = "#" + x + "-" + y;
    $('#grid td').removeClass('snakeHead');
    $(idName).addClass('snakeHead');
  },
  bodyPositions : [[20,20]],
  move : function() {
    console.log("moving")
    switch (snake.direction) {
      case 'right':
        snake.headPosition[1] += 1;
        break;
      case 'left':
        snake.headPosition[1] -= 1;
        break;
      case 'up':
        snake.headPosition[0] -= 1;
        break;
      case 'down':
        snake.headPosition[0] += 1;
        break;
    }
    snake.render();
  }
}

function setUpMoveListeners() {
  $(document).keydown(function(event){
    snake.direction = event.key.substring(5, event.key.length).toLowerCase();
  })
}

var game = {
  start : function() {
    setInterval(snake.move, 1000);
  }
}

$(document).ready(function(){
  var gridSize = 20;
  renderGrid(gridSize);
  setUpMoveListeners();
  snake.initialPosition(gridSize);
  snake.render();
  game.start();
});


