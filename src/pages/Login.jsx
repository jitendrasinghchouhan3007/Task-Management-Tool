import React, { useState } from "react";
import { User, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {

    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {

      if (!username) {
        setError("Username required");
        setLoading(false);
        return;
      }

      onLogin({ username });
      navigate("/");

    }, 1000);

  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>Sign In</h2>

        <p style={styles.subtitle}>
          Enter your username and let’s get started
        </p>

        {error && (
          <div style={styles.errorBox}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{marginTop:20}}>

          <div style={styles.inputBox}>

            <User size={16} color="#888"/>

            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              style={styles.input}
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >

            {loading ? (
              <>
                <Loader2 size={18}/> Please wait...
              </>
            ) : (
              <>
                Login <ArrowRight size={16}/>
              </>
            )}

          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;



const styles = {

  container:{
    minHeight:"100vh",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    background:"#f3f4f6"
  },

  card:{
    width:"420px",
    background:"white",
    padding:"30px",
    borderRadius:"12px",
    boxShadow:"0 10px 25px rgba(0,0,0,0.1)"
  },

  title:{
    textAlign:"center",
    marginBottom:"5px"
  },

  subtitle:{
    textAlign:"center",
    color:"#666",
    marginBottom:"20px"
  },

  inputBox:{
    display:"flex",
    alignItems:"center",
    gap:"10px",
    border:"1px solid #ddd",
    padding:"10px",
    borderRadius:"6px",
    marginBottom:"20px"
  },

  input:{
    border:"none",
    outline:"none",
    flex:1
  },

  button:{
    width:"100%",
    padding:"10px",
    background:"#3245FF",
    border:"none",
    color:"white",
    fontWeight:"600",
    borderRadius:"6px",
    cursor:"pointer",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    gap:"8px"
  },

  errorBox:{
    background:"#fee2e2",
    color:"#b91c1c",
    padding:"8px",
    borderRadius:"6px",
    marginTop:"10px",
    display:"flex",
    alignItems:"center",
    gap:"6px"
  }

}