import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ background: "#333", padding: "10px", color: "#fff" }}>
      <ul style={{ display: "flex", gap: "10px" }}>
        <li><Link to="/" style={{ color: "#fff" }}>Home</Link></li>
        <li><Link to="/dashboard" style={{ color: "#fff" }}>Dashboard</Link></li>
        <li><Link to="/profile" style={{ color: "#fff" }}>Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
