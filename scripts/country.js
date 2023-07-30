const darkModeButton = document.querySelector(".dark-mode-button")
const header = document.querySelector("header")
let darkMode = false

//this function change the page as "dark" or "light"
function switchMode() {
    if (darkMode === false) {
        document.body.classList.add("dark")
        header.classList.add("dark")
        darkMode = true
    }else{
        document.body.classList.remove("dark")
        header.classList.remove("dark")
        darkMode = false
    }
}

darkModeButton.addEventListener("click", ()=>{
    switchMode()
})