import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Menu from './pages/menu';
import User from './pages/user';
import Test from './pages/test'; 


function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
  <Link to="/menu" style={{ marginRight: '15px' }}>Menu</Link>
  <Link to="/user" style={{ marginRight: '15px' }}>User</Link>
  <Link to="/test">Test</Link>
</nav>


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
