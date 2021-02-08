import loginScreen from "../components/login-screen";
import registrationScreen from "../components/registration-screen";
import forgotScreen from "../components/forgot-screen";
import homeScreen from "../components/home-screen";
import profileScreen from "../components/profile-screen";
import medicalHistoryScreen from "../components/medicalHistory-screen";
import populateDropdown from "../components/populateDropdown";
import validation from "../validation/registration-validation"

import cookie from "../cookies/cookiesOps";

import apiData from "../api/api";

const middleScreen = document.querySelector("#middleScreen");
const render = {
  setHeader: function () {
    const headerInit = document.getElementById("header-init");
    headerInit.innerHTML = `
        <li class="nav-item header-ptr" id = "home"><a>Home</a></li>
        <li class="nav-item header-ptr" id = "profile"><a>Profile</a></li>
        <li class="nav-item header-ptr" id = "history"><a>Medical History</a></li>
      `;

    var home = document.getElementById("home");
    var profile = document.getElementById("profile");
    var history = document.getElementById("history");
    var logout = document.getElementById("logout");

    home.addEventListener("click", render.home.entireScreen);
    profile.addEventListener("click", render.profile.entireScreen);
    history.addEventListener("click", render.medicalHistory.entireScreen);
    logout.addEventListener("click", render.login);
  },

  setBg : function(id1, id2, id3){
    document.getElementById(id1).className = "nav-item active header-ptr";
    document.getElementById(id2).className = "nav-item header-ptr";
    document.getElementById(id3).className = "nav-item header-ptr";
  },

  register: function () {
    middleScreen.innerHTML = registrationScreen.render();
    document.getElementById("login").addEventListener('click', render.login);
    validation.registration();
    document
      .getElementById("postData")
      .addEventListener("click", registrationScreen.after_render);
  },

  login: function () {
    middleScreen.innerHTML = loginScreen.render();
    if (cookie.get("userEmail") != "") {
      document.getElementById("email").value = cookie.get("userEmail");
      document.getElementById("pwd").value = cookie.get("userPassword");
    }
    document
      .getElementById("login-user")
      .addEventListener("click", loginScreen.after_render);
    document
      .getElementById("register-user")
      .addEventListener("click", render.register);
    document
      .getElementById("forgotPass")
      .addEventListener("click", render.forgotPassword);
  },

  forgotPassword: function () {
    middleScreen.innerHTML = forgotScreen.render();
    document.getElementById("login").addEventListener('click', render.login);
    document
      .getElementById("postData")
      .addEventListener("click", forgotScreen.after_render);
  },

  home : {
    entireScreen : async function(){
      render.setBg("home", "profile", "history");

      middleScreen.innerHTML = homeScreen.render();
      await render.home.populateTables();
      
    },
    populateTables : async function(personId = "", relation = ""){
      const userTb = document.querySelector("#user");
      const dependentTb = document.querySelector("#dependent");
      userTb.innerHTML = await homeScreen.userHistory(cookie.get("userId"),"self");
      dependentTb.innerHTML = await homeScreen.dependentHistory(personId, relation);
      await render.home.setRelations();
    },
    setRelations : async function(){
      console.log("inside sertrelations for home");
      const dropDownList = document.getElementById("relations");
      dropDownList.innerHTML = await populateDropdown.setRelations(false);
      const relations = document.getElementsByClassName("foo");
      for (const relation of relations) {
        relation.addEventListener("click", function () {
          render.home.populateTables(relation.id, relation.innerHTML);
        });
      }
    }
    
  },

  profile: {
    dependentId: "",
    dependentRelation: "",
    entireScreen: async function () {
      render.setBg("profile", "home", "history");

      middleScreen.innerHTML = profileScreen.render();
      render.profile.setRelations();
      render.profile.populateUserTable();
      render.profile.populateDependentTable();
    },

    setRelations: async function () {
      const dropDownList = document.querySelector("#relations");
      dropDownList.innerHTML = await populateDropdown.setRelations(false);
      const relations = document.getElementsByClassName("foo");
      const existingRel = [];
      for (const relation of relations) {
        existingRel.push(relation.innerHTML);
        relation.addEventListener("click", function () {
          render.profile.dependentId = relation.id;
          render.profile.dependentRelation = relation.innerHTML;
          render.profile.populateDependentTable(
            relation.id,
            relation.innerHTML
          );
        });
      }
      const dependents = document.getElementsByClassName("depAdd");
      for (const dependent of dependents) {
        const rel = dependent.innerHTML;
        dependent.addEventListener("click", function () {
          if(existingRel.includes(rel)){
            alert(`relation ${rel} alredy exist`);
          }
          else{
            document.getElementsByClassName("profileEdit")[1].disabled = true;
            profileScreen.addDependet(rel);
          }
        });
      }
     
    },
    populateUserTable: async function () {
      const usertable = document.querySelector("#usertable");
      usertable.innerHTML = await profileScreen.userDetails(
        cookie.get("userId"),
        "self"
      );
      document.getElementsByClassName("profileUpdate")[0].style.visibility =
        "hidden";
      document.getElementsByClassName("profileCancel")[0].style.visibility =
      "hidden";
      const editUserProfile = document.getElementsByClassName("profileEdit")[0];
      editUserProfile.addEventListener("click", function () {
        editUserProfile.disabled = true;
        profileScreen.editTable(cookie.get("userId"), "self", 0);
      });
    },

    populateDependentTable: async function (personId = "", relation = "") {
      if (personId == "") {
        const currDep = await profileScreen.getFirstDependent();
        if(currDep.length == 0){
          personId = "";
          relation = "relation-not-set"; 
        }
        else{
          render.profile.dependentId = personId = currDep[0][0];
          render.profile.dependentRelation = relation = currDep[0][1];
        }
      }
      const dependentTable = document.querySelector("#dependentTable");
      dependentTable.innerHTML = await profileScreen.userDetails(personId,relation,"editDependentProfile");
      document.getElementsByClassName("profileUpdate")[1].style.visibility =
        "hidden";
      document.getElementsByClassName("profileCancel")[1].style.visibility =
      "hidden";
      const editUserProfile = document.getElementsByClassName("profileEdit")[1];
      
      editUserProfile.addEventListener("click", function () {
        editUserProfile.disabled = true;
        profileScreen.editTable(personId, relation, 1);
      });
    },
  },

  medicalHistory: {
    personId: cookie.get("userId"),
    relation: "self",
    entireScreen: function () {
      // var personId = cookie.get("userId");

      render.setBg("history", "profile", "home");

      middleScreen.innerHTML = medicalHistoryScreen.render();
      render.medicalHistory.setRelations();
      render.medicalHistory.populateTable();
      const addHistory = document.getElementById("addHistory");
      addHistory.addEventListener("click", function () {
        addHistory.disabled = true;
        medicalHistoryScreen.addNewHistory(
          render.medicalHistory.personId,
          render.medicalHistory.relation
        );
      });
    },
    setRelations: async function () {
      console.log("inside sertrelations f medical history");
      const dropDownList = document.querySelector("#relations");
      dropDownList.innerHTML = await populateDropdown.setRelations(true);
      const relations = document.getElementsByClassName("foo");
      for (const relation of relations) {
        relation.addEventListener("click", function () {
          render.medicalHistory.personId = relation.id;
          render.medicalHistory.relation = relation.innerHTML;
          document.getElementById("popRel").innerHTML = `${relation.innerHTML}<span class="caret">`;
          render.medicalHistory.populateTable(relation.id, relation.innerHTML);
        });
      }
    },
    populateTable: async function (personId = cookie.get("userId"),relation = "self") {
      const historyTable = document.querySelector("#historyTable");
      historyTable.innerHTML = await medicalHistoryScreen.historyTable(
        personId,
        relation
      );

      const histories = document.getElementsByClassName("historyRow");
      for (const history of histories) {
        const historyId = history.id;
        const illness = history.getElementsByTagName("center")[0];
        const cross = history.getElementsByTagName("td")[9];
        cross.addEventListener("click", function () {
          const remove = confirm(
            "Do you want to remove history of illness " + illness.innerHTML
          );
          if (remove) {
            medicalHistoryScreen.removeHistory(historyId);
          }
        });

        history.addEventListener('dblclick', function(){
          medicalHistoryScreen.editHistory(historyId, render.medicalHistory.personId, render.medicalHistory.relation);
        });
      }
    },
  },
};

export default render;
