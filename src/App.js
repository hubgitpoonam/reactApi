
import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import FetchApi from './component/FetchApi';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<FetchApi />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
