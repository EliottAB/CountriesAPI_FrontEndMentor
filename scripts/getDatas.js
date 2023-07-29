const url = "../data/data.json"
let countries
let countryID = 0

//get the coutry or countries datas.
//arguments : targetCountry: string;
export async function getDatas(targetCountry){
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        countries = data
        if (targetCountry === undefined) {
            let countriesinfos = []
            countries.forEach(country => {
                countriesinfos.push({
                    name: country.name,
                    population: country.population,
                    region: country.region,
                    capital: country.capital,
                    flag: country.flag,
                    id: countryID
                })
                countryID++
            });
            return countriesinfos
        }else{
            return countries.find(country => country.name === targetCountry)
        }
    })
    .catch(error => {
        console.log("Une erreur s'est produite :", error);
        return "error"
    });
}