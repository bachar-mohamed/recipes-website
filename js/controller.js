import * as model from "./model.js";
import landingView from "../view/landingPageView.js";
import productView from "../view/productPageView.js";
import shopView from "../view/shopView.js";

const featuredProdLoader = async function (keyword) {
  await model.getFeaturedRecipes(keyword);
  landingView.render(model.state.suggestedProducts);
};

const loadProductPage = async function (id) {
  await model.getProductRecipe(id);
  await model.getFeaturedRecipes(model.state.keyword);
  productView.render([
    model.state.recipe,
    model.state.keyword,
    model.state.suggestedProducts,
  ]);
  productView._scrollViewUp();
};

const loadShopView = async function (keyword) {
  await model.getPartialProducts(keyword);
  shopView.render([model.state.partialProducts, model.state.keyword]);
  shopView._highlightCurrent();
  shopView._scrollViewUp();
};

const loadNextPage = async function (pageNumber) {
  await model.getPartialProducts(undefined, pageNumber);
  shopView.render([model.state.partialProducts, model.state.keyword]);
  shopView._highlightCurrent();
  shopView._scrollViewUp();
};

const init = function () {
  featuredProdLoader();
  landingView._productClickHandler(loadProductPage);
  landingView._featuredProdClickHandler(featuredProdLoader);
  landingView._navigationButtonsClickHandler(loadShopView);
  landingView._loadMoreButtonHandler(loadShopView);
  productView._showButtons();
  productView._hideButtons();
  productView._productClickHandler(loadProductPage);
  productView._loadMoreButtonHandler(loadShopView);
  shopView._optionClickHandler(loadShopView);
  shopView._searchProductHandler(loadShopView);
  shopView._pageButtonClickHandler(loadNextPage);
  shopView._arrowButtonClickHandler(loadNextPage);
};

init();
