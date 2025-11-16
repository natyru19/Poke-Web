const body = document.body;
const main = document.querySelector(".main");
const header = document.querySelector(".header");
const titlePrincipal = document.createElement("p");
titlePrincipal.classList.add("titlePrincipal");
titlePrincipal.innerText = "Poke Web";
header.appendChild(titlePrincipal);
body.appendChild(header);
body.appendChild(main);

const compareSection = document.createElement("section");
compareSection.classList.add("compareSection");
body.appendChild(compareSection);


const currentPage=1;
let arraySelected = [];

const renderCard = (info) =>{
    let card = document.createElement("div");
        card.classList.add("card");
        
        card.setAttribute("dataId-", info.id)
        let text = document.createElement("p");
        text.classList.add("textName");

        text.innerText = info.name;
        let img = document.createElement("img")
        img.classList.add("cardImg")
        img.setAttribute("src", info.img)

        card.appendChild(img);
        card.appendChild(text);
        main.appendChild(card);

        card.addEventListener("click", ()=>{ 
            
            arraySelected.push(info);
            console.log(arraySelected);
            
            compareSection.innerHTML = "";

            if (arraySelected.length === 2) {

            let poke1 = arraySelected[0];
            let poke2 = arraySelected[1];

            let winner, loser;

            if (poke1.experience > poke2.experience) {
                winner = poke1;
                loser = poke2;
            } else {
                winner = poke2;
                loser = poke1;
            }
            
            arraySelected.forEach(card => {
                let containerCardCompare = document.createElement("div");
                containerCardCompare.classList.add("containerCardCompare");

                let pokeCard = document.createElement("div");
                pokeCard.classList.add("pokeCard");

                if (card === winner) {
                    pokeCard.classList.add("winner");
                }

                if (card === loser) {
                    pokeCard.classList.add("loser");
                }

                let nameCompare = document.createElement("h3");
                nameCompare.classList.add("nameCompare");
                nameCompare.innerText = card.name;

                let imgCompare = document.createElement("img");
                imgCompare.classList.add("imgCompare");
                imgCompare.setAttribute("src", card.img);

                let experienceCompare = document.createElement("p");
                experienceCompare.classList.add("experienceCompare");
                experienceCompare.innerText = card.experience;

                pokeCard.appendChild(nameCompare);
                pokeCard.appendChild(imgCompare);
                pokeCard.appendChild(experienceCompare);
                containerCardCompare.appendChild(pokeCard);
                compareSection.appendChild(containerCardCompare);
            });
            
            let btnReset = document.createElement("button");
            btnReset.classList.add("btnReset");
            btnReset.innerText = "Elegir otros pokemones";
            compareSection.appendChild(btnReset);

            btnReset.addEventListener("click", ()=>{
                compareSection.innerHTML="";
                arraySelected=[];
            });
        };
    });
}

const pokeNames = async() =>{
    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
    const responseData = await response.json();
    
    responseData.results.forEach(async(poke) =>{
        const res = await fetch(poke.url);
        const resData = await res.json();

        const pokeInfo = {
            name: poke.name,
            img:  resData.sprites.other.dream_world.front_default,
            experience: resData.base_experience,
            url : poke.url,
            id : poke.url.split("https://pokeapi.co/api/v2/pokemon/")[1].split("/")[0]
        };
        renderCard(pokeInfo);
    });

    let totalCount = responseData.count;
    let count = document.createElement("p");
    count.classList.add("count");
    count.innerHTML= `<strong>Total de pokemones: </strong> ${totalCount}`
    body.appendChild(count);

    const footer = document.querySelector(".footer");
    const textFooter = document.createElement("p");
    textFooter.classList.add("textFooter");
    textFooter.innerText = "© Natalia Rubio - 2025";
    footer.appendChild(textFooter);
    body.appendChild(footer);
};

pokeNames();






