<?php 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "crudclientes";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error){
    die("Falha na conexão: " . $conn->connect_error);
}

function insereUsuario($nome, $email, $data_nascimento){
    global $conn;
    $stmt = $conn->prepare("CALL insere_usuario(?,?,?)");
    $stmt->bind_param("sss", $nome, $email, $data_nascimento);
    $stmt->execute();
    $stmt->close();
}

function atualizaUsuario($id, $nome, $email, $data_nascimento){
    global $conn;
    $stmt = $conn->prepare("CALL atualiza_usuario(?,?,?)");
    $stmt->bind_param("isss", $id, $email, $nome, $data_nascimento);
    $stmt->execute();
    $stmt->close();
}

function deletaUsuario($id){
    global $conn;
    $stmt = $conn->prepare("CALL deleta_usuario (?)");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
}

function listaUsuario(){
    global $conn;
    $result = $conn->query("SELECT id, nome, formatar_email(email) as email, DATE_FORMAT(data_nascimento, '%d/%m/%Y') as data_nascimento FROM usuarios");
    $usuarios = array();
    if ($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $usuarios[] = $row;
        }
    }
    
    return $usuarios;
}
?>