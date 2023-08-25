let countries
let countryID = 0

//get the country or countries datas.
//arguments : url: string; targetIndex: number;
export async function getDatas(url="./data/data.json", targetIndex){
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        countries = data ? data : []
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
                borders : Array.isArray(country.borders) ? getBorders(countries, country) : []
            }
            return countryinfos
        }
    })
    .catch(error => {
        console.log("Une erreur s'est produite :", error);
        return undefined
    });
}

function getBorders(countries, country){
    const borders = countries
        .filter(element => country.borders && country.borders.includes(element.alpha3Code))
        .map(element => element.name);
    return borders
}