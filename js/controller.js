import * as model from "./model.js";
import landingView from "../view/landingPageView.js";
import recipeView from "../view/recipePageView.js";
import shopView from "../view/shopView.js";
import BookmarkPageView from "../view/BookmarkPageView.js";

const featuredProdLoader = async function (keyword) {
  await model.getPartialRecipes(keyword, undefined, 6);
  console.log(model.state.fetchedRecipes);
  landingView.render(model.state.fetchedRecipes);
  landingView._colapsibleTextHandler();
  landingView._exploreClickHandler(loadShopView);
};

const navigationHandler = function (destinationPage) {
  console.log(destinationPage);
  if (destinationPage === "home") {
    featuredProdLoader();
  } else if (destinationPage === "shop") {
    loadShopView();
  } else if (destinationPage === "account") {
    bookmarkPageLoader();
  } else {
    //do nothing for now
  }
};

const addIdToBookMarks = function (obj, addEntry) {
  console.log("controller function");
  model.handleBookMarks(obj, addEntry);
};

const bookmarkSearchHandler = function (value) {
  model.bookmarkSearch(value);
  //BookmarkPageView.render(model.state.bookmarks);
};

const bookmarkDeletionHandler = function (id) {
  model.deleteBookmark(id);
  BookmarkPageView.render(model.state.bookmarks);
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

const bookmarkPageLoader = function () {
  BookmarkPageView.render(model.state.bookmarks);
  BookmarkPageView._searchInputHandler(bookmarkSearchHandler);
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
  recipeView._slider();
  shopView._optionClickHandler(loadShopView);
  shopView._searchProductHandler(loadShopView);
  shopView._pageButtonClickHandler(loadNextPage);
  shopView._arrowButtonClickHandler(loadNextPage);
  shopView._addToBookMark(addIdToBookMarks);
  BookmarkPageView._deleteBookMarkHandler(bookmarkDeletionHandler);
  BookmarkPageView._recipeClickHandler(loadProductPage);
};

init();
