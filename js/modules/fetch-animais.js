import AnimaNumeros from "./anima-numeros.js";

export default function fetchAnimais(url, target) {
  //Cria a div contendo informações com o total de animais
  function createAnimal(animal) {
    const div = document.createElement("div");
    div.classList.add("numero-animal");

    div.innerHTML = `<h3>${animal.especie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  //Preenche cada animal no DOM
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  //Anima os numeros de cada animal
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros("[data-numero]", ".numeros", "ativo");
    animaNumeros.init();
  }

  //Puxa os animais através de um arquivo JSON e cria cada animal utilizando createAnimal
  async function criarAnimais() {
    try {
      //Fetch e espera a resposta e transforma a resposta em JSON
      const animaisResponse = await fetch(url);
      const animaisJSON = await animaisResponse.json();

      //Após a transformação de JSON, ativa a função de preencher e animar
      animaisJSON.forEach((animal) => preencherAnimais(animal));
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }
  return criarAnimais();
}
