import loginScreen from '../components/login-screen';
import registrationScreen from '../components/registration-screen';
import forgotScreen from '../components/forgot-screen';
import homeScreen from '../components/home-screen';
import profileScreen from '../components/profile-screen';
import medicalHistoryScreen from '../components/medicalHistory-screen';

import cookie from '../cookies/cookiesOps'

import apiData from '../api/api';

const middleScreen = document.querySelector("#middleScreen");
const render = {
    register : function(){
      middleScreen.innerHTML = registrationScreen.render();
      document.getElementById('postData').addEventListener('click', registrationScreen.after_render);
    },

    login : function(){
      middleScreen.innerHTML = loginScreen.render();
      if(cookie.get("userEmail") != ""){
        document.getElementById("email").value = cookie.get("userEmail");
        document.getElementById("pwd").value = cookie.get("userPassword");
      }
      document.getElementById('postData').addEventListener('click', loginScreen.after_render);
    },

    forgotPassword : function(){
      middleScreen.innerHTML = forgotScreen.render();
      document.getElementById('postData').addEventListener('click', forgotScreen.after_render);
    },

    home : function(){
      middleScreen.innerHTML = homeScreen.render();
      async function populateTables(){
        const userTb = document.querySelector("#user");
        const dependentTb = document.querySelector("#dependent")
        userTb.innerHTML = await homeScreen.userHistory(cookie.get("userId"), "self");
        dependentTb.innerHTML = await homeScreen.dependentHistory();
      }
      populateTables();
    },

    profile : function(){
      middleScreen.innerHTML = profileScreen.render();
      async function populateTables(){
        const usertable = document.querySelector("#usertable");
        const dependentTable = document.querySelector("#dependentTable");
        usertable.innerHTML = await profileScreen.userDetails(cookie.get("userId"), "self");
        dependentTable.innerHTML = await profileScreen.dependentDetails();
      }
      populateTables();
    },

    medicalHistory : function(){
      
      middleScreen.innerHTML = medicalHistoryScreen.render();
      
      async function setRelations(){
        const dropDownList = document.querySelector("#relations");
        dropDownList.innerHTML = await medicalHistoryScreen.setRelations();
        const relations = document.getElementsByClassName("foo");
        
        for(const relation of relations){
          console.log(relation.innerHTML);
            relation.addEventListener('click', function(){
              console.log(relation.id, "----", relation.innerHTML);
              populateTables(relation.id, relation.innerHTML);
            });
          } 
      }
      setRelations();
      
      async function populateTables(personId = cookie.get("userId"), relation = "self"){
        console.log(personId, relation);
        const historyTable = document.querySelector("#historyTable");
        historyTable.innerHTML = await medicalHistoryScreen.historyTable(personId, relation);

        const histories = document.getElementsByClassName("historyRow");
        for(const history of histories){
          const historyId = history.id;
          const illness = history.getElementsByTagName("center")[0];
          const cross = history.getElementsByTagName("td")[9];
          cross.addEventListener('click', function(){
            const remove = confirm("Do you want to remove history of illness " + illness.innerHTML);
            if(remove){
              medicalHistoryScreen.removeHistory(historyId);
            }
          })
        }
      }
      populateTables();

      // async function removeHistory(historyId){
      //   const remove = confirm("Do you want to remove history");
      //   if(remove){
      //     const url = new URL("http://localhost:8081/person/medicalHistory/delete");
      //     const params = {historyId:historyId};
      //     Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

      //     apiData.delete(url);
      //     const row = document.getElementById(historyId);
      //     row.remove();

      //   }
      // }
    }
    
}

export default render;