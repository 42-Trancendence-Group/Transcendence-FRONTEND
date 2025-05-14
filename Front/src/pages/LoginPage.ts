import { renderLoginForm } from '../components/FormLogin';
import { createFooter } from '../components/Footer';
import { createNavbar } from '../components/Navbar';
// Não precisa mais importar navbar, footer, ou setupMobileMenu daqui.
// showToast será usado pelo FormLogin.ts


export function renderLogin(): void {
  const root = document.getElementById('root');
  if (!root) return;
  
  // Cria a estrutura da página
  const container = document.createElement('div');
  container.className = 'min-h-screen flex flex-col bg-arcade-dark';

  const formHostElement = document.createElement('div');
  formHostElement.className = 'flex justify-center items-center';
  
  // Adiciona os componentes
  container.appendChild(createNavbar());
  
  const main = document.createElement('main');
  main.className = 'flex-grow container mx-auto px-4 py-8';
  
  main.appendChild(formHostElement);
  renderLoginForm(formHostElement);
  
  container.appendChild(main);
  container.appendChild(createFooter());
  
  // Insere no DOM
  root.appendChild(container);
}