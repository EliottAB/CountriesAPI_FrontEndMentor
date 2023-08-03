import { getDatas } from "./getDatas.js";

const urlParams = new URLSearchParams(window.location.search)
const countryID = urlParams.get("id")
const countryDatas = await getDatas(countryID)
const allDatas = await getDatas()

const countryContainer = document.querySelector(".country-infos")
const nameContainer = document.querySelector(".country-name")
const flagContainer = document.querySelector(".country-flag")
const infosContainer = document.querySelector(".country-infos")
const detailsContainer = document.querySelector(".country-details")
const borderList = document.querySelector(".border-countries ul")

const details = [
    "<span>Native Name: </span>" + countryDatas.nativeName,
    "<span>Population: </span>" + (countryDatas.population ? countryDatas.population.toLocaleString("en-US") : countryDatas.population),
    "<span>Region: </span>" + countryDatas.region,
    "<span>Sub Region: </span>" + countryDatas.subregion,
    "<span>Capital: </span>" + countryDatas.capital,
    "<span>Top Level Domain: </span>" + countryDatas.topLevelDomain,
    "<span>Currencies: </span>" + countryDatas.currencies,
    "<span>Languages: </span>" + getLanguages()
]

function renderCountry(){
    if (typeof countryDatas === "object") {
        const countryFlag = document.createElement("img")
        
        countryFlag.setAttribute("src", countryDatas.flag)
        countryFlag.setAttribute("alt", countryDatas.name ? countryDatas.name : "country" + " flag")
        nameContainer.innerHTML = countryDatas.name
        
        flagContainer.appendChild(countryFlag)

        //this code put the country details in the DOM
        details.forEach(detail => {
            let newDetail = document.createElement("li")
            newDetail.innerHTML = detail
            detailsContainer.appendChild(newDetail)
        });

        //this code put the country border-countries list in the DOM (&in the list)
        if (countryDatas.borders.length === 0) {
            borderList.innerHTML = "<li>None</li>"
        }else{
            countryDatas.borders.forEach(border => {
                const newBorder = document.createElement("li")
                const newBorderLink = document.createElement("a")
                const borderID = allDatas.find(country => {
                    return country.name === border
                }).id
                newBorderLink.setAttribute("href", "country.html?id=" + borderID)
                newBorderLink.innerHTML = border
                newBorder.appendChild(newBorderLink)
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
    if (Array.isArray(countryDatas.languages)) {
        countryDatas.languages.forEach((lang, index) => {
            if (index+1 === countryDatas.languages.length) {
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