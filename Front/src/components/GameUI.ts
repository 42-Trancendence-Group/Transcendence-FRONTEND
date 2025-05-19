// src/components/GameUI.ts

export interface GameElements {
  gameContainer: HTMLDivElement;
  scoreDisplay: HTMLDivElement;
  statusDisplay: HTMLDivElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
}

export function createGameUI(): GameElements {
  const gameContainer = document.createElement('div');
  gameContainer.className = 'flex flex-col items-center justify-center w-full max-w-4xl arcade-container bg-arcade-darker p-4 sm:p-6 md:p-8 shadow-xl'; // Max width for responsiveness

  const scoreDisplay = document.createElement('div');
  scoreDisplay.id = 'score-display';
  scoreDisplay.className = 'text-3xl sm:text-4xl font-bold text-neon-blue mb-4';
  scoreDisplay.textContent = 'P1: 0 - P2: 0';

  const statusDisplay = document.createElement('div');
  statusDisplay.id = 'status-display';
  statusDisplay.className = 'text-lg text-neon-green mb-4 h-6'; // Fixed height to prevent layout shifts
  statusDisplay.textContent = 'Connecting to game server...';

  const canvas = document.createElement('canvas');
  canvas.id = 'pong-canvas';
  // Aspect ratio 4:3 is common for Pong
  // We'll set actual width/height based on container or server message
  canvas.className = 'border-2 border-neon-purple bg-black w-full aspect-[4/3]'; // Responsive width, fixed aspect ratio

  // Initial dummy dimensions, will be updated
  canvas.width = 800;
  canvas.height = 600;

  const context = canvas.getContext('2d');
  if (!context) {
    console.error('Failed to get 2D context');
    statusDisplay.textContent = 'Error: Canvas not supported!';
    statusDisplay.classList.remove('text-neon-green');
    statusDisplay.classList.add('text-neon-red'); // Assuming you have a neon-red
  }

  gameContainer.appendChild(scoreDisplay);
  gameContainer.appendChild(statusDisplay);
  gameContainer.appendChild(canvas);

  return { gameContainer, scoreDisplay, statusDisplay, canvas, context };
}

// Game state type for rendering
export interface GameState {
  ball: { x: number; y: number; radius: number };
  paddle1: { x: number; y: number; width: number; height: number };
  paddle2: { x: number; y: number; width: number; height: number };
  score1: number;
  score2: number;
  canvasDimensions?: { width: number; height: number }; // Optional, server might send this
}

const PADDLE_COLOR = '#00FFFF'; // Neon Cyan
const BALL_COLOR = '#FFA500';   // Neon Orange
const LINE_COLOR = '#FFFFFF';   // White (or a dim neon)

export function drawGame(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  gameState: GameState
): void {
  // Use server-provided dimensions if available, otherwise canvas's current dimensions
  const canvasWidth = gameState.canvasDimensions?.width || canvas.width;
  const canvasHeight = gameState.canvasDimensions?.height || canvas.height;

  // If canvas internal dimensions don't match, resize it
  // This is important if the server dictates the game's logical resolution
  if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }

  // Clear canvas
  ctx.fillStyle = '#0D0D0D'; // Dark background for the game area
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Draw center line (optional)
  ctx.strokeStyle = LINE_COLOR;
  ctx.lineWidth = canvasWidth * 0.005; // Responsive line width
  ctx.beginPath();
  ctx.setLineDash([canvasHeight * 0.02, canvasHeight * 0.015]); // Dashed line
  ctx.moveTo(canvasWidth / 2, 0);
  ctx.lineTo(canvasWidth / 2, canvasHeight);
  ctx.stroke();
  ctx.setLineDash([]); // Reset line dash

  // Draw paddles - positions are fractions, convert to pixels
  ctx.fillStyle = PADDLE_COLOR;
  const p1 = gameState.paddle1;
  ctx.fillRect(
    p1.x * canvasWidth - (p1.width * canvasWidth) / 2,
    p1.y * canvasHeight - (p1.height * canvasHeight) / 2,
    p1.width * canvasWidth,
    p1.height * canvasHeight
  );

  const p2 = gameState.paddle2;
  ctx.fillRect(
    p2.x * canvasWidth - (p2.width * canvasWidth) / 2,
    p2.y * canvasHeight - (p2.height * canvasHeight) / 2,
    p2.width * canvasWidth,
    p2.height * canvasHeight
  );

  // Draw ball
  ctx.fillStyle = BALL_COLOR;
  ctx.beginPath();
  ctx.arc(
    gameState.ball.x * canvasWidth,
    gameState.ball.y * canvasHeight,
    gameState.ball.radius * Math.min(canvasWidth, canvasHeight), // Radius relative to smaller dimension
    0,
    Math.PI * 2
  );
  ctx.fill();
}