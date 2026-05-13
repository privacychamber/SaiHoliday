<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

define('DB_FILE', __DIR__ . '/../data/saiholiday.db');

try {
    $db = new PDO('sqlite:' . DB_FILE);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    if (isset($_GET['id'])) {
        $stmt = $db->prepare("SELECT * FROM packages WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
    } else {
        $res = $db->query("SELECT * FROM packages ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode($res);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
