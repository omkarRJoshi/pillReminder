import apiData from '../api/api'
import cookie from "../cookies/cookiesOps"

const profileScreen = {
  render: function () {
    return `
    <div class="row">
     <!--   <div class="col-sm-2" style="height:5000px,background-color:rgb(231, 240, 231)";>blank</div>-->
       <div class="col-sm-6 image" style="background-color:rgb(250, 250, 248)"  id="im"> 
        <img src="img/user.png" width="100px" height="92px">  
    </div>
       <div class="col-sm-6"; id="pro">
        <h2>Profile</h2>
        <p class="font-weight-light">Do you remember to take your meds today ?</p>

       
    </div>
     
       
         <div class="col-sm-6" style="background-color:rgb(235, 235, 247);" id="usertable">
        
        </div>
         <div class="col-sm-6"; id="deptable">
        

              <div class="dropdown">
              <div class="AddView row">
              <div class="dropdown col-sm-6">
                <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">View Dependent
                <span class="caret"></span></button>
                <ul class="dropdown-menu">
                  <li><a href="#">Mother</a></li>
                  <li><a href="#">Father</a></li>
                  <li><a href="#">Children</a></li>
                  <li><a href="#">Spouse</a></li>
                </ul>
              </div> 

              <div class="dropdown col-sm-6">
                <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Add Dependent
                <span class="caret"></span></button>
                <ul class="dropdown-menu">
                  <li><a href="#">Mother</a></li>
                  <li><a href="#">Father</a></li>
                  <li><a href="#">Children</a></li>
                  <li><a href="#">Spouse</a></li>
                </ul>
              </div> 
                </div> 

            <div id = "dependentTable">
            
            </div>
        </div>
        
       </div>
    `;
  },

  userDetails : async function(id, relation){
    const url = new URL("http://localhost:8081/person");
    console.log(id, relation);
    const params = {personId:id};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    // console
    const data = await apiData.getJson(url);
    console.log(data);

    const values = `
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col"></th><th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
        ${
          relation != "self" ? `<tr> <th>Relation</th>      <td>${relation}</td> </tr>` : ``
        }
          <tr> <th>Name</th>      <td>${data.name}</td> </tr>
          <tr> <th>Email Id</th>  <td>${data.email}</td> </tr>
          <tr> <th>Contact</th>   <td>${data.contact}</td> </tr>
          <tr> <th>Blood Group</th> <td>${data.bloodGroup}</td> </tr>
          <tr> <th>Date of birth</th> <td>${data.dob}</td> </tr>
          <tr> <th>Weight</th>    <td>${data.weight}</td> </tr>
          <tr> <th>Height</th>    <td>${data.height}</td> </tr>
        </tbody>
      </table>
    `;
    return values;
  },

  dependentDetails : async function (relation = ""){
    console.log("inside dependent detals");
    const userId = cookie.get("userId");
    const url = new URL("http://localhost:8081/user/relations");
    const params = {userId:userId};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    // console
    const medicalHistory = await apiData.getJson(url);
    if(relation == ""){
      const personId = medicalHistory[0][0];
      const relation = medicalHistory[0][1];
      return profileScreen.userDetails(personId, relation);
    }else{

    }
  }
};

export default profileScreen;
