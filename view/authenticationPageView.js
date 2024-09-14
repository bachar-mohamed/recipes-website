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
        <div class="auth-form login hidden-form">
          <form action="">
          <h1>login</h1>
            <div class="input-container">
              <label for="userLoginEmail">user email</label>
              <input type="text" name="email" id="userLoginEmail" />
            </div>
            <div class="input-container">
              <label for="userPassword">password</label>
              <input type="password" name="password" id="userPassword" />
            </div>
            <button type="button" class="signUp-btn">login</button>
            <p class="form-paragraph">dont have an account? <span class="form-switcher">sign up</span></p>
          </form>
        </div>

        <div class="auth-form sign-up">
          <form action="">
          <h1>sign up</h1>
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
            <p class="form-paragraph">already have an account? <span class="form-switcher">login</span></p>
          </form>
        </div>
      </div>
      <div class="backgorund"></div>
    </section>
`;
  }

  switchForm() {
    const forms = this._parent.querySelectorAll(".auth-form");
    console.log(this._parent);
    console.log(forms);
    this._parent.querySelectorAll(".form-switcher").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        forms.forEach((form) => {
          form.classList.toggle("hidden-form");
        });
      });
    });
  }

  clickHandler(handler) {
    this._parent.addEventListener("click", (e) => {
      if (!e.target.classList.contains("signUp-btn")) return;
      handler();
    });
  }
}

export default new AuthenticationPageView();
