import { showLocalTable, userData } from "./favorites.js";
import { removeDisplayNoFavs } from "./noFavs.js";
const searchButton = document.getElementById("search-button");
var userSearch = "";
searchButton.addEventListener("click", () => {
  userSearch = document.getElementById("search-text").value;
  userData(userSearch);
});
var allUsers = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
export { allUsers };
removeDisplayNoFavs(allUsers);
showLocalTable();
