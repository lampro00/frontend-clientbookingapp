import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import React, { useState, useEffect } from "react";
const Home = (data1) => {
  const url = `${requests.fecthHomepage}`;

  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url);
      console.log(request.data);
      setData(request.data);
      return request;
    }
    fetchData();
  }, [url]);

  return (
    <div>
      <Navbar type="home" data={data1} />
      <Header />
      <div className="homeContainer">
        <Featured datas={data} />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList datas={data} />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties datas={data} />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
