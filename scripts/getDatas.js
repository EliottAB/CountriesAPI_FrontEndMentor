const url = "../data/data.json"
let countries
let countryID = 0

//get the coutry or countries datas.
//arguments : targetIndex: number;
export async function getDatas(targetIndex){
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        countries = data
        if (targetIndex === undefined) {
            let countriesinfos = []
            countries.forEach(country => {
                countriesinfos.push({
                    name: country.name,
                    population: country.population,
                    region: country.region ? country.region : "undefined",
                    capital: country.capital,
                    flag: country.flag,
                    id: countryID
                })
                countryID++
            });
            return countriesinfos
        }else{
            let country = countries[targetIndex]
            let countryinfos = {
                name: country.name,
                flag: country.flag,
                nativeName: country.nativeName,
                population:  country.population,
                region: country.region,
                subregion: country.subregion,
                capital: country.capital,
                topLevelDomain: Array.isArray(country.topLevelDomain) ? country.topLevelDomain[0] : undefined,
                currencies: Array.isArray(country.currencies) ? country.currencies[0].name : undefined,
                languages: Array.isArray(country.languages) ? country.languages : undefined,
                borders : getBorders(countries, country)
            }
            console.log(getBorders(countries, country))
            return countryinfos
        }
    })
    .catch(error => {
        console.log("Une erreur s'est produite :", error);
        return "error"
    });
}

function getBorders(countries, country){
    const borders = countries
        .filter(element => country.borders && country.borders.includes(element.alpha3Code))
        .map(element => element.name);
    return borders
}