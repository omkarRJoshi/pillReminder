import api from "../api/api";
import render from "../rendering/render"
import cookie from "../cookies/cookiesOps"


const loginScreen = {
  after_render: function (e) {
    e.preventDefault();
    // var e = 
    const email = document.getElementById("email").value;
    const password = document.getElementById("pwd").value;
    const loginData = [email, password];
    const data = api
      .postJson("http://localhost:8081/login", loginData)
      .then((response) => response.text())
      .then((data) => {
        if (data == "") {
          alert("invalid email or password");
        } else {
          console.log(data);
         
          cookie.set("userId", data, 20);
          cookie.set("userEmail", email, 20);
          cookie.set("userPassword", password);
          
          render.setHeader();
          render.home.entireScreen();
          
        }
      });
  },

  render: function () {
    console.log("abcd");
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
        
        <button id="login-user" type="Login" class="btn btn-primary">Login</button>
        <button id="register-user" type="Register" class="btn btn-primary">Register</button>
        
      </form>  
      <a id="forgotPass">forgot password</a>
    `;
  },
};

export default loginScreen;
