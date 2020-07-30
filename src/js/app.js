const characterslist = document.getElementById("charactersList");
const url = "http://hp-api.herokuapp.com/api/characters";
const searchBar = document.getElementById("searchBar");
let hpCharacters = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;

  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.house.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});
const loadCharacters = async () => {
  try {
    const res = await fetch(url);
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
  } catch (err) {
    console.log(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
        <li class="character">
            <h2>${character.name}</h2>
            <p>${character.house}</p>
            <img src="${character.image}"/>
        </li>
        `;
    })
    .join("");
  characterslist.innerHTML = htmlString;
};

loadCharacters();
