
const dataInfo = {
    "count": 1328,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    "previous": null,
    "results": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        },
        {
            "name": "venusaur",
            "url": "https://pokeapi.co/api/v2/pokemon/3/"
        },
        {
            "name": "charmander",
            "url": "https://pokeapi.co/api/v2/pokemon/4/"
        },
        {
            "name": "charmeleon",
            "url": "https://pokeapi.co/api/v2/pokemon/5/"
        },
        {
            "name": "charizard",
            "url": "https://pokeapi.co/api/v2/pokemon/6/"
        },
        {
            "name": "squirtle",
            "url": "https://pokeapi.co/api/v2/pokemon/7/"
        },
        {
            "name": "wartortle",
            "url": "https://pokeapi.co/api/v2/pokemon/8/"
        },
        {
            "name": "blastoise",
            "url": "https://pokeapi.co/api/v2/pokemon/9/"
        },
        {
            "name": "caterpie",
            "url": "https://pokeapi.co/api/v2/pokemon/10/"
        },
        {
            "name": "metapod",
            "url": "https://pokeapi.co/api/v2/pokemon/11/"
        },
        {
            "name": "butterfree",
            "url": "https://pokeapi.co/api/v2/pokemon/12/"
        },
        {
            "name": "weedle",
            "url": "https://pokeapi.co/api/v2/pokemon/13/"
        },
        {
            "name": "kakuna",
            "url": "https://pokeapi.co/api/v2/pokemon/14/"
        },
        {
            "name": "beedrill",
            "url": "https://pokeapi.co/api/v2/pokemon/15/"
        },
        {
            "name": "pidgey",
            "url": "https://pokeapi.co/api/v2/pokemon/16/"
        },
        {
            "name": "pidgeotto",
            "url": "https://pokeapi.co/api/v2/pokemon/17/"
        },
        {
            "name": "pidgeot",
            "url": "https://pokeapi.co/api/v2/pokemon/18/"
        },
        {
            "name": "rattata",
            "url": "https://pokeapi.co/api/v2/pokemon/19/"
        },
        {
            "name": "raticate",
            "url": "https://pokeapi.co/api/v2/pokemon/20/"
        }
    ]
};

let arraySelected = [];
let winner, loser, equal;
let poke1;
let poke2;
let firstSelectedCard = null;
let limit = 20;
let currentPage = 1;
let totalPages = 0;
let card1;
let card2;

let main = document.querySelector(".main");

const createHeader = () => {    
    let header = document.querySelector(".header");
    const titlePrincipal = document.createElement("p");
    titlePrincipal.classList.add("titlePrincipal");
    titlePrincipal.innerText = "Poke Web";
    header.appendChild(titlePrincipal);
    return header;
};

const body = document.body;

let sectionCompare = document.querySelector(".sectionCompare");
let sectionPaginate = document.querySelector(".sectionPaginate");

let containerCardCompare = document.createElement("div");
containerCardCompare.classList.add("containerCardCompare");

const renderCard = (info) =>{
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = info.id;
    
    let text = document.createElement("p");
    text.classList.add("textName");
    text.innerText = info.name;

    let img = document.createElement("img")
    img.classList.add("cardImg")
    img.setAttribute("src", info.img)

    card.appendChild(img);
    card.appendChild(text);
    main.appendChild(card);

    selectedCard(info, card);
};

const selectedCard = (info, card) =>{

    card.addEventListener("click", ()=>{
        
        if(arraySelected.length == 0){
            firstSelectedCard = card;
            card.classList.add("disabled");
        }
        
        arraySelected.push(info);

        sectionCompare.innerHTML = "";
        containerCardCompare.innerHTML = "";

        let titleCompareSection = document.createElement("h3");
        titleCompareSection.classList.add("titleCompareSection");
        titleCompareSection.innerText = "Tabla de compraración";
        sectionCompare.appendChild(titleCompareSection);

        if(arraySelected.length==1){            
            poke1 = arraySelected[0];
            renderCardCompare(poke1);
            return;
        }

        if (arraySelected.length == 2) {
            
            if (firstSelectedCard) {
                firstSelectedCard.classList.remove("disabled");
                firstSelectedCard = null;
            };
            
            poke2 = arraySelected[1];

            if (poke1.experience > poke2.experience){
                winner = poke1;                
                loser = poke2;                
            } else if(poke2.experience > poke1.experience){
                winner = poke2;
                loser = poke1;
            } else if(poke1.experience == poke2.experience){
                expCompare = [poke1.experience, poke2.experience];
                equal = expCompare[0];
            };
        
        renderCardCompare(poke1);
        renderCardCompare(poke2);
        arraySelected=[];
        poke1 = null;
        poke2 = null;
        winner = null;
        loser = null;
        equal = null;

        let btnReset = document.createElement("button");
        btnReset.classList.add("btnReset");
        btnReset.innerText = "Elegir otros pokemones";
        

        btnReset.addEventListener("click", ()=>{

            if (firstSelectedCard) {
                firstSelectedCard.classList.remove("disabled");
                firstSelectedCard = null;
            };

            sectionCompare.innerHTML="";
            containerCardCompare.innerHTML = "";
            arraySelected=[];
            poke1 = null;
            poke2 = null;
            winner = null;
            loser = null;
            equal = null;
        });
        
        sectionCompare.appendChild(btnReset);
        return;
        };
        
    });
};

