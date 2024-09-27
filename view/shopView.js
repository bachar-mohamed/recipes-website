import View from "./view.js";

class ShopView extends View {
  _parent = document.querySelector("main");

  _generateMarkup() {
    return `
         <div class="page-poster">
        <h1>find what your heart desires</h1>
      </div>
      <section class="products-section">
        <div class="filters">
          <div class="search-container">
            <h1 class="title">Search</h1>
            <div>
              <input class="search-input" type="text" placeholder="search a recipe...." />
              <button class="search-prod_button">search</button>
            </div>
          </div>
          <div class="recipe_categories">
            <h1 class="title">shop by</h1>
            <nav>
              <h1 class="recipe-name" data-keyword="pizza">pizza</h1>
              <h1 class="recipe-name" data-keyword="tacos">tacos</h1>
              <h1 class="recipe-name" data-keyword="burger">burger</h1>
              <h1 class="recipe-name" data-keyword="grill">grill</h1>
              <h1 class="recipe-name" data-keyword="pasta">pasta</h1>
            </nav>
          </div>
        </div>
        <div class="list-count_container">
          <div class="list-count">
            <p><span>${this._data.totalProducts}</span> products found</p>
            <hr />
          </div>
          <ul class="products-ul">
          ${this._data.results
            .map((product, index) => {
              return `
            <li class="suggested-product" >
              <div style="background-image:url(${
                product.image_url
              });" class="suggested-img ${
                product.bookmarked == true ? "bookmarked" : ""
              }" data-id=${product.id} data-obj=${index}>
                <div class="bookmark-btn" >
               <svg class="bookmark-svg" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 20.62"><polygon points="14 0 0 0 0 20.62 7 17.12 14 20.62 14 0" style="fill:#fff"/></svg>
                </div>
                <button type="button" class="prod-link" data-hash="#product-details">visit</button>
              </div>
              <h1>${product.title}</h1>
            </li>
            `;
            })
            .join("")}
          </ul>
          <div class="page-btn_container ${
            this._data.totalPages <= 1 ? "hidden" : ""
          }">
            <div class="arrow left-arrow ${
              this._data.currentPage == 1 ? "hidden" : ""
            }"></div>
            <ul class="page-number">
              ${new Array(this._data.totalPages)
                .fill("")
                .map((_, index, array) => {
                  return `
                <li class="page-btn ${
                  this._data.currentPage == index + 1 ? "page-selected" : ""
                }" data-position="${index + 1 == array.length ? "last" : ""}">${
                    index + 1
                  }</li>`;
                })
                .join("")}
            </ul>
            <div class=" arrow right-arrow ${
              this._data.currentPage == this._data.totalPages ? "hidden" : ""
            }">
            </div>
          </div>
        </div>
      </section>

        `;
  }

  renderError() {
    const target = this._parent.querySelector(".products-ul");
    console.log(this._data);
    if (this._data.results.length) return;
    this.displayError(target);
  }

  _addToBookMark(handler) {
    this._parent.addEventListener("click", (e) => {
      if (!e.target.closest(".bookmark-btn")) return;
      const trigger = e.target.closest(".bookmark-btn");
      const parent = trigger.closest(".suggested-img");
      if (parent.classList.contains("bookmarked")) {
        parent.classList.remove("bookmarked");
        handler(parent.dataset.id, false);
      } else {
        parent.classList.add("bookmarked");
        handler(parent.dataset.id, true);
      }
    });
  }

  _addToBookMark(handler) {
    this._parent.addEventListener("click", (e) => {
      if (!e.target.closest(".bookmark-btn")) return;
      const trigger = e.target.closest(".bookmark-btn");
      const buttonsContainer = trigger.closest(".suggested-img");
      if (buttonsContainer.classList.contains("bookmarked")) {
        buttonsContainer.classList.remove("bookmarked");
        handler(this._data.results[buttonsContainer.dataset.obj], false);
      } else {
        buttonsContainer.classList.add("bookmarked");
        handler(this._data.results[buttonsContainer.dataset.obj], true);
      }
      console.log("object is: ");
      console.log(this._data.results[buttonsContainer.dataset.obj]);
    });
  }

  _pageButtonClickHandler(handler) {
    this._parent.addEventListener("click", (e) => {
      if (!e.target.classList.contains("page-btn")) return;
      const pageNumber = e.target;
      handler(pageNumber.textContent);
    });
  }

  _arrowButtonClickHandler(handler) {
    this._parent.addEventListener("click", (e) => {
      if (!e.target.closest(".arrow")) return;
      const parent = e.target.closest(".arrow");
      if (parent.classList.contains("left-arrow")) {
        handler(this._data.currentPage - 1);
      } else {
        handler(this._data.currentPage + 1);
      }
    });
  }

  _optionClickHandler(handler) {
    this._parent.addEventListener("click", (e) => {
      if (!e.target.classList.contains("recipe-name")) return;
      handler(e.target.dataset.keyword);
    });
  }

  _searchProductHandler(handler) {
    this._parent.addEventListener("click", (e) => {
      if (!e.target.classList.contains("search-prod_button")) return;
      const input = this._parent.querySelector(".search-input");
      console.log(input.value);
      handler(input.value.trim());
    });
  }

  _highlightCurrent() {
    this._parent.querySelectorAll(".recipe-name").forEach((element) => {
      if (
        element.dataset.keyword.toLowerCase() ===
        this._data.keyword.toLowerCase()
      ) {
        element.classList.add("selected");
      }
    });
  }

  _productClickHandler(handler) {
    this._parent.addEventListener("click", (e) => {
      if (!e.target.classList.contains("prod-link")) return;
      const parent = e.target.closest(".suggested-img");
      const id = parent.dataset.id;
      const isBookmarked = e.target
        .closest(".suggested-img")
        .classList.contains("bookmarked");
      handler(id, isBookmarked);
    });
  }

  _showButtons() {
    this._parent.addEventListener("mouseover", (e) => {
      if (!e.target.closest("li")?.classList.contains("suggested-product"))
        return;
      this._trigger = e.target.closest("li");
      this._prodImage = this._trigger.querySelector(".suggested-img");
      this._prodImage.classList.add("zoom-in");
      this._prodImage.classList.add("focused");
    });
  }

  _hideButtons() {
    this._parent.addEventListener("mouseout", (e) => {
      if (!e.target.closest("li")?.classList.contains("suggested-product"))
        return;
      this._prodImage.classList.remove("zoom-in");
      this._prodImage.classList.remove("focused");
    });
  }
}
export default new ShopView();
