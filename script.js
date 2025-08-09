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
        link.