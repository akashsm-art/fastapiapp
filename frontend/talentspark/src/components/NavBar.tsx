function NavBar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">
        <span className="brand-icon">🌿</span>
        TalentSpark
      </a>
      <ul className="navbar-links">
        <li className="active">
          <span>🏠 Home</span>
        </li>
        <li>
          <span>💼 Companies</span>
        </li>
        <li>
          <span>📋 Jobs</span>
        </li>
        <li>
          <span>📞 Contact</span>
        </li>
      </ul>
      <div className="navbar-actions" />
    </nav>
  );
}

export default NavBar;