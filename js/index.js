document.addEventListener('DOMContentLoaded', () => {
	const perfilLinks = document.querySelectorAll('.profile');

	perfilLinks.forEach(link => {
		link.addEventListener('click', (event) => {
			// Obter dados do atributo data-* do link
			const nome = link.getAttribute('data-name');
			let imgSrc = link.getAttribute('data-img');

			// Ajusta caminho relativo para que funcione a partir de catalogo/catalogo.html
			// Se for um caminho relativo como "assets/1.webp", prefixa "../" para apontar ao root
			if (imgSrc && !imgSrc.startsWith('http') && !imgSrc.startsWith('/') && !imgSrc.startsWith('..')) {
				imgSrc = '../' + imgSrc;
			}

			try {
				localStorage.setItem('perfilAtivoNome', nome);
				localStorage.setItem('perfilAtivoImagem', imgSrc);
			} catch (e) {
				// Silenciar erros de localStorage (ex: modo privado)
				console.warn('Não foi possível salvar o perfil ativo no localStorage', e);
			}

			// Deixar o link navegar normalmente para catalogo.html
		});
	});
});