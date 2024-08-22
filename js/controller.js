import * as model from "./model.js";
import landingView from "../view/landingPageView.js";
import recipeView from "../view/recipePageView.js";
import shopView from "../view/shopView.js";

const featuredProdLoader = async function (keyword) {
  await model.getFeaturedRecipes(keyword);
  landingView.render(model.state.fetchedRecipes);
};

const loadProductPage = async function (id) {
  await model.getRecipe(id);
  await model.getFeaturedRecipes(model.state.fetchedRecipes.keyword);
  recipeView.render([model.state.recipe, model.state.fetchedRecipes]);
  recipeView._scrollViewUp();
  recipeView._slideToLeft();
};

const loadShopView = async function (keyword) {
  await model.getPartialRecipes(keyword);
  shopView.render(model.state.fetchedRecipes);
  console.log("keyword from view");
  console.log(keyword);
  console.log("keyword from model");
  console.log(model.state.fetchedRecipes.keyword);
  shopView._highlightCurrent();
  shopView._scrollViewUp();
};

const loadNextPage = async function (pageNumber) {
  await model.getPartialRecipes(undefined, pageNumber);
  shopView.render(model.state.fetchedRecipes);
  shopView._highlightCurrent();
  shopView._scrollViewUp();
};

const init = function () {
  featuredProdLoader();
  landingView._productClickHandler(loadProductPage);
  landingView._featuredProdClickHandler(featuredProdLoader);
  landingView._navigationButtonsClickHandler(loadShopView);
  landingView._loadMoreButtonHandler(loadShopView);
  recipeView._showButtons();
  recipeView._hideButtons();
  recipeView._productClickHandler(loadProductPage);
  recipeView._servingAdjuster();
  recipeView._loadMoreButtonHandler(loadShopView);
  shopView._optionClickHandler(loadShopView);
  shopView._searchProductHandler(loadShopView);
  shopView._pageButtonClickHandler(loadNextPage);
  shopView._arrowButtonClickHandler(loadNextPage);
};

init();
