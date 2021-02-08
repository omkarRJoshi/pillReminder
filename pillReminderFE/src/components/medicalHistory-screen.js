import apiData from '../api/api'
import cookie from "../cookies/cookiesOps"
import render from "../rendering/render"
const medicalHistoryScreen = {
  render: function(){
    return `
    <div class="row">
    
    <div class="col-sm-4">
      <div class="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" id = "popRel">Relations
      <span class="caret"></span></button>
      <ul class="dropdown-menu" id = "relations">
        
      </ul>
    </div> 
    </div>
    
    <div class = "col-sm-4">
      <button id="addHistory" class="btn btn-primary" type="button">Add Medical History</button>
    </div>

  </div>

  <div class="row" style="margin-top:10px">
    <div id = "historyTable" class="class=col-sm-12 tabl" style : >
      
    </div>

  </div>      
    `;
  },

  showTable : async function(historyArray){
    console.log(historyArray);
    const historyTable = `
    <table class="table table-condensed" id="medicalHistoryTable">
    <thead>
      <tr>
        <th><center>Illness</center></th>
        <th><center>Doctor details</center></th>
        <th><center>Medicines</center></th>
        <th><center>Start Date</center></th>
        <th><center>End Date</center></th>
        <th><center>Dosage Amount</center></th>
        <th><center>Dosage freq</center></th>
        <th><center>Dosage time</center></th>
        <th><center>Email notification</center></th>
        <th><center>Remove</center></th>
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
          <td><center>${history.dosageFreq}</center></td>
          <td><center>${history.dosageTime}</center></td>
          <td><center><input type = "checkbox" ${history.emailNotification == `1` ? `checked` : `unchecked`} readonly/></center></td>
          <td><center class = "del">&#x274C</center></td>
        </tr>`
      ).join("")}
    </tbody>
  </table>
    `;
    return historyTable;
  },

  historyTable : async function(personId, relation){
    const url = new URL("http://localhost:8081/person/medicalHistory");
    
    // console.log(personId, relation);
    const params = {personId:personId};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    // console
    const data = await apiData.getJson(url);
    return this.showTable(data);
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
  },

  addNewHistory : function(personId, relation){
    // console.log("***" + personId + "***" + relation);
    const table = document.getElementById("medicalHistoryTable");
    var row = table.insertRow(1);
    row.innerHTML = `
      <td><center><input type="text" id="illness" name="fname"></center></td>
      <td><center><input type="text" id="doctorDetails" name="fname"></center></td>
      <td><center><input type="text" id="medicines" name="fname"></center></td>
      <td><center><input type="date" id="startDate" name="fname"></center></td>
      <td><center><input type="date" id="endDate" name="fname"></center></td>
      <td><center><input type="number" id="dosageAmt" name="fname" min="0.5"></center></td>
      <td><center><input type="number" id="dosageFreq" name="fname" min="1"></center></td>
      <td><center><input type="time" id="dosageTime" name="fname"></center></td>
      <td><center><input type="checkbox" id="emailNotification" name="fname"></center></td>
      <td><center><button id = "addHis">Add</button> </center></td>
      <td><center><span id="del" class = "del">&#x274C</span></center></td>
    `;
    
    del.addEventListener('click', function(){
      document.getElementById("addHistory").disabled = false;
      row.remove();
    })
    const addHistory = document.getElementById("addHis");
    addHistory.addEventListener('click', addAfterClick)
     function addAfterClick(){
      console.log("insdei after click");
      const history = {
        "illness" : document.getElementById("illness").value,
        "doctorDetails" : document.getElementById("doctorDetails").value,
        "medicines" : document.getElementById("medicines").value,
        "startDate" : document.getElementById("startDate").value,
        "endDate" : document.getElementById("endDate").value,
        "dosageAmt" : document.getElementById("dosageAmt").value,
        "dosageFreq" : document.getElementById("dosageFreq").value,
        "dosageTime" : document.getElementById("dosageTime").value + ":00",
        "emailNotification" : document.getElementById("emailNotification").checked
      };
      console.log(history);
      const url = new URL("http://localhost:8081/person/addMedicalHistory");
      
      const params = {personId:personId};
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      document.getElementById("addHistory").disabled = false;
      apiData.postJson(url, history)
      .then((response) => response.text())
      .then((data) => {
        if (data == "") {
          alert("Something went wrong");
        } else {
          alert("Medical History added successfully for " + relation);
          render.medicalHistory.populateTable(personId, relation);
        }
      });
    }
    
  },

  editHistory : async function(historyId, personId, relation){
    
    const row = document.getElementById(historyId);
    console.log(row);
    const prevVal = row.getElementsByTagName("center");
    const prevRow = row.innerHTML;
    let isChecked = true;
    if(prevVal[8].innerHTML.includes("unchecked")){
      isChecked = false;
    }
    console.log(isChecked);
    row.innerHTML = `
      <td><center><input type="text" id="illness" name="fname" value = "${prevVal[0].innerHTML}"></center></td>
      <td><center><input type="text" id="doctorDetails" name="fname" value = "${prevVal[1].innerHTML}"></center></td>
      <td><center><input type="text" id="medicines" name="fname" value = "${prevVal[2].innerHTML}"></center></td>
      <td><center><input type="date" id="startDate" name="fname" value = "${prevVal[3].innerHTML}"></center></td>
      <td><center><input type="date" id="endDate" name="fname" value = "${prevVal[4].innerHTML}"></center></td>
      <td><center><input type="number" id="dosageAmt" name="fname" min="0.5" value = "${prevVal[5].innerHTML}"></center></td>
      <td><center><input type="number" id="dosageFreq" name="fname" min="1" value = "${prevVal[6].innerHTML}"></center></td>
      <td><center><input type="text" id="dosageTime" name="fname" value = "${prevVal[7].innerHTML}"></center></td>
      <td><center><input type="checkbox" id="emailNotification" name="fname"></center></td>
      <td><center><button id = "updateHis">edit</button></center></td>
      <td><center><span id="del" class = "del">&#x274C</span></center></td>
    `;
    
    document.getElementById("emailNotification").checked = isChecked;
    document.getElementById("del").addEventListener('click', function(){row.innerHTML = prevRow});
    document.getElementById("updateHis").addEventListener('click', updateData);

    function updateData(){
      const history = medicalHistoryScreen.getHistory();
      console.log(history);
      const url = new URL("http://localhost:8081/person/medicalHistory/update");
      
      const params = {historyId:historyId};
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      
      apiData.putJson(url, history)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        if (!data) {
          alert("Something went wrong");
        } else {
          alert("Medical History updated successfully for " + relation);
          render.medicalHistory.populateTable(personId, relation);
        }
      });
    }
  },

  getHistory : function(){
    const history = {
      "illness" : document.getElementById("illness").value,
      "doctorDetails" : document.getElementById("doctorDetails").value,
      "medicines" : document.getElementById("medicines").value,
      "startDate" : document.getElementById("startDate").value,
      "endDate" : document.getElementById("endDate").value,
      "dosageAmt" : document.getElementById("dosageAmt").value,
      "dosageFreq" : document.getElementById("dosageFreq").value,
      "dosageTime" : document.getElementById("dosageTime").value,
      "emailNotification" : document.getElementById("emailNotification").checked
    };
    return history;
  } 

}

export default medicalHistoryScreen;