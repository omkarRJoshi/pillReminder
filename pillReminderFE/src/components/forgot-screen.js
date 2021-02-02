console.log("inside forgot screen");

const forgotScreen = {

  after_render: function() {
    document.querySelector("#login-form")
      .addEventListener("submit", function(e) {
        e.preventDefault();
        alert('Click...');
      });
  },

  render:function(){
    console.log("inside render forgot screen");
    return `
        <div class= "login">
            <h2>Forgot Password</h2>
        <form>
            <label for="Email">Email</label>
            <input type="text" id="email" name="Email" placeholder="Enter Your Email...">
        
            <label for="pwd">Password</label>
            <input type="password" id="pwd" name="password" placeholder="Enter Your Password...">

            <label for="cpwd">Confirm   Password</label>
            <input type="password" id="cpwd" name="cpassword" placeholder="Confirm Password...">
                 
            <input type="submit" value="Submit" class="postData">

            <a href="register.html"> Register Here</a>

            <a href="index.html" style="float:right;"> Login Here</a>
        </form>
          </div>
    `;
  }
}

export default forgotScreen;