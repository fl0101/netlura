/**
 * Sistema de Dark Mode e Light Mode
 * Gerencia a alternância entre temas com persistência no localStorage
 */

// Classe para gerenciar o tema
class ThemeManager {
    constructor() {
        this.THEME_KEY = 'netflix-theme'; // Chave para armazenar no localStorage
        this.DARK_MODE = 'dark';
        this.LIGHT_MODE = 'light';
        this.htmlElement = document.documentElement;
        this.themeToggleButton = document.getElementById('themeToggle');

        // Inicializa o tema ao carregar a página
        this.initTheme();
        this.attachEvents();
    }

    /**
     * Inicializa o tema com base na preferência salva ou configuração do sistema
     */
    initTheme() {
        const savedTheme = this.getSavedTheme();
        const systemTheme = this.getSystemTheme();
        const theme = savedTheme || systemTheme;

        this.setTheme(theme);
    }

    /**
     * Obtém o tema salvo no localStorage
     * @returns {string|null} Tema salvo ou null se não existe
     */
    getSavedTheme() {
        return localStorage.getItem(this.THEME_KEY);
    }

    /**
     * Obtém a preferência de tema do sistema operacional
     * @returns {string} 'dark' ou 'light'
     */
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return this.DARK_MODE;
        }
        return this.LIGHT_MODE;
    }

    /**
     * Define o tema da aplicação
     * @param {string} theme - 'dark' ou 'light'
     */
    setTheme(theme) {
        const isLightMode = theme === this.LIGHT_MODE;

        if (isLightMode) {
            this.htmlElement.classList.add('light-mode');
        } else {
            this.htmlElement.classList.remove('light-mode');
        }

        // Salva a preferência no localStorage
        localStorage.setItem(this.THEME_KEY, theme);

        // Atualiza o atributo data para possíveis uso futuro
        this.htmlElement.setAttribute('data-theme', theme);
    }

    /**
     * Alterna entre os temas
     */
    toggleTheme() {
        const currentTheme = this.htmlElement.classList.contains('light-mode')
            ? this.LIGHT_MODE
            : this.DARK_MODE;

        const newTheme = currentTheme === this.DARK_MODE
            ? this.LIGHT_MODE
            : this.DARK_MODE;

        this.setTheme(newTheme);

        // Dispara um evento customizado para possíveis outros listeners
        this.dispatchThemeChangeEvent(newTheme);
    }

    /**
     * Dispara um evento customizado quando o tema muda
     * @param {string} theme - O novo tema
     */
    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themeChanged', {
            detail: { theme }
        });
        document.dispatchEvent(event);
    }

    /**
     * Attach listeners aos elementos
     */
    attachEvents() {
        // Listener do botão de alternância
        if (this.themeToggleButton) {
            this.themeToggleButton.addEventListener('click', () => this.toggleTheme());
        }

        // Listener para mudanças de preferência do sistema (opcional)
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Apenas aplica a mudança do sistema se o usuário não tiver uma preferência salva
                if (!this.getSavedTheme()) {
                    const newTheme = e.matches ? this.DARK_MODE : this.LIGHT_MODE;
                    this.setTheme(newTheme);
                }
            });
        }
    }
}

// Inicializa o tema manager quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
