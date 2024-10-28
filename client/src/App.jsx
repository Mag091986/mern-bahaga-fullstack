import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import './index.css';
import About from './pages/About';
import CreateListing from './pages/CreateListing';
import Home from "./pages/Home";
import Listing from './pages/Listing';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SingUp from './pages/SingUp';
import UpdateListing from './pages/UpdateListing';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/sign-in' element={<SignIn />}></Route>
        <Route path='/sign-up' element={<SingUp />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/listing/:listingId' element={<Listing />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/create-listing' element={<CreateListing />}></Route>
          <Route path='/update-listing/:listingId' element={<UpdateListing />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}