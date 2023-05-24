import { getUsers } from "./githubUser.js";
import { allUsers } from "./main.js";
import { removeDisplayNoFavs,showDisplayNoFavs } from "./noFavs.js";
// classe que vai conter a lógica dos dados
export class favorite {
  constructor(login, name, public_repos, followers, id) {
    this.login = login;
    this.name = name;
    this.public_repos = public_repos;
    this.followers = followers;
    this.id = id;
  }
}
export async function userData(userSearch) {
  const data = await getUsers(userSearch);
  const user = new favorite(
    data.login,
    data.name,
    data.public_repos,
    data.followers,
    data.id
  );

  add(user);
}

function remove(user) {
  var pos = allUsers.indexOf(user);
  allUsers.splice(pos, 1);
  localStorage.setItem("@github-favorites:", JSON.stringify(allUsers));
  removeTr(user);
}

// Inicialização da Tabela salva no Local Storage
export function showLocalTable() {
  allUsers.forEach((user) => {
    var tbody = document.querySelector("table tbody");
    const row = createRow();
    row.id = user.id;
    row.querySelector(".user img").src = `https://github.com/${user.login}.png`;
    row.querySelector(".user img").alt = `Imagem de ${user.name}`;
    row.querySelector(".user a").href = `https://github.com/${user.login}`;
    row.querySelector(".user p").textContent = user.name;
    row.querySelector(".user span").textContent = user.login;
    row.querySelector(".repositories").textContent = user.public_repos;
    row.querySelector(".followers").textContent = user.followers;
    row.querySelector(".remove").onclick = () => {
      const isOk = confirm("Tem certeza que deseja deletar essa linha?");
      if (isOk) {
        remove(user);
      }
    };
    tbody.append(row);
  });
}

// classe que vai criar a visualização e eventos do HTML

function add(user) {
  try {
    if (allUsers.length > 0) {
      var userCheck = allUsers.find(({ id }) => (id = user.id)); // Se existir algum objeto cujo o ID é o mesmo que o pesquisado retorna  o objeto
      if (userCheck.id === user.id) {
        // Verifica se ambos os IDs são iguais
        throw new Error("Usuário já cadastrado");
      }
    }
    if (user.id === undefined) {
      throw new Error("Usuário não encontrado");
    }
    var tbody = document.querySelector("table tbody");
    const row = createRow();
    row.id = user.id;
    row.querySelector(".user img").src = `https://github.com/${user.login}.png`;
    row.querySelector(".user img").alt = `Imagem de ${user.name}`;
    row.querySelector(".user a").href = `https://github.com/${user.login}`;
    row.querySelector(".user p").textContent = user.name;
    row.querySelector(".user span").textContent = user.login;
    row.querySelector(".repositories").textContent = user.public_repos;
    row.querySelector(".followers").textContent = user.followers;
    row.querySelector(".remove").onclick = () => {
      const isOk = confirm("Tem certeza que deseja deletar essa linha?");
      if (isOk) {
        remove(user);
      
        showDisplayNoFavs(allUsers);
      }
    };

    tbody.append(row);
    allUsers.push(user);
    removeDisplayNoFavs(allUsers);
    localStorage.setItem("@github-favorites:", JSON.stringify(allUsers));
  } catch (error) {
    alert(error.message);
  }
}

function createRow() {
  const tr = document.createElement("tr");
  tr.innerHTML = `<tr id="1">
  <td class="user">
    <img src="" alt="">
    <div class="info-user">
      <a href="">
        <p></p>
        <br>
        <span></span>
      </a>
    </div>
  </td>
  <td class="repositories"></td>
  <td class="followers"></td>
  <td><button class="remove">Remover</button></td>
</tr>`;

  return tr;
}

function removeTr(user) {
  document.getElementById(user.id).remove();
}
