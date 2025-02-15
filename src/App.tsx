import "./App.css";
import "./index.css";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/sign-in");
  };
  return (
    <>
      <button onClick={handleSignIn}>start</button>
    </>
  );
}

export default App;
