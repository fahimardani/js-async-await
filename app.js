const resultDiv = document.getElementById('results')
const API_URL = 'https://api.jikan.moe/v4/anime'

async function searchAnime(query) {
    try {
        resultDiv.innerHTML = '<p>Loading...</p>'

        const response = await fetch(`${API_URL}?q=${query}&limit=5`)

        if(!response.ok) {
            throw new Error('Failed to fetch anime data')
        }

        const data = await response.json()
        return data.data
    } 
    catch(error) {
        console.error('An error occured:', error);
        return null
    }
}
function displayResult(animeList) {
    resultDiv.innerHTML = ''

    if(animeList && animeList.length > 0) {
        animeList.forEach(anime => {
            const animeCard = document.createElement('div')
            animeCard.className = 'anime-card'

            const animeRating = document.createElement('div')
            animeRating.className = 'anime-rating' 
            animeRating.innerHTML = `⭐ ${anime.score || 'No Rating'}`
            animeCard.appendChild(animeRating)

            const animeImage = document.createElement('img')
            animeImage.src = anime.images.jpg.image_url
            animeImage.alt = anime.title
            animeCard.appendChild(animeImage)

            const animeDetails = document.createElement('div')
            animeDetails.className = 'anime-details'
            animeDetails.innerHTML = `
                <h3>${anime.title}</h3>
                <p>Episodes: ${anime.episodes || 'Unknown'}</p>
                <p>Status: ${anime.status}</p>
                <p>Studios: <span>${anime.studios?.map(studio => studio.name).join(', ') || 'Unknown'}</span></p>
                <p>Genre: ${anime.genres?.map(genre => genre.name).join(', ') || 'Unknown'}</p>
            `

            animeCard.appendChild(animeDetails)
            resultDiv.appendChild(animeCard)
        });
    } else {
        resultDiv.innerHTML = '<p>No results found.</p>'
    }
}
document.getElementById('searchButton').addEventListener('click', async() => {
    const query = document.getElementById('searchInput').value.trim()

    if(query) {
        const animeList = await searchAnime(query)
        displayResult(animeList)
    } else {
        alert('Please enter an anime title first.')
    }
})