<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test"; // Nome do banco de dados que contém a tabela "colocacoes"

// Obtém os dados enviados pelo cliente
$data = json_decode(file_get_contents("php://input"), true);
$nome = $data["nome"];
$pontuacao = $data["pontuacao"];

// Conecta-se ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Insere o novo registro na tabela de colocacoes
$sql = "INSERT INTO colocacoes (nome, pontuacao) VALUES ('$nome', $pontuacao)";
if ($conn->query($sql) === TRUE) {
    $response = array("success" => true);
} else {
    $response = array("success" => false, "error" => $conn->error);
}

$conn->close();

// Retorna a resposta como JSON
header("Content-Type: application/json");
echo json_encode($response);
?>
