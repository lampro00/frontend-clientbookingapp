/* eslint-disable no-unused-expressions */
import "./featured.css";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import React, { useState, useEffect } from "react";
const Featured = (datas) => {
  let hanoi = 0;
  let hcm = 0;
  let dn = 0;
  let photoshn;
  let photoshcm;
  let photosdn;

  datas.datas.forEach((data, index) => {
    if (data.city === "Ha Noi") {
      (hanoi += 1), (photoshn = data.photos[0]);
    }
    if (data.city === "Ho Chi Minh") {
      hcm += 1;
      photoshcm = data.photos[3];
    }
    if (data.city === "Da Nang") {
      dn += 1;
      photosdn = data.photos[0];
    }
  });
  return (
    <div className="featured">
      <div className="featuredItem">
        <img src={photoshn} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Hà Nội</h1>
          <h2>{hanoi} Properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img src={photoshcm} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Hồ Chí Minh</h1>
          <h2>{hcm} Properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Dà Nẵng</h1>
          <h2>{dn} Properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
