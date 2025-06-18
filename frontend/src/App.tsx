import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/menu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/menu" element={<Menu />} />
        {/* legg til flere routes her etter behov */}
      </Routes>
    </Router>
  );
}

export default App;
