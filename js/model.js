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
};

const getFeaturedRecipes = async function (
  keyword = state.fetchedRecipes.keyword
) {
  try {
    const url = `${APIURL}${keyword}&key=${KEY}`;
    const data = await jsonCall(url);
    state.fetchedRecipes.keyword = keyword;
    state.fetchedRecipes.results = shuffle(data).slice(0, 6);
  } catch (error) {
    console.log(error);
  }
};

const getPartialRecipes = async function (
  keyword = state.fetchedRecipes.keyword,
  pageNumber = -1
) {
  try {
    const url = `${APIURL}${keyword}&key=${KEY}`;
    const data = await jsonCall(url);
    if (data.length > 0) state.keyword = keyword;
    state.fetchedRecipes.totalProducts = data.length;
    state.fetchedRecipes.totalPages = Math.ceil(
      data.length / state.fetchedRecipes.resultsPerPage
    );
    if (pageNumber == -1) {
      state.fetchedRecipes.results = data.slice(
        0,
        state.fetchedRecipes.resultsPerPage
      );
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

const getRecipe = async function (id) {
  try {
    const url = `${RECIPEURl}${id}?key=${KEY}`;
    const request = await jsonCall(url);
    state.recipe = request;
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

export { state, getFeaturedRecipes, getRecipe, getPartialRecipes };
