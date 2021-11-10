import SpotifyWebApi from 'spotify-web-api-node'
import dotenv from 'dotenv'
import cron from 'node-cron'
import fs from 'fs'
import path from 'path'

const limit = 50
let offset = 0

const envPath = path.resolve('.env')
const csvPath = path.resolve('csv/', 'tracks.csv')

dotenv.config({
  path: envPath
})

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
})

const columns = 
    `id,name,popularity,duration_ms,explicit,track_number,type,release_date,album_name,album_total_tracks,artist_id,artist_name,acousticness,danceability,energy,instrumentalness,key,liveness,loudness,mode,speechiness,tempo,time_signature,valence\n`

fs.writeFileSync(csvPath, columns, { flag: 'w+' })

const updateExpiryToken = async () => {
    const { body } = await spotifyApi.clientCredentialsGrant()

    spotifyApi.setAccessToken(body.access_token);
}

const retrieveTracks = async () => {
    const { body: initialTracks } = await spotifyApi.searchTracks('year:2021', {
        offset,
        limit
    })
    
    const tracksIds = initialTracks.tracks.items.map(({ id }) => id)
    
    const { body: audioFeatures } = await spotifyApi.getAudioFeaturesForTracks(tracksIds)

    const tracksObjectInfo = initialTracks.tracks.items.map(track => {
        const audioFeature = audioFeatures.audio_features.find(audioFeat => audioFeat.id === track.id)

        return {
            id: track.id || '',
            name: track.name || '',
            popularity: track.popularity || '',
            duration_ms: track.duration_ms || '',
            explicit: track.explicit || '',
            track_number: track.track_number || '',
            type: track.type || '',
            release_date: track.album.release_date || '',
            album_name: track.album.name || '',
            album_total_tracks: track.album.total_tracks || '',
            artist_id: track.artists[0].id || '',
            artist_name: track.artists[0].name || '',
            acousticness: audioFeature.acousticness || '',
            danceability: audioFeature.danceability || '',
            energy: audioFeature.energy || '',
            instrumentalness: audioFeature.instrumentalness || '',
            key: audioFeature.key || '',
            liveness: audioFeature.liveness || '',
            loudness: audioFeature.loudness || '',
            mode: audioFeature.mode || '',
            speechiness: audioFeature.speechiness || '',
            tempo: audioFeature.tempo || '',
            time_signature: audioFeature.time_signature || '',
            valence: audioFeature.valence || ''
        }
    })

    const tracksCsvInfo = tracksObjectInfo.reduce((acc, track) => 
        acc.concat(Object.values(track).toString(), '\n'), ''
    )

    fs.writeFileSync(csvPath, tracksCsvInfo, { flag: 'a+' })
}

updateExpiryToken()

cron.schedule('*/15 * * * * *', () => {
    const timestamp = new Date().toLocaleString()
    
    console.log(`CRON RUNNING AT: ${timestamp}`)
    console.log(`OFFSET: ${offset} || LIMIT: ${limit}`)

    retrieveTracks()

    offset = offset + 50;
});

cron.schedule('40 * * * *', () => {
    const timestamp = new Date().toLocaleString()

    console.log(`\nUPDATING EXPIRY_TOKEN: ${timestamp}`)
    
    updateExpiryToken()
});