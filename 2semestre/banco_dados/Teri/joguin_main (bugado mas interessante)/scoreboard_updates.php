<?php
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
header("Connection: keep-alive");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test"; // Nome do banco de dados que contém a tabela "colocacoes"

while (true) {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    $sql = "SELECT nome, pontuacao FROM colocacoes ORDER BY pontuacao DESC LIMIT 10";
    $result = $conn->query($sql);

    $topPlayers = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $topPlayers[] = array("nome" => $row["nome"], "pontuacao" => $row["pontuacao"]);
        }
    }

    $conn->close();

    // Envie os dados para o cliente como um evento SSE
    echo "event: update\n";
    echo "data: " . json_encode($topPlayers) . "\n\n";

    // Espere por um curto período de tempo antes de verificar novamente
    usleep(500000); // Aguarda meio segundo
}
?>
