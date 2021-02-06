import render from "./rendering/render";

import cookie from './cookies/cookiesOps';
import './styles/styles.css';


const middleScreen = document.querySelector("#middleScreen");


// render.profile.entireScreen();
if(cookie.get("userEmail") != "" && cookie.get("userPassword") != "" && cookie.get("userId") != "")
  render.login();
else
  render.register();







// render.forgotPassword();
// render.home();
// render.profile();
// render.medicalHistory();

// middleScreen.innerHTML = loginScreen.render();
// if(cookie.get("userEmail") != ""){
//   document.getElementById("email").value = cookie.get("userEmail");
//   document.getElementById("pwd").value = cookie.get("userPassword");
// }
// document.getElementById('postData').addEventListener('click', loginScreen.after_render);

// middleScreen.innerHTML = registrationScreen.render();
// document.getElementById('postData').addEventListener('click', registrationScreen.after_render);

// middleScreen.innerHTML = forgotScreen.render();
// document.getElementById('postData').addEventListener('click', forgotScreen.after_render);
// document.getElementById('backToLogin').addEventListener('click', loginScreen.render);

// homeScreen.render();

// middleScreen.innerHTML = homeScreen.render();
// async function fun(){
//   const userTb = document.querySelector("#user");
//   const dependentTb = document.querySelector("#dependent")
//   userTb.innerHTML = await homeScreen.userHistory();
//   dependentTb.innerHTML = await homeScreen.dependentHistory();
// }
// fun();

// middleScreen.innerHTML = profileScreen.render();
// export default middleScreen;
// async function funForProfile(){
//   const usertable = document.querySelector("#usertable");
//   const dependentTable = document.querySelector("#dependentTable");
//   usertable.innerHTML = await profileScreen.userDetails(cookie.get("userId"), "self");
//   dependentTable.innerHTML = await profileScreen.dependentDetails();
// }
// funForProfile();

// middleScreen.innerHTML = medicalHistoryScreen.render();
// async function funForMedicalHistory(){
//   const historyTable = document.querySelector("#historyTable");
//   historyTable.innerHTML = await medicalHistoryScreen.historyTable(cookie.get("userId"), "self");
// }
// funForMedicalHistory();

export default middleScreen;