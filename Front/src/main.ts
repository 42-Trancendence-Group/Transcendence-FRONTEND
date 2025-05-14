// Front/src/main.ts

// Importa o CSS principal que contém as diretivas do Tailwind
// Isso garante que o Vite processe e inclua o CSS do Tailwind no build.
import './css/style.css';

// --- Componente Header ---
function createHeader(): HTMLElement {
    const headerElement = document.getElementById('main-header');

    if (!headerElement) {
        console.error("Elemento #main-header não encontrado no DOM!");
        // Em um cenário real, você poderia criar o elemento se ele não existir
        // ou lançar um erro mais robusto.
        const tempHeader = document.createElement('header');
        tempHeader.id = 'main-header';
        tempHeader.className = 'bg-gray-800 text-white p-4 shadow-md'; // Aplicando classes Tailwind default
        document.body.prepend(tempHeader); // Adiciona no início do body como fallback
        return tempHeader;
    }

    // Conteúdo do Header
    // Usamos classes Tailwind para estilização
    headerElement.innerHTML = `
        <div class="container mx-auto flex justify-between items-center">
            <a href="#" class="text-2xl font-bold hover:text-blue-400 transition-colors">
                🏓 ft_transcendence
            </a>
            <nav>
                <ul class="flex space-x-4">
                    <li><a href="#" class="hover:text-blue-300 transition-colors">Play</a></li>
                    <li><a href="#login" class="hover:text-blue-300 transition-colors">Login</a></li>
                    <li><a href="#profile" class="hover:text-blue-300 transition-colors">Profile</a></li>
                </ul>
            </nav>
        </div>
    `;
    return headerElement;
}

// --- Componente Footer ---
function createFooter(): HTMLElement {
    const footerElement = document.getElementById('main-footer');

    if (!footerElement) {
        console.error("Elemento #main-footer não encontrado no DOM!");
        const tempFooter = document.createElement('footer');
        tempFooter.id = 'main-footer';
        tempFooter.className = 'bg-gray-800 text-white p-4 text-center text-sm'; // Classes Tailwind default
        document.body.appendChild(tempFooter); // Adiciona no fim do body como fallback
        return tempFooter;
    }

    // Conteúdo do Footer
    footerElement.innerHTML = `
        <p>© ${new Date().getFullYear()} ft_transcendence. Design by Igenial.</p>
        <p>Version: 1.0</p>
    `;
    return footerElement;
}

// --- Inicialização da Aplicação ---
function initializeApp() {
    // "Renderiza" os componentes estáticos
    createHeader();
    createFooter();

    // Lógica principal da SPA viria aqui (roteamento, etc.)
    const appRoot = document.getElementById('app-root');
    if (appRoot) {
        // Exemplo: appRoot.innerHTML = '<p>Carregando jogo...</p>';
    } else {
        console.error("#app-root não encontrado!");
    }

    console.log("ft_transcendence frontend inicializado!");
}

// Garante que o DOM esteja pronto antes de executar o script
// Para `type="module"`, o script já é deferido por padrão,
// mas `DOMContentLoaded` é uma boa prática para scripts mais complexos.
document.addEventListener('DOMContentLoaded', initializeApp);

// Se o seu bundler (Vite) não estiver esperando DOMContentLoaded,
// você pode chamar initializeApp() diretamente.
// No entanto, com `type="module"` e o script no final do body,
// o DOM geralmente já está acessível.
// Vamos simplificar e chamar diretamente, pois o script está no final do body.
// initializeApp(); // Removido pois DOMContentLoaded é mais seguro