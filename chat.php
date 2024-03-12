<?php
// api_request.php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $fileId = $_POST['fileId'];
    $message = $_POST['message'];
    
    $url = "https://api1.docalysis.com/api/v1/files/" . $fileId . "/chat";

    $headers = [
        "Authorization: ajdr37e6b7bjkywc6pkuzgnuwqgodhtu",
        "Content-Type: application/json"
    ];

    $postData = json_encode(['message' => $message]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    if(curl_errno($ch)){
        echo 'Request Error:' . curl_error($ch);
    } else {
        echo $response;
    }
    curl_close($ch);
}
?>
