import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/Login/login";
import { useHistory } from "react-router-dom";

import Register from "./components/Signup/Signup";
import Trans from "./components/transaction/trans";
// import Book from "./components/book/book";
function App() {
  const [user, setuser2] = useState([]);
  console.log(user);
  if (user.length === 0) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setuser2={setuser2} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  } else
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home data={user} />} />
          <Route path="/hotels/:id" element={<Hotel data={user} />} />
          <Route path="/transaction/:id" element={<Trans data={user} />} />
          <Route path="/hotels" element={<List data={user} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
