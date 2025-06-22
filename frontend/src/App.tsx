import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/menu';
import User from './pages/user';
import Test from './pages/test'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/user" element={<User />} />
        <Route path="/test" element={<Test />} />
        {/* legg til flere routes her etter behov */}
      </Routes>
    </Router>
  );
}

export default App;
