import render from "./rendering/render";

import cookie from './cookies/cookiesOps';
import './styles/styles.css';

// render.forgotPassword()
// render.medicalHistory.entireScreen();
if(cookie.get("userEmail") != "" && cookie.get("userPassword") != "" && cookie.get("userId") != "")
  render.login();
else
  render.register();