<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test"; // Nome do banco de dados que contém a tabela "colocacoes"

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$sql = "SELECT nome, pontuacao FROM colocacoes ORDER BY pontuacao DESC LIMIT 10";
$result = $conn->query($sql);

$topColocados = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $topColocados[] = array("nome" => $row["nome"], "pontuacao" => $row["pontuacao"]);
    }
}

$conn->close();

// Retorna os top 10 colocados como um array JSON
echo json_encode($topColocados);
?>
