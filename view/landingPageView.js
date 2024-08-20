import view from "/view/view.js";

class LandingPageView extends view {
  _parent = document.querySelector("main");
  _errorMessage = "couldn't load data";

  _generateMarkup() {
    return `
            <section class="homepage-image">
        <h3>
          one place <br />
          for all ingredients you need
        </h3>
        <h1>explore with freedom</h1>
        <button class="explore">explore</button>
      </section>

      <section class="store-profile">
        <ul class="store-highlights">
          <li>
            <h1>we cook with passion</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              labore esse accusamus, voluptatem quam perferendis id iure fuga
              debitis cumque dolore cupiditate distinctio voluptate vero
              assumenda similique nemo sit a.
            </p>
          </li>
          <li>
            <h1>book a table online</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              labore esse accusamus, voluptatem quam perferendis id iure fuga
              debitis cumque dolore cupiditate distinctio voluptate vero
              assumenda similique nemo sit a.
            </p>
          </li>
          <li>
            <h1>free and fast delivery</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              labore esse accusamus, voluptatem quam perferendis id iure fuga
              debitis cumque dolore cupiditate distinctio voluptate vero
              assumenda similique nemo sit a.
            </p>
          </li>
        </ul>

        <div class="qualities-area">
          <div class="qualities-area_text">
            <div class="qualities-header">
              <h1>our benefits</h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. A
                obcaecati ex amet deserunt autem odio dolore ab ipsa enim?
                Doloribus nam quaerat officiis eveniet sed. Expedita beatae
                possimus molestiae natus?
              </p>
            </div>
            <div class="content-area_container">
              <div class="content-area">
                <div class="title-area">
                  <h1>quality 1</h1>
                  <div class="extend-btn"></div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                  omnis quibusdam maxime earum distinctio repudiandae, esse
                  aperiam deserunt quos quis consequatur officia ducimus aliquam
                  asperiores voluptate blanditiis, saepe odit officiis.
                </p>
              </div>
              <div class="content-area">
                <div class="title-area">
                  <h1>quality 2</h1>
                  <div class="extend-btn"></div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                  omnis quibusdam maxime earum distinctio repudiandae, esse
                  aperiam deserunt quos quis consequatur officia ducimus aliquam
                  asperiores voluptate blanditiis, saepe odit officiis.
                </p>
              </div>
              <div class="content-area">
                <div class="title-area">
                  <h1>quality 3</h1>
                  <div class="extend-btn"></div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                  omnis quibusdam maxime earum distinctio repudiandae, esse
                  aperiam deserunt quos quis consequatur officia ducimus aliquam
                  asperiores voluptate blanditiis, saepe odit officiis.
                </p>
              </div>
              <div class="content-area">
                <div class="title-area">
                  <h1>quality 4</h1>
                  <div class="extend-btn"></div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                  omnis quibusdam maxime earum distinctio repudiandae, esse
                  aperiam deserunt quos quis consequatur officia ducimus aliquam
                  asperiores voluptate blanditiis, saepe odit officiis.
                </p>
              </div>
            </div>
          </div>
          <div class="img-container">
            <img src="../resources/tall_image.jpg" class="qualities-area_image" />
          </div>
        </div>
        <div class="featured-products">
          <div class="featured-products_headings">
            <h1>featured products</h1>
            <h2>check out our products</h2>
          </div>
          <ul class="products-categories">
            <li class="featured" data-ing="pizza">pizza</li>
            <li class="featured" data-ing="pasta">pasta</li>
            <li class="featured" data-ing="tacos">tacos</li>
            <li class="featured" data-ing="grill">grill</li>
          </ul>
          <ul class="products-display">
          ${this._data
            .map((recipe) => {
              return `
            <li class="product" data-id=${recipe.id}>
              <img src=${recipe.image_url} alt="" />
              <div class="product-headings">
                <h1 class="product-name">${recipe.title}</h1>
                <h3 class="autor">${recipe.publisher}</h3>
              </div>
            </li>
            `;
            })
            .join("")}
            
          </ul>
          <button class="load-more">load more</button>
        </div>
        <div class="store-stats">
          <ul>
            <li>
              <h1>11</h1>
              <p>
                ingredient <br />
                published
              </p>
            </li>
            <li>
              <h1>11</h1>
              <p>
                ingredient <br />
                published
              </p>
            </li>
            <li>
              <h1>11</h1>
              <p>
                ingredient <br />
                published
              </p>
            </li>
            <li>
              <h1>11</h1>
              <p>
                ingredient <br />
                published
              </p>
            </li>
          </ul>
        </div>
      </section>
`;
  }

  _productClickHandler(handler) {
    this._parent.addEventListener("click", (e) => {
      if (!e.target.closest("li").classList.contains("product")) return;
      const trigger = e.target.closest("li");
      const id = trigger.dataset.id;
      handler(id);
    });
  }

  _loadMoreButtonHandler(handler) {
    this._parent.addEventListener("click", (e) => {
      if (!e.target.classList.contains("load-more")) return;
      handler();
    });
  }

  _featuredProdClickHandler(handler) {
    this._parent.addEventListener("click", (e) => {
      if (!e.target.classList.contains("featured")) return;
      const target = e.target.dataset.ing;
      handler(target);
    });
  }
}

export default new LandingPageView();
