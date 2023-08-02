import { getDatas } from "./getDatas.js";

const urlParams = new URLSearchParams(window.location.search)
const countryID = urlParams.get("id")
const datas = await getDatas(countryID)

const countryContainer = document.querySelector(".country-infos")
const nameContainer = document.querySelector(".country-name")
const flagContainer = document.querySelector(".country-flag")
const infosContainer = document.querySelector(".country-infos")
const detailsContainer = document.querySelector(".country-details")
const borderList = document.querySelector(".border-countries ul")

const details = [
    "<span>Native Name: </span>" + datas.nativeName,
    "<span>Population: </span>" + (datas.population ? datas.population.toLocaleString("en-US") : datas.population),
    "<span>Region: </span>" + datas.region,
    "<span>Sub Region: </span>" + datas.subregion,
    "<span>Capital: </span>" + datas.capital,
    "<span>Top Level Domain: </span>" + datas.topLevelDomain,
    "<span>Currencies: </span>" + datas.currencies,
    "<span>Languages: </span>" + getLanguages()
]

function renderCountry(){
    if (typeof datas === "object") {
        const countryFlag = document.createElement("img")
        
        countryFlag.setAttribute("src", datas.flag)
        countryFlag.setAttribute("alt", datas.name ? datas.name : "country" + " flag")
        nameContainer.innerHTML = datas.name
        
        flagContainer.appendChild(countryFlag)

        //this code put the country details in the DOM
        details.forEach(detail => {
            let newDetail = document.createElement("li")
            newDetail.innerHTML = detail
            detailsContainer.appendChild(newDetail)
        });

        //this code put the country border-countries list in the DOM (&in the list)
        if (datas.borders.length === 0) {
            borderList.innerHTML = "<li>None</li>"
        }else{
            datas.borders.forEach(border => {
                const newBorder = document.createElement("li")
                newBorder.innerHTML = border
                borderList.appendChild(newBorder)
            })
        }
    }else{
        countryContainer.innerHTML = ""
        const errorMessage = document.createElement("p")
        errorMessage.classList.add("error-message")
        errorMessage.innerHTML = "Une erreur s'est produite..."
        countryContainer.appendChild(errorMessage)
    }
}

function getLanguages(){
    let languages = ""
    if (Array.isArray(datas.languages)) {
        datas.languages.forEach((lang, index) => {
            if (index+1 === datas.languages.length) {
                languages += lang.name
            }else{
                languages += lang.name + ", "
            }
        });
        return languages
    }else{
        return undefined
    }
}


renderCountry()