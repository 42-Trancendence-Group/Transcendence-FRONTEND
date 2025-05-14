
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
  title.textContent = 'Criadores';
  
  const subtitle = document.createElement('p');
  subtitle.className = 'text-xl text-gray-300 max-w-3xl mx-auto';
  subtitle.textContent = 'Aqui estão todos que fizeram isso acontecer.';
  
  header.appendChild(title);
  header.appendChild(subtitle);
  
  // Game modes grid
  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 md:grid-cols-3 gap-8';
  

  // Assemble section
  container.appendChild(header);
  container.appendChild(grid);
  section.appendChild(container);
  
  return section;
}
