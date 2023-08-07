function salvarColocacao() {
    var nome = document.getElementById("nome").value;
    var pontuacao = document.getElementById("pontuacao").value;
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById("mensagem").innerHTML = "Colocação salva com sucesso!";
            } else {
                document.getElementById("mensagem").innerHTML = "Erro ao salvar colocação.";
            }
        }
    };
    
    xhr.open("POST", "salvar_colocacao.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("nome=" + encodeURIComponent(nome) + "&pontuacao=" + encodeURIComponent(pontuacao));
}
