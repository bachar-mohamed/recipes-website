import view from "./view.js";

class AuthenticationPageView extends view {
  _parent = document.querySelector("main");
  _trigger;
  _bookmarkBtn;
  _prodImage;
  _link;
  _counter = 0;

  _generateMarkup() {
    return `<section class="auth-container">
      <div class="authentication">
        <h1>recipify</h1>
        <div class="auth-form login hidden-form">
          <h1>user login</h1>
          <form action="">
            <div class="input-container">
              <label for="userLoginEmail">user email</label>
              <input type="text" name="email" id="userLoginEmail" />
            </div>
            <div class="input-container">
              <label for="userPassword">password</label>
              <input type="password" name="password" id="userPassword" />
            </div>
            <button type="button" class="signUp-btn">login</button>
            <p>dont have an account? <span>sign up</span></p>
          </form>
        </div>

        <div class="auth-form sign-up">
          <h1>user sign up</h1>
          <form action="">
            <div class="input-container">
              <label for="userName">user name</label>
              <input type="text" name="userName" id="userName" />
            </div>
            <div class="input-container">
              <label for="userEmail">user email</label>
              <input type="text" name="email" id="userEmail" />
            </div>
            <div class="input-container">
              <label for="userPassword">password</label>
              <input type="password" name="password" id="userSingUpPassword" />
            </div>
            <div class="input-container">
              <label for="confirmPassword">confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
              />
            </div>
            <button type="button" class="signUp-btn">sign up</button>
            <p>already have an account? <span>login</span></p>
          </form>
        </div>
      </div>
      <div class="backgorund"></div>
    </section>
`;
  }
}

export default new AuthenticationPageView();
