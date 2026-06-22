import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#2563eb",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "white", margin: 0 }}>NexHire</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white" }}>Home</Link>
        <Link to="/jobs" style={{ color: "white" }}>Jobs</Link>
        <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
        <Link to="/profile" style={{ color: "white" }}>Profile</Link>
        <Link to="/post-job" style={{ color: "white" }}>Post Job</Link>
        <Link to="/login" style={{ color: "white" }}>Login</Link>
        <Link to="/register" style={{ color: "white" }}>Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;