<?php
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";

function getTopPlacements($conn) {
    $sql = "SELECT nome, pontuacao FROM colocacoes ORDER BY pontuacao DESC LIMIT 10";
    $result = $conn->query($sql);

    $topColocados = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $topColocados[] = array("nome" => $row["nome"], "pontuacao" => $row["pontuacao"]);
        }
    }
    return $topColocados;
}

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

while (true) {
    $topColocados = getTopPlacements($conn);
    $data = json_encode($topColocados);

    echo "data: $data\n\n";
    flush();

    // Aguarde por alguns segundos antes de enviar o próximo evento
    sleep(5);
}
?>
