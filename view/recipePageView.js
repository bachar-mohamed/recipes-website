import view from "./view.js";

class RecipePageView extends view {
  _parent = document.querySelector("main");
  _trigger;
  _bookmarkBtn;
  _link;

  _generateMarkup() {
    return `
         <section class="prod-details_container">
        <img src="${this._data[0].image_url}" class="prod-img"/>
        <div class="prod-details">
          <h3 class="category">${this._data[1].keyword}</h3>
          <h1 class="title">${this._data[0].title}</h1>
          <div class="container">
            <div class="duration">
              <img src="" alt="" />
              <p>${this._data[0].cooking_time} min</p>
            </div>
            <div class="servings">
              <img src="" alt="" />
              <p>${this._data[0].servings}servings</p>
            </div>
          </div>
          <div class="ingredients-container">
            <h1 class="ingredients-contaier_title">recipe ingredients</h1>
            <ul>
            ${this._data[0].ingredients
              .map((ingredient) => {
                return `
              <li>
                <span class="quantity">${ingredient.quantity ?? " "} ${
                  ingredient.unit || ""
                }</span> ${ingredient.description}</li>
             
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
        <button class="show-all">show all</button>
      </section>
    
        `;
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
