//Habilita e desabilita o display noFavs

export function removeDisplayNoFavs(allUsers) {
  if (allUsers.length != 0) {
    document.getElementById("noFavsDisplayID").style.display = "none";
  }
}

export function showDisplayNoFavs(allUsers) {
  if (allUsers.length === 0) {
    document.getElementById("noFavsDisplayID").style.display = "flex";
  }
}
