import api from '../api/api';
import render from "../rendering/render"
import cookie from '../cookies/cookiesOps'

const registrationScreen = {

  after_render: function(e) {
    e.preventDefault();
    const registrationData = {
      "name" : document.getElementById('fname').value + " " + document.getElementById('lname').value, 
      "email" : document.getElementById('email').value,
      "contact" : document.getElementById('contact').value,
      "country" : document.getElementById('Country').value,
      "dob" : document.getElementById('birthday').value,
      "password" : document.getElementById('pwd').value,
    };
    console.log(registrationData);
    api.postJson("http://localhost:8081/registerUser", registrationData)
       .then((response) => response.text()).then((data) => {
        if (data == "") {
          alert("Something went wrong please try again");
        } else {
          console.log(data);
          cookie.set("userId", data, 20);
          cookie.set("userEmail", registrationData.email, 20);
          cookie.set("userPassword", registrationData.password, 20);
          render.setHeader();
          render.home();
        }
      });
    
  },

  render:function(){
    console.log("inside render reistration screen");
    return `
      <h3>Registration</h3><br>
      <form action="/action_page.php">
        <div class="form-group">
          <label for="firstname">First Name:</label>
          <input type="Text" class="form-control" id="fname">
        </div>
        <div class="form-group">
          <label for="lastname">Last Name:</label>
          <input type="Text" class="form-control" id="lname">
        </div>
        <div class="form-group">
          <label for="email">Email address:</label>
          <input type="email" class="form-control" id="email">
        </div>
        <div class="form-group">
          <label for="Contact">Contact:</label>
          <input type="text" class="form-control" id="contact">
        </div>
        <div class="from-group">
          <label for="dob">Date of Birth:</label><br>
          <input type="date" id="birthday" name="birthday">
        </div>
        <div class="form-group">
          <label for="Country">Country:</label>
          <input type="Text" class="form-control" id="Country">
        </div>
        <div class="form-group">
          <label for="pwd">Password:</label>
          <input type="password" class="form-control" id="pwd">
        </div>
        <div class="form-group">
          <label for="cpwd">Confirm Password:</label>
          <input type="password" class="form-control" id="cpwd">
        </div><br>
        <br>
        <button id = "postData" type="submit" class="btn btn-primary">Submit</button>
      </form>
    `;
  }
}

export default registrationScreen;