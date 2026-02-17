<?php
include "db.php";

$result = mysqli_query($conn, "SELECT * FROM orders ORDER BY order_date DESC");

$orders = [];

while ($row = mysqli_fetch_assoc($result)) {
  $orderId = $row['id'];

  $itemsRes = mysqli_query($conn,
    "SELECT item_name, quantity FROM order_items WHERE order_id=$orderId"
  );

  $items = [];
  while ($i = mysqli_fetch_assoc($itemsRes)) {
    $items[] = $i;
  }

  $row['items'] = $items;
  $orders[] = $row;
}

echo json_encode($orders);
?>
