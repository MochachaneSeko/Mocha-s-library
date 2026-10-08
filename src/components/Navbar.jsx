import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext.jsx';
import { STAFF_ROLES } from '../constants.js';

const NAV_LINKS = [
  { to: '/', label: 'Dashboard', roles: null },
  { to: '/books', label: 'Books', roles: STAFF_ROLES },
  { to: '/transactions', label: 'Transactions', roles: STAFF_ROLES },
  { to: '/users', label: 'Users', roles: ['admin'] },
];

export default function Navbar() {
  const { currentUser, logout } = useLibrary();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const visibleLinks = currentUser
    ? NAV_LINKS.filter((link) => !link.roles || link.roles.includes(currentUser.role))
    : [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">M</span>
          Mocha's Library
        </Link>

        {currentUser && (
          <>
            <button
              type="button"
              className="menu-toggle"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>

            <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
              {visibleLinks.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              ))}
              <div className="nav-user">
                <span>
                  {currentUser.name} <small>({currentUser.role})</small>
                </span>
                <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}
