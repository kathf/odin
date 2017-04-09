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
    var x = Math.floor(Math.random() * (grid.size));
    var y = Math.floor(Math.random() * (grid.size));
    grid.foodPosition = [x,y];
    renderOnGrid(grid.foodPosition, 'food');
  }
};

function renderOnGrid(position, classToRender) {
  var idName = "#" + position[0] + "-" + position[1];
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
    renderOnGrid(snake.headPosition, 'snakeHead');
  },
  bodyCoordinates: [[20,20]],
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
  },
  eatsFood: function() {
    return snake.headPosition == grid.foodPosition
  },
  grow: function() {

  }
};

function setUpMoveListeners() {
  $(document).keydown(function(event){
    snake.direction = event.key.substring(5, event.key.length).toLowerCase();
  });
}

var game = {
  start: function() {
    game.identifier = setInterval(game.step, 500);
  },
  step: function() {
    snake.move();
    if ( snake.isOutOfBounds() ) {
      game.over();
    } else if ( snake.eatsFood() ) {
      snake.grow();
    }
    snake.render();
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


