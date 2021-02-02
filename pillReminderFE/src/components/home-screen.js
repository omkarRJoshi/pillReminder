const homeScreen = {

  after_render: function(e) {
    e.preventDefault();
    
  },

  render:function(){
    console.log("inside render user-profile screen");
    return `
      <div class = "row">
        <div class= "col-lg-2" >          
          <img src="img/user.png" width="200px" height="200px">  
        </div>

        <div class="col-lg-10">
          <h1>Welcome !</h1>
        </div>
      </div>
    
    `;
  }
}

export default homeScreen;