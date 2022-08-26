import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

// Components
import Home from "./Home";
import AddGoal from "./AddGoal";

// CSS
import "./App.css";

const App = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-goal" element={<AddGoal />} />
      </Routes>
    </Container>
  );
};

export default App;
