<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

define('DB_FILE', __DIR__ . '/../data/saiholiday.db');

// Ensure data directory exists
if (!is_dir(__DIR__ . '/../data')) {
    mkdir(__DIR__ . '/../data', 0777, true);
}

try {
    $db = new PDO('sqlite:' . DB_FILE);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Ensure table exists
    $db->exec("CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, phone TEXT, email TEXT,
        destination TEXT, travel_date TEXT,
        budget TEXT, message TEXT, type TEXT DEFAULT 'general',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // Get JSON data
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        throw new Exception('No data provided');
    }

    $stmt = $db->prepare("INSERT INTO leads (name, phone, email, destination, travel_date, budget, message, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    
    $stmt->execute([
        $data['name'] ?? 'No Name',
        $data['phone'] ?? 'No Phone',
        $data['email'] ?? '',
        $data['destination'] ?? $data['route'] ?? '',
        $data['travel_date'] ?? $data['departure_date'] ?? '',
        $data['budget'] ?? '',
        $data['message'] ?? $data['notes'] ?? '',
        $data['type'] ?? 'general'
    ]);

    echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
