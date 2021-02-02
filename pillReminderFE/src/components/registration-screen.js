import api from '../api/api';

const registrationScreen = {

  after_render: function() {
    const registrationData = {
      "name" : document.getElementById('firstName').value + " " + document.getElementById('lastName').value, 
      "email" : document.getElementById('email').value,
      "contact" : document.getElementById('contact').value,
       "dob" : document.getElementById('dob').value,
      "password" : document.getElementById('pwd').value,
    };
    api.postJson("http://localhost:8081/registerUser", registrationData);
    alert(JSON.stringify(registrationData));
  },

  render:function(){
    console.log("inside render reistration screen");
    return `
    <div class= "register">
      <h2>Registeration</h2>
      <form>
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" name="firstName" placeholder="Enter Your First Name...">

      <label for="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" placeholder="Enter Your Last Name...">

          <label for="Email">Email</label>
          <input type="text" id="email" name="Email" placeholder="Enter Your Email...">
          
          <label for="contact">Contact No.</label>
          <input type="text" id="contact" name="contact" placeholder="Enter Your Contact No...">
          
          <label for="dob">Date of Birth</label><br>
          <input type="date" id="dob" name="dob">

          <label for="pwd">Password</label>
          <input type="password" id="pwd" name="password" placeholder="Enter Your Password...">

          <label for="cpwd">Confirm   Password</label>
          <input type="password" id="cpwd" name="cpassword" placeholder="Confirm Password...">
              
          <input id="postData" type="submit" value="Submit">

          <a href="index.html"> Login Here</a>
          
      </form>
  </div>
    `;
  }
}

export default registrationScreen;