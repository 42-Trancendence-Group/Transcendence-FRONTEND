// /frontend/src/pages/GamePage.ts
import { createNavbar } from '../components/Navbar';
import { createFooter } from '../components/Footer';
import { createGameUI, drawGame, GameState, GameElements } from '../components/GameUI';
import { GameService } from '../services/GameService';

// Store active elements and service for cleanup
let gameServiceInstance: GameService | null = null;
let keydownListener: ((event: KeyboardEvent) => void) | null = null;
let keyupListener: ((event: KeyboardEvent) => void) | null = null; // If needed
let resizeListener: (() => void) | null = null;
let animationFrameId: number | null = null;
let uiElements: GameElements | null = null;
let controlledPlayer: "player1" | "player2" | null = null;


// Ensure root is cleared (you might have this in your router or a utility)
function clearRoot(rootElement: HTMLElement): void {
  while (rootElement.firstChild) {
    rootElement.removeChild(rootElement.firstChild);
  }
}

function cleanupGamePage(): void {
  console.log("Cleaning up GamePage resources...");
  if (gameServiceInstance) {
    gameServiceInstance.disconnect();
    gameServiceInstance = null;
  }
  if (keydownListener) {
    document.removeEventListener('keydown', keydownListener);
    keydownListener = null;
  }
  if (keyupListener) {
    document.removeEventListener('keyup', keyupListener);
    keyupListener = null;
  }
  if (resizeListener) {
    window.removeEventListener('resize', resizeListener);
    resizeListener = null;
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  uiElements = null;
  controlledPlayer = null;
}

// A simple local state for rendering, updated by GameService
let currentGameState: GameState | null = null;

function gameLoop() {
  if (uiElements && uiElements.context && currentGameState) {
    drawGame(uiElements.context, uiElements.canvas, currentGameState);
  }
  animationFrameId = requestAnimationFrame(gameLoop);
}


export function renderGamePage(): void {
  const root = document.getElementById('root');
  if (!root) {
    console.error('Root element not found!');
    return;
  }
  
  cleanupGamePage(); // Clean up any previous instance of the game page
  clearRoot(root); // Clear the root for the new page

  const pageContainer = document.createElement('div');
  pageContainer.className = 'min-h-screen flex flex-col bg-arcade-dark text-arcade-light';

  pageContainer.appendChild(createNavbar());

  const main = document.createElement('main');
  main.className = 'flex-grow flex flex-col items-center justify-center container mx-auto px-2 py-4 sm:px-4 sm:py-8';
  
  uiElements = createGameUI();
  main.appendChild(uiElements.gameContainer);

  // Initial canvas sizing based on its container
  const setCanvasSize = () => {
    if (uiElements && uiElements.canvas && uiElements.canvas.parentElement) { // Added uiElements.canvas check
        // Respect aspect ratio 4:3
        const parentWidth = uiElements.canvas.parentElement.clientWidth;
        uiElements.canvas.style.width = `${parentWidth}px`;
        uiElements.canvas.style.height = `${parentWidth * (3/4)}px`;
        // The internal resolution can be different, often set by server or fixed
        // For now, let's match CSS size, but `drawGame` will respect GameState.canvasDimensions
        // uiElements.canvas.width = parentWidth;
        // uiElements.canvas.height = parentWidth * (3/4);
    }
  };

  setCanvasSize(); // Initial size
  resizeListener = setCanvasSize; // Resize on window change
  window.addEventListener('resize', resizeListener);


  pageContainer.appendChild(main);
  pageContainer.appendChild(createFooter());
  root.appendChild(pageContainer);

  if (!uiElements.context) return; // Early exit if canvas context failed

  // Initialize Game Service
  gameServiceInstance = new GameService('ws://localhost:8080/ws/pong/', { // ADJUST URL
    onOpen: () => {
      if (uiElements && uiElements.statusDisplay) {
        uiElements.statusDisplay.textContent = 'Connected! Waiting for game...';
      }
    },
    onClose: (event) => {
       if (uiElements && uiElements.statusDisplay) {
           uiElements.statusDisplay.textContent = `Disconnected: ${event.reason || 'Connection lost'}`;
           uiElements.statusDisplay.classList.remove('text-neon-green');
           uiElements.statusDisplay.classList.add('text-neon-red'); // Or some warning color
       } else {
           console.warn("onClose: uiElements or statusDisplay is not available for update.");
       }
    },
    onGameStateUpdate: (gameState) => {
      currentGameState = gameState; // Update local state for gameLoop
      if (uiElements && uiElements.scoreDisplay && uiElements.canvas) { // Added uiElements.canvas check
         uiElements.scoreDisplay.textContent = `P1: ${gameState.score1} - P2: ${gameState.score2}`;
         // The gameLoop handles drawing.
         // If server dictates canvas dimensions and they differ, resize canvas:
         if (gameState.canvasDimensions) {
            if (uiElements.canvas.width !== gameState.canvasDimensions.width ||
                uiElements.canvas.height !== gameState.canvasDimensions.height) {
                uiElements.canvas.width = gameState.canvasDimensions.width;
                uiElements.canvas.height = gameState.canvasDimensions.height;
                console.log(`Canvas resized by server to: ${uiElements.canvas.width}x${uiElements.canvas.height}`);
            }
         }
      }
    },
    onGameEvent: (eventData) => {
      if (uiElements && uiElements.statusDisplay) {
        uiElements.statusDisplay.textContent = eventData.message || eventData.event;
        if (eventData.event === "GAME_OVER") {
            uiElements.statusDisplay.textContent = `GAME OVER! ${eventData.winner === 'draw' ? 'It\'s a draw!' : (eventData.winner?.toUpperCase() + ' WINS!')} ${eventData.message || ''}`;
            // Consider adding a "Play Again" button or similar UX here
        } else if (eventData.event === "WAITING_FOR_OPPONENT" || eventData.event === "MATCH_FOUND") {
            // Potentially more specific UI updates
        }
      } else {
        console.warn("onGameEvent: uiElements or statusDisplay is not available for update.");
      }
    },
    onAssignPlayer: (playerData) => {
        controlledPlayer = playerData.player;
        if (uiElements && uiElements.statusDisplay) {
            const currentStatus = uiElements.statusDisplay.textContent || "";
            uiElements.statusDisplay.textContent = `You are ${playerData.player.toUpperCase()}. ${currentStatus}`;
        } else {
            console.warn("onAssignPlayer: uiElements or statusDisplay is not available for update.");
        }
    },
    onError: (errorMessage) => {
      if (uiElements && uiElements.statusDisplay) {
        uiElements.statusDisplay.textContent = `Error: ${errorMessage}`;
        uiElements.statusDisplay.classList.remove('text-neon-green');
        uiElements.statusDisplay.classList.add('text-neon-red');
      } else {
        console.warn("onError: uiElements or statusDisplay is not available for update.");
      }
    },
    onStatusUpdate: (status) => {
        if (uiElements && uiElements.statusDisplay) {
            uiElements.statusDisplay.textContent = status;
            // Reset color to green for positive/neutral status
            uiElements.statusDisplay.classList.remove('text-neon-red');
            uiElements.statusDisplay.classList.add('text-neon-green');
        } else {
            console.warn("onStatusUpdate: uiElements or statusDisplay is not available for update.");
        }
    }
  });

  gameServiceInstance.connect();

  // Keyboard listeners
  // Store pressed keys to prevent spamming server if backend doesn't handle rapid fire well
  const pressedKeys = new Set<string>();

  keydownListener = (event: KeyboardEvent) => {
    if (!gameServiceInstance || !controlledPlayer) return;

    let action: string | null = null;
    
    switch (event.key.toLowerCase()) {
      case 'w':
      case 'arrowup': 
        action = 'MOVE_UP';
        break;
      case 's':
      case 'arrowdown':
        action = 'MOVE_DOWN';
        break;
    }

    if (action && !pressedKeys.has(event.key.toLowerCase())) {
      gameServiceInstance.sendInput(action as "MOVE_UP" | "MOVE_DOWN");
      pressedKeys.add(event.key.toLowerCase());
      event.preventDefault(); 
    }
  };
  document.addEventListener('keydown', keydownListener);
  
  keyupListener = (event: KeyboardEvent) => { // If you need to send STOP events
  if (!gameServiceInstance || !controlledPlayer) return;
  let action: string | null = null;
  // Ensure pressedKeys is checked and key is removed
  const lowerKey = event.key.toLowerCase();
  if (!pressedKeys.has(lowerKey)) return; // Only process keyup for keys that were pressed by us

  switch (lowerKey) {
    case 'w':
    case 'arrowup':
      action = 'STOP_UP'; // Or just 'STOP_MOVING'
      break;
    case 's':
    case 'arrowdown':
      action = 'STOP_DOWN'; // Or just 'STOP_MOVING'
      break;
  }
  if (action) {
    gameServiceInstance.sendInput(action as "STOP_UP" | "STOP_DOWN"); 
    pressedKeys.delete(lowerKey);
    event.preventDefault();
  }
  };
  document.addEventListener('keyup', keyupListener);

  // Start the rendering loop
  gameLoop();
}