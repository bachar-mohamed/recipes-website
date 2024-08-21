import view from "./view.js";

class RecipePageView extends view {
  _parent = document.querySelector("main");
  _trigger;
  _bookmarkBtn;
  _link;

  _generateMarkup() {
    return `
         <section class="prod-details_container">
         <div class="product-img_container">
        <img src="${this._data[0].image_url}" class="prod-img"/>
        </div>
        <div class="prod-details">
          <h3 class="category">${this._data[1].keyword}</h3>
          <h1 class="title">${this._data[0].title}</h1>
          <div class="container">
            <div class="duration">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
 <path d="m49.309 91.25c-9.1797 0-17.98-3.6445-24.473-10.137-6.4883-6.4883-10.137-15.293-10.137-24.469 0-9.1797 3.6484-17.984 10.141-24.473 6.4883-6.4922 15.293-10.137 24.473-10.133 9.1797 0 17.98 3.6484 24.469 10.141 6.4883 6.4922 10.133 15.293 10.133 24.473-0.015624 9.1719-3.6641 17.969-10.152 24.453-6.4844 6.4844-15.281 10.133-24.453 10.145zm0-66.086c-8.3477 0-16.355 3.3164-22.262 9.2188-5.9023 5.9023-9.2227 13.91-9.2227 22.262 0 8.3477 3.3164 16.355 9.2188 22.258 5.9023 5.9062 13.91 9.2227 22.258 9.2266 8.3477 0 16.355-3.3164 22.262-9.2188s9.2227-13.906 9.2266-22.258c-0.011718-8.3438-3.332-16.344-9.2305-22.246-5.9023-5.9023-13.902-9.2227-22.25-9.2305z"/>
 <path d="m49.309 84.602c-7.457 0.078126-14.641-2.832-19.941-8.0781-5.3047-5.2461-8.2891-12.395-8.2891-19.855 0-7.4609 2.9844-14.609 8.2891-19.859 5.3008-5.2461 12.484-8.1523 19.941-8.0742h1.5625v26.355h26.383v1.5625c-0.007812 7.4102-2.957 14.512-8.1953 19.754-5.2383 5.2383-12.34 8.1836-19.75 8.1953zm-1.5625-52.691c-6.3867 0.40625-12.367 3.2617-16.699 7.9766-4.3281 4.7148-6.668 10.918-6.5312 17.316s2.7422 12.496 7.2695 17.02c4.5273 4.5195 10.629 7.1211 17.027 7.25 6.3984 0.13281 12.602-2.2148 17.309-6.5508 4.7109-4.332 7.5625-10.32 7.9609-16.707h-26.336z"/>
 <path d="m51.109 25.176h-3.4375c-1.625-0.003906-2.9375-1.3164-2.9414-2.9414v-6.2969c0-1.625 1.3164-2.9414 2.9414-2.9414h3.4375c0.78125-0.003906 1.5352 0.30469 2.0859 0.85938 0.55469 0.55078 0.86719 1.3008 0.86719 2.082v6.2969c0 0.78125-0.3125 1.5312-0.86719 2.082-0.55078 0.55469-1.3047 0.86328-2.0859 0.85938zm-0.17188-9.2383-3.2578 0.18359 0.18359 6.1016 3.0742-0.16016zm0.18359 6.1016z"/>
 <path d="m59.543 16.133h-20.312c-2.2539-0.058593-4.0469-1.9062-4.0469-4.1602s1.793-4.0977 4.0469-4.1602h20.312c1.125-0.03125 2.2109 0.39453 3.0156 1.1758 0.80859 0.78516 1.2617 1.8633 1.2617 2.9844 0 1.125-0.45312 2.1992-1.2617 2.9844-0.80469 0.78516-1.8906 1.207-3.0156 1.1758zm-20.312-5.1953c-0.55078 0.03125-0.98047 0.48438-0.98047 1.0352 0 0.55078 0.42969 1.0078 0.98047 1.0352h20.312c0.28516 0.015626 0.5625-0.085937 0.76953-0.28125 0.20703-0.19531 0.32422-0.46875 0.32422-0.75391s-0.11719-0.55859-0.32422-0.75391-0.48438-0.29688-0.76953-0.28125z"/>
</svg>
              <p><span>${this._data[0].cooking_time}</span> min</p>
            </div>
            <div class="servings">
             <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M58.603,54.628c6.362-3.175,10.752-9.732,10.752-17.313c0-10.672-8.683-19.354-19.354-19.354s-19.354,8.683-19.354,19.354  c0,7.58,4.39,14.138,10.752,17.313c-20.172,4.756-21.488,25.888-21.5,26.128l2.996,0.149C22.945,79.917,24.448,56.67,50,56.67  s27.055,23.246,27.106,24.235l2.996-0.149C80.09,80.516,78.774,59.384,58.603,54.628z M33.646,37.315  c0-9.018,7.336-16.354,16.354-16.354s16.354,7.336,16.354,16.354S59.018,53.67,50,53.67S33.646,46.333,33.646,37.315z"/></svg>
              <p><span class="total-servings">${
                this._data[0].servings
              }</span> servings</p>
              <div class="servings-controller">
              <button class="adjuster increase-servings" type="button">&plus;</button>
              <button class="adjuster decrease-servings" type="button">&minus;</button>
              </div>
            </div>
          </div>
          <div class="ingredients-container">
            <h1 class="ingredients-contaier_title">recipe ingredients</h1>
            <ul>
            ${this._data[0].ingredients
              .map((ingredient) => {
                return `
              <li>
                <span class="quantity">${ingredient.quantity ?? " "}</span> ${
                  ingredient.unit || ""
                } ${ingredient.description}</li>
             
              `;
              })
              .join("")}
            </ul>
          </div>
          <div class="buttons-container">
            <a href="${
              this._data[0].source_url
            } target="_blank"">how to cook</a>
            <button>bookmark</button>
          </div>
        </div>
      </section>

      <section class="similar-products">
        <h1>you may also like</h1>
        <div class="similar-products_container">
        <button class="left-arrow" type="button">&larr;</button>
        <ul>
        ${this._data[1].results
          .map((prod) => {
            return `
          <li class="suggested-product">
            <div style="background-image:url(${prod.image_url});" class="suggested-img">
              <div class="bookmark-btn"></div>
              <button class="prod-link" data-id=${prod.id}>visit</button>
            </div>
            <h1>${prod.title}</h1>
          </li>
          `;
          })
          .join("")}
        </ul>
       <button class="right-arrow" type="button">&rarr;</button>
        </div>
        <button class="show-all">show all</button>
      </section>
    
        `;
  }

