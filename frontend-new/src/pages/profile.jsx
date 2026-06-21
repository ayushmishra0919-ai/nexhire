function Profile() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fc",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          width: "500px",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <img
          src="https://via.placeholder.com/120"
          alt="Profile"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            marginBottom: "20px",
          }}
        />

        <h1 style={{ color: "#2563eb" }}>
          Ayush Mishra
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "20px",
          }}
        >
          Full Stack Developer
        </p>

        <hr />

        <div
          style={{
            textAlign: "left",
            marginTop: "20px",
          }}
        >
          <p>
            <strong>📧 Email:</strong> demo@gmail.com
          </p>

          <p>
            <strong>👤 Role:</strong> Recruiter
          </p>

          <p>
            <strong>💻 Skills:</strong> React, Node.js,
            MongoDB, Express
          </p>

          <p>
            <strong>📍 Location:</strong> Lucknow
          </p>
        </div>

        <button
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;