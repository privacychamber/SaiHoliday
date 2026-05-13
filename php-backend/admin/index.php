<?php
session_start();

define('ADMIN_USER', 'admin');
define('ADMIN_PASS', password_hash('saiholiday@2025', PASSWORD_DEFAULT));
define('DB_FILE', __DIR__ . '/../data/saiholiday.db');

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    if ($_POST['username'] === ADMIN_USER && password_verify($_POST['password'], ADMIN_PASS)) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: index.php');
        exit;
    } else {
        $error = 'Invalid credentials. Please try again.';
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

$logged_in = !empty($_SESSION['admin_logged_in']);

// DB setup
function getDB() {
    $db = new PDO('sqlite:' . DB_FILE);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->exec("CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, phone TEXT, email TEXT,
        destination TEXT, travel_date TEXT,
        budget TEXT, message TEXT, type TEXT DEFAULT 'general',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    $db->exec("CREATE TABLE IF NOT EXISTS packages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT, location TEXT, duration TEXT,
        price TEXT, image TEXT, category TEXT,
        itinerary TEXT, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // Seed initial packages if table is empty
    $count = $db->query("SELECT COUNT(*) FROM packages")->fetchColumn();
    if ($count == 0) {
        $initial = [
            ['Paradise in Kashmir', 'Srinagar, J&K', '6D/5N', '₹24,999', 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80', 'domestic', '[{"day": 1, "title": "Arrival", "activities": "Transfer to houseboat..."}, {"day": 2, "title": "Srinagar", "activities": "Mughal Gardens visit..."}]'],
            ['Enchanting Bali', 'Bali, Indonesia', '7D/6N', '₹54,999', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80', 'international', '[{"day": 1, "title": "Arrival", "activities": "Ubud transfer..."}, {"day": 2, "title": "Rice Terraces", "activities": "Nature walk..."}]'],
            ['Divine Kedarnath Yatra', 'Uttarakhand', '5D/4N', '₹18,999', 'https://images.unsplash.com/photo-1608555855762-2b657eb1278b?auto=format&fit=crop&w=800&q=80', 'domestic', '[{"day": 1, "title": "Haridwar", "activities": "Ganga Aarti..."}, {"day": 2, "title": "Guptkashi", "activities": "Drive uphill..."}]'],
            ['Royal Rajasthan Tour', 'Jaisalmer, Jodhpur', '7D/6N', '₹21,999', 'https://images.unsplash.com/photo-1477587458883-47145ed94397?auto=format&fit=crop&w=800&q=80', 'domestic', '[{"day": 1, "title": "Jaipur", "activities": "Amer Fort..."}, {"day": 2, "title": "Jodhpur", "activities": "Mehrangarh Fort..."}]'],
            ['Manali Snow Adventure', 'Himachal Pradesh', '5D/4N', '₹16,999', 'https://images.unsplash.com/photo-1585516482984-d1a32eb4a1c5?auto=format&fit=crop&w=800&q=80', 'domestic', '[{"day": 1, "title": "Arrival", "activities": "Check-in..."}, {"day": 2, "title": "Solang Valley", "activities": "Snow sports..."}]'],
            ['Backwaters of Kerala', 'Alleppey, Munnar', '6D/5N', '₹22,999', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', 'domestic', '[{"day": 1, "title": "Munnar", "activities": "Tea gardens..."}, {"day": 2, "title": "Alleppey", "activities": "Houseboat stay..."}]'],
            ['Goa Sun & Beaches', 'North & South Goa', '5D/4N', '₹14,999', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80', 'domestic', '[{"day": 1, "title": "Calangute", "activities": "Beach time..."}, {"day": 2, "title": "Old Goa", "activities": "Churches..."}]'],
            ['Glamorous Dubai', 'UAE', '5D/4N', '₹44,999', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80', 'international', '[{"day": 1, "title": "Dubai Mall", "activities": "Burj Khalifa..."}, {"day": 2, "title": "Desert Safari", "activities": "Dune bashing..."}]'],
            ['Maldives Serenity', 'North Malé Atoll', '5D/4N', '₹79,999', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80', 'international', '[{"day": 1, "title": "Male", "activities": "Speedboat transfer..."}, {"day": 2, "title": "Resort", "activities": "Water sports..."}]'],
            ['Swiss Alps Explorer', 'Zurich, Interlaken', '8D/7N', '₹1,29,999', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', 'international', '[{"day": 1, "title": "Zurich", "activities": "Old town..."}, {"day": 2, "title": "Interlaken", "activities": "Mountain views..."}]'],
            ['Paris — City of Love', 'France', '7D/6N', '₹99,999', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80', 'international', '[{"day": 1, "title": "Eiffel Tower", "activities": "Evening cruise..."}, {"day": 2, "title": "Louvre", "activities": "Art tour..."}]'],
            ['Singapore Discovery', 'Singapore', '5D/4N', '₹59,999', 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80', 'international', '[{"day": 1, "title": "Sentosa", "activities": "Cable car..."}, {"day": 2, "title": "Marina Bay", "activities": "Gardens by the bay..."}]']
        ];
        $stmt = $db->prepare("INSERT INTO packages (title, location, duration, price, image, category, itinerary) VALUES (?, ?, ?, ?, ?, ?, ?)");
        foreach ($initial as $p) {
            $stmt->execute($p);
        }
    }

    return $db;
}

// Handle delete lead
if ($logged_in && isset($_GET['delete_lead'])) {
    $db = getDB();
    $stmt = $db->prepare("DELETE FROM leads WHERE id = ?");
    $stmt->execute([(int)$_GET['delete_lead']]);
    header('Location: index.php?tab=leads&deleted=1');
    exit;
}

// Handle save/edit package
if ($logged_in && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'save_package') {
    $db = getDB();
    if (!empty($_POST['id'])) {
        $stmt = $db->prepare("UPDATE packages SET title=?, location=?, duration=?, price=?, image=?, category=?, itinerary=? WHERE id=?");
        $stmt->execute([$_POST['title'], $_POST['location'], $_POST['duration'], $_POST['price'], $_POST['image'], $_POST['category'], $_POST['itinerary'], $_POST['id']]);
    } else {
        $stmt = $db->prepare("INSERT INTO packages (title, location, duration, price, image, category, itinerary) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$_POST['title'], $_POST['location'], $_POST['duration'], $_POST['price'], $_POST['image'], $_POST['category'], $_POST['itinerary']]);
    }
    header('Location: index.php?tab=manage-packages&saved=1');
    exit;
}

// Handle delete package
if ($logged_in && isset($_GET['delete_package'])) {
    $db = getDB();
    $stmt = $db->prepare("DELETE FROM packages WHERE id = ?");
    $stmt->execute([(int)$_GET['delete_package']]);
    header('Location: index.php?tab=manage-packages&deleted=1');
    exit;
}

// Handle CSV export
if ($logged_in && isset($_GET['export'])) {
    $db = getDB();
    $leads = $db->query("SELECT * FROM leads ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="saiholiday-leads-' . date('Y-m-d') . '.csv"');
    $out = fopen('php://output', 'w');
    fputcsv($out, ['ID', 'Name', 'Phone', 'Email', 'Destination', 'Travel Date', 'Budget', 'Message', 'Type', 'Date']);
    foreach ($leads as $r) {
        fputcsv($out, array_values($r));
    }
    fclose($out);
    exit;
}

$tab = $_GET['tab'] ?? 'dashboard';
$leads = [];
$packages_list = [];
$stats = [
    'total' => 0, 
    'today' => 0, 
    'flight' => 0, 
    'railway' => 0, 
    'hotel' => 0, 
    'visa' => 0, 
    'package' => 0,
    'general' => 0
];

if ($logged_in) {
    $db = getDB();
    $leads = $db->query("SELECT * FROM leads ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
    $packages_list = $db->query("SELECT * FROM packages ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
    $stats['total'] = count($leads);
    $today = date('Y-m-d');
    foreach ($leads as $l) {
        if (substr($l['created_at'], 0, 10) === $today) $stats['today']++;
        
        $type = $l['type'];
        if (strpos($type, 'flight') !== false) $stats['flight']++;
        elseif (strpos($type, 'railway') !== false) $stats['railway']++;
        elseif (strpos($type, 'hotel') !== false) $stats['hotel']++;
        elseif (strpos($type, 'visa') !== false) $stats['visa']++;
        elseif (strpos($type, 'package') !== false) $stats['package']++;
        else $stats['general']++;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sai Holiday — Admin Panel</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    :root{
      --sapphire:#0A1628;--sapphire-mid:#0d1f3c;
      --gold:#F0A500;--white:#fff;
      --linen:#F8F5F0;--muted:#6B7280;
      --ink:#1a2235;--danger:#dc2626;--success:#16a34a;
    }
    body{font-family:'Inter',sans-serif;background:var(--linen);color:var(--ink);min-height:100vh}

    /* LOGIN */
    .login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;
      background:linear-gradient(135deg,var(--sapphire) 0%,var(--sapphire-mid) 100%)}
    .login-card{background:var(--white);border-radius:20px;padding:2.5rem;width:100%;max-width:400px;
      box-shadow:0 20px 60px rgba(0,0,0,0.3)}
    .login-logo{text-align:center;margin-bottom:2rem}
    .login-logo span{font-family:'DM Sans',sans-serif;font-size:1.5rem;font-weight:700;color:var(--sapphire)}
    .login-logo small{display:block;font-size:0.7rem;color:var(--gold);letter-spacing:0.15em;text-transform:uppercase}
    .form-group{margin-bottom:1.25rem}
    .form-group label{display:block;font-size:0.78rem;font-weight:700;color:var(--muted);
      text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.4rem}
    .form-group input{width:100%;padding:0.75rem 1rem;border:2px solid #e5e7eb;border-radius:10px;
      font-size:0.95rem;outline:none;transition:border-color 0.2s}
    .form-group input:focus{border-color:var(--sapphire)}
    .btn-login{width:100%;padding:0.85rem;background:var(--sapphire);color:var(--white);
      border:none;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:1rem;
      font-weight:700;cursor:pointer;transition:background 0.2s}
    .btn-login:hover{background:var(--gold);color:var(--sapphire)}
    .error-msg{background:#fef2f2;border:1px solid #fecaca;color:var(--danger);
      border-radius:8px;padding:0.75rem 1rem;font-size:0.85rem;margin-bottom:1rem}

    /* LAYOUT */
    .sidebar{position:fixed;top:0;left:0;bottom:0;width:240px;background:var(--sapphire);
      display:flex;flex-direction:column;z-index:100}
    .sidebar-logo{padding:1.5rem;border-bottom:1px solid rgba(255,255,255,0.08)}
    .sidebar-logo span{font-family:'DM Sans',sans-serif;font-size:1.1rem;font-weight:700;color:var(--white)}
    .sidebar-logo small{display:block;font-size:0.62rem;color:var(--gold);letter-spacing:0.12em;text-transform:uppercase}
    .nav-links{padding:1rem 0;flex:1}
    .nav-link{display:flex;align-items:center;gap:0.75rem;padding:0.85rem 1.5rem;
      color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.88rem;font-weight:600;
      transition:all 0.2s;border-left:3px solid transparent}
    .nav-link:hover{color:var(--white);background:rgba(255,255,255,0.05)}
    .nav-link.active{color:var(--gold);border-left-color:var(--gold);background:rgba(240,165,0,0.08)}
    .nav-link .icon{font-size:1rem;width:20px;text-align:center}
    .logout-btn{padding:1rem 1.5rem;border-top:1px solid rgba(255,255,255,0.08)}
    .logout-btn a{display:flex;align-items:center;gap:0.5rem;color:rgba(255,255,255,0.5);
      text-decoration:none;font-size:0.85rem;transition:color 0.2s}
    .logout-btn a:hover{color:var(--danger)}

    .main{margin-left:240px;padding:2rem;min-height:100vh}
    .topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem}
    .topbar h1{font-family:'DM Sans',sans-serif;font-size:1.5rem;font-weight:700;color:var(--ink)}
    .topbar-right{display:flex;gap:0.75rem;align-items:center}

    /* STATS */
    .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;margin-bottom:2rem}
    .stat-card{background:var(--white);border-radius:14px;padding:1.5rem;
      box-shadow:0 2px 12px rgba(0,0,0,0.06)}
    .stat-card .num{font-family:'DM Sans',sans-serif;font-size:2rem;font-weight:700;color:var(--sapphire)}
    .stat-card .lbl{font-size:0.8rem;color:var(--muted);margin-top:0.25rem}
    .stat-card .ico{font-size:1.5rem;margin-bottom:0.5rem}
    .stat-card.gold .num{color:var(--gold)}

    /* TABLE */
    .card{background:var(--white);border-radius:14px;padding:1.5rem;
      box-shadow:0 2px 12px rgba(0,0,0,0.06)}
    .card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem}
    .card-header h2{font-family:'DM Sans',sans-serif;font-size:1.1rem;font-weight:700}
    table{width:100%;border-collapse:collapse}
    th{text-align:left;font-size:0.72rem;font-weight:700;color:var(--muted);
      text-transform:uppercase;letter-spacing:0.06em;padding:0.6rem 0.75rem;
      border-bottom:2px solid #f3f4f6}
    td{padding:0.75rem;font-size:0.85rem;border-bottom:1px solid #f3f4f6;vertical-align:top}
    tr:last-child td{border-bottom:none}
    tr:hover td{background:#fafafa}

    .badge{display:inline-block;padding:0.2rem 0.65rem;border-radius:20px;
      font-size:0.72rem;font-weight:700}
    .badge-general{background:#eff6ff;color:#1d4ed8}
    .badge-flight{background:#f0fdf4;color:#15803d}

    .btn{padding:0.5rem 1rem;border-radius:8px;border:none;cursor:pointer;
      font-family:'DM Sans',sans-serif;font-size:0.82rem;font-weight:600;text-decoration:none;
      display:inline-flex;align-items:center;gap:0.35rem;transition:all 0.2s}
    .btn-primary{background:var(--sapphire);color:var(--white)}
    .btn-primary:hover{background:var(--gold);color:var(--sapphire)}
    .btn-export{background:#f0fdf4;color:var(--success);border:1px solid #bbf7d0}
    .btn-export:hover{background:var(--success);color:white}
    .btn-danger{background:#fef2f2;color:var(--danger);border:1px solid #fecaca}
    .btn-danger:hover{background:var(--danger);color:white}

    .empty{text-align:center;padding:3rem;color:var(--muted);font-size:0.9rem}
    .alert-success{background:#f0fdf4;border:1px solid #bbf7d0;color:var(--success);
      border-radius:8px;padding:0.75rem 1rem;font-size:0.85rem;margin-bottom:1rem}

    @media(max-width:768px){
      .sidebar{width:100%;position:relative;height:auto}
      .main{margin-left:0}
      .stats-grid{grid-template-columns:repeat(2,1fr)}
      table{font-size:0.78rem}
    }
  </style>
</head>
<body>
<?php if (!$logged_in): ?>
<!-- LOGIN PAGE -->
<div class="login-wrap">
  <div class="login-card">
    <div class="login-logo">
      <span>✦ Sai Holiday</span>
      <small>Admin Dashboard</small>
    </div>
    <?php if (!empty($error)): ?>
      <div class="error-msg">⚠ <?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    <form method="POST">
      <input type="hidden" name="action" value="login">
      <div class="form-group">
        <label>Username</label>
        <input type="text" name="username" placeholder="admin" required autofocus>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" name="password" placeholder="••••••••" required>
      </div>
      <button type="submit" class="btn-login">Sign In →</button>
    </form>
    <p style="text-align:center;font-size:0.75rem;color:var(--muted);margin-top:1.25rem">
      Sai Holiday CMS · Secure Admin Access
    </p>
  </div>
</div>

<?php else: ?>
<!-- ADMIN PANEL -->
<div class="sidebar">
  <div class="sidebar-logo">
    <span>✦ Sai Holiday</span>
    <small>Admin Dashboard</small>
  </div>
  <nav class="nav-links">
    <a href="?tab=dashboard" class="nav-link <?= $tab==='dashboard'?'active':'' ?>">
      <span class="icon">📊</span> Dashboard
    </a>
    <a href="?tab=leads" class="nav-link <?= $tab==='leads'?'active':'' ?>">
      <span class="icon">📋</span> All Enquiries
    </a>
    <a href="?tab=flight" class="nav-link <?= $tab==='flight'?'active':'' ?>">
      <span class="icon">✈️</span> Flights (<?= $stats['flight'] ?>)
    </a>
    <a href="?tab=railway" class="nav-link <?= $tab==='railway'?'active':'' ?>">
      <span class="icon">🚂</span> Railway (<?= $stats['railway'] ?>)
    </a>
    <a href="?tab=hotel" class="nav-link <?= $tab==='hotel'?'active':'' ?>">
      <span class="icon">🏨</span> Hotels (<?= $stats['hotel'] ?>)
    </a>
    <a href="?tab=visa" class="nav-link <?= $tab==='visa'?'active':'' ?>">
      <span class="icon">🛂</span> Visa (<?= $stats['visa'] ?>)
    </a>
    <a href="?tab=package" class="nav-link <?= $tab==='package'?'active':'' ?>">
      <span class="icon">🗺️</span> Package Enquiries (<?= $stats['package'] ?>)
    </a>
    <a href="?tab=manage-packages" class="nav-link <?= $tab==='manage-packages'?'active':'' ?>">
      <span class="icon">⚙️</span> Manage Packages
    </a>
    <a href="?tab=consultancy" class="nav-link <?= $tab==='consultancy'?'active':'' ?>">
      <span class="icon">✦</span> Consultancy
    </a>
    <a href="?tab=export" class="nav-link <?= $tab==='export'?'active':'' ?>">
      <span class="icon">⬇️</span> Export Data
    </a>
  </nav>
  <div class="logout-btn">
    <a href="?logout=1">🚪 Logout</a>
  </div>
</div>

<div class="main">
  <?php if(isset($_GET['deleted'])): ?>
    <div class="alert-success">✅ Lead deleted successfully.</div>
  <?php endif; ?>

  <?php if($tab === 'dashboard'): ?>
    <!-- DASHBOARD -->
    <div class="topbar">
      <h1>📊 Dashboard Overview</h1>
      <div class="topbar-right">
        <a href="?export=1" class="btn btn-export">⬇️ Export All CSV</a>
      </div>
    </div>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="ico">📋</div>
        <div class="num"><?= $stats['total'] ?></div>
        <div class="lbl">Total Enquiries</div>
      </div>
      <div class="stat-card gold">
        <div class="ico">🔥</div>
        <div class="num"><?= $stats['today'] ?></div>
        <div class="lbl">Today's Leads</div>
      </div>
      <div class="stat-card">
        <div class="ico">✈️</div>
        <div class="num"><?= $stats['flight'] ?></div>
        <div class="lbl">Flights</div>
      </div>
      <div class="stat-card">
        <div class="ico">🚂</div>
        <div class="num"><?= $stats['railway'] ?></div>
        <div class="lbl">Railway</div>
      </div>
    </div>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="ico">🏨</div>
        <div class="num"><?= $stats['hotel'] ?></div>
        <div class="lbl">Hotels</div>
      </div>
      <div class="stat-card">
        <div class="ico">🛂</div>
        <div class="num"><?= $stats['visa'] ?></div>
        <div class="lbl">Visa</div>
      </div>
      <div class="stat-card">
        <div class="ico">🗺️</div>
        <div class="num"><?= $stats['package'] ?></div>
        <div class="lbl">Packages</div>
      </div>
      <div class="stat-card">
        <div class="ico">🌍</div>
        <div class="num"><?= $stats['general'] ?></div>
        <div class="lbl">Others</div>
      </div>
    </div>
    <!-- Recent leads -->
    <div class="card">
      <div class="card-header">
        <h2>Recent Enquiries</h2>
        <a href="?tab=leads" class="btn btn-primary">View All</a>
      </div>
      <?php if(empty($leads)): ?>
        <p class="empty">No enquiries yet. They will appear here once visitors submit forms.</p>
      <?php else: ?>
      <table>
        <thead><tr>
          <th>#</th><th>Name</th><th>Phone</th><th>Type</th><th>Destination</th><th>Date</th>
        </tr></thead>
        <tbody>
          <?php foreach(array_slice($leads,0,10) as $l): ?>
          <tr>
            <td><?= $l['id'] ?></td>
            <td><strong><?= htmlspecialchars($l['name']) ?></strong></td>
            <td><a href="tel:<?= htmlspecialchars($l['phone']) ?>"><?= htmlspecialchars($l['phone']) ?></a></td>
            <td><span class="badge badge-<?= $l['type'] ?>"><?= ucfirst($l['type']) ?></span></td>
            <td><?= htmlspecialchars($l['destination'] ?? '—') ?></td>
            <td style="color:var(--muted)"><?= substr($l['created_at'],0,10) ?></td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
      <?php endif; ?>
    </div>

  <?php elseif(in_array($tab, ['leads','flights','general'])): ?>
    <!-- LEADS TABLE -->
    <?php
      $filtered = $leads;
      if($tab !== 'leads' && $tab !== 'dashboard' && $tab !== 'export') {
          $filtered = array_filter($leads, fn($l) => strpos($l['type'], $tab) !== false);
      }
      $titles = [
          'leads'=>'All Enquiries',
          'flight'=>'Flight Enquiries',
          'railway'=>'Railway Enquiries',
          'hotel'=>'Hotel Reservations',
          'visa'=>'Visa Assistance',
          'package'=>'Package Enquiries',
          'consultancy'=>'Consultancy Leads'
      ];
      $icons = ['leads'=>'📋','flight'=>'✈️','railway'=>'🚂','hotel'=>'🏨','visa'=>'🛂','package'=>'🗺️','consultancy'=>'✦'];
    ?>
    <div class="topbar">
      <h1><?= $icons[$tab] ?? '📋' ?> <?= $titles[$tab] ?? 'Enquiries' ?></h1>
      <div class="topbar-right">
        <a href="?export=1" class="btn btn-export">⬇️ Export CSV</a>
      </div>
    </div>
    <div class="card">
      <?php if(empty($filtered)): ?>
        <p class="empty">No <?= $titles[$tab] ?> yet.</p>
      <?php else: ?>
      <table>
        <thead><tr>
          <th>#</th><th>Name</th><th>Phone</th><th>Email</th>
          <th>Destination / Route</th><th>Budget</th><th>Date</th><th>Action</th>
        </tr></thead>
        <tbody>
          <?php foreach($filtered as $l): ?>
          <tr>
            <td><?= $l['id'] ?></td>
            <td><strong><?= htmlspecialchars($l['name']) ?></strong></td>
            <td><a href="tel:<?= htmlspecialchars($l['phone']) ?>" style="color:var(--sapphire)"><?= htmlspecialchars($l['phone']) ?></a></td>
            <td style="color:var(--muted)"><?= htmlspecialchars($l['email'] ?? '—') ?></td>
            <td><?= htmlspecialchars($l['destination'] ?? '—') ?></td>
            <td><?= htmlspecialchars($l['budget'] ?? '—') ?></td>
            <td style="color:var(--muted)"><?= substr($l['created_at'],0,10) ?></td>
            <td>
              <a href="?tab=<?= $tab ?>&delete_lead=<?= $l['id'] ?>"
                class="btn btn-danger"
                onclick="return confirm('Delete this lead?')">🗑</a>
            </td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
      <?php endif; ?>
    </div>

  <?php elseif($tab === 'export'): ?>
    <div class="topbar"><h1>⬇️ Export Data</h1></div>
    <div class="card" style="max-width:500px">
      <h2 style="margin-bottom:1.25rem">Download Leads</h2>
      <p style="color:var(--muted);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.7">
        Export all enquiry data as a CSV file. Open in Excel, Google Sheets, or any spreadsheet application.
      </p>
      <a href="?export=1" class="btn btn-export" style="font-size:0.95rem;padding:0.75rem 1.5rem">
        ⬇️ Download All Leads (<?= $stats['total'] ?> records)
      </a>
    </div>
  <?php elseif($tab === 'manage-packages'): ?>
    <div class="topbar">
      <h1>⚙️ Manage Packages</h1>
      <button class="btn btn-primary" onclick="openPackageModal()">+ Add New Package</button>
    </div>

    <?php if(isset($_GET['saved'])): ?>
      <div class="alert-success">✅ Package saved successfully.</div>
    <?php endif; ?>

    <div class="card">
      <?php if(empty($packages_list)): ?>
        <p class="empty">No packages found. Click "Add New" to create one.</p>
      <?php else: ?>
      <table>
        <thead><tr>
          <th>ID</th><th>Title</th><th>Location</th><th>Price</th><th>Category</th><th>Action</th>
        </tr></thead>
        <tbody>
          <?php foreach($packages_list as $p): ?>
          <tr>
            <td><?= $p['id'] ?></td>
            <td><strong><?= htmlspecialchars($p['title']) ?></strong></td>
            <td><?= htmlspecialchars($p['location']) ?></td>
            <td><?= htmlspecialchars($p['price']) ?></td>
            <td><span class="badge badge-general"><?= ucfirst($p['category']) ?></span></td>
            <td>
              <button class="btn btn-primary" onclick='editPackage(<?= json_encode($p) ?>)'>✏️</button>
              <a href="?tab=manage-packages&delete_package=<?= $p['id'] ?>" 
                 class="btn btn-danger" onclick="return confirm('Delete this package?')">🗑</a>
            </td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
      <?php endif; ?>
    </div>

    <!-- Package Modal -->
    <div id="packageModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:1000; align-items:center; justify-content:center; padding:2rem;">
      <div class="card" style="width:100%; max-width:800px; max-height:90vh; overflow-y:auto;">
        <div class="card-header">
          <h2 id="modalTitle">Add New Package</h2>
          <button onclick="closePackageModal()" class="btn btn-danger">X</button>
        </div>
        <form method="POST">
          <input type="hidden" name="action" value="save_package">
          <input type="hidden" name="id" id="p_id">
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
            <div class="form-group">
              <label>Package Title</label>
              <input type="text" name="title" id="p_title" required>
            </div>
            <div class="form-group">
              <label>Location</label>
              <input type="text" name="location" id="p_location" required>
            </div>
            <div class="form-group">
              <label>Duration</label>
              <input type="text" name="duration" id="p_duration" placeholder="e.g. 5D/4N" required>
            </div>
            <div class="form-group">
              <label>Starting Price</label>
              <input type="text" name="price" id="p_price" placeholder="e.g. ₹19,999" required>
            </div>
            <div class="form-group">
              <label>Image URL</label>
              <input type="text" name="image" id="p_image" placeholder="Unsplash URL or local path" required>
            </div>
            <div class="form-group">
              <label>Category</label>
              <select name="category" id="p_category">
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
                <option value="villa">Villa / Staycation</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Itinerary (JSON or HTML)</label>
            <textarea name="itinerary" id="p_itinerary" rows="10" style="width:100%; padding:1rem; border:2px solid #e5e7eb; border-radius:10px;" placeholder='[{"day": 1, "title": "Arrival", "activities": "Pick up from airport..."}]'></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%; padding:1rem;">Save Package</button>
        </form>
      </div>
    </div>

    <script>
      function openPackageModal() {
        document.getElementById('packageModal').style.display = 'flex';
        document.getElementById('modalTitle').innerText = 'Add New Package';
        document.getElementById('p_id').value = '';
        document.getElementById('p_title').value = '';
        document.getElementById('p_location').value = '';
        document.getElementById('p_duration').value = '';
        document.getElementById('p_price').value = '';
        document.getElementById('p_image').value = '';
        document.getElementById('p_category').value = 'domestic';
        document.getElementById('p_itinerary').value = '';
      }
      function closePackageModal() {
        document.getElementById('packageModal').style.display = 'none';
      }
      function editPackage(p) {
        openPackageModal();
        document.getElementById('modalTitle').innerText = 'Edit Package';
        document.getElementById('p_id').value = p.id;
        document.getElementById('p_title').value = p.title;
        document.getElementById('p_location').value = p.location;
        document.getElementById('p_duration').value = p.duration;
        document.getElementById('p_price').value = p.price;
        document.getElementById('p_image').value = p.image;
        document.getElementById('p_category').value = p.category;
        document.getElementById('p_itinerary').value = p.itinerary;
      }
    </script>
  <?php endif; ?>
</div>
<?php endif; ?>
</body>
</html>
