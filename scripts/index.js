import { getDatas } from "../scripts/getDatas.js";

const countriesContainer = document.querySelector(".countries")
const filterInput = document.querySelector(".searching select")
const searchInput = document.querySelector(".searchbar input")
const datas = await getDatas()

//this function render the good countries
function renderCountries(){
    countriesContainer.innerHTML = ""
    datas.forEach(country => {
        //this condition check the filters and search inputs
        if (
            (country.region.toLowerCase() === filterInput.value || filterInput.value === "") 
            && 
            (simplifyString(country.name).includes(simplifyString(searchInput.value)) || simplifyString(country.capital).includes(simplifyString(searchInput.value)))
            ){   
            const linkToCountry = document.createElement("a")
            const newCountry = document.createElement("section")
            const countryFlag = document.createElement("img")
            const countryName = document.createElement("p")
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
    if(countriesContainer.childElementCount === 0){
        let noCountry = document.createElement("p")
        noCountry.classList.add("no-country")
        noCountry.innerHTML = "No country found"
        countriesContainer.appendChild(noCountry)
    }
}

//this function transform the string to make it "compatible"
function simplifyString(string){
    return String(string).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

filterInput.addEventListener("change", ()=>{
    renderCountries()
})

searchInput.addEventListener("input", ()=>{
    renderCountries()
})

renderCountries()