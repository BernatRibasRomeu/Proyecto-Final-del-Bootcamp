import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdoptAnimal from './pages/AdoptAnimal';
import PutAdoption from './pages/PutAdoption';
import DonationPage from './pages/DonationPage';
import CampaignPage from './pages/CampaingPage';
import AdoptionPage from './pages/AdoptionPage';
import DashboardPage from './pages/DashboardPage';
import LoginPageApi from "./pages/LoginPageApi";
import AccountPageApi from "./pages/AccountPageApi";
import EditAccountPage from "./pages/EditAccountPage";
import RegisterPage from "./pages/RegisterPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import { UserProvider } from "./data/UserContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  return (
    <UserProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adopt" element={<AdoptAnimal />} />
          <Route path="/put-adoption" element={<PutAdoption />} />
          <Route path="/campaign/:id" element={<CampaignPage />} />
          <Route path="/donate/:id" element={<DonationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/adopt/:id" element={<AdoptionPage />} />
          <Route path="/login" element={<LoginPageApi />} />
          <Route path="/account" element={<AccountPageApi />} />
          <Route path="/account/edit" element={<EditAccountPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/change-password" element={<ChangePasswordPage />} />
        </Routes>
        <ToastContainer position="bottom-right" />
        <Footer />
      </Router>
    </UserProvider>

  );
}

export default App;
