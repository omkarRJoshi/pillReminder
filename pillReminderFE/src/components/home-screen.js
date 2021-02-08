import apiData from "../api/api";
import profileScreen from "./profile-screen"
import cookie from "../cookies/cookiesOps";

const homeScreen = {

  after_render: function(e) {
    e.preventDefault();
    
  },

  render:function(){
    const homeScreenSkeleton =  `
    <div class="row" , style="margin-left: 50px;">
      <div class="col-sm-2">
        <img src="https://www.seekpng.com/png/full/356-3562377_personal-user.png" width="92px" height="100px">
      </div>
      <div class="col-sm-9" ;>
        <h2>Welcome !</h2>
        <p class="font-weight-light">sometimes we take chances, sometimes we take pills!</p>


      </div>


      <div id="user" class="col-sm-4 homeTables" style="background-color:rgb(235, 235, 247)">
        
      </div>

      <div id = "dependent" class="col-sm-4 homeTables">

      </div>
      <!-- <div class="col-sm-2" style="background-color:lavender;">.col-sm-4</div>-->
    </div>`;
    return homeScreenSkeleton;
    
  },

  userHistory:async function(userId, relation){
    // const userId = cookie.get("userId");
    const url = new URL("http://localhost:8081/person/medicalHistory");
    const params = {personId:userId};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    // console
    const medicalHistoryHome = await apiData.getJson(url);
    const date = new Date();
    const today = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-0" + date.getDate();

    const showDependent = `
    <div class="dropdown col-sm-6" style="height : 50%">
    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">View Dependent
    <span class="caret"></span></button>
      <ul class="dropdown-menu" id = "relations">
    
      </ul>
    </div> 
    `
    const userTable = `
    ${relation != "self" ? showDependent : ''}
    <div class="col-sm-6" style = "margin-bottom:10px">
      <div>Pill schedule : <b>${relation}</b>
      </div>
      <div>Today : <b>${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}</b></div>
    </div>
    <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Medicines</th>
        <th scope="col">Dosage</th>
        <th scope="col">Time</th>
      </tr>
    </thead>
    <tbody>
    ${
      
      medicalHistoryHome.map(history => 
        (history.startDate <= today && history.endDate >= today) ? `
        <tr>
          <td>${history.medicines}</td>
          <td>${history.dosageAmt} tablet</td>
          <td>At ${history.dosageTime}</td>
        </tr>
        ` : ``
      ).join("")
    
    }
    </tbody>
    </table>
    `;
    
    return userTable;
  },

  dependentHistory:async function(personId = "", relation = ""){
    if (personId == "") {
      const currDep = await profileScreen.getFirstDependent();
      if(currDep.length == 0){
        personId = "";
        relation = "relation-not-set"; 
      }
      else{
        personId = currDep[0][0];
        relation = currDep[0][1];
      }
    }
    return homeScreen.userHistory(personId, relation);
  }
}

export default homeScreen;