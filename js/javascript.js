var x = 86, y = 175;
var vidas = 3, punt = 0;
var minEnemy = 4;
var maxEnemy = 9;
var enemyPositions = [];
var enemy = {};

function putEnemyInvisible(num) {
  enemyPositions[num].collision = true;
  $("#"+num+"").css('visibility','hidden');
}

function collision() {
  let nau = $("#nau");

  for (let i = 0; i < enemyPositions.length; i++) {
    console.log(parseInt(nau.attr("x")), parseInt(nau.attr("y")), parseInt(nau.attr("width")), parseInt(nau.attr("height")), enemyPositions[i].x, enemyPositions[i].y, enemyPositions[i].width, enemyPositions[i].height);
    if (!enemyPositions[i].collision && isCollision(parseInt(nau.attr("x")), parseInt(nau.attr("y")), parseInt(nau.attr("width")), parseInt(nau.attr("height")), enemyPositions[i].x, enemyPositions[i].y, enemyPositions[i].width, enemyPositions[i].height)) {
      putEnemyInvisible(enemyPositions[i].num);
    }
  }
}

function isCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (x2 > w1 + x1-1 || x1 > w2 + x2-1 || y2 > h1 + y1-1 || y1 > h2 + y2-1) {
    return false;
  } else {
    resetSquare();
    return true;
  }
}

function putSpaceship() {
  if ($("#nau").length) {
    console.log("a");
  } else {
    const nau = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    nau.setAttribute("id", "nau");
    nau.setAttribute("x", "86");
    nau.setAttribute("y", "175");
    nau.setAttribute("width", "25");
    nau.setAttribute("height", "25");
    nau.setAttribute("fill", "#428d6b");
    nau.setAttribute("stroke","#322838");
    $("#enemys").append(nau);
  }
}
 
function putEnemy() {
  putSpaceship();
  enemyPositions = [];
  var area = $("#area");
  var enemysAmount = Math.floor(
    Math.random() * (maxEnemy - minEnemy + 1) + minEnemy
  );

  for (i = 0; i < enemysAmount; i++) {
    enemy = {};
    enemy["num"] = i;
    enemy["x"] = Math.floor(10 + Math.random() * (area.width() - 25));
    enemy["y"] = Math.floor(10 + Math.random() * (area.height() - 50));
    enemy["collision"] = false;
    enemy['height'] = 20;
    enemy['width'] = 20;
    enemyPositions.push(enemy);
  }

  for (i = 0; i < enemyPositions.length; i++) {
    const enemy = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    enemy.setAttribute("id", enemyPositions[i].num);
    enemy.setAttribute("x", enemyPositions[i].x);
    enemy.setAttribute("y", enemyPositions[i].y);
    enemy.setAttribute("width", "20");
    enemy.setAttribute("height", "20");
    enemy.setAttribute("fill", "#aa4649");
    enemy.setAttribute("stroke","#322838");
    $("#enemys").append(enemy);
  }
}

function newSquare() {
  punt = punt + 1;
  defaultPosition();
}

function resetSquare() {
  vidas = vidas - 1;
  $("#numV").val(vidas);
  if (vidas == 0) {
    gameOver();
  } else {
    $("#nau").attr("x", x);
    $("#nau").attr("y", y);
  }
}

function gameOver() {
  alert("GAME OVER!\nYour final score is " + punt);
  firstSquare();
}

function defaultPosition() {
  $("#numV").val(vidas);
  $("#numP").val(punt);
  $("#enemys").empty();
  $("#nau").attr("x", x);
  $("#nau").attr("y", y);
  putEnemy();
}

function firstSquare() {
  punt = 0;
  vidas = 3;
  defaultPosition();
}

function init() {
  var area = $("#area");
  var nau = $("#nau");
  var maxV = area.outerWidth() - nau.width();

  $(window).keydown(function (event) {
    nau = $("#nau");
    var y = parseInt(nau.attr("y"));
    var x = parseInt(nau.attr("x"));

    console.log(enemyPositions);

    // y == enemyPositions[i].y && x == enemyPositions[i].x
    var addTop = function (diff) {
      if (y == 0) {
        newSquare();
      } else {
        nau.attr("y", y + parseInt(diff));
        collision();
      }
    };

    var addLeft = function (diff) {
      nau.attr("x", parseInt(nau.attr("x")) + parseInt(diff));
      collision();
    };

    switch (event.keyCode) {
      case 70: //up
        addTop(-1);
        break;
      case 76: //left
        if (parseInt(nau.attr("x"), 10) != 0) {
          addLeft(-1);
          break;
        } else {
          break;
        }
      case 82: //right
        if (parseInt(nau.attr("x"), 10) != maxV) {
          addLeft(1);
          break;
        } else {
          break;
        }
    }
  });
}

function _init() {
  $("#numV").val(vidas);
  $("#numP").val(punt);
  firstSquare();
  init();
}

$(document).ready(_init);