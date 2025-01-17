import { APIURL } from "./config.js";
import { KEY } from "./config.js";
import { PROD_PER_PAGE } from "./config.js";
import { RECIPEURl } from "./config.js";
import { jsonCall } from "./helper.js";

const state = {
  fetchedRecipes: {
    keyword: "pizza",
    totalProducts: 0,
    currentPage: 1,
    totalPages: 1,
    resultsPerPage: PROD_PER_PAGE,
    results: [],
  },
  recipe: {},
  bookmarks: [],
};

const instantiateBookmarks = function () {
  const storage = localStorage.getItem("bookmarks");
  if (!storage) return;
  state.bookmarks = JSON.parse(storage);
};

const handleBookMarks = function (recipeObj, addEntry) {
  if (addEntry) {
    state.bookmarks.push(recipeObj);
  } else {
    state.bookmarks = state.bookmarks.filter((bookmark) => {
      return bookmark.id !== recipeObj.id;
    });
  }
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
  console.log(state.bookmarks);
};

const getPartialRecipes = async function (
  keyword = state.fetchedRecipes.keyword,
  pageNumber = -1,
  resultsPerPage = state.fetchedRecipes.resultsPerPage
) {
  try {
    const url = `${APIURL}${keyword}&key=${KEY}`;
    const temp = await jsonCall(url);
    const data = shuffle(temp);
    if (data.length > 0 && state.bookmarks.length > 0) {
      Object.values(data).forEach((obj) => {
        for (const bookmark of state.bookmarks) {
          obj.bookmarked = bookmark.id === obj.id ? true : false;
          if (obj.bookmarked === true) {
            break;
          }
        }
      });
    }
    state.fetchedRecipes.keyword = keyword;
    state.fetchedRecipes.totalProducts = data.length;
    state.fetchedRecipes.totalPages = Math.ceil(
      data.length / state.fetchedRecipes.resultsPerPage
    );
    if (pageNumber == -1) {
      if (resultsPerPage != state.fetchedRecipes.resultsPerPage) {
        const unbookmarkedRecipes = data.filter(
          (recipe) => recipe.bookmarked != true
        );
        state.fetchedRecipes.results = unbookmarkedRecipes.slice(
          0,
          resultsPerPage
        );
      } else {
        state.fetchedRecipes.results = data.slice(
          0,
          state.fetchedRecipes.resultsPerPage
        );
      }
      state.fetchedRecipes.currentPage = 1;
    } else {
      state.fetchedRecipes.currentPage = pageNumber;
      const bound = pageNumber * state.fetchedRecipes.resultsPerPage;
      state.fetchedRecipes.results = data.slice(
        bound - state.fetchedRecipes.resultsPerPage,
        bound
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const getRecipe = async function (id, isBookmarked = false) {
  try {
    const url = `${RECIPEURl}${id}?key=${KEY}`;
    const request = await jsonCall(url);
    state.recipe = request;
    state.recipe.bookmarked = isBookmarked;
  } catch (error) {
    console.log(error);
  }
};

function shuffle(array) {
  const temp = array;
  let currentIndex = temp.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [temp[currentIndex], temp[randomIndex]] = [
      temp[randomIndex],
      temp[currentIndex],
    ];
  }
  return temp;
}

export {
  state,
  getRecipe,
  instantiateBookmarks,
  getPartialRecipes,
  handleBookMarks,
  bookmarkSearch,
};
