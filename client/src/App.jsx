import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import './index.css';
import About from './pages/About';
import CreateListing from './pages/CreateListing';
import Home from "./pages/Home";
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SingUp from './pages/SingUp';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/sign-in' element={<SignIn />}></Route>
        <Route path='/sign-up' element={<SingUp />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/create-listing' element={<CreateListing />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}