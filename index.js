const h1=document.getElementsByTagName("h1");
let s=0;
const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');

    const paddleWidth = 10;
    const paddleHeight = 100;
    let paddle1Y = canvas.height / 2 - paddleHeight / 2;
    let paddle2Y = canvas.height / 2 - paddleHeight / 2;

    // Ball Variables
    const ballSize = 10;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = Math.floor(Math.random() * 3) + 4; 
    let ballSpeedY = Math.floor(Math.random() * 3) + 4; 
    let signX=1;
    let signY=1;

    // Draw Functions
     function drawRect(x, y, width, height, color) {
    
     ctx.fillStyle=color;
      ctx.fillRect(x, y, width, height);
    }

    function drawCircle(x, y, radius, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.fill();
    }

    function draw() {
      // Clear Canvas
      drawRect(0, 0, canvas.width, canvas.height, 'black');
      // Draw Paddles
      drawRect(0, paddle1Y, paddleWidth, paddleHeight, 'white');
      drawRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, 'white');

      // Draw Ball
      drawCircle(ballX, ballY, ballSize, 'white');
    }

    // Update Function
    function update() {
      // Move Ball
      ballSpeedY =(Math.floor(Math.random() * 3) + 4)*signY; 
      ballSpeedX = (Math.floor(Math.random() * 3) + 4)*signX;
      ballX +=ballSpeedX;
      ballY+=ballSpeedY;
      

      // Ball Collision with Top and Bottom Walls
      if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
        signY*=-1;
        ballSpeedY =(Math.floor(Math.random() * 3) + 4)*signY; 
      }

      // Ball Collision with Paddles
      if (ballX - ballSize < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight ||
          ballX + ballSize > canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
         s=s+1;
         h1[0].innerHTML=`SCORE : ${s}`;
         signX*=-1;
        ballSpeedX = (Math.floor(Math.random() * 3) + 4)*signX;
      }

      // Ball Out of Bounds
      if (ballX - ballSize < 0 || ballX + ballSize > canvas.width) {
        //resetBall();
        resetBall();
      }
    }

    // Reset Ball Position
    function resetBall() {
      s=0;
      h1[0].innerHTML=`SCORE :${s}`;
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      signX*=-1;
      ballSpeedX =(Math.floor(Math.random() * 1) + 3)*signX;
    }

    // Mouse Move Handler
    canvas.addEventListener('mousemove', function(event) {
      const mousePos = calculateMousePos(event);
      paddle1Y = mousePos.y - paddleHeight / 2;
      paddle2Y=mousePos.y - paddleHeight / 2;
    });

    // Calculate Mouse Position
    function calculateMousePos(event) {
      const rect = canvas.getBoundingClientRect();
      const root = document.documentElement;
      const mouseX = event.clientX - rect.left - root.scrollLeft;
      const mouseY = event.clientY - rect.top - root.scrollTop;
      return { x: mouseX, y: mouseY };
    }

    // Game Loop
    function gameLoop() {
      draw();
      update();
      requestAnimationFrame(gameLoop);
    }

    // Start Game
    gameLoop();