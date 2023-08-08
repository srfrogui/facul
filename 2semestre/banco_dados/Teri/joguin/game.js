var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bola = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    raio: 10,
    velocidadeX: 2,
    velocidadeY: -2
};

var jogador = {
    altura: 10,
    largura: 100,
    x: (canvas.width - 100) / 2,
    y: canvas.height - 20,
    velocidade: 7
};

var esquerdaPressionado = false;
var direitaPressionado = false;

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        esquerdaPressionado = true;
    } else if (event.key === "ArrowRight") {
        direitaPressionado = true;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowLeft") {
        esquerdaPressionado = false;
    } else if (event.key === "ArrowRight") {
        direitaPressionado = false;
    }
});

function desenharBola() {
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, bola.raio, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function desenharJogador() {
    ctx.beginPath();
    ctx.rect(jogador.x, jogador.y, jogador.largura, jogador.altura);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function detectarColisao() {
    if (bola.x + bola.velocidadeX > canvas.width - bola.raio || bola.x + bola.velocidadeX < bola.raio) {
        bola.velocidadeX = -bola.velocidadeX;
    }
    if (bola.y + bola.velocidadeY < bola.raio) {
        bola.velocidadeY = -bola.velocidadeY;
    } else if (bola.y + bola.velocidadeY > canvas.height - bola.raio) {
        if (bola.x > jogador.x && bola.x < jogador.x + jogador.largura) {
            bola.velocidadeY = -bola.velocidadeY;
            atualizarPontuacao(++pontuacao);
        } else {
            alert("Fim de jogo! Sua pontuação: " + pontuacao);
            var nome = prompt("Digite seu nome:");
            if (nome !== null && nome !== "") {
                // Aqui você pode enviar a pontuação e o nome para o servidor usando AJAX
                // para atualizar a tabela de colocação.
            }
            document.location.reload();
        }
    }
}

function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharBola();
    desenharJogador();
    detectarColisao();

    if (esquerdaPressionado && jogador.x > 0) {
        jogador.x -= jogador.velocidade;
    } else if (direitaPressionado && jogador.x < canvas.width - jogador.largura) {
        jogador.x += jogador.velocidade;
    }

    bola.x += bola.velocidadeX;
    bola.y += bola.velocidadeY;

    requestAnimationFrame(desenhar);
}
