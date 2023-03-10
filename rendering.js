let debounceTimeout;
export function renderFavCountries(favCountries,removeFav) {
    let favourites = document.getElementById('favItems');

    favourites.innerText = '';
    favCountries.forEach(country => {
        let favCountry =document.createElement('div');
        favCountry.classList.add('d-flex', 'justify-content-between' ,'mt-3','favItem');
        favCountry.innerHTML+=`<a href="details.html?id=${country.cca3}">
                            <div class="text-color">
                                <img class="rounded fav-img"  src="${country.flags.svg}" alt="">
                                <span class="fs-7 fw-semibold">${country.name.common}</span>
                            </div>
                            </a>
                            <i id='c${country.cca3}' class="bi bi-x-circle-fill text-color removeFav"></i>`;

       favourites.appendChild(favCountry);
        favCountry.querySelector('i').addEventListener('click', (e) => {

            removeFav(country.cca3);
        });
    });


}
export function onFavDrop(callBack) {
    let favList = document.getElementById('favList');


    favList.addEventListener("dragover", (event) => {
        event.preventDefault();
        favList.classList.add("hovered");
    });
    favList.addEventListener("dragleave", () => {
        favList.classList.remove("hovered");
    });

    favList.addEventListener('drop', async (e) => {
        favList.classList.remove("hovered");
        console.log(e.dataTransfer.getData("text"));
        callBack(e.dataTransfer.getData("text"));
    });
}

export function onSearch(callBack) {


    document.getElementById('searchInput').addEventListener("input", async (event) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            callBack(event.target.value);
        }, 300);


    });


}

export function onFilterChange(callBack) {
    let items = document.getElementsByClassName('dropdown-item');
    Object.keys(items).forEach(key => {
        items[key].addEventListener("click", async (event) => {
            clearTimeout(debounceTimeout);

            debounceTimeout = setTimeout(() => {

                callBack(event.target.value);
                document.getElementById("dropDown").innerHTML = event.target.textContent;
            }, 300);

        });
    })


}

export function renderCountries(countries, callback) {
    let countriesContainer = document.getElementById("countries");
    countriesContainer.innerHTML = "";
    if (countries) {

        countries.forEach(c => {
            let name, population, capital, flag, code, region;

            name = c.name.common;
            population = c.population;
            capital = c.capital;
            flag = c.flags.svg;
            code = c.cca3;
            region = c.region;
            let countryCard = document.createElement('a');
            countryCard.href = `details.html?id=${code}`;
            countryCard.setAttribute('draggable', `true`);
            countryCard.classList.add('country', 'col-lg-4', 'col-md-6');

            countryCard.innerHTML += `
        <div class="rounded border-0 element-bg shadow-sm  h-100  " style="overflow: hidden;">
       
            <img draggable="false" class="card-img-top  " src="${flag}" alt="${name}" >
            
            <div class="text-color  ps-3   fw-semibold ">
                <div class="py-3 fs-5 fw-bold">${name}</div>
                <div class=" fs-7 fw-semibold">Population: <span class=" fw-light feature-value color-text">${population.toLocaleString()}</span></div>
                <div class=" fs-7 fw-semibold">Region: <span class=" feature-value fw-light">${region}</span></div>
                <div class=" fs-7 fw-semibold ">Capital: <span class=" feature-value fw-light">${capital}</span></div>
                
            </div>
            <div style="color: darkgray" class="text-end mt-3" >
             <i id='s${code}' class="m-2 bi bi-star-fill addFav"></i>
</div>
        </div>
    `;


            countryCard.addEventListener('dragstart', (event) => {


                event.dataTransfer.setData("text", code);
                event.target.style.opacity = '0.5';


            });
            countryCard.addEventListener('dragend', (event) => {
                event.target.style.opacity = '1';
            });
            countriesContainer.appendChild(countryCard);

        });



    }




}