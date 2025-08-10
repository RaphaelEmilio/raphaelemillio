/* ==========================================
   SCRIPT PRINCIPAL DO PORTFÓLIO
   Funcionalidades: Menu mobile, validação de formulário, animações
   ========================================== */

// Aguarda o carregamento completo da página antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
    
    /* ==========================================
       MENU MOBILE (HAMBÚRGUER)
       ========================================== */
    
    // Seleciona os elementos do menu mobile
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');
    
    // Adiciona evento de clique no botão do menu
    menuToggle.addEventListener('click', function() {
        // Alterna a classe 'active' no botão (para animação do hambúrguer)
        menuToggle.classList.toggle('active');
        
        // Alterna a classe 'active' no menu (para mostrar/esconder)
        nav.classList.toggle('active');
    });
    
    // Fecha o menu mobile quando clicar em um link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {

        link.addEventListener('click', function() {
            // Remove as classes 'active' para fechar o menu
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    /* ==========================================
       VALIDAÇÃO DO FORMULÁRIO DE CONTATO
       ========================================== */
    
    // Seleciona o formulário e seus elementos
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const successMessage = document.getElementById('successMessage');
    
    // Função para validar nome
    function validateName(name) {
        // Verifica se o nome tem pelo menos 2 caracteres e só contém letras e espaços
        const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
        return nameRegex.test(name.trim());
    }
    
    // Função para validar e-mail
    function validateEmail(email) {
        // Regex para validar formato de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }
    
    // Função para mostrar erro
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    // Função para esconder erro
    function hideError(errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    // Validação em tempo real para o campo nome
    nameInput.addEventListener('input', function() {
        const name = nameInput.value;
        
        if (name.length === 0) {
            hideError(nameError);
        } else if (!validateName(name)) {
            showError(nameError, 'Por favor, digite um nome válido (apenas letras e espaços)');
        } else {
            hideError(nameError);
        }
    });
    
    // Validação em tempo real para o campo e-mail
    emailInput.addEventListener('input', function() {
        const email = emailInput.value;
        
        if (email.length === 0) {
            hideError(emailError);
        } else if (!validateEmail(email)) {
            showError(emailError, 'Por favor, digite um e-mail válido');
        } else {
            hideError(emailError);
        }
    });
    
    // Evento de submissão do formulário
    contactForm.addEventListener('submit', function(e) {
        // Previne o envio padrão do formulário
        e.preventDefault();
        
        // Pega os valores dos campos
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        
        // Flag para verificar se o formulário é válido
        let isValid = true;
        
        // Valida o nome
        if (name === '') {
            showError(nameError, 'Por favor, digite seu nome');
            isValid = false;
        } else if (!validateName(name)) {
            showError(nameError, 'Por favor, digite um nome válido (apenas letras e espaços)');
            isValid = false;
        } else {
            hideError(nameError);
        }
        
        // Valida o e-mail
        if (email === '') {
            showError(emailError, 'Por favor, digite seu e-mail');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailError, 'Por favor, digite um e-mail válido');
            isValid = false;
        } else {
            hideError(emailError);
        }
        
        // Se tudo estiver válido, simula o envio
        if (isValid) {
            // Simula um pequeno delay de envio
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            // Muda o texto do botão para indicar que está enviando
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
            
            setTimeout(function() {
                // Mostra a mensagem de sucesso
                successMessage.classList.add('show');
                
                // Limpa o formulário
                contactForm.reset();
                
                // Restaura o botão
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Esconde a mensagem de sucesso após 5 segundos
                setTimeout(function() {
                    successMessage.classList.remove('show');
                }, 5000);
                
                // Aqui você poderia enviar os dados para um servidor
                console.log('Dados coletados:', { name, email });
                
            }, 1500); // Simula 1.5 segundos de "envio"
        }
    });
    
    /* ==========================================
       ANIMAÇÕES DE SCROLL (FADE IN)
       ========================================== */
    
    // Função para verificar se um elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Função para animar elementos quando aparecem na tela
    function animateOnScroll() {
        // Seleciona todos os elementos que devem ter animação
        const animatedElements = document.querySelectorAll('.service-card, .about-content, .portfolio-placeholder');
        
        animatedElements.forEach(element => {
            // Adiciona a classe fade-in se ainda não tem
            if (!element.classList.contains('fade-in')) {
                element.classList.add('fade-in');
            }
            
            // Se o elemento está visível, adiciona a classe 'visible'
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Executa a animação no carregamento da página
    animateOnScroll();
    
    // Executa a animação durante o scroll
    window.addEventListener('scroll', animateOnScroll);
    
    /* ==========================================
       SMOOTH SCROLL PARA LINKS INTERNOS
       ========================================== */
    
    // Seleciona todos os links que apontam para seções da página
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Pega o ID da seção
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calcula a posição considerando o header fixo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                // Scroll suave até a seção
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /* ==========================================
       HIGHLIGHT DO MENU ATIVO
       ========================================== */
    
    // Função para destacar o link do menu correspondente à seção atual
    function highlightActiveMenuItem() {
        const sections = document.querySelectorAll('section[id]');
        const menuLinks = document.querySelectorAll('.nav a[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Adiciona o estilo CSS para o link ativo via JavaScript
    const style = document.createElement('style');
    style.textContent = `
        .nav a.active {
            color: var(--primary-blue);
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
    
    // Executa no scroll
    window.addEventListener('scroll', highlightActiveMenuItem);
    
    /* ==========================================
       PRELOADER SIMPLES (OPCIONAL)
       ========================================== */
    
    // Remove a classe de loading do body quando a página carrega
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    /* ==========================================
       CONSOLE LOG PARA DESENVOLVEDORES
       ========================================== */
    
    // Mensagem amigável no console para outros desenvolvedores
    console.log(`
    🎨 Portfólio de Raphael Emilio
    📧 Desenvolvido com HTML, CSS e JavaScript
    🚀 Hospedado no GitHub Pages
    
    Olá, desenvolvedor(a)! 👋
    Este site foi criado como projeto de aprendizado.
    Se você tem dicas ou sugestões, ficarei feliz em ouvir!
    `);
    
}); // Fim do DOMContentLoaded

/* ==========================================
   FUNÇÕES UTILITÁRIAS GLOBAIS
   ========================================== */

// Função para detectar dispositivos móveis
function isMobile() {
    return window.innerWidth <= 768;
}

// Função para debounce (otimização de performance)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Otimiza o evento de scroll usando debounce
const optimizedScrollHandler = debounce(function() {
    // Aqui podem ser adicionadas outras funções que precisam ser executadas no scroll
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);
