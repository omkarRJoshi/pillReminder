const loginScreen = {

  after_render: function() {
    document.querySelector("#login-form")
      .addEventListener("submit", function(e) {
        e.preventDefault();
        alert('Click...');
      });
  },

  render:function(){
    return `
      <div class= "login">
        <h2>Login</h2>
        <form>
          <label for="Email">Email</label>
          <input type="text" id="email" name="Email" placeholder="Enter Your Email...">

          <label for="pwd">Password</label>
          <input type="password" id="pwd" name="password" placeholder="Enter Your Password...">
              
          <input type="submit" value="Submit">

          <a href="register.html"> Register Here</a>
          <a href="forgot.html" style="float:right;">Forgot Password</a>
        </form>
      </div>
    `;
  }
}

export default loginScreen;