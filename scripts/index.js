import { getDatas } from "../scripts/getDatas.js";

const countriesContainer = document.querySelector(".countries")
const filterInput = document.querySelector(".searching select")
const datas = await getDatas()
console.log(filterInput.value)

function renderCountries(){
    countriesContainer.innerHTML = ""
    datas.forEach(country => {
        if (country.region.toLowerCase() === filterInput.value || filterInput.value === "" || filterInput.value === "Filter by Region") {   
            const linkToCountry = document.createElement("a")
            const newCountry = document.createElement("section")
            const countryFlag = document.createElement("img")
            const countryName = document.createElement("h4")
            const countryPopulation = document.createElement("p")
            const countryRegion = document.createElement("p")
            const countryCapital = document.createElement("p")
            
            linkToCountry.setAttribute("href", "pages/country.html"  + "?id=" + country.id)
            countryFlag.setAttribute("src", country.flag)
            countryFlag.setAttribute("alt", country.name + " flag")
            countryName.innerHTML = country.name
            countryPopulation.innerHTML = "<span class='infotitle'>Population: </span>" + (country.population ? country.population.toLocaleString("en-US") : country.population)
            countryRegion.innerHTML = "<span class='infotitle'>Region: </span>" + country.region
            countryCapital.innerHTML = "<span class='infotitle'>Capital: </span>" + country.capital
    
            countryFlag.classList.add("country-flag")
            countryName.classList.add("country-name")
            countryPopulation.classList.add("country-population")
            countryRegion.classList.add("country-region")
            countryCapital.classList.add("country-capital")
    
            let countryinfos = [countryFlag, countryName, countryPopulation, countryRegion, countryCapital]
            countryinfos.forEach(element => {
                newCountry.appendChild(element)
                linkToCountry.appendChild(newCountry)
            });
            countriesContainer.appendChild(linkToCountry)
        }
    });
}

filterInput.addEventListener("change", ()=>{
    renderCountries()
})

renderCountries()