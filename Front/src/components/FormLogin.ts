import { showToast } from '../utils/toast'; // Supondo que você tenha este utilitário

// function createFormLoginHTML(): string {
//   // O HTML do formulário que você tinha em LoginPage.ts, mas APENAS o <form> e seus elementos internos.
//   // Remova as divs externas de layout da página (min-h-screen, etc.) e a navbar/footer.
//   return `
//     <div class="w-full max-w-md border-neon-blue bg-arcade-darker relative overflow-hidden rounded-md p-6">
//       <!-- Decorative background effects -->
//       <div class="absolute inset-0 bg-arcade-grid opacity-20 pointer-events-none"></div>
//       <div class="absolute -top-24 -right-24 w-48 h-48 bg-neon-pink rounded-full filter blur-3xl opacity-20 animate-pulse-neon"></div>
//       <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-neon-blue rounded-full filter blur-3xl opacity-20 animate-pulse-neon"></div>
      
//       <div class="relative">
//         <div class="text-2xl font-bold text-center text-white neon-text">
//           Acessar sua Conta
//         </div>
//         <div class="text-center text-gray-300 mb-6">
//           Entre com seus dados para acessar a arena
//         </div>
//       </div>
      
//       <div class="relative">
//         <form id="login-form" class="space-y-4">
//           <div class="space-y-1">
//             <label for="email" class="text-sm text-gray-300">
//               Email
//             </label>
//             <div class="relative">
//               <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
//               </div>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="seu-email@exemplo.com"
//                 class="flex h-10 w-full rounded-md border border-neon-blue/50 bg-arcade-dark px-3 pl-9 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-green disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white"
//                 required
//               />
//             </div>
//           </div>
          
//           <div class="space-y-1">
//             <label for="password" class="text-sm text-gray-300">
//               Senha
//             </label>
//             <div cFormSectionlass="relative">
//               <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
//               </div>
//               <input
//                 id="password"
//                 type="password"
//                 placeholder="ººººººººº"
//                 class="flex h-10 w-full rounded-md border border-neon-blue/50 bg-arcade-dark px-3 pl-9 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-green disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white"
//                 required
//               />
//               <div
//                 class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                 id="toggle-password"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 hover:text-white eye-icon"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
//               </div>
//             </div>
//           </div>
          
//           <div class="flex items-center justify-between">
//             <div class="flex items-center space-x-2">
//               <input
//                 id="remember"
//                 type="checkbox"
//                 class="h-4 w-4 border border-neon-blue/50 bg-arcade-dark rounded"
//               />
//               <label
//                 for="remember"
//                 class="text-sm text-gray-300 cursor-pointer"
//               >
//                 Lembrar de mim
//               </label>
//             </div>
            
//             <a
//               href="data-spa-link <!-- Adicionado data-spa-link -->
//               class="text-sm text-neon-blue hover:text-neon-green transition-colors"
//             >
//               Esqueceu a senha?
//             </a>
//           </div>
          
//           <button
//             type="submit"
//             class="w-full bg-neon-blue hover:bg-neon-green text-black font-bold transition-all duration-300 py-2 rounded-md h-10"
//           >
//             Entrar
//           </button>
          
//           <div class="relative flex items-center justify-center">
//             <div class="h-px bg-gray-600 flex-grow"></div>
//             <div class="px-4 text-sm text-gray-400">ou continue com</div>
//             <div class="h-px bg-gray-600 flex-grow"></div>
//           </div>
          
//           <div class="grid g gap-3">
//             <button
//               type="button"
//               class="border-neon-pink/50 hover:border-neon-pink hover:bg-neon-pink/10 text-white border rounded-md py-2 h-10"
//               id="login-google"
//             >
//               Google
//             </button>
//           </div>
//         </form>
//       </div>
      
//       <div class="flex flex-col space-y-4 items-center justify-center mt-6">
//         <div class="text-sm text-gray-300">
//           Não possui uma conta?
//           <a
//             href=' data-spa-link <!-- Adicionado data-spa-link -->
//             class="text-neon-pink hover:text-neon-purple transition-colors font-medium"
//           >
//             Registre-se
//           </a>
//         </div>
//       </div>
//     </div>
//   `;
// }

// function setupFormInteractions(): void {
//   // A mesma lógica de setupLoginPageInteractions que você tinha,
//   // mas agora focada apenas nos elementos DENTRO do formulário.
//   const togglePassword = document.getElementById('toggle-password');
//   const passwordInput = document.getElementById('password');
  
//   togglePassword?.addEventListener('click', () => {
//     if (passwordInput instanceof HTMLInputElement) {
//       const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
//       passwordInput.setAttribute('type', type);
      
//       const eyeIcon = togglePassword.querySelector('.eye-icon');
//       if (eyeIcon) {
//         if (type === 'password') {
//           eyeIcon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle>';
//         } else {
//           eyeIcon.innerHTML = '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line>';
//         }
//       }
//     }
//   });

//   const loginForm = document.getElementById('login-form');
//   loginForm?.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const email = (document.getElementById('email') as HTMLInputElement)?.value;
//     const password = (document.getElementById('password') as HTMLInputElement)?.value;
    
//     if (email && password) {
//       showToast('Login bem-sucedido!', 'success');
//       // Em uma aplicação real, você faria uma chamada de API aqui
//       // e o redirecionamento seria feito pelo router ou após sucesso da API.
//       setTimeout(() => {
//         window.location.hash = '#/'; // Use o router da SPA
//       }, 1000);
//     } else {
//       showToast('Por favor, preencha todos os campos!', 'error');
//     }
//   });

 
// }

