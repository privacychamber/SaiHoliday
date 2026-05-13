<?php
require_once 'admin/index.php';
$db = getDB();

$updates = [
    'Divine Kedarnath Yatra' => 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    'Royal Rajasthan Tour' => 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    'Manali Snow Adventure' => 'https://images.unsplash.com/photo-1596760405808-47221c39044c?auto=format&fit=crop&w=800&q=80'
];

foreach ($updates as $title => $url) {
    $stmt = $db->prepare("UPDATE packages SET image = ? WHERE title = ?");
    $stmt->execute([$url, $title]);
}

echo "Database updated with fresh image URLs!";
?>