  _servingAdjuster() {
    this._parent.addEventListener("click", (e) => {
      if (!e.target.classList.contains("adjuster")) return;
      const trigger = e.target;
      const portions = this._parent.querySelectorAll(".quantity");
      if (trigger.classList.contains("increase-servings")) {
        portions.forEach((portion) => {
          console.log(portion.textContent);
          portion.textContent =
            portion.textContent > 0
              ? portion.textContent * 2
              : portion.textContent;
        });
      } else if (trigger.classList.contains("decrease-servings")) {
        portions.forEach((portion) => {
          portion.textContent =
            portion.textContent > 0
              ? (portion.textContent / 2).toFixed(1)
              : portion.textContent;
        });
      }
    });
  }

  _productClickHandler(handler) {
    this._parent.addEventListener("click", (e) => {
      console.log(e.target);
      if (!e.target.classList.contains("prod-link")) return;
      const id = e.target.dataset.id;
      handler(id);
    });
  }

  _showButtons() {
    this._parent.addEventListener("mouseover", (e) => {
      if (!e.target.closest("li").classList.contains("suggested-product"))
        return;
      this._trigger = e.target.closest("li");
      this._bookmarkBtn = this._trigger.querySelector(".bookmark-btn");
      this._link = this._trigger.querySelector(".prod-link");
      this._bookmarkBtn.classList.add("reveal-bookmark");
      this._link.classList.add("reveal-link");
    });
  }

  _loadMoreButtonHandler(handler) {
    this._parent.addEventListener("click", (e) => {
      if (!e.target.classList.contains("show-all")) return;
      handler();
    });
  }

  _hideButtons() {
    this._parent.addEventListener("mouseout", (e) => {
      if (!e.target.closest("li").classList.contains("suggested-product"))
        return;
      this._bookmarkBtn.classList.remove("reveal-bookmark");
      this._link.classList.remove("reveal-link");
    });
  }
}

export default new RecipePageView();