const renderCardCompare = (cardCompare) => {            

            let pokeCard = document.createElement("div");
            pokeCard.classList.add("pokeCard");

            if (cardCompare.id == winner?.id) {
                pokeCard.classList.add("winner");
            };

            if (cardCompare.id == loser?.id) {
                pokeCard.classList.add("loser");
            };            
            
            if(cardCompare.experience == equal){    
                pokeCard.classList.add("equal");
            }

            let nameCompare = document.createElement("h3");
            nameCompare.classList.add("nameCompare");
            nameCompare.innerText = cardCompare.name;

            let imgCompare = document.createElement("img");
            imgCompare.classList.add("imgCompare");
            imgCompare.setAttribute("src", cardCompare.img);

            let experienceCompare = document.createElement("p");
            experienceCompare.classList.add("experienceCompare");
            experienceCompare.innerText = cardCompare.experience;

            pokeCard.appendChild(nameCompare);
            pokeCard.appendChild(imgCompare);
            pokeCard.appendChild(experienceCompare);

            containerCardCompare.appendChild(pokeCard);
            sectionCompare.appendChild(containerCardCompare);
};

const createPagination = (totalCount) =>{
    const containerPagination = document.createElement("div");
    containerPagination.classList.add("containerPagination");

    containerPagination.innerText = "";
    const totalPages = Math.ceil(totalCount / limit);
    
    sectionPaginate.innerHTML = "";

    const btnPrev = document.createElement("button");
    btnPrev.classList.add("btnPrev");
    btnPrev.innerText = "< Anterior";
    btnPrev.disabled = currentPage == 1;

    btnPrev.addEventListener("click", () => {        
        currentPage--;
        getData(currentPage);
    });

    containerPagination.appendChild(btnPrev);

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if(currentPage <= 3){
        end = Math.min(5, totalPages);
    }

    if(currentPage >= totalPages - 2){
        start = Math.max(totalPages - 4, 1);
    }

    if(start > 1){
        addPageButton(containerPagination, 1);
        containerPagination.appendChild(createDots());
    }

    for(let i=start; i<=end; i++){
        addPageButton(containerPagination, i);
    }

    if(end < totalPages){
        containerPagination.appendChild(createDots());
        addPageButton(containerPagination, totalPages);
    }

    const btnNext = document.createElement("button");
    btnNext.classList.add("btnNext");
    btnNext.innerText = "Siguiente >";
    btnNext.disabled = currentPage == totalPages;

    btnNext.addEventListener("click", () => {
        currentPage++;        
        getData(currentPage);
    });
    containerPagination.appendChild(btnNext);
    sectionPaginate.appendChild(containerPagination);
    
};

const addPageButton = (containerPagination, page) => {
    const btnPage = document.createElement("button");
    btnPage.innerText = page;    
    
    if(page == currentPage){
        btnPage.classList.add("active");
    }

    btnPage.addEventListener("click", () => {
        currentPage = page;
        getData(currentPage);
    });

    containerPagination.appendChild(btnPage);
};

const createDots = () => {
    const spanDots = document.createElement("span");
    spanDots.innerText = "...";
    spanDots.classList.add("dots");
    return spanDots;
};

const getData = async(page = 1) =>{

    main.innerHTML = "";
    sectionCompare.innerHTML = "";
    
    let offset = (page - 1) * limit;
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    const response = await fetch(url);
    const responseData = await response.json();

    //const responseData = dataInfo;

    let totalCount = responseData.count;
    createPagination(totalCount);
    
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
};

const createFooter = () => {
    let footer = document.querySelector(".footer");
    const textFooter = document.createElement("p");
    textFooter.classList.add("textFooter");
    textFooter.innerText = "© Natalia Rubio - 2025";
    footer.appendChild(textFooter);
    return footer;
};

const init = () => {
    createHeader();
    getData(1);
    createFooter();
};

init();