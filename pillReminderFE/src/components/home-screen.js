import apiData from "../api/api";
import middleScreen from "../index";
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
    const userTable = `
    <div>Pill schedule : <b>${relation}</b></div>
    <div>Today : <b>${date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()}</b></div>
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
        `
        <tr>
          <td>${history.medicines}</td>
          <td>${history.dosageAmt} tablet</td>
          <td>At ${history.dosageTime}</td>
        </tr>
        `
      ).join("")
    }
    </tbody>
    </table>
    `;
    
    return userTable;
  },

  dependentHistory:async function(){
    const userId = cookie.get("userId");
    const url = new URL("http://localhost:8081/user/relations");
    const params = {userId:userId};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    // console
    const medicalHistory = await apiData.getJson(url);
    if(medicalHistory.length == 0)
      return homeScreen.userHistory("abc", "relation-not-set");
    const personId = medicalHistory[0][0];
    const relation = medicalHistory[0][1];
    return homeScreen.userHistory(personId, relation);
  }
}

export default homeScreen;