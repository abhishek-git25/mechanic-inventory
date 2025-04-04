

import './App.css';
import Header from './components/header';
import RouterComp from './router/router';
import "bootstrap/dist/css/bootstrap.min.css";
import { token } from './utility/data';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './context/authContext';


function App() {

  const userToken = token();

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    setIsLogin(!!token()); // Update on token change
  }, [token()]);


  return (
    <div className="App">
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </div>
  );
}


function MainApp() {
  const { isLogin } = useAuth();
  return (
    <div className="App">
      {isLogin && <Header />}
      <RouterComp />
    </div>
  );
}


export default App;
