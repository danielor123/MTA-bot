<?php
$host = "localhost";
$database = "yahavlv_MTABOOT";
$username = "yahavlv_BOOT";
$password = "MtaMta2024";
$tagsTable = "Tags"; 

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch all tags
$query = "SELECT TagName FROM $tagsTable";

$result = $conn->query($query);

if (!$result) {
    die("Error fetching tags: " . $conn->error);
}

// Convert the result set to an associative array
$tags = array();
while ($row = $result->fetch_assoc()) {
    $tags[] = $row;
}

// Send the JSON response to the client
header('Content-Type: application/json');
echo json_encode($tags);

// Close the database connection
$conn->close();
?>
