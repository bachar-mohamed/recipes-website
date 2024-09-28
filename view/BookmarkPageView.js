import view from "./view.js";

class BookmarkPageView extends view {
  _parent = document.querySelector("main");

  _generateMarkup() {
    return `
    <section class="bookmark_section">   
      <div class="bookmark_div_container">
        <div class="section_header">
      <h1 class="bookmark_title">Your Bookmarks</h1>
        </div>
        <ul class="products-ul">
        ${this._data
          .map((info, index) => {
            return `
            <li class="bookmarked_recipe" data-id=${info.id} data-index = ${index}>
            <div class="bookmarked_prod_img" style="background-image:url(${info.image_url})"></div>
            <div class="bookmarked_info">
              <h1>${info.title}</h1>
              <h3>${info.publisher}</h3>
            </div>
            <button class="delete_bookmark_btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 72 90"
                style="enable-background: new 0 0 72 72"
                xml:space="preserve"
              >
                <path
                  d="M30,15.8134766h12c1.3808594,0,2.5-1.1191406,2.5-2.5s-1.1191406-2.5-2.5-2.5H30c-1.3808594,0-2.5,1.1191406-2.5,2.5  S28.6191406,15.8134766,30,15.8134766z"
                />
                <path
                  d="M56.5,18.9326172h-5h-31h-4c-1.3808594,0-2.5,1.1191406-2.5,2.5s1.1191406,2.5,2.5,2.5h1.6248169l1.7931519,34.8823242  c0.0683594,1.3291016,1.1660156,2.371582,2.4970703,2.371582h27.1699219c1.3310547,0,2.4287109-1.0424805,2.4970703-2.371582  l1.7931519-34.8823242H56.5c1.3808594,0,2.5-1.1191406,2.5-2.5S57.8808594,18.9326172,56.5,18.9326172z M33.032959,45.6650391  c0,1.3808594-1.1191406,2.5-2.5,2.5s-2.5-1.1191406-2.5-2.5v-12c0-1.3808594,1.1191406-2.5,2.5-2.5s2.5,1.1191406,2.5,2.5  V45.6650391z M43.967041,45.6650391c0,1.3808594-1.1191406,2.5-2.5,2.5s-2.5-1.1191406-2.5-2.5v-12  c0-1.3808594,1.1191406-2.5,2.5-2.5s2.5,1.1191406,2.5,2.5V45.6650391z"
                />
              </svg>
            </button>
          </li>
            `;
          })
          .join("")}
        </ul>
      </div>
      </section>
        `;
  }

  _deleteBookMarkHandler(handler) {
    this._parent.addEventListener("click", (e) => {
      const trigger = e.target.closest(".delete_bookmark_btn");
      if (!trigger) return;
      const liParent = trigger.closest("li");
      console.log("hello there ");
      console.log(liParent);
      handler(this._data[liParent.dataset.index], false);
    });
  }

  _recipeClickHandler(handler) {
    const recipe = this._parent.addEventListener("click", (e) => {
      if (
        e.target.closest(".delete_bookmark_btn") ||
        !e.target.closest(".bookmarked_recipe")
      )
        return;
      const trigger = e.target.closest(".bookmarked_recipe");
      handler(trigger.dataset.id, true);
    });
  }
}

export default new BookmarkPageView();
