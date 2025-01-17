import * as model from "./model.js";
import landingView from "../view/landingPageView.js";
import recipeView from "../view/recipePageView.js";
import shopView from "../view/shopView.js";
import BookmarkPageView from "../view/BookmarkPageView.js";

const homePageLoader = async function (keyword) {
  landingView._setUrl();
  landingView.renderSpinner();
  await model.getPartialRecipes(keyword, undefined, 6);
  landingView.render(model.state.fetchedRecipes);
  landingView._exploreClickHandler(shopPageLoader);
  landingView.renderError();
};

const productPageLoader = async function (id, bookmarked) {
  recipeView._setUrl("#shop", id, { bookmarked });
  recipeView.renderSpinner();
  await model.getRecipe(id, window.history.state.bookmarked);
  await model.getPartialRecipes(
    model.state.fetchedRecipes.keyword,
    undefined,
    6
  );
  recipeView.render([model.state.recipe, model.state.fetchedRecipes]);
  recipeView.renderError();
};

const bookmarkPageLoader = function () {
  BookmarkPageView.renderSpinner();
  BookmarkPageView.render(model.state.bookmarks);
};

const shopPageLoader = async function (keyword) {
  shopView._setUrl("#shop");
  shopView.renderSpinner();
  await model.getPartialRecipes(keyword);
  shopView.render(model.state.fetchedRecipes);
  shopView._highlightCurrent();
  shopView.renderError();
};

const homePageEventListeners = function () {
  landingView._colapsibleTextHandler();
  landingView._productClickHandler(productPageLoader);
  landingView._featuredProdClickHandler(homePageLoader);
  landingView._loadMoreButtonHandler(shopPageLoader);
  landingView._navigationButtonsClickHandler(navigationHandler);
  landingView._pagesNavigator(navigationHandler);
  landingView.screenResizeHandler();
  landingView.menuButtonClickHandler();
};

const productPageEventListeners = function () {
  recipeView._scrollViewUp();
  recipeView._servingAdjuster();
  recipeView._loadMoreButtonHandler(shopPageLoader);
  recipeView._recipeBookmarkHandler(addIdToBookMarks);
  recipeView._slider();
};

const bookmarkPageEventListeners = function () {
  BookmarkPageView._deleteBookMarkHandler(bookmarkDeletionHandler);
  BookmarkPageView._recipeClickHandler(productPageLoader);
};

const shopPageEventListeners = function () {
  shopView._scrollViewUp();
  productAnimationHandler();
  shopView._optionClickHandler(shopPageLoader);
  shopView._searchProductHandler(shopPageLoader);
  shopView._pageButtonClickHandler(loadNextPage);
  shopView._arrowButtonClickHandler(loadNextPage);
  shopView._addToBookMark(addIdToBookMarks);
};

const navigationHandler = function (destinationPage) {
  if (destinationPage === "home") {
    homePageLoader();
  } else if (destinationPage === "shop") {
    shopPageLoader();
  } else if (destinationPage === "bookmarks") {
    bookmarkPageLoader();
  } else {
    productPageLoader(destinationPage);
  }
};

const addIdToBookMarks = function (obj, addEntry) {
  model.handleBookMarks(obj, addEntry);
};

const bookmarkDeletionHandler = function (id, addEntry) {
  model.handleBookMarks(id, addEntry);
  BookmarkPageView.render(model.state.bookmarks);
};

const productAnimationHandler = function () {
  shopView._showButtons();
  shopView._hideButtons();
  shopView._productClickHandler(productPageLoader);
};

const loadNextPage = async function (pageNumber) {
  shopView.renderSpinner();
  await model.getPartialRecipes(undefined, pageNumber);
  shopView.render(model.state.fetchedRecipes);
  shopView._scrollViewUp();
};

const init = function () {
  model.instantiateBookmarks();
  homePageLoader();
  homePageEventListeners();
  bookmarkPageEventListeners();
  shopPageEventListeners();
  productPageEventListeners();
};

init();
