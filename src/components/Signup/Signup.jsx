import "./signup.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import requests from "../../utils/requests";
const Register = () => {
  const [UserName, setUser] = useState([]);
  const [Password, setpassword] = useState([]);
  const [FullName, setfullName] = useState([]);
  const [Email, setEmail] = useState([]);
  const [Std, setStd] = useState([]);
  const [data, setdata] = useState([]);
  const navigator = useNavigate();
  const handSubmit = async () => {
    async function fetch() {
      const req = await axios({
        method: "post",
        url: `http://localhost:5000${requests.fecthSignup}`,
        data: {
          username: UserName,
          fullName: FullName,
          email: Email,
          std: Std,
          password: Password,
        },
      });
      if (req.data.message === "notok")
        alert("User đã bị trùng vui lòng chọn lại");
      else {
        alert("tạo user thành công");
        navigator("/");
      }
    }
    fetch();
  };
  (function () {
    window.addEventListener(
      "load",
      function () {
        // Get the forms we want to add validation styles to
        var forms = document.getElementsByClassName("needs-validation");
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener(
            "submit",
            function (event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
          );
        });
      },
      false
    );
  })();
  return (
    <div>
      <div className="navbar">
        <div className="navContainer">
          <span className="logo">Booking </span>
          <div className="navItems">
            <button className="navButton">Login</button>
          </div>
        </div>
      </div>
      <div className="needs-validation" novalidate>
        <div className="inner-form">
          <h1>Đăng kí</h1> <br></br>
          <div className="form-group">
            <label for="price">UserName </label>
            <br />
            <input
              className="input"
              type="text"
              placeholder="UserName"
              onChange={(e) => setUser(e.target.value)}
              value={UserName}
              required
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <div className="form-group">
            <label for="price">Password</label> <br />
            <input
              className="input"
              placeholder="password"
              onChange={(e) => setpassword(e.target.value)}
              value={Password}
              required
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <div className="form-group">
            <label for="price">Email</label> <br />
            <input
              className="input"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              required
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <div className="form-group">
            <label for="price">Std</label> <br />
            <input
              className="input"
              placeholder="SĐT"
              type="number"
              onChange={(e) => setStd(e.target.value)}
              value={Std}
              required
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <div className="form-group">
            <label for="price">FullName</label> <br />
            <input
              className="input"
              placeholder="fullName"
              onChange={(e) => setfullName(e.target.value)}
              value={FullName}
              required
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <button
            // type="submit"
            className="btn btn-primary"
            onClick={() => {
              handSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
