import { APIURL } from "./config.js";
import { KEY } from "./config.js";
import { PROD_PER_PAGE } from "./config.js";
import { RECIPEURl } from "./config.js";
import { jsonCall } from "./helper.js";

const state = {
  products: [],
  suggestedProducts: [],
  partialProducts: {
    totalProducts: 0,
    currentPage: 1,
    totalPages: 1,
    resultsPerPage: PROD_PER_PAGE,
    results: [],
  },
  recipe: {},
  keyword: "pizza",
};

const getFeaturedRecipes = async function (keyword = state.keyword) {
  try {
    const url = `${APIURL}${keyword}&key=${KEY}`;
    const data = await jsonCall(url);
    state.suggestedProducts = shuffle(data).slice(0, 6);
    state.keyword = keyword;
    console.log(state.suggestedProducts);
  } catch (error) {
    console.log(error);
  }
};

const getPartialProducts = async function (
  keyword = state.keyword,
  pageNumber = -1
) {
  try {
    const url = `${APIURL}${keyword}&key=${KEY}`;
    const data = await jsonCall(url);
    if (data.length > 0) state.keyword = keyword;
    state.products = data;
    state.partialProducts.totalProducts = state.products.length;
    state.partialProducts.totalPages = Math.ceil(
      state.products.length / state.partialProducts.resultsPerPage
    );
    if (pageNumber == -1) {
      state.partialProducts.results = state.products.slice(
        0,
        this.state.partialProducts.resultsPerPage
      );
      state.partialProducts.currentPage = 1;
    } else {
      state.partialProducts.currentPage = pageNumber;
      const bound = pageNumber * state.partialProducts.resultsPerPage;
      state.partialProducts.results = state.products.slice(
        bound - state.partialProducts.resultsPerPage,
        bound
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const getProductRecipe = async function (id) {
  try {
    const url = `${RECIPEURl}${id}?key=${KEY}`;
    const request = await jsonCall(url);
    state.recipe = request;
    console.log(state.recipe);
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

export { state, getFeaturedRecipes, getProductRecipe, getPartialProducts };
