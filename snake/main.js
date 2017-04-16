var grid = {
  size: 20,
  foodPosition: {},
  render: function () {
    var table = $('<table></table>');

    for ( i=0; i<grid.size; i++ ) {
      var row = $('<tr></tr>');
      for( j=0; j< grid.size; j++ ){
        var col = $('<td class="cell" id ="' + j + '-' + i + '"></td>');
        row.append(col);
      }
      table.append(row);
    }
    $('#grid').append(table);
  },
  renderFood: function() {
    grid.remove('food');
    grid.foodPosition.x = Math.floor(Math.random() * (grid.size));
    grid.foodPosition.y = Math.floor(Math.random() * (grid.size));
    renderOnGrid(grid.foodPosition, 'food');
  },
  remove: function(classToRender) {
    $('#grid td').removeClass(classToRender);
  }
};

function renderOnGrid(coords, classToRender) {
  var idName = "#" + coords.x + "-" + coords.y;
  $(idName).addClass(classToRender);
}

var snake = {
  headPosition: {},
  initialPosition: function() {
    var middle = Math.floor( grid.size / 2 );
    snake.headPosition.x = middle;
    snake.headPosition.y = middle;
    snake.direction = 'right';
    snake.render();
  },
  render: function() {
    grid.remove('snakeHead');
    grid.remove('snakeBody');
    renderOnGrid(snake.headPosition, 'snakeHead');
    snake.bodyCoordinates.forEach(function(coords,_) {
      renderOnGrid(coords, 'snakeBody');
    });
  },
  renderFlash: function() {
    renderOnGrid(snake.headPosition, 'flash');
  },
  bodyCoordinates: [],
  move: function() {
    switch (snake.direction) {
      case 'right':
        snake.advanceCoords('x', 1);
        break;
      case 'left':
        snake.advanceCoords('x', -1);
        break;
      case 'up':
        snake.advanceCoords('y', -1);
        break;
      case 'down':
        snake.advanceCoords('y', 1);
        break;
    }
  },
  isOutOfBounds: function() {
    var outOfBounds = false;
    var x = snake.headPosition.x;
    var y = snake.headPosition.y;
    if (x < 0 || x > grid.size || y < 0 || y > grid.size) {
      outOfBounds = true;
    }
    return outOfBounds;
  },
  eatsFood: function() {
    return (snake.headPosition.x == grid.foodPosition.x) && (snake.headPosition.y == grid.foodPosition.y);
  },
  growNextMove: false,
  getHeadPosition: function() {
    return snake.headPosition;
  },
  advanceCoords: function(xOrY, increment) {
    // advance the snake body by adding the headPosition to the body coords
    var head = {
      x: snake.headPosition.x,
      y: snake.headPosition.y
    };
    snake.bodyCoordinates.unshift(head);

    // Remove the last unless the snake needs to grow this turn
    if (!snake.growNextMove) {
      snake.bodyCoordinates.pop();
    }

    // advance the snake head
    snake.headPosition[xOrY] += increment;

    // reset growNextMove to false for next step
    snake.growNextMove = false;
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
      snake.growNextMove = true;
      game.startAgain();
    }

    snake.render();
  },
  startAgain: function() {
    snake.renderFlash();
    grid.renderFood();
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


