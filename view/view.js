//import icons from "../resources/icons.svg";

export default class View {
  _data;
  _navigationButtons = document.querySelector("header");

  renderSpinner = function () {
    const spinner = `<div class="spinner">
      <svg>
        <use href=""></use>
      </svg>
      </div>`;
    this._clear();
    this._parent.insertAdjacentHTML("afterBegin", spinner);
  };

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.errorRanderer();
    }
    this._data = data;
    const markUp = this._generateMarkup();
    this._clear();
    this._parent.insertAdjacentHTML("afterbegin", markUp);
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  _scrollViewUp() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  _clear() {
    this._parent.innerHTML = "";
  }

  errorRanderer(message = this._errorMessage) {
    const errorDiv = `
      <div class="error">
          <div>
            <svg>
              <use href=""></use>
            </svg>
          </div>
          <p>${message}</p>
      </div>`;
    this._clear();
    this._parent.insertAdjacentHTML("afterbegin", errorDiv);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.errorRanderer();
    this._data = data;
    const newMarkUp = this._generateMarkup();
    console.log("new markup");
    console.log(newMarkUp);
    const newDom = document.createRange().createContextualFragment(newMarkUp);
    console.log("new dom");
    console.log(newDom);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    console.log("new elements");
    console.log(newElements);
    const currElement = Array.from(this._parent.querySelectorAll("*"));

    newElements.forEach((el, i) => {
      const currentEl = currElement[i];
      if (
        !el.isEqualNode(currentEl) &&
        currentEl.firstChild.nodeValue.trim() !== ""
      ) {
        currentEl.textContent = el.textContent;
      }

      if (!el.isEqualNode(currentEl)) {
        Array.from(el.attributes).forEach((attr, i) => {
          currentEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  /*_shopButtonsClickHandler(handler) {
    this._navigationButtons.addEventListener("click", (e) => {
      if (!e.target.classList.contains("shop")) return;
      handler();
    });
  }*/

  _navigationButtonsClickHandler(handler) {
    this._navigationButtons.addEventListener("click", (e) => {
      if (!e.target.closest(".nav") && !e.target.classList.contains("nav"))
        return;
      handler(e.target.dataset.dest);
    });
  }
}

/*
<use href="${icons}#icon-loader"></use>
<use href="${icons}#icon-alert-triangle"></use>
*/
