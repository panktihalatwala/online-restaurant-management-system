<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

$customerName = $data["customerName"];
$cart = $data["cart"];

// Insert into orders table
$stmt = $conn->prepare("INSERT INTO orders (customer_name) VALUES (?)");
$stmt->bind_param("s", $customerName);
$stmt->execute();

$orderId = $stmt->insert_id;

// Insert each item into order_items table
foreach ($cart as $item) {
    $itemName = $item["name"];
    $quantity = $item["quantity"];

    $stmt2 = $conn->prepare("INSERT INTO order_items (order_id, item_name, quantity) VALUES (?, ?, ?)");
    $stmt2->bind_param("isi", $orderId, $itemName, $quantity);
    $stmt2->execute();
}

echo json_encode(["status" => "success"]);

$conn->close();
?>
