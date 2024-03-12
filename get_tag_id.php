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

// Get the TagName from the POST request
$tagName = isset($_POST['tagName']) ? $conn->real_escape_string($_POST['tagName']) : '';

// SQL query to get TagId by TagName
$query = "SELECT TagFolder FROM $tagsTable WHERE TagName = '$tagName'";

$result = $conn->query($query);

if (!$result) {
    die("Error fetching tag ID: " . $conn->error);
}

// Fetch the result
$row = $result->fetch_assoc();

// Check if a result was found
if ($row) {
    echo $row['TagFolder'];
} else {
    echo 'Tag not found';
}

// Close the database connection
$conn->close();
?>
