import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import First from './pages/First';
import Footer from './components/Footer';
import Pricing from './pages/Pricing';
import DashboardLayout from './pages/DashBoardLayout'; // ✅ Import layout
import Discovery from './pages/Discovery';
import Target from './pages/Target';
import Collection from './pages/Collection';
import OpenCollab from './pages/openCollab'; // ✅ Capitalized component name
import CRM from './pages/CRM';
import DashBoard from './components/DashBoard'; // ✅ Create this component to render inside /dashboard
import './App.css';
import DashBoardHome from './pages/DashBoardHome';
import RequestAnalysis from "./pages/RequestAnalysis";
import Competitors from "./pages/Competitors";
import BillingAndAddress from "./pages/BillingAndAddress";
import Setting from "./pages/Setting";

const App = () => {
  const location = useLocation();
  const showHeaderFooter = location.pathname === '/' || location.pathname === '/pricing';

  return (
    <>
      {showHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* ✅ Dashboard layout and nested routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashBoardHome />} /> {/* this renders at /dashboard */}
          <Route path='home' element={<DashBoardHome />}/>
          <Route path="discovery" element={<Discovery />} />
          <Route path="target" element={<Target />} />
          <Route path="collection" element={<Collection />} />
          <Route path="open" element={<OpenCollab />} />
          <Route path="contacts" element={<CRM />} />
          <Route path="analytics/request" element={<RequestAnalysis />}/>
          <Route path="analytics/competitors" element={<Competitors />}/>
          <Route path="settings/billing" element={<BillingAndAddress />}/>
          <Route path="settings/setting" element={<Setting />}/>
        </Route>
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default App;
