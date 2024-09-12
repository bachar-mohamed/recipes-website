import * as model from "./model.js";
import landingView from "../view/landingPageView.js";
import recipeView from "../view/recipePageView.js";
import shopView from "../view/shopView.js";
import authenticationView from "../view/authenticationPageView.js";

const featuredProdLoader = async function (keyword) {
  await model.getPartialRecipes(keyword, undefined, 6);
  console.log(model.state.fetchedRecipes);
  landingView.render(model.state.fetchedRecipes);
  landingView._colapsibleTextHandler();
};

const navigationHandler = function (destinationPage) {
  console.log(destinationPage);
  if (destinationPage === "home") {
    featuredProdLoader();
  } else if (destinationPage === "shop") {
    loadShopView();
  } else if (destinationPage === "account") {
    loadAuthenticationPage();
  } else {
    //do nothing for now
  }
};

const addIdToBookMarks = function (id, addEntry) {
  console.log("controller function");
  model.handleBookMarks(id, addEntry);
};

const loadAuthenticationPage = function () {
  authenticationView.render("hello");
  authenticationView.switchForm();
};

const loadProductPage = async function (id, bookmarked) {
  await model.getRecipe(id, bookmarked);
  await model.getPartialRecipes(
    model.state.fetchedRecipes.keyword,
    undefined,
    6
  );
  recipeView.render([model.state.recipe, model.state.fetchedRecipes]);
  recipeView._scrollViewUp();
};

const loadShopView = async function (keyword) {
  await model.getPartialRecipes(keyword);
  shopView.render(model.state.fetchedRecipes);
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
  landingView._loadMoreButtonHandler(loadShopView);
  landingView._navigationButtonsClickHandler(navigationHandler);
  recipeView._showButtons();
  recipeView._hideButtons();
  recipeView._productClickHandler(loadProductPage);
  recipeView._servingAdjuster();
  recipeView._loadMoreButtonHandler(loadShopView);
  recipeView._recipeBookmarkHandler(addIdToBookMarks);
  recipeView._slideToLeft();
  shopView._optionClickHandler(loadShopView);
  shopView._searchProductHandler(loadShopView);
  shopView._pageButtonClickHandler(loadNextPage);
  shopView._arrowButtonClickHandler(loadNextPage);
  shopView._addToBookMark(addIdToBookMarks);
};

init();
