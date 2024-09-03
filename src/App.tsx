import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext"
import { AuthPage } from './components/AuthPage';
import { DataTable } from './components/DataTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/data-table" element={<DataTable />} />
        </Routes>
      </Router>
      <ToastContainer />
    </AuthProvider>
  )
}

export default App
