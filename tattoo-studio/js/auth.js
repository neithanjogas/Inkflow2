// Sistema de Autenticação
class AuthSystem {
    constructor() {
        this.initializeDefaultUsers();
    }

    // Inicializar usuários padrão para demonstração
    initializeDefaultUsers() {
        const users = this.getUsers();
        if (users.length === 0) {
            const defaultUsers = [
                {
                    id: 1,
                    name: 'Cliente Demo',
                    email: 'demo@inkflow.com',
                    password: '123456',
                    phone: '(11) 99999-9999',
                    birth: '1990-01-01',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }
    }

    // Obter todos os usuários
    getUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }

    // Verificar se usuário está logado
    isLoggedIn() {
        const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
        return loginData !== null;
    }

    // Obter dados do usuário logado
    getCurrentUser() {
        const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
        if (loginData) {
            return JSON.parse(loginData).user;
        }
        return null;
    }

    // Fazer logout
    logout() {
        localStorage.removeItem('loginData');
        sessionStorage.removeItem('loginData');
        window.location.href = 'login.html';
    }

    // Proteger páginas que requerem login
    requireAuth() {
        if (!this.isLoggedIn()) {
            alert('Você precisa fazer login para acessar esta página.');
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    // Atualizar navegação baseada no status de login
    updateNavigation() {
        // Manter o ícone sempre apontando para login.html
    }
}

// Inicializar sistema de autenticação globalmente
window.authSystem = new AuthSystem();

// Atualizar navegação quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    window.authSystem.updateNavigation();
});