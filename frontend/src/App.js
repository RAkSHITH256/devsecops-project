import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000")
      .then(res => setMsg(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>DevOps CI/CD Project</h1>
      <p>{msg}</p>
    </div>
  );
}

export default App;