import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      background: "#2563eb",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h2 style={{ color: "white" }}>Job Portal</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white" }}>Home</Link>
        <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
        <Link to="/jobs" style={{ color: "white" }}>Jobs</Link>
        <Link to="/profile" style={{ color: "white" }}>Profile</Link>
        <Link to="/post-job" style={{ color: "white" }}>Post Job</Link>
      </div>
    </nav>
  );
}

export default Navbar;