export async function GET() {
    const countries = await (await fetch('https://restcountries.com/v3.1/all')).json()
    const countryNames = countries.map((country: { name: { common: string } }) => country.name.common)
    return Response.json({ countries: countryNames.sort() })
}
