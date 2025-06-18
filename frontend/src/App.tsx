import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/menu';
import User from './pages/user';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/user" element={<User />} />
        {/* legg til flere routes her etter behov */}
      </Routes>
    </Router>
  );
}

export default App;
