function mostrarData() {
  const data = document.getElementById("data");
  let dateElement = new Date();

  const dia = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sabado",
  ];
  const ano = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  let day =
    dia[dateElement.getDay()] +
    ", " +
    dateElement.getDate() +
    " " +
    ano[dateElement.getMonth()] +
    " " +
    dateElement.getFullYear();
  console.log(day);

  data.textContent = day;
}

mostrarData();

const listElement = document.querySelector(".container_box ul");
const inputElement = document.querySelector(".container_box input");

let tarefas = JSON.parse(localStorage.getItem("@listasTarefas")) || [];

function renderTarefas() {
  listElement.innerHTML = "";
  tarefas.forEach((t, index) => {
    const liElement = document.createElement("li");
    liElement.className = "checked";
    const textElement = document.createTextNode(t);

    const excluirElement = document.createElement("a");
    excluirElement.setAttribute("href", "#");
    excluirElement.className = "link-1";
    const iconElement = document.createElement("img");
    iconElement.src = "assets/lata.png";
    excluirElement.appendChild(iconElement);
    iconElement.style.width = "16px";
    iconElement.style.height = "16px";

    const editElement = document.createElement("a");
    editElement.setAttribute("href", "#");
    editElement.className = "link-2";
    const editIcon = document.createElement("img");
    editIcon.src = "assets/editar.png";
    editElement.appendChild(editIcon);
    editIcon.style.width = "16px";
    editIcon.style.width = "16px";

    excluirElement.setAttribute("onclick", `excluir(${index})`);
    editElement.setAttribute("onclick", `editar(${index})`);
    

    liElement.appendChild(textElement);
    listElement.appendChild(liElement);
    liElement.appendChild(excluirElement);
    liElement.appendChild(editElement);
  });
}
renderTarefas();

listElement.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      salvarDados();
    }
  },
  false
);

function addTarefas() {
  if (inputElement.value === "") {
    alert("Digite uma tarefa!");
    return false;
  } else {
    let novaTarefa = inputElement.value;
    if (novaTarefa.length <= 25) {
      tarefas.push(novaTarefa);
    } else {
      alert("Tarefa muito grande!");
    }

    inputElement.value = "";
    renderTarefas();
    salvarDados();
  }
}

inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTarefas();
  }
});

renderTarefas();
salvarDados();

function excluir(n) {
  tarefas.splice(n, 1);
  renderTarefas();
  salvarDados();
}

function editar(n) {
  const inputEdit = document.createElement("input");
  const liElement = document.querySelectorAll("li")[n];

  inputEdit.value = liElement.textContent;
  inputEdit.classList.add("edit-input");
  liElement.innerHTML = "";
  liElement.appendChild(inputEdit);
  inputEdit.style.textAlign = "left";

  inputEdit.focus();

  inputEdit.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const novoValor = inputEdit.value.trim();
      if (novoValor !== "") {
        tarefas[n] = novoValor;
      }

      renderTarefas();
      salvarDados();
    }
  });
}

function salvarDados() {
  localStorage.setItem("@listasTarefas", JSON.stringify(tarefas));
}