// /**
//  * Cria e renderiza o componente do formulário de login em um container pai.
//  * @param parentElement O elemento HTML onde o formulário será renderizado.
//  */
// // Em FormLogin.ts
// export function renderLoginForm(parentElement: HTMLElement): void {
//   parentElement.innerHTML = createFormLoginHTML();
//   setupFormInteractions();
// }

export function renderLoginForm(): HTMLElement {

  const FormSection = document.createElement('div');
  FormSection.className = 'w-full max-w-md border-neon-blue bg-arcade-darker relative overflow-hidden rounded-md p-6';

  //Decorative background effects
  const gridOverlay = document.createElement('div');
  gridOverlay.className = 'absolute inset-0 bg-arcade-grid opacity-20 pointer-events-none';
  
  const NeonPink = document.createElement('div');
  NeonPink.className = 'absolute -top-24 -right-24 w-48 h-48 bg-neon-pink rounded-full filter blur-3xl opacity-20 animate-pulse-neon';
  
  const NoenBlue = document.createElement('div');
  NoenBlue.className = 'absolute -bottom-24 -left-24 w-48 h-48 bg-neon-blue rounded-full filter blur-3xl opacity-20 animate-pulse-neon';
  
  FormSection.appendChild(gridOverlay);
  FormSection.appendChild(NeonPink );
  FormSection.appendChild(NoenBlue );

  const containerTitle = document.createElement('div');
  containerTitle.className = 'relative'

  const sectionTitle = document.createElement('div');
  sectionTitle.className = 'text-2xl font-bold text-center text-white neon-text';
  
  const title = document.createElement('h2');
  title.className = 'text-2xl font-bold text-white neon-text ';
  title.innerHTML = `Acessar sua Conta`;
  
  sectionTitle.appendChild(title);

  const subTitle = document.createElement('div');
  subTitle.className ='text-center text-gray-300 mb-6';
  subTitle.textContent = 'Entre com seus dados para acessar a arena';

  containerTitle.appendChild(sectionTitle);
  containerTitle.appendChild(subTitle);

  
  const  containerLogin = document.createElement('div');
  containerLogin.className = 'relative';
  
  const sectionEmail = document.createElement('form');
 

  const contentEmail = document.createElement('div');
  contentEmail.className = 'space-y-1'

  const textEmail = document.createElement('label');
  textEmail.htmlFor = 'Email';
  textEmail.className = 'text-sm text-gray-300';
  textEmail.textContent = 'Email';

  // 1. Cria o contêiner principal <div class="relative">
  const mainContainer = document.createElement('div');
  mainContainer.className = 'relative';

  // 2. Cria o contêiner do ícone <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
  const iconContainer = document.createElement('div');
  iconContainer.className = 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none';

  // 3. Cria o elemento SVG
  // Para elementos SVG, é mais correto usar createElementNS para especificar o namespace SVG.
  const svgNS = "http://www.w3.org/2000/svg";
  const svgIcon = document.createElementNS(svgNS, 'svg');
  svgIcon.setAttribute('xmlns', svgNS); // Embora createElementNS já defina, é bom ser explícito.
  svgIcon.setAttribute('width', '16');
  svgIcon.setAttribute('height', '16');
  svgIcon.setAttribute('viewBox', '0 0 24 24');
  svgIcon.setAttribute('fill', 'none');
  svgIcon.setAttribute('stroke', 'green');
  svgIcon.setAttribute('stroke-width', '2');
  svgIcon.setAttribute('stroke-linecap', 'round');
  svgIcon.setAttribute('stroke-linejoin', 'round');

  // 3.1. Cria o elemento <rect> dentro do SVG
  const svgRect = document.createElementNS(svgNS, 'rect');
  svgRect.setAttribute('width', '20');
  svgRect.setAttribute('height', '16');
  svgRect.setAttribute('x', '2');
  svgRect.setAttribute('y', '4');
  svgRect.setAttribute('rx', '2');

  // 3.2. Cria o elemento <path> dentro do SVG
  const svgPath = document.createElementNS(svgNS, 'path');
  svgPath.setAttribute('d', 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7');

  // 4. Aninha os elementos do SVG
  svgIcon.appendChild(svgRect);
  svgIcon.appendChild(svgPath);

  // 5. Aninha o SVG no seu contêiner
  iconContainer.appendChild(svgIcon);

  // 6. Cria o elemento <input>
  const inputEmail = document.createElement('input');
  inputEmail.id = 'email';
  inputEmail.type = 'email';
  inputEmail.placeholder = 'seu-email@exemplo.com';
  inputEmail.className = 'flex h-10 w-full rounded-md border border-neon-pink bg-arcade-dark px-3 pl-9 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-green disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white';
  inputEmail.required = true; // Para atributos booleanos como 'required', defina a propriedade como true.

  // 7. Aninha o contêiner do ícone e o input no contêiner principal
  mainContainer.appendChild(iconContainer);
  mainContainer.appendChild(inputEmail);

  contentEmail.appendChild(textEmail);
  contentEmail.appendChild(mainContainer);
  sectionEmail.appendChild(contentEmail);


  
  containerLogin.appendChild(sectionEmail);
  
  
  FormSection.appendChild(containerTitle);
  FormSection.appendChild(containerLogin);
  
  return FormSection
  
}