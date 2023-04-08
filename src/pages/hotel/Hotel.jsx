import "./hotel.css";
import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// import { da } from "date-fns/locale";
// import RoomCard from "../../components/book/RoomCard";
const Hotel = (data1) => {
  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();
  const [fullname, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [IDCard, setIDCard] = useState();
  const [payment, setPayment] = useState();
  const [rooms, setRooms] = useState([]);
  const [rooms2, setRooms2] = useState([]);

  const [bill, setBill] = useState(0);
  const [data, setData] = useState([]);
  const [room, setRoom] = useState([]);
  const params = useParams();
  const id = params.id;
  const url = `${requests.fecthHotels}?id=${id}`;
  console.log(data1.data.data[0]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url);
      // console.log(request.data.rooms);
      setData(request.data.data);
      console.log(request.data.data);

      setRoom(request.data.rooms);
      return request;
    }

    fetchData();
  }, [url]);

  const [openDate, setOpenDate] = useState(true);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  console.log(data, room);
  // const [openOptions, setOpenOptions] = useState(false);
  // const [options, setOptions] = useState({
  //   adult: 1,
  //   children: 0,
  //   room: 1,
  // });
  let number = "";
  let numberroom = [];
  let numberroom2 = [];
  let bill2 = 0;

  const hadlecheckroom = (e, price) => {
    number = e.target.value;
    const id = e.target.name;
    const a = e.target.checked;
    numberroom = rooms;
    numberroom2 = rooms2;
    a
      ? numberroom.push(number)
      : numberroom.splice(numberroom.indexOf(number), 1);
    setRooms(numberroom);
    a
      ? numberroom2.push(price)
      : numberroom2.splice(numberroom2.indexOf(number), 1);
    setRooms2(numberroom2);
    setbill();
  };
  const setbill = () => {
    rooms2.length !== 0
      ? rooms2.forEach((a) => {
          bill2 +=
            a *
            parseInt(
              date[0].endDate.getDate() - date[0].startDate.getDate() + 1
            );
          setBill(bill2);
        })
      : setBill(0);
  };

  const navigate = useNavigate();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const photos = data.photos;
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  const paymenthedle = (e) => {
    setPayment(e.target.value);
  };

  const submitHandler = (e) => {
    if (!rooms) {
      alert("không có phòng nào dc chọn");
      e.preventdefaul();
    }
    console.log(rooms);
    axios({
      method: "post",
      url: `http://localhost:5000${requests.fecthBook}`,
      data: {
        user: {
          _id: data1.data.data[0]._id,
          name: data1.data.data[0].username,
        },
        hotel: {
          _id: data._id,
          name: data.name,
        },
        rooms: rooms,
        dateStart: date[0].startDate,
        dateEnd: date[0].endDate,
        price: bill,
        payment: payment,
        status: "Booked",
        datebook: new Date(),
      },
    });
    // fetchData2({ book });
  };
  const checkroomdate = async (a, b) => {
    const request = await axios.post(
      `http://localhost:5000/chekcroomdate?id=${data._id}`,
      { data: { a, b } }
    );

    console.log(request.data.rooms);
    setRoom(request.data.rooms);
    return request;
  };
  console.log(rooms);

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      <Navbar type="home" data={data1} />
      {/* <Header type="home" /> */}
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.title}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight"></span>
          <div className="hotelImages">
            {photos &&
              photos.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">{data.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>{data.cheapestPrice * 9}</b> (9 nights)
              </h2>

              <button data-toggle="collapse" data-target="#demo">
                Reserve or Book Now!
              </button>
            </div>
          </div>
          <div id="demo" className="collapse container-fluid">
            <div className="book_info row">
              <div className="col-xl-4" onChange={() => setbill()}>
                <h2>Date</h2>
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => {
                      setDate([item.selection]);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <button
                onClick={() => {
                  checkroomdate(
                    new Date(date[0].startDate),
                    new Date(date[0].endDate)
                  );
                }}
              >
                hiện room
              </button>
              <div className="info_book col-xl-8 ">
                <h2>Reseve Info</h2>
                <p>Your Full Name</p>
                <input
                  type="text"
                  placeholder={data1.data.data[0].fullname}
                  onChange={(e) => {
                    if (e.target.value.trim().length > 0)
                      setFullName(e.target.value);
                  }}
                  value={data1.data.data[0].fullName}
                />

                <p>Your Email</p>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => {
                    if (e.target.value.trim().length > 0)
                      setEmail(e.target.value);
                  }}
                  value={data1.data.data[0].email}
                />
                <p>Your Phone Number</p>
                <input
                  type="text"
                  placeholder="Phone Number"
                  onChange={(e) => {
                    if (e.target.value.trim().length > 0)
                      setPhone(e.target.value);
                  }}
                  value={data1.data.data[0].phoneNumber}
                />
                <p>Your Identity Card Number</p>
                <input
                  type="text"
                  placeholder="Identity Card Number"
                  onChange={(e) => {
                    if (e.target.value.trim().length > 0)
                      setIDCard(e.target.value);
                  }}
                />
              </div>
            </div>
            <h2>Select Rooms</h2>
            <div className="allroomcard ">
              {room &&
                room.map((d) => (
                  <div className="roomCard_container" key={d._id}>
                    <div className="roomCard_detail">
                      <h3>{d.title}</h3>
                      <p>{d.desc}</p>
                      <p>
                        Max People: <strong>{d.maxPeople}</strong>
                      </p>
                      <b>
                        <p>${d.price}</p>
                      </b>
                    </div>
                    <div className="roomCart_checkbox">
                      {d.roomNumbers.map((r) => (
                        <label className="form-check-label" for="check1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="check1"
                            name={d._id}
                            value={r}
                            onChange={(e) => {
                              hadlecheckroom(e, d.price);
                              // setBill(bill2);
                            }}
                          />
                          {r}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
            <div className="book_method">
              <div>
                <h2>
                  Total Bill: $<span className="bill_sp">{bill}</span>
                </h2>
                <label for="sel1">Select Payment Method</label>
                <select
                  className="form-control"
                  id="sel1"
                  name="sellist1"
                  onChange={(e) => {
                    setPayment(e.target.value);
                  }}
                >
                  <option value="">Chosse payment</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div>
                {rooms ? (
                  <Link to={`/transaction/${data1.data.data[0]._id}`}>
                    <button
                      onClick={() => {
                        submitHandler();
                      }}
                      type="submit"
                      name="Reseve Now"
                    >
                      submit
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      submitHandler();
                    }}
                    type="submit"
                    name="Reseve Now"
                  >
                    submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
