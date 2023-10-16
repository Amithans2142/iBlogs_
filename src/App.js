import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { Routes, Route } from "react-router-dom";
import PostState from './context/posts/PostState';
import Navbar from './components/Navbar';
import Account from './components/Account';
import Pagination from './components/Pagination';

function App() {
  return (
  
      <PostState>
        <Navbar />

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path='/home' element={<Home/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
        
      </PostState>
 
  );
}
export default App;

