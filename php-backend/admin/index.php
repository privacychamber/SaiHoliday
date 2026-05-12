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
$stats = ['total' => 0, 'today' => 0, 'flights' => 0, 'general' => 0];

if ($logged_in) {
    $db = getDB();
    $leads = $db->query("SELECT * FROM leads ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
    $stats['total'] = count($leads);
    $today = date('Y-m-d');
    foreach ($leads as $l) {
        if (substr($l['created_at'], 0, 10) === $today) $stats['today']++;
        if ($l['type'] === 'flight') $stats['flights']++;
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
      <?php if($stats['total']>0): ?>
        <span style="margin-left:auto;background:var(--gold);color:var(--sapphire);
          border-radius:20px;padding:0.1rem 0.5rem;font-size:0.7rem;font-weight:700">
          <?= $stats['total'] ?>
        </span>
      <?php endif; ?>
    </a>
    <a href="?tab=flights" class="nav-link <?= $tab==='flights'?'active':'' ?>">
      <span class="icon">✈️</span> Flight Enquiries
    </a>
    <a href="?tab=general" class="nav-link <?= $tab==='general'?'active':'' ?>">
      <span class="icon">🌍</span> Tour Enquiries
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
        <div class="num"><?= $stats['flights'] ?></div>
        <div class="lbl">Flight Enquiries</div>
      </div>
      <div class="stat-card">
        <div class="ico">🌍</div>
        <div class="num"><?= $stats['general'] ?></div>
        <div class="lbl">Tour Enquiries</div>
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
      if($tab === 'flights') $filtered = array_filter($leads, fn($l)=>$l['type']==='flight');
      if($tab === 'general') $filtered = array_filter($leads, fn($l)=>$l['type']!=='flight');
      $titles = ['leads'=>'All Enquiries','flights'=>'Flight Enquiries','general'=>'Tour Enquiries'];
    ?>
    <div class="topbar">
      <h1><?= ['leads'=>'📋','flights'=>'✈️','general'=>'🌍'][$tab] ?> <?= $titles[$tab] ?></h1>
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
  <?php endif; ?>
</div>
<?php endif; ?>
</body>
</html>
