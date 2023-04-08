import React, { useState, useEffect } from "react";
import Home from "../../pages/home/Home";
import Login from "../../pages/Login/login";

import axios from "../../utils/axios";
import requests from "../../utils/requests";
import Navbar from "../navbar/Navbar";

// import "./SearchResult.css";

// const base_url = "https://image.tmdb.org/t/p/original";

const Loginresult = ({ user, Pass }) => {
  const [data, setData] = useState([]);

  const url = `${requests.fecthlogin}?userName=${user}&password=${Pass}`;

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url);
      console.log(request);
      setData(request.data);
      return request;
    }
    if (user) {
      fetchData();
    }
  }, [url, user]);
  data && <Navbar email={data.email} />;
  data && <Login data={data} />;
  return <></>;
};

export default Loginresult;
