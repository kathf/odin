var grid = {
  size: 20,
  render: function () {
    var table = $('<table></table>');

    for ( i=0; i<grid.size; i++ ) {
      var row = $('<tr></tr>');
      for( j=0; j< grid.size; j++ ){
        var col = $('<td class="cell" id ="' + i + '-' + j + '"></td>');
        row.append(col);
      }
      table.append(row);
    }
    $('#grid').append(table);
  },
  renderFood: function() {
    var max = grid.size;
    var x = Math.floor(Math.random() * (max));
    var y = Math.floor(Math.random() * (max));
    renderOnGrid(x, y, 'food');
  }
};

function renderOnGrid(x, y, classToRender) {
  var idName = "#" + x + "-" + y;
  $('#grid td').removeClass(classToRender);
  $(idName).addClass(classToRender);
}

var snake = {
  initialPosition: function() {
    var middle = Math.floor( grid.size / 2 );
    snake.headPosition = [middle,middle];
    snake.direction = 'right';
    snake.render();
  },
  render: function() {
    var x = snake.headPosition[0];
    var y = snake.headPosition[1];
    renderOnGrid(x, y, 'snakeHead');
  },
  bodyPositions: [[20,20]],
  move: function() {
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
  },
  isOutOfBounds: function() {
    var outOfBounds = false;
    var x = snake.headPosition[1];
    var y = snake.headPosition[0];
    if (x < 0 || x > grid.size || y < 0 || y > grid.size) {
      outOfBounds = true;
    }
    return outOfBounds;
  }
};

function setUpMoveListeners() {
  $(document).keydown(function(event){
    snake.direction = event.key.substring(5, event.key.length).toLowerCase();
  });
}

var game = {
  start: function() {
    game.identifier = setInterval(game.turn, 1000);
  },
  turn: function() {
    snake.move();
    if ( snake.isOutOfBounds() ) {
      game.over();
    } else {
      snake.render();
    }
  },
  over: function() {
    var gameOver = $("<div id=gameOver> Game Over </div>");
    $('#grid').prepend(gameOver);
    clearInterval(game.identifier);
  }
};

$(document).ready(function(){
  grid.render();
  setUpMoveListeners();
  grid.renderFood();
  snake.initialPosition();
  game.start();
});


