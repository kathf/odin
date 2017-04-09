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
    grid.foodPosition.x = Math.floor(Math.random() * (grid.size));
    grid.foodPosition.y = Math.floor(Math.random() * (grid.size));
    renderOnGrid(grid.foodPosition, 'food');
  }
};

function renderOnGrid(coords, classToRender) {
  var idName = "#" + coords.x + "-" + coords.y;
  $('#grid td').removeClass(classToRender);
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
    renderOnGrid(snake.headPosition, 'snakeHead');
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
    if (snake.headPosition == grid.foodPosition) {
      snake.growNextMove = true;
    }
  },
  growNextMove: false,
  advanceCoords: function(xOrY, increment) {
    // advance the snake head
    snake.headPosition[xOrY] += increment;

    // advance the snake body coordinates
    var newBodyCoords = snake.bodyCoordinates.map(function(){
      this[xOrY] += increment;
    });

    // If the growNextMove boolean is true
    if (!!snake.growNextMove) {
      // reset growNextMove to false for next step
      snake.growNextMove = false;

      // add a coord at the end of the body
      lastCoord = snake.bodyCoordinates.pop();
      newBodyCoords.push(lastCoord);
    }

    // assign the new body coordinates
    snake.bodyCoordinates = newBodyCoords;
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


