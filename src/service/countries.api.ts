export const getCountries = async () => {
    return await fetch('/api/countries')
        .then((a) => a.json())
        .catch((error) => console.error(error));
}
