import apiData from '../api/api'
import cookie from "../cookies/cookiesOps"

const medicalHistoryScreen = {
  render: function(){
    return `
    <div class="row">
    
    <div class="col-sm-4">
      <div class="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Relations
      <span class="caret"></span></button>
      <ul class="dropdown-menu" id = "relations">
        
      </ul>
    </div> 
    </div>

    <div class = "col-sm-4">
      <button class="btn btn-primary" type="button">Add more</button>
    </div>

  </div>

  <div class="row" style="margin-top:10px">
    <div id = "historyTable" class="class=col-sm-12 tabl">
      
    </div>

  </div>      
    `;
  },

  showTable : async function(historyArray){
    console.log(historyArray);
    const historyTable = `
    <table class="table table-condensed">
    <thead>
      <tr>
        <th>Illness</th>
        <th>Doctor details</th>
        <th>Medicines</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Dosage Amount</th>
        <th>Dosage freq</th>
        <th>Dosage time</th>
        <th>Email notification</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
      ${historyArray.map(history => 
        `<tr id = "${history.historyId}" class = "historyRow">
          <td><center>${history.illness}</center></td>
          <td><center>${history.doctorDetails}</center></td>
          <td><center>${history.medicines}</center></td>
          <td><center>${history.startDate}</center></td>
          <td><center>${history.endDate}</center></td>
          <td><center>${history.dosageAmt}</center></td>
          <td><center>${history.dosageAmt}</center></td>
          <td><center>${history.dosageTime}</center></td>
          <td><center>${history.emailNotification}</center></td>
          <td><center>&#x274C</center></td>
        </tr>`
      ).join("")}
    </tbody>
  </table>
    `;
    return historyTable;
  },

  historyTable : async function(personId, relation){
    const url = new URL("http://localhost:8081/person/medicalHistory");
    
    console.log(personId, relation);
    const params = {personId:personId};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    // console
    const data = await apiData.getJson(url);
    return this.showTable(data);
  },

  getRelations : async function(){
    const userId = cookie.get("userId");
    const url = new URL("http://localhost:8081/user/relations");
    const params = {userId:userId};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const relations = await apiData.getJson(url);
    // console.log(relations);
    return relations;
  },

  setRelations : async function(){
    const relations = await this.getRelations();
    console.log(relations);
    const dependentRelations = `
    <li><a href="#" id = ${cookie.get("userId")} class="foo">self</a></li>
      ${
        relations.map(relation =>
          `
          <li><a href="#" id = ${relation[0]} class="foo">${relation[1]}</a></li>
          `
          ).join("")
      }
    `;
    return dependentRelations;
  },

  removeHistory : async function(historyId){
    console.log("inside delete");
    const url = new URL("http://localhost:8081/person/medicalHistory/delete");
    const params = {historyId:historyId};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    apiData.delete(url);
    const row = document.getElementById(historyId);
    row.remove();
    console.log("history deleted");
  }
}

export default medicalHistoryScreen;