<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test"; // Nome do banco de dados que contém a tabela "colocacoes"

// Verificar se a requisição é POST e obter os valores dos campos
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nome = isset($_POST["nome"]) ? $_POST["nome"] : "";
    $pontuacao = isset($_POST["pontuacao"]) ? $_POST["pontuacao"] : "";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    $sql = "INSERT INTO colocacoes (nome, pontuacao) VALUES ('$nome', $pontuacao)";

    if ($conn->query($sql) === TRUE) {
        echo "Dados inseridos com sucesso!";
    } else {
        echo "Erro ao inserir dados: " . $conn->error;
    }

    $conn->close();
}
?>
