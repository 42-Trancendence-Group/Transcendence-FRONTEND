
import { navigateTo } from '../router/index';

export function createGameModes(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'py-16';
  
  const container = document.createElement('div');
  container.className = 'container mx-auto px-6';
  
  // Header
  const header = document.createElement('div');
  header.className = 'text-center mb-12';
  
  const title = document.createElement('h2');
  title.className = 'text-3xl md:text-4xl font-bold mb-4 neon-text';
  title.textContent = 'Modos de Jogo';
  
  const subtitle = document.createElement('p');
  subtitle.className = 'text-xl text-gray-300 max-w-3xl mx-auto';
  subtitle.textContent = 'Escolha entre diferentes modos de jogo, cada um oferecendo uma experiência única de ping-pong virtual.';
  
  header.appendChild(title);
  header.appendChild(subtitle);
  
  // Game modes grid
  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 md:grid-cols-3 gap-8';
  
  const modes = [
    {
      id: 'classic',
      name: 'Clássico',
      description: 'O bom e velho ping-pong com regras tradicionais. Primeiro a marcar 11 pontos com 2 de vantagem vence.',
      color: 'neon-blue'
    },
    {
      id: 'power-ups',
      name: 'Power-Ups',
      description: 'Colete power-ups que aparecem na mesa para ganhar vantagens temporárias sobre seu oponente.',
      color: 'neon-pink'
    },
    {
      id: 'multiplayer',
      name: 'Multiplayer',
      description: 'Jogue em duplas ou com até 4 jogadores simultaneamente em uma mesa especial.',
      color: 'neon-green'
    }
  ];
  
  modes.forEach(mode => {
    const card = document.createElement('div');
    card.className = 'bg-arcade-darker border border-transparent hover:border-neon-blue transition-all duration-300 rounded-lg overflow-hidden';
    
    // Card header with title
    const cardHeader = document.createElement('div');
    cardHeader.className = 'aspect-video rounded-t-lg overflow-hidden relative';
    cardHeader.style.background = 'linear-gradient(45deg, #000, rgba(0,0,0,0))';
    
    const overlayEffect = document.createElement('div');
    overlayEffect.className = `absolute inset-0 bg-${mode.color}/20 backdrop-blur-sm`;
    
    const titleContainer = document.createElement('div');
    titleContainer.className = 'absolute inset-0 flex items-center justify-center';
    
    const modeTitle = document.createElement('h3');
    modeTitle.className = `text-${mode.color} text-3xl font-bold`;
    modeTitle.textContent = mode.name;
    
    titleContainer.appendChild(modeTitle);
    cardHeader.appendChild(overlayEffect);
    cardHeader.appendChild(titleContainer);
    
    // Card content
    const cardContent = document.createElement('div');
    cardContent.className = 'p-6';
    
    const description = document.createElement('p');
    description.className = 'text-gray-300 mb-6';
    description.textContent = mode.description;
    
    const button = document.createElement('button');
    button.className = `bg-${mode.color} text-arcade-darker hover:bg-opacity-80 w-full py-2 px-4 rounded`;
    button.textContent = `Jogar ${mode.name}`;
    button.addEventListener('click', () => navigateTo(`/jogar/${mode.id}`));
    
    cardContent.appendChild(description);
    cardContent.appendChild(button);
    
    // Assemble card
    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    
    grid.appendChild(card);
  });
  
  // Assemble section
  container.appendChild(header);
  container.appendChild(grid);
  section.appendChild(container);
  
  return section;
}
