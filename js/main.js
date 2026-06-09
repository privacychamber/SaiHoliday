document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('[class*="Navbar_hamburger"]');
  const navLinks = document.querySelector('[class*="Navbar_links"]');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isActive = navLinks.style.display === 'flex';
      navLinks.style.display = isActive ? 'none' : 'flex';
    });
  }

  // Flight Search Tabs Toggle
  const flightTabs = document.querySelectorAll('[class*="FlightSearch_tab"]');
  if (flightTabs.length > 0) {
    flightTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        flightTabs.forEach(t => t.classList.remove(Array.from(t.classList).find(c => c.includes('activeTab')) || 'active'));
        tab.classList.add('active');
        tab.style.backgroundColor = 'var(--gold)';
        tab.style.color = 'var(--black)';
        flightTabs.forEach(t => {
            if(t !== tab) {
                t.style.backgroundColor = 'transparent';
                t.style.color = 'inherit';
            }
        });
      });
    });
  }
});
