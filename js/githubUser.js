//Receber dados da Api do GitHub
export async function getUsers(userSearch) {
  return fetch(`https://api.github.com/users/${userSearch}`)
    .then((response) => response.json())
    .then((data) => {
     if(data.id === undefined){
      throw new Error("Usuário não encontrado !")
     }
     else{
      return data;
     }
    })
    .catch(alert);
}
