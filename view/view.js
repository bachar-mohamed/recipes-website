//import icons from "../resources/icons.svg";

export default class View {
  _data;
  _navigationButtons = document.querySelector("header");

  renderSpinner = function () {
    const spinner = `<div class="spinner">
      <svg class="loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512" version="1.1" viewBox="0 0 512 640" xml:space="preserve" x="0px" y="0px"><path d="M480,288h-64c-17.688,0-32-14.312-32-32c0-17.688,14.312-32,32-32h64c17.688,0,32,14.312,32,32  C512,273.688,497.688,288,480,288z M391.75,165.5c-12.5,12.5-32.75,12.5-45.25,0s-12.5-32.75,0-45.25L391.75,75  c12.5-12.5,32.75-12.5,45.25,0s12.5,32.75,0,45.25L391.75,165.5z M256,512c-17.688,0-32-14.312-32-32v-64c0-17.688,14.312-32,32-32  c17.688,0,32,14.312,32,32v64C288,497.688,273.688,512,256,512z M256,128c-17.688,0-32-14.312-32-32V32c0-17.688,14.312-32,32-32  c17.688,0,32,14.312,32,32v64C288,113.688,273.688,128,256,128z M120.25,437c-12.5,12.5-32.75,12.5-45.25,0  c-12.5-12.469-12.5-32.75,0-45.25l45.25-45.25c12.5-12.5,32.75-12.5,45.25,0s12.5,32.75,0,45.25L120.25,437z M120.25,165.5  L75,120.25C62.5,107.75,62.5,87.5,75,75s32.75-12.5,45.25,0l45.25,45.25c12.5,12.5,12.5,32.75,0,45.25S132.75,178,120.25,165.5z   M128,256c0,17.688-14.312,32-32,32H32c-17.688,0-32-14.312-32-32c0-17.688,14.312-32,32-32h64C113.688,224,128,238.312,128,256z   M391.75,346.5L437,391.75c12.5,12.5,12.5,32.781,0,45.25c-12.5,12.5-32.75,12.5-45.25,0l-45.25-45.25  c-12.5-12.5-12.5-32.75,0-45.25S379.25,334,391.75,346.5z"/></svg>
      </div>`;
    this._clear();
    this._parent.insertAdjacentHTML("afterBegin", spinner);
  };

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      //return this.displayError();
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

  _clear(target = this._parent) {
    target.innerHTML = "";
  }

  _pagesNavigator(handler) {
    window.addEventListener("hashchange", () => {
      const newHash = location.hash.slice(1);
      location.hash = newHash;
      console.log(newHash);
      handler(newHash);
    });
  }

  displayError(container) {
    const alertDiv = `<div class="alert_container">
      <svg class="alert" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
   <path d="m89.832 79.625-33.039-66.043c-1.2812-2.5781-3.9141-4.207-6.793-4.207s-5.5117 1.6289-6.793 4.207l-33.039 66.043c-1.1641 2.3555-1.0312 5.1445 0.34766 7.3828 1.3789 2.2344 3.8164 3.6016 6.4414 3.6172h66.086c2.625-0.015625 5.0625-1.3828 6.4414-3.6172 1.3789-2.2383 1.5117-5.0273 0.34766-7.3828zm-5.668 4.168h0.003907c-0.24609 0.38672-0.66797 0.62109-1.125 0.625h-66.086c-0.45703-0.003907-0.87891-0.23828-1.125-0.625-0.24609-0.41016-0.24609-0.92578 0-1.3359l32.961-66.082c0.21875-0.46875 0.6875-0.76953 1.207-0.76953s0.98828 0.30078 1.207 0.76953l33.043 66.043c0.22266 0.42578 0.19141 0.9375-0.082031 1.332zm-29.457-44.043c1.293 1.5352 1.8164 3.5742 1.418 5.543l-3.043 16.668v-0.003907c-0.24609 1.5117-1.5508 2.6172-3.082 2.6172s-2.8359-1.1055-3.082-2.6172l-3.043-16.668v0.003907c-0.39844-1.9688 0.125-4.0078 1.418-5.543 1.1797-1.3711 2.8984-2.1602 4.707-2.1602s3.5273 0.78906 4.707 2.1602zm-0.53906 32.125c0 1.6836-1.0156 3.2031-2.5742 3.8477-1.5547 0.64844-3.3477 0.28906-4.5391-0.90234-1.1914-1.1914-1.5508-2.9844-0.90234-4.5391 0.64453-1.5586 2.1641-2.5742 3.8477-2.5742 1.1055 0 2.1641 0.44141 2.9453 1.2227s1.2227 1.8398 1.2227 2.9453z"/>
      </svg>
      <p>could not load data please,check your internet and try again</p>
      </div>`;
    this._clear(container);
    container.insertAdjacentHTML("afterbegin", alertDiv);
  }

  _navigationButtonsClickHandler(handler) {
    this._navigationButtons.addEventListener("click", (e) => {
      if (!e.target.closest(".nav") && !e.target.classList.contains("nav"))
        return;
      handler(e.target.dataset.dest);
    });
  }
}

/* update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.errorRanderer();
    this._data = data;
    const newMarkUp = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDom.querySelectorAll("*"));
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
  }*/

/*_shopButtonsClickHandler(handler) {
    this._navigationButtons.addEventListener("click", (e) => {
      if (!e.target.classList.contains("shop")) return;
      handler();
    });
  }*/

/*
<use href="${icons}#icon-loader"></use>
<use href="${icons}#icon-alert-triangle"></use>
*/
