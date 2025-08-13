import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Auth, Orders, Tables } from "./pages";
import Header from './components/shared/Header';
import Menu from './pages/Menu';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useLoadData from './hooks/useLoadData';
import FullScreenLoader from './components/shared/FullScreenLoader';
import Dashboard from './pages/Dashboard';
import ErrorLogs from './components/debug/ErrorLogs';

function Layout() {

  const location = useLocation();
  const isLoading = useLoadData();
  const hideHeaderRoutes = ["/auth"];
  const isAuth = useSelector(state => state.user?.isAuth);

  if(isLoading)return <FullScreenLoader />

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        } />
        <Route path="/auth" element={isAuth ? <Navigate to="/" /> : <Auth />} />
        <Route path="/orders" element={
          <ProtectedRoutes>
            <Orders />
          </ProtectedRoutes>
        } />
        <Route path="/tables" element={
          <ProtectedRoutes>
            <Tables />
          </ProtectedRoutes>
        } />
        <Route path="/menu" element={
          <ProtectedRoutes>
            <Menu />
          </ProtectedRoutes>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        } />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      
      {/* ✅ Debug component - chỉ hiển thị trong development */}
      {process.env.NODE_ENV === 'development' && <ErrorLogs />}
    </>
  )
}

function ProtectedRoutes({children}){
  const { isAuth } = useSelector(state => state.user);
  
  // ✅ Kiểm tra token an toàn cho incognito mode
  let token = null;
  try {
    token = localStorage.getItem('token');
  } catch (e) {
    console.log('❌ Cannot access localStorage (incognito mode?)');
  }
  
  console.log('🔒 ProtectedRoutes check:', { isAuth, hasToken: !!token });
  
  // ✅ Chỉ kiểm tra Redux state nếu không có localStorage
  if (!isAuth) {
    console.log('❌ Access denied, redirecting to auth');
    return <Navigate to='/auth' />
  }

  return children;
}


function App() {
  return (

    <Router>
      <Layout />
    </Router>

  )
}

export default App
