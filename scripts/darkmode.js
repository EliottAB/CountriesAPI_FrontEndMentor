const countriesContainer = document.querySelector(".countries")
const darkModeButton = document.querySelector(".dark-mode-button")
const darkMoon = document.querySelector(".darkmoon")
const lightMoon = document.querySelector(".lightmoon")
const header = document.querySelector("header")
const searching = document.querySelector(".searching")
const backLink = document.querySelector(".backlink")
const countryInfosContainer = document.querySelector(".country-infos-container")
let darkMode = false

//this function change the page as "dark" or "light"
function switchMode() {
    if (darkMode === false) {
        document.body.classList.add("dark")
        header.classList.add("dark")
        darkMoon.style.opacity = "100%"
        lightMoon.style.opacity = "0"
        if (countriesContainer) {
            searching.classList.add("dark")
            countriesContainer.classList.add("dark")
        }else{
            backLink.classList.add("dark")
            countryInfosContainer.classList.add("dark")
        }
        darkMode = true
    }else{
        document.body.classList.remove("dark")
        header.classList.remove("dark")
        darkMoon.style.opacity = "0"
        lightMoon.style.opacity = "100%"
        if (countriesContainer) {
            searching.classList.remove("dark")
            countriesContainer.classList.remove("dark")
        }else{
            backLink.classList.remove("dark")
            countryInfosContainer.classList.remove("dark")
        }
        darkMode = false
    }
}

darkModeButton.addEventListener("click", ()=>{
    switchMode()
})