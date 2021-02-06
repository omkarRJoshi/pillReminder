import apiData from '../api/api'
import cookie from "../cookies/cookiesOps"
import render from '../rendering/render';

const profileScreen = {
  render: function () {
    const profile = `
    <div class = "row prof-screen">
      <div class = "col-lg-6">
        <div class = "image up row" id = "im">
          <center>
            <img src="https://www.seekpng.com/png/full/356-3562377_personal-user.png" width="100px" height="92px" clas = "col-sm-6">
            </center>
        </div>
       
        <center>
          <div id="usertable">
          
          </div>
        </center>
      </div>
      <div class = "col-lg-6">
        <div class = "row up">
          <div class="dropdown col-sm-6">
            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">View Dependent
            <span class="caret"></span></button>
            <ul class="dropdown-menu" id = "relations">
          
            </ul>
          </div> 
          <div class="dropdown col-sm-6">
                <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Add Dependent
                <span class="caret"></span></button>
                <ul class="dropdown-menu">
                  <li><a href="#" class = "depAdd">Mother</a></li>
                  <li><a href="#" class = "depAdd">Father</a></li>
                  <li><a href="#" class = "depAdd">Children</a></li>
                  <li><a href="#" class = "depAdd">Spouse</a></li>
                  <li><a href="#" class = "depAdd">Mother-in-law</a></li>
                  <li><a href="#" class = "depAdd">Fater--in-law</a></li>
                  <li><a href="#" class = "depAdd">a</a></li>
                  <li><a href="#" class = "depAdd">b</a></li>
                  <li><a href="#" class = "depAdd">c</a></li>
                </ul>
              </div> 

        </div>

        <div id = "dependentTable">
            
        </div>
      </div>
    </div>
    `;
    const profile1 = `
    <div class="row">
     <!--   <div class="col-sm-2" style="height:5000px,background-color:rgb(231, 240, 231)";>blank</div>-->
       <div class="col-sm-6 image"   id="im"> 
        <img src="https://www.seekpng.com/png/full/356-3562377_personal-user.png" width="100px" height="92px">  
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
                <ul class="dropdown-menu" id = "relations">
                  
                </ul>
              </div> 

              <div class="dropdown col-sm-6">
                <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Add Dependent
                <span class="caret"></span></button>
                <ul class="dropdown-menu">
                  <li><a href="#" class = "depAdd">Mother</a></li>
                  <li><a href="#" class = "depAdd">Father</a></li>
                  <li><a href="#" class = "depAdd">Children</a></li>
                  <li><a href="#" class = "depAdd">Spouse</a></li>
                  <li><a href="#" class = "depAdd">Mother-in-law</a></li>
                  <li><a href="#" class = "depAdd">Fater--in-law</a></li>
                  <li><a href="#" class = "depAdd">a</a></li>
                  <li><a href="#" class = "depAdd">b</a></li>
                  <li><a href="#" class = "depAdd">c</a></li>
                </ul>
              </div> 
                </div> 

            <div id = "dependentTable">
            
            </div>
        </div>
        
       </div>
    `;
    return profile;
  },

  userDetails : async function(id, relation, tableId = "editUserProfile"){
    console.log(tableId);
    const url = new URL("http://localhost:8081/person");
    // console.log(id, relation);
    const params = {personId:id};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    // console
    const data = await apiData.getJson(url);

    const values = `
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col" class = "depRel">Relation : ${relation}
            </th><th scope="col">
              <button class = "profileEdit">Edit</button>
              <button class = "profileUpdate">Update</button>
              <button class = "profileCancel">Cancel</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr> <th>Name</th>      <td class = "colTb">${data.name}</td> </tr>
          <tr> <th>Email Id</th>  <td class = "colTb">${data.email}</td> </tr>
          <tr> <th>Contact</th>   <td class = "colTb">${data.contact}</td> </tr>
          <tr> <th>Blood Group</th> <td class = "colTb">${data.bloodGroup}</td> </tr>
          <tr> <th>Date of birth</th> <td class = "colTb">${data.dob}</td> </tr>
          <tr> <th>Weight</th>    <td class = "colTb">${data.weight}</td> </tr>
          <tr> <th>Height</th>    <td class = "colTb">${data.height}</td> </tr>
        </tbody>
      </table>
    `;
    return values;
  },

  getFirstDependent : async function (){
    
    const userId = cookie.get("userId");
    const url = new URL("http://localhost:8081/user/relations");
    const params = {userId:userId};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    // console
    const medicalHistory = await apiData.getJson(url);
    return medicalHistory;
  },

  editTable : function(personId, relation, i){
    if(relation == "relation-not-set"){
      alert("You need to add relation first to edit");
      return;
    }
    const updateProfile = document.getElementsByClassName("profileUpdate")[i];
    const cancel = document.getElementsByClassName("profileCancel")[i];
    updateProfile.style.visibility = "visible";
    cancel.style.visibility = "visible";
    const colStart = i * 7;
    const cols = document.getElementsByClassName("colTb");
    const preVal = new Array();
    for(let i = 0; i < cols.length; i++){
      preVal[i] = cols[i].innerHTML;
    }

    cols[colStart + 0].innerHTML = `<input type = "text" id="name" value = "${preVal[colStart + 0]}">`;
    cols[colStart + 1].innerHTML = `<input type = "text" id = "email" value = "${preVal[colStart + 1]}">`;
    cols[colStart + 2].innerHTML = `<input type = "text" id = "contact" value = "${preVal[colStart + 2]}">`;
    cols[colStart + 3].innerHTML = `<input type = "text" id = "blood" value = "${preVal[colStart + 3]}">`;
    cols[colStart + 4].innerHTML = `<input type = "date" id = "dob" value = "${preVal[colStart + 4]}">`;
    cols[colStart + 5].innerHTML = `<input type = "number" id = "wt" value = "${preVal[colStart + 5]}">`;
    cols[colStart + 6].innerHTML = `<input type = "number" id = "ht" value = "${preVal[colStart + 6]}">`;

    updateProfile.addEventListener('click', updateInDb);
    cancel.addEventListener('click', function(){
      i == 0 ? render.profile.populateUserTable() : render.profile.populateDependentTable(personId, relation);
    });
    function updateInDb(){
      const updatedData = {
        "name" : document.getElementById('name').value, 
        "email" : document.getElementById('email').value,
        "contact" : document.getElementById('contact').value,
        "bloodGroup" : document.getElementById('blood').value,
        "dob" : document.getElementById('dob').value,
        "weight" : document.getElementById('wt').value,
        "height" : document.getElementById('ht').value
      };
      const url = new URL("http://localhost:8081/user/update");
      const params = {personId:personId};
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      
      apiData.putJson(url, updatedData)
      .then((response) => response.text())
      .then((data) => {
        if(data){
          alert("Profile of " + relation + " changed");
        }else{
          alert("something went wrong");
        }
        i == 0 ? render.profile.populateUserTable() : render.profile.populateDependentTable(personId, relation);
      });
    }
  },

  addDependet : function(rel){
    console.log("inside add");
    const add = document.getElementsByClassName("profileUpdate")[1];
    const cancel = document.getElementsByClassName("profileCancel")[1];
    add.style.visibility = "visible";
    cancel.style.visibility = "visible";
    add.innerHTML = "Add";
    const reln = document.getElementsByClassName("depRel")[1];
    reln.innerHTML = `Relation : ${rel}`;
    const cols = document.getElementsByClassName("colTb");
    
    cols[7].innerHTML = `<input type = "text" id="name">`;
    cols[8].innerHTML = `<input type = "text" id = "email">`;
    cols[9].innerHTML = `<input type = "text" id = "contact">`;
    cols[10].innerHTML = `<input type = "text" id = "blood">`;
    cols[11].innerHTML = `<input type = "date" id = "dob">`;
    cols[12].innerHTML = `<input type = "number" id = "wt">`;
    cols[13].innerHTML = `<input type = "number" id = "ht">`;

    add.addEventListener('click', addInDb);
    cancel.addEventListener('click', function(){
      render.profile.populateDependentTable();
    });
    function addInDb(){
      const data = {
        "relation" : rel,
        "name" : document.getElementById('name').value, 
        "email" : document.getElementById('email').value,
        "contact" : document.getElementById('contact').value,
        "bloodGroup" : document.getElementById('blood').value,
        "dob" : document.getElementById('dob').value,
        "weight" : document.getElementById('wt').value,
        "height" : document.getElementById('ht').value
      };
      console.log(data);
      const url = new URL("http://localhost:8081/user/addDependent");
      const params = {userId:cookie.get("userId")};
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      
      apiData.postJson(url, data)
      .then((response) => response.text())
      .then((data) => {
        if(data){
          alert(data);
          render.profile.setRelations();
          render.profile.populateDependentTable(data, rel);
        }else{
          alert("something went wrong");
        }
      });
    }
  }
 
};

export default profileScreen;
