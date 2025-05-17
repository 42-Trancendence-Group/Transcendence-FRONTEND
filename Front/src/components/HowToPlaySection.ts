// src/components/HowToPlaySection.ts

// Função auxiliar para criar elementos com classes Tailwind
function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  classNames: string[] = [],
  textContent?: string
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  element.className = classNames.join(' ');
  if (textContent) {
    element.textContent = textContent;
  }
  return element;
}

// Função auxiliar para criar keycaps (mantida para consistência, mas pode ser ajustada)
function createKeycap(keyText: string, customClasses: string[] = []): HTMLElement {
  const span = createElement('span', ['keycap', ...customClasses], keyText);
  return span;
}

// Função auxiliar para criar ícones de seta (SVG inline)
function createArrowIcon(direction: 'up' | 'down'): SVGSVGElement {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.classList.add('inline-block', 'mx-1');

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("fill-rule", "evenodd");
    if (direction === 'up') {
        path.setAttribute("d", "M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z");
    } else {
        path.setAttribute("d", "M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4 4a.5.5 0 0 1-.708-.708L7.5 13.207V1.5a.5.5 0 0 1 .5-.5z");
    }
    svg.appendChild(path);
    return svg;
}

export function createHowToPlaySection(): HTMLElement {
  // Container principal da seção "Como Jogar"
  const sectionContainer = createElement('div', [
    'max-w-3xl', 'mx-auto', 'py-8', 'px-4', 'sm:px-6', 'lg:px-8'
  ]);

  // Título Principal da Página
  const pageTitle = createElement('h1', [
    'arcade-font', 'text-4xl', 'md:text-5xl', 'text-center', 'mb-10', 'md:mb-12', 'neon-text-white' // Usar neon-text-white ou outra cor principal
  ], 'Como Jogar');
  sectionContainer.appendChild(pageTitle);

  // Card 1: Objetivo do Jogo
  const objectiveCard = createElement('div', [
    'bg-arcade-darker', 'bg-opacity-70', 'p-6', 'rounded-lg', 'shadow-lg', 'mb-8',
    'border-2', 'border-neon-purple' // Borda neon roxa como no exemplo
  ]);
  const objectiveTitle = createElement('h2', [
    'arcade-font', 'text-2xl', 'neon-text-purple', 'mb-3' // Cor do título do card
  ], 'Objetivo do jogo');
  const objectiveP1 = createElement('p', ['text-gray-300', 'leading-relaxed', 'mb-2'],
    'O objetivo do Ping Pong é simples: marcar mais pontos que seu oponente. Um ponto é marcado quando a bola passa pelo adversário e atinge a parede atrás dele.'
  );
  const objectiveP2 = createElement('p', ['text-gray-300', 'leading-relaxed'],
    'O primeiro jogador a alcançar 11 pontos vence a partida.'
  );
  objectiveCard.appendChild(objectiveTitle);
  objectiveCard.appendChild(objectiveP1);
  objectiveCard.appendChild(objectiveP2);
  sectionContainer.appendChild(objectiveCard);


  // Card 2: Controles
  const controlsCard = createElement('div', [
    'bg-arcade-darker', 'bg-opacity-70', 'p-6', 'rounded-lg', 'shadow-lg', 'mb-8',
    'border-2', 'border-neon-purple' // Borda neon roxa
  ]);
  const controlsTitle = createElement('h2', [
    'arcade-font', 'text-2xl', 'neon-text-purple', 'mb-4'
  ], 'Controles');
  
  const controlsFlexContainer = createElement('div', ['flex', 'flex-col', 'sm:flex-row', 'items-center', 'justify-between', 'gap-4']);
  
  const movementDiv = createElement('div', ['flex', 'items-center', 'gap-2']);
  movementDiv.appendChild(createArrowIcon('up'));
  movementDiv.appendChild(createArrowIcon('down'));
  const movementText = createElement('p', ['text-gray-300', 'leading-relaxed']);
  movementText.innerHTML = 'Use as setas <strong class="text-neon-blue">para cima</strong> e <strong class="text-neon-blue">para baixo</strong> para mover sua raquete.';
  movementDiv.appendChild(movementText);

  const pauseDiv = createElement('div', ['flex', 'items-center', 'gap-2']);
  pauseDiv.appendChild(createKeycap('P', ['h-10', 'w-10', 'flex', 'items-center', 'justify-center', 'text-lg', 'border-neon-blue']));
  const pauseText = createElement('p', ['text-gray-300', 'leading-relaxed'], 'Pressione a tecla P para pausar ou retomar o jogo.');
  pauseDiv.appendChild(pauseText);

  controlsFlexContainer.appendChild(movementDiv);
  controlsFlexContainer.appendChild(pauseDiv);

  controlsCard.appendChild(controlsTitle);
  controlsCard.appendChild(controlsFlexContainer);
  sectionContainer.appendChild(controlsCard);


  // Card 3: Dicas
  const tipsCard = createElement('div', [
    'bg-arcade-darker', 'bg-opacity-70', 'p-6', 'rounded-lg', 'shadow-lg', 'mb-10', // Aumentei margem inferior
    'border-2', 'border-neon-purple' // Borda neon roxa
  ]);
  const tipsTitle = createElement('h2', [
    'arcade-font', 'text-2xl', 'neon-text-purple', 'mb-3'
  ], 'Dicas');
  const tipsList = createElement('ul', ['list-disc', 'list-inside', 'text-gray-300', 'space-y-2', 'leading-relaxed']);
  const tipItems = [
    'A bola aumenta de velocidade a cada rebatida, fique atento!',
    'O ângulo de rebatida é determinado pela posição em que a bola atinge sua raquete.',
    'Rebater com as extremidades da raquete cria ângulos mais fechados, mas é mais arriscado.',
    'Tente prever a trajetória da bola e posicione sua raquete com antecedência.'
  ];
  tipItems.forEach(itemText => {
    const li = createElement('li', [], itemText);
    tipsList.appendChild(li);
  });
  tipsCard.appendChild(tipsTitle);
  tipsCard.appendChild(tipsList);
  sectionContainer.appendChild(tipsCard);


  // Botões de Ação
  const actionsDiv = createElement('div', ['flex', 'flex-col', 'sm:flex-row', 'justify-center', 'items-center', 'gap-4', 'mt-8']);
  
  const backButton = createElement('button', [
    'arcade-font', 'text-sm', 'text-neon-pink', 'hover:text-white',
    'border-2', 'border-neon-pink', 'hover:bg-neon-pink', 'hover:text-arcade-darker',
    'px-8', 'py-3', 'rounded-md', 'transition-all', 'duration-300', 'w-full', 'sm:w-auto'
  ], '↩ Voltar');
  backButton.addEventListener('click', () => {
    window.history.back(); // Ou navegue para uma rota específica: window.location.hash = '#/';
  });

  const playGameButton = createElement('button', [
    'arcade-font', 'text-sm', 'text-arcade-darker',
    'bg-neon-blue', 'hover:bg-opacity-80', 'border-2', 'border-neon-blue',
    'px-8', 'py-3', 'rounded-md', 'transition-all', 'duration-300', 'w-full', 'sm:w-auto',
    'flex', 'items-center', 'justify-center', 'gap-2'
  ]);
  // Ícone de Play (SVG)
  const playIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                       </svg>`;
  playGameButton.innerHTML = `${playIconSVG} Jogar Agora`;
  playGameButton.addEventListener('click', () => {
    window.location.hash = '#/'; // Ou a rota principal do jogo
  });

  actionsDiv.appendChild(backButton);
  actionsDiv.appendChild(playGameButton);
  sectionContainer.appendChild(actionsDiv);

  return sectionContainer;
}