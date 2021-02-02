import api from "../api/api";
import middleScreen from "../index";
import homeScreen from "./home-screen";

const loginScreen = {
  after_render: function (e) {
    alert("inside after render");
    e.preventDefault();
    const loginData = [
      document.getElementById("email").value,
      document.getElementById("pwd").value,
    ];
    const data = api
      .postJson("http://localhost:8081/login", loginData)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        if (data == "") {
          alert("invalid email or password");
        } else {
          console.log(data);
          middleScreen.innerHTML = homeScreen.render();
        }
      });
  },

  render: function () {
    console.log("inside render login screen");
    return `
      <h3>Login</h3><br>
      <form>
        <div class="form-group">
          <label for="email">Email address:</label>
          <input type="email" class="form-control" id="email">
        </div>
      <div class="form-group">
          <label for="pwd">Password:</label>
          <input type="password" class="form-control" id="pwd">
        </div>
        
        <button  id="postData" type="submit" class="btn btn-primary">Submitdata</button>
      </form>  
      <a href="forgot.html"> Forgot Password</a>
    `;
  },
};

export default loginScreen;
