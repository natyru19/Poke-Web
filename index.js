const body = document.body;
const main = document.querySelector(".main");
body.appendChild(main);

const currentPage=1;
const selected = [];

const pokeNames = async() =>{
    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
    const responseData = await response.json();
    
    responseData.results.map(async(poke) =>{
        const res = await fetch(poke.url);
        const resData = await res.json();

        const pokeInfo = {
            name: poke.name,
            img:  resData.sprites.other.dream_world.front_default,
            experience: resData.base_experience,
            url : poke.url,
            id : poke.url.split("https://pokeapi.co/api/v2/pokemon/")[1].split("/")[0]
        };
        let card = document.createElement("div");
        card.classList.add("card");
        
        card.setAttribute("dataId-",pokeInfo.id)
        let text = document.createElement("p");
        text.classList.add("textName");

        text.innerText = pokeInfo.name;
        let img = document.createElement("img")
        img.classList.add("cardImg")
        img.setAttribute("src",pokeInfo.img)

        main.appendChild(card);
        card.appendChild(img);
        card.appendChild(text);

        card.addEventListener("click", async (e)=>{
            
            selected.push(pokeInfo);            
            
            if(selected.length==2){
                const poke1 = selected[0];
                const poke2 = selected[1]; 
                                            
                if(poke1.experience>poke2.experience){
                    const containerCompare = document.createElement("div");
                    containerCompare.classList.add("containerCompare");

                    containerCompare.innerHTML = `
                        <h2 class="titleCompare">Comparación de experiencia</h2>

                        <div class="compare">

                            <div class="poke-card winner">
                                <h3>${poke1.name.toUpperCase()}</h3>
                                <img src="${poke1.img}">
                                <p>Experiencia: ${poke1.experience}</p>
                            </div>

                            <div class="poke-card loser">
                                <h3>${poke2.name}</h3>
                                <img src="${poke2.img}">
                                <p>Experiencia: ${poke2.experience}</p>
                            </div>

                        </div>`;

                    body.appendChild(containerCompare);

                    //selected.length=0;
                }
            }
        });
    });

    let totalCount = responseData.count;
    let count = document.createElement("p");
    count.classList.add("count");

    count.innerHTML= `<strong>Total de pokemones: </strong> ${totalCount}`
    body.appendChild(count);
};

pokeNames();

