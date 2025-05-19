/*// src/services/GameService.ts
import { GameState } from '../components/GameUI';

// Define message types for better type safety
interface BaseMessage {
  type: string;
  payload?: any;
}

interface PlayerInputMessage extends BaseMessage {
  type: "PLAYER_INPUT";
  payload: {
    action: "MOVE_UP" | "MOVE_DOWN" | "STOP_UP" | "STOP_DOWN"; // Example actions
    // If sending raw keys: key: string; state: "PRESS" | "RELEASE"
  };
}

interface GameStateMessage extends BaseMessage {
  type: "GAME_STATE";
  payload: GameState;
}

interface GameEventMessage extends BaseMessage {
  type: "GAME_EVENT";
  payload: {
    event: string; // e.g., "WAITING_FOR_OPPONENT", "GAME_START", "GAME_OVER"
    message?: string;
    winner?: "player1" | "player2" | "draw";
  };
}

interface AssignPlayerMessage extends BaseMessage {
    type: "ASSIGN_PLAYER";
    payload: {
        player: "player1" | "player2"; // Which paddle this client controls
    };
}

interface ErrorMessage extends BaseMessage {
  type: "ERROR";
  payload: {
    message: string;
  };
}

type ServerMessage = GameStateMessage | GameEventMessage | AssignPlayerMessage | ErrorMessage;


export type GameServiceCallbacks = {
  onOpen?: () => void;
  onClose?: (event: CloseEvent) => void;
  onGameStateUpdate?: (gameState: GameState) => void;
  onGameEvent?: (eventData: GameEventMessage['payload']) => void;
  onAssignPlayer?: (playerData: AssignPlayerMessage['payload']) => void;
  onError?: (errorMessage: string) => void;
  onStatusUpdate?: (status: string) => void; // For general status messages
};

export class GameService {
  private socket: WebSocket | null = null;
  private readonly gameUrl: string;
  private callbacks: GameServiceCallbacks;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // 1 second

  constructor(gameUrl: string, callbacks: GameServiceCallbacks) {
    this.gameUrl = gameUrl;
    this.callbacks = callbacks;
  }

  connect(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected.');
      return;
    }
    
    this.callbacks.onStatusUpdate?.('Connecting to game server...');
    this.socket = new WebSocket(this.gameUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
      this.reconnectAttempts = 0; // Reset on successful connection
      this.callbacks.onOpen?.();
      this.callbacks.onStatusUpdate?.('Connection successful! Waiting for game...');
    };

    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data as string) as ServerMessage;
        switch (message.type) {
          case 'GAME_STATE':
            this.callbacks.onGameStateUpdate?.(message.payload);
            break;
          case 'GAME_EVENT':
            this.callbacks.onGameEvent?.(message.payload);
            break;
          case 'ASSIGN_PLAYER':
            this.callbacks.onAssignPlayer?.(message.payload);
            break;
          case 'ERROR':
            this.callbacks.onError?.(message.payload.message);
            break;
          default:
            console.warn('Received unknown message type:', message);
        }
      } catch (error) {
        console.error('Failed to parse message or handle event:', error);
        this.callbacks.onError?.('Received malformed data from server.');
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.callbacks.onError?.('WebSocket connection error.');
      // onclose will handle reconnection logic
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
      this.callbacks.onClose?.(event);
      if (event.wasClean) {
        this.callbacks.onStatusUpdate?.('Disconnected from server.');
      } else {
        // Attempt to reconnect if not a clean close and within attempt limits
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts -1); // Exponential backoff
          this.callbacks.onStatusUpdate?.(`Connection lost. Attempting to reconnect in ${delay / 1000}s... (Attempt ${this.reconnectAttempts})`);
          setTimeout(() => this.connect(), delay);
        } else {
          this.callbacks.onStatusUpdate?.('Could not reconnect to server. Please refresh.');
          this.callbacks.onError?.('Failed to reconnect after multiple attempts.');
        }
      }
    };
  }

  sendInput(action: PlayerInputMessage['payload']['action']): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message: PlayerInputMessage = {
        type: 'PLAYER_INPUT',
        payload: { action },
      };
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected. Cannot send input.');
      this.callbacks.onError?.('Not connected to server. Cannot send input.');
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close(1000, "Client initiated disconnect"); // 1000 is normal closure
      this.socket = null;
      console.log('WebSocket connection closed by client.');
    }
  }
} */


  // src/services/GameService.ts (Versão Modificada para Mocking)
import { GameState } from '../components/GameUI';

// ... (interfaces de mensagem permanecem as mesmas) ...
interface BaseMessage {
  type: string;
  payload?: any;
}

interface PlayerInputMessage extends BaseMessage {
  type: "PLAYER_INPUT";
  payload: {
    action: "MOVE_UP" | "MOVE_DOWN" | "STOP_UP" | "STOP_DOWN";
  };
}

interface GameStateMessage extends BaseMessage {
  type: "GAME_STATE";
  payload: GameState;
}

interface GameEventMessage extends BaseMessage {
  type: "GAME_EVENT";
  payload: {
    event: string;
    message?: string;
    winner?: "player1" | "player2" | "draw";
  };
}

interface AssignPlayerMessage extends BaseMessage {
    type: "ASSIGN_PLAYER";
    payload: {
        player: "player1" | "player2";
    };
}

interface ErrorMessage extends BaseMessage {
  type: "ERROR";
  payload: {
    message: string;
  };
}

type ServerMessage = GameStateMessage | GameEventMessage | AssignPlayerMessage | ErrorMessage;


export type GameServiceCallbacks = {
  onOpen?: () => void;
  onClose?: (event: CloseEvent) => void;
  onGameStateUpdate?: (gameState: GameState) => void;
  onGameEvent?: (eventData: GameEventMessage['payload']) => void;
  onAssignPlayer?: (playerData: AssignPlayerMessage['payload']) => void;
  onError?: (errorMessage: string) => void;
  onStatusUpdate?: (status: string) => void;
};

export class GameService {
  // private socket: WebSocket | null = null; // Comentado
  // private readonly gameUrl: string; // Comentado
  private callbacks: GameServiceCallbacks;
  private mockGameLoopInterval: number | null = null;
  private mockGameState: GameState;
  private mockPlayer: "player1" | "player2" = "player1"; // Simula qual jogador somos

  constructor(gameUrl: string, callbacks: GameServiceCallbacks) {
    // this.gameUrl = gameUrl; // Comentado
    this.callbacks = callbacks;
    this.mockGameState = { // Estado inicial do jogo para o mock
      ball: { x: 0.5, y: 0.5, radius: 0.015 },
      paddle1: { x: 0.05, y: 0.5, width: 0.02, height: 0.15 },
      paddle2: { x: 0.95, y: 0.5, width: 0.02, height: 0.15 },
      score1: 0,
      score2: 0,
      canvasDimensions: { width: 800, height: 600 } // Dimensões canônicas
    };
  }

  connect(): void {
    this.callbacks.onStatusUpdate?.('Mock Service: Connecting...');
    console.log('Mock GameService: connect() called');
    
    // Simular conexão bem-sucedida
    setTimeout(() => {
      this.callbacks.onOpen?.();
      this.callbacks.onStatusUpdate?.('Mock Service: Connected! Waiting for game...');
      
      // Simular atribuição de jogador
      setTimeout(() => {
        this.callbacks.onAssignPlayer?.({ player: this.mockPlayer });
        this.callbacks.onStatusUpdate?.(`Mock Service: You are ${this.mockPlayer}. Game starting soon...`);
      }, 500);

      // Simular início do jogo
      setTimeout(() => {
        this.callbacks.onGameEvent?.({ event: "GAME_START", message: "Game has started!" });
        this.startMockGameLoop();
      }, 1500);

    }, 500);
  }

  private startMockGameLoop(): void {
    if (this.mockGameLoopInterval) clearInterval(this.mockGameLoopInterval);

    this.mockGameLoopInterval = window.setInterval(() => {
      // Simular movimento simples da bola
      this.mockGameState.ball.x += 0.025 * (Math.random() > 0.025 ? 1 : -1) ; // Pequeno movimento horizontal aleatório
      this.mockGameState.ball.y += 0.025 * (Math.random() > 0.025 ? 1 : -1) ; // Pequeno movimento vertical aleatório

      // Manter a bola dentro dos limites (muito simplificado)
      if (this.mockGameState.ball.y < 0.01 || this.mockGameState.ball.y > 0.99) {
        this.mockGameState.ball.y = 0.5; // Reset simples
        // Simular pontuação
        if (Math.random() > 0.5) this.mockGameState.score1++; else this.mockGameState.score2++;

        if (this.mockGameState.score1 >= 5 || this.mockGameState.score2 >= 5) {
            this.callbacks.onGameEvent?.({
                event: "GAME_OVER",
                message: "Max score reached!",
                winner: this.mockGameState.score1 >= 5 ? "player1" : "player2"
            });
            this.disconnect(); // Para o loop
            return;
        }
      }
      if (this.mockGameState.ball.x < 0.01 || this.mockGameState.ball.x > 0.99) {
        this.mockGameState.ball.x = 0.5; // Reset simples
      }


      this.callbacks.onGameStateUpdate?.({ ...this.mockGameState }); // Envia cópia do estado
    }, 50); // Atualiza a cada 50ms
  }

  sendInput(action: PlayerInputMessage['payload']['action']): void {
    console.log('Mock GameService: Received input:', action);
    // Simular movimento do paddle controlado
    const paddleToMove = this.mockPlayer === "player1" ? this.mockGameState.paddle1 : this.mockGameState.paddle2;
    const moveAmount = 0.02; // Quão rápido o paddle se move

    if (action === 'MOVE_UP') {
      paddleToMove.y -= moveAmount;
    } else if (action === 'MOVE_DOWN') {
      paddleToMove.y += moveAmount;
    }

    // Manter paddles dentro dos limites
    paddleToMove.y = Math.max(0 + paddleToMove.height / 2, Math.min(1 - paddleToMove.height / 2, paddleToMove.y));

    // Não precisamos enviar o estado aqui, o mockGameLoopInterval fará isso.
    // Se quiser resposta imediata ao input, poderia chamar this.callbacks.onGameStateUpdate?.({ ...this.mockGameState });
  }

  disconnect(): void {
    console.log('Mock GameService: disconnect() called');
    if (this.mockGameLoopInterval) {
      clearInterval(this.mockGameLoopInterval);
      this.mockGameLoopInterval = null;
    }
    // Simular evento de desconexão
    const mockCloseEvent = {
        code: 1000,
        reason: 'Mock client initiated disconnect',
        wasClean: true
    } as CloseEvent; // Type assertion para simular
    this.callbacks.onClose?.(mockCloseEvent);
    this.callbacks.onStatusUpdate?.('Mock Service: Disconnected.');
  }
}