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
    <h3>Forgot Password</h3><br>
    <form>
        <div class="form-group">
          <label for="email">Email address:</label>
          <input type="email" class="form-control" id="email">
        </div>
       <div class="form-group">
          <label for="pwd">Password:</label>
          <input type="password" class="form-control" id="pwd">
        </div>
        <div class="form-group">
          <label for="cpwd">Confirm Password:</label>
          <input type="password" class="form-control" id="cpwd">
        </div><br>
        <button id = "postData" type="submit" class="btn btn-primary">Submit</button>
        <button id="login" type="submit" class="btn btn-primary">Login-here</button>
      </form>
    `;
  }
}

export default forgotScreen;