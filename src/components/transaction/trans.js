import React, { useState, useEffect } from "react";
import Home from "../../pages/home/Home";
import Login from "../../pages/Login/login";

import axios from "../../utils/axios";
import requests from "../../utils/requests";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";

// import "./SearchResult.css";

// const base_url = "https://image.tmdb.org/t/p/original";

const Trans = (data1) => {
  const [data, setData] = useState([]);

  const url = `${requests.fecthTrans}?id=${data1.data.data[0]._id}`;

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url);
      console.log(request);
      setData(request.data);
      return request;
    }
    if (data1) {
      fetchData();
    }
  }, [url]);
  console.log(data);
  return (
    <>
      <Navbar type="home" data={data1} />
      <div className="container">
        <h2>You Transaction</h2>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, i) => {
              console.log(value);
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{value.hotel.name}</td>
                  <td>{value.rooms.toString()}</td>
                  <td>
                    {value.dateStart} to {value.dateEnd}
                  </td>
                  <td>$ {value.price}</td>
                  <td> {value.payment}</td>
                  <td> {value.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Trans;
