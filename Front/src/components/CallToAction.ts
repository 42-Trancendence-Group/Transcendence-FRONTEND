import { navigateTo } from '../router/index';

export function createCallToAction(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'py-16 relative overflow-hidden';
  
  // Background with gradient
  const gradientBg = document.createElement('div');
  gradientBg.className = 'absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 z-0';
  gradientBg.style.backgroundSize = '200% 200%';
  gradientBg.style.animation = 'gradient-flow 10s ease infinite';
  
  // Grid overlay
  const gridOverlay = document.createElement('div');
  gridOverlay.className = 'absolute inset-0 z-0';
  gridOverlay.style.backgroundSize = '30px 30px';
  gridOverlay.style.backgroundImage = 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)';
  gridOverlay.style.backgroundPosition = 'center center';
  
  // Content container
  const container = document.createElement('div');
  container.className = 'container mx-auto px-6 relative z-10';
  
  const contentBox = document.createElement('div');
  contentBox.className = 'max-w-3xl mx-auto text-center py-8';
  
  // Heading
  const heading = document.createElement('h2');
  heading.className = 'text-3xl md:text-5xl font-bold mb-6 text-white neon-text';
  heading.textContent = 'Pronto para Dominar a Mesa?';
  
  // Description
  const description = document.createElement('p');
  description.className = 'text-xl text-gray-300 mb-8';
  description.textContent = 'Registre-se gratuitamente, desafie jogadores de todo o mundo e conquiste seu lugar no topo do ranking. O PingPong Arcade aguarda seu primeiro saque!';
  
  // Button container
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'flex flex-col sm:flex-row gap-4 justify-center';
  
  // Primary button
  const primaryButton = document.createElement('button');
  primaryButton.className = 'bg-neon-green text-arcade-darker hover:bg-neon-blue hover:text-white px-8 py-6 text-lg rounded';
  primaryButton.textContent = 'Criar Conta Grátis';
  primaryButton.addEventListener('click', () => navigateTo('/registrar'));
  
  // Secondary button
  const secondaryButton = document.createElement('button');
  secondaryButton.className = 'border-white text-white hover:bg-white/10 px-8 py-6 text-lg border rounded';
  secondaryButton.textContent = 'Jogar como Convidado';
  secondaryButton.addEventListener('click', () => navigateTo('/jogar'));
  
  // Assemble button container
  buttonContainer.appendChild(primaryButton);
  buttonContainer.appendChild(secondaryButton);
  
  // Assemble content
  contentBox.appendChild(heading);
  contentBox.appendChild(description);
  contentBox.appendChild(buttonContainer);
  
  container.appendChild(contentBox);
  
  // Assemble section
  section.appendChild(gradientBg);
  section.appendChild(gridOverlay);
  section.appendChild(container);
  
  return section;
}