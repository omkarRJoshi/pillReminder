import apiData from "../api/api";
import middleScreen from "../index";
import cookie from "../cookies/cookiesOps";

const homeScreen = {

  after_render: function(e) {
    e.preventDefault();
    
  },

  render:function(){
    console.log("inside render user-profile screen");
    const homeScreenSkeleton =  `
    <div class="row" , style="margin-left: 50px;">
      <div class="col-sm-2" style="background-color:rgb(250, 250, 248)">
        <img src="F:/workspace/dassaultPillReminder/pillReminderFE/images/user.png" width="92px" height="100px">
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
    console.log("done with home skeleton");
    return homeScreenSkeleton;
    
  },

  userHistory:async function(userId, relation){
    console.log("inside user history");
    // const userId = cookie.get("userId");
    const url = new URL("http://localhost:8081/person/medicalHistory");
    const params = {personId:userId};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    // console
    const medicalHistory = await apiData.getJson(url);
    const userTable = `
    <div>Pill schedule : ${relation}</div>
    <div>Todays date</div>
    <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Medicines</th>
        <th scope="col">Dosage</th>
        <th scope="col">Time</th>
      </tr>
    </thead>
    <tbody>
    ${
      medicalHistory.map(history =>
        `
        <tr>
          <td>#</th>
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
    const userTable1 = `
    <div class = "userTb" style = "padding:10px; border:1px solid black">
      <div>Pill schedule : ${relation}</div>
      <div>Todays date</div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Medicines</th>
            <th scope="col">Dosage</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        
        <tbody>
          ${
            medicalHistory.map(history =>
              `
              <tr>
                <th scope="col">#</th>
                <th scope="col">${history.medicines}</th>
                <th scope="col">${history.dosageAmt} tablet</th>
                <th scope="col">At ${history.dosageTime}</th>
              </tr>
              `
            ).join("")
          }
        </tbody>
      </table>
    </div>
    `;
    
        return userTable;
  },

  dependentHistory:async function(){
    console.log("inside dependent history");
    const userId = cookie.get("userId");
    const url = new URL("http://localhost:8081/user/relations");
    const params = {userId:userId};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    // console
    const medicalHistory = await apiData.getJson(url);
    console.log(medicalHistory[0][0]);
    const personId = medicalHistory[0][0];
    const relation = medicalHistory[0][1];
    return homeScreen.userHistory(personId, relation);
  }
}

export default homeScreen;