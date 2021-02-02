import loginScreen from './components/login-screen';
import registrationScreen from './components/registration-screen'
import forgotScreen from './components/forgot-screen';
import homeScreen from './components/home-screen';

import './styles/styles.css';


const middleScreen = document.querySelector("#middleScreen");

middleScreen.innerHTML = loginScreen.render();
document.getElementById('postData').addEventListener('submit', loginScreen.after_render);

// middleScreen.innerHTML = registrationScreen.render();
// document.getElementById('postData').addEventListener('click', registrationScreen.after_render);

// middleScreen.innerHTML = forgotScreen.render();
// document.getElementById('postData').addEventListener('click', forgotScreen.after_render);

// middleScreen.innerHTML = homeScreen.render();

export default middleScreen;