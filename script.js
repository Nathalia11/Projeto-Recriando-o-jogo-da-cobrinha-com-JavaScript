let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');//renderiza o desenho 
let box = 32; // pixels
let snake = [];
snake [0] = {
  x: 8 * box,
  y: 8 *box
}
let direction = 'righ';
let food = { //Para que a comida aparessa em lugares aleatorios.
  x: Math.floor(Math.random() * 15 + 1 ) * box,
  y: Math.floor(Math.random() * 15 + 1 ) * box
}

function criarBG() {
  context.fillStyle = 'Lightgreen'; // definar a cor
  context.fillRect(0, 0, 16 * box, 16 * box); // desenha o 'retangulo' onde vai acontecer o jogo
}

function criarCobrinha(){
  for(i=0; i <snake.length; i++) {
    context.fillStyle = "red"
    context.fillRect(snake[i].x,snake[i].y, box, box);
  }
}

function drawFood(){ //Criando a comida da cobrinha
  context.fillStyle = 'orange' //a cor da comida
  context.fillRect(food.x, food.y, box, box);
  
}

document.addEventListener('keydown', update);

function update(event) {
  if(event.keyCode == 37 && direction != 'right') direction = 'left';
  if(event.keyCode == 38 && direction != 'down') direction = 'up';
  if(event.keyCode == 39 && direction != 'left') direction = 'right';
  if(event.keyCode == 40 && direction != 'up') direction = 'down';
}


function iniciarJogo(){
  
  if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;//Permite que ela atravesse as paredes
  if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;//Permite que ela atravesse as paredes
  if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;//Permite que ela atravesse as paredes
  if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;//Permite que ela atravesse as paredes

  for(i = 1; 1 < snake.length; i++){ //criar um 'for' para quando a cabeça da cobra se chocar com o corpo
      if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
          clearInterval(jogo);
          alert('GAME OVER :(');
      }
    }    
  criarBG();
  criarCobrinha();
  drawFood();

  let snakex = snake[0].x;
  let snakey = snake[0].y;

  //criando coordenadas para a cobrinha:
  if(direction == 'right') snakex += box;
  if(direction == 'left') snakex -= box;
  if(direction =='up')snakey -= box;
  if(direction =='down')snakey += box; 

  if(snakex != food.x || snakey != food.y) {
    snake.pop();
  }
  else{food.x = Math.floor(Math.random() * 15 + 1 ) * box;
       food.y = Math.floor(Math.random() * 15 + 1 ) * box;
  } 

  snake.pop();

  let newHead = {
    x: snakex,
    y: snakey
  }
  snake.unshift(newHead);
}

let jogo = setIntervalo(iniciarJogo,100);