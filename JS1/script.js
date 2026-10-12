// Lista com os filmes do catálogo.
let filmes = [
    { titulo: "Coraline e o Mundo Secreto", ano: 2009, genero: "Fantasia e mistério", nota: 8.0, poster: "imagens/coraline.jpg" },
    { titulo: "Edward Mãos de Tesoura", ano: 1990, genero: "Fantasia gótica", nota: 7.9, poster: "imagens/mao-de-tesoura.jpg" },
    { titulo: "O Estranho Mundo de Jack", ano: 1993, genero: "Fantasia e musical", nota: 8.0, poster: "imagens/estranho-mundo-jack.jpg" },
    { titulo: "Drácula de Bram Stoker", ano: 1992, genero: "Terror gótico", nota: 7.4, poster: "imagens/dracula.jpg" },
    { titulo: "Frankenstein", ano: 1931, genero: "Terror clássico", nota: 7.8, poster: "imagens/frankenstein.jpg" },
    { titulo: "O Corcunda de Notre Dame", ano: 1996, genero: "Drama e mistério", nota: 7.0, poster: "imagens/corcunda.jpg" },
    { titulo: "A Noiva Cadáver", ano: 2005, genero: "Fantasia sombria", nota: 7.4, poster: "imagens/noivacadaver.jpg" },
    { titulo: "A Lenda do Cavaleiro sem Cabeça", ano: 1999, genero: "Terror e mistério", nota: 7.3, poster: "imagens/semcabeça.jpg" }
];

// Mostra os filmes na página.
let filmesNaTela = filmes;

function mostrarFilmes(lista) {
    let cartoes = "";
    let areaFilmes = document.getElementById("lista-filmes");
    let contador = document.getElementById("contador");

    if (lista.length === 0) {
        areaFilmes.innerHTML = "<p>Nenhum filme encontrado</p>";
    } else {
        for (let i = 0; i < lista.length; i++) {
            let recomendado = lista[i].nota >= 8 ? "⭐ Recomendado" : "";
            cartoes += "<div class='cartao'>";
            cartoes += "<div class='imagem-filme'><img src='" + lista[i].poster + "' alt='Pôster de " + lista[i].titulo + "'></div>";
            cartoes += "<h3>" + lista[i].titulo + "</h3>";
            cartoes += "<p>" + lista[i].ano + " | " + lista[i].genero + "</p>";
            cartoes += "<p>Nota: " + lista[i].nota + "</p>";
            cartoes += "<p>" + recomendado + "</p>";
            cartoes += "<button onclick='favoritar(" + i + ")'>♥ Favoritar</button>";
            cartoes += "</div>";
        }

        areaFilmes.innerHTML = cartoes;
    }

    filmesNaTela = lista;
    contador.innerText = lista.length;
}

mostrarFilmes(filmes);

// Procura no título os caracteres que foram digitados.
let filmesDaBusca = filmes;

function buscarFilmes() {
    let texto = document.getElementById("busca").value.toLowerCase();
    let resultado = [];

    for (let i = 0; i < filmes.length; i++) {
        if (filmes[i].titulo.toLowerCase().includes(texto)) {
            resultado.push(filmes[i]);
        }
    }

    filmesDaBusca = resultado;
    filtrarGenero();
}

document.getElementById("busca").addEventListener("input", buscarFilmes);


// Mostra todos os filmes ou somente os do gênero escolhido.
function filtrarGenero() {
    let generoEscolhido = document.getElementById("filtro-genero").value;

    if (generoEscolhido === "Todos") {
        mostrarFilmes(filmesDaBusca);
    } else {
        let resultado = [];

        for (let i = 0; i < filmesDaBusca.length; i++) {
            if (filmesDaBusca[i].genero === generoEscolhido) {
                resultado.push(filmesDaBusca[i]);
            }
        }

        filtrarGenero();
    }
}

document.getElementById("filtro-genero").addEventListener("change", filtrarGenero);

// Inverte a ordem dos filmes que estão aparecendo.
document.getElementById("btn-inverter").addEventListener("click", function () {
    filmesNaTela.reverse();
    mostrarFilmes(filmesNaTela);
});

// Guarda o título do filme escolhido.
let favoritos = [];

function favoritar(indice) {
    let titulo = filmesNaTela[indice].titulo;

    if (favoritos.includes(titulo) === false) {
        favoritos.push(titulo);
    }

    mostrarFavoritos();
}

// Atualiza a quantidade e os títulos favoritos na página.
function mostrarFavoritos() {
    let contador = document.getElementById("contador-favoritos");
    let lista = document.getElementById("lista-favoritos");
    let nomes = "";

    contador.innerText = favoritos.length;

    if (favoritos.length === 0) {
        lista.innerText = "Nenhum filme favoritado.";
    } else {
        for (let i = 0; i < favoritos.length; i++) {
            nomes += favoritos[i] + "<br>";
        }

        lista.innerHTML = nomes;
    }
}

document.getElementById("btn-limpar-favoritos").addEventListener("click", function () {
    favoritos = [];
    mostrarFavoritos();
});

mostrarFavoritos();

// Muda a cor do título quando o mouse passa por cima.
let tituloCatalogo = document.getElementById("titulo-catalogo");

tituloCatalogo.addEventListener("mouseenter", function () {
    tituloCatalogo.style.color = "#d00024";
});

tituloCatalogo.addEventListener("mouseout", function () {
    tituloCatalogo.style.color = "#8d1825";
});
