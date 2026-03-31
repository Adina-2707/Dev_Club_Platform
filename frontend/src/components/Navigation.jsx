import { Link } from 'react-router-dom';

export default function Navigation() {
  const navStyle = {
    background: '#333',
    padding: '10px 20px',
    marginBottom: '20px',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '20px',
    fontSize: '16px',
  };

  const linkHoverStyle = {
    ...linkStyle,
    textDecoration: 'underline',
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle} onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')} onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}>
        Home
      </Link>
      <Link to="/projects" style={linkStyle} onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')} onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}>
        Projects
      </Link>
      <Link to="/about" style={linkStyle} onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')} onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}>
        About
      </Link>
    </nav>
  );
}
