const validation = {
  registration: function () {
    document.getElementById("fname").onkeyup = validateAll;
    document.getElementById("lname").onkeyup = validateAll;
    document.getElementById("email").onkeyup = validateAll;
    document.getElementById("contact").onkeyup = validateAll;
    document.getElementById("Country").onkeyup = validateAll;
    document.getElementById("pwd").onkeyup = validateAll;
    document.getElementById("cpwd").onkeyup = validateAll;

    function validateAll() {
      if (
        validateString("fname") == true &&
        validateString("lname") == true &&
        validateEmail() == true &&
        validatePhone() == true &&
        validateString("Country") == true &&
        validatePassword() == true &&
        validateCnfPwd() == true
      ) {
        document.getElementById("postData").disabled = false;
      } else {
        document.getElementById("postData").disabled = true;
      }
    }

    function validateString(id) {
      let name = document.getElementById(id).value;
      if (name != "") {
        document.getElementById(id).style.cssText =
          "border:solid 2px blue";
        return true;
      } else {
        document.getElementById(id).style.cssText =
          "border:solid 2px red";
        return false;
      }
    }

    function validateEmail() {
      let email = document.getElementById("email").value;
      let emailRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){1,3}$/;
      let flag = emailRegex.test(email);
      if (flag == true && email != "") {
        document.getElementById("email").style.cssText =
          "border:solid 2px blue";
      } else {
        document.getElementById("email").style.cssText =
          "border:solid 2px red";
      }
      return flag;
    }

    function validatePhone() {
      let phone = document.getElementById("contact").value;
      let phoneRegex = /^[\d]{10}$/;
      let flag = phoneRegex.test(phone);
      if (flag == true) {
        document.getElementById("contact").style.cssText =
          "border:solid 2px blue";
      } else {
        document.getElementById("contact").style.cssText =
          "border:solid 2px red";
      }
      return flag;
    }

    function validatePassword() {
      let pwd = document.getElementById("pwd").value;
      let pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      let flag = pwdRegex.test(pwd);
      console.log(flag);
      if (flag == true) {
        document.getElementById("pwd").style.cssText =
          "border:solid 2px blue";
      } else {
        document.getElementById("pwd").style.cssText =
          "border:solid 2px red";
      }
      return flag;
    }

    function validateCnfPwd() {
      let pwd = document.getElementById("pwd").value;
      let cnfPwd = document.getElementById("cpwd").value;
      let pwdMatch = pwd.localeCompare(cnfPwd);
      if (pwdMatch == 0) {
        document.getElementById("cpwd").style.cssText =
          "border:solid 2px blue";
        return true;
      } else {
        document.getElementById("cpwd").style.cssText =
          "border:solid 2px red";
        return false;
      }
    }
  },
};

export default validation;