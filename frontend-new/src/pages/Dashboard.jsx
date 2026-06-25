import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px",
      }}
    >
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #2563eb, #3b82f6)",
          color: "white",
          padding: "35px",
          borderRadius: "24px",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          Welcome Back, Ayush 👋
        </h1>

        <p
          style={{
            fontSize: "18px",
            opacity: "0.9",
            marginBottom: "20px",
          }}
        >
          Manage jobs, applications and hiring activities from one place.
        </p>

        <button
          onClick={() => navigate("/jobs")}
          style={{
            background: "white",
            color: "#2563eb",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Browse Jobs
        </button>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
          }}
        >
          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              marginBottom: "10px",
            }}
          >
            Total Jobs
          </p>

          <h2
            style={{
              fontSize: "36px",
              color: "#2563eb",
              margin: 0,
            }}
          >
            12
          </h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
          }}
        >
          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              marginBottom: "10px",
            }}
          >
            Applicants
          </p>

          <h2
            style={{
              fontSize: "36px",
              color: "#10b981",
              margin: 0,
            }}
          >
            48
          </h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
          }}
        >
          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              marginBottom: "10px",
            }}
          >
            Jobs Posted
          </p>

          <h2
            style={{
              fontSize: "36px",
              color: "#f59e0b",
              margin: 0,
            }}
          >
            5
          </h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
          }}
        >
          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              marginBottom: "10px",
            }}
          >
            Profile Completion
          </p>

          <h2
            style={{
              fontSize: "36px",
              color: "#8b5cf6",
              margin: 0,
            }}
          >
            95%
          </h2>
        </div>
      </div>

      {/* Quick Actions */}
      <h2
        style={{
          color: "#0f172a",
          marginBottom: "20px",
        }}
      >
        Quick Actions
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "20px",
        }}
      >
        <div
          onClick={() => navigate("/jobs")}
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            cursor: "pointer",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          }}
        >
          <h3>💼 Jobs</h3>
          <p>Browse available opportunities.</p>
        </div>

        <div
          onClick={() => navigate("/profile")}
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            cursor: "pointer",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          }}
        >
          <h3>👤 Profile</h3>
          <p>Manage your profile and resume.</p>
        </div>

        <div
          onClick={() => navigate("/post-job")}
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            cursor: "pointer",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          }}
        >
          <h3>📢 Post Job</h3>
          <p>Create and manage job listings.</p>
        </div>

        <div
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            padding: "30px",
            borderRadius: "20px",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(239,68,68,0.25)",
          }}
        >
          <h3>🚪 Logout</h3>
          <p>Sign out from your account.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;