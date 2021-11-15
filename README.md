# spotify-tracks

On this project the ideia is to implement a Machine Learning model that will predict the populary of a track on Spotify.

The project is separated in two main modules:
* a Node.js service to fetch data tracks from Spotify API and save it on CSV files. 
* a data preprocessing and model evaluation/creation script made on Python using [Google Research Colab](https://colab.research.google.com/).

The team members are [guivahl](https://github.com/guivahl) and [gabrielgomes0](https://github.com/gabrielgomes0).

## Node.js Service

When searching for tracks, you may use different filters. We have decided to fetch data from the year of 2021 and also with specific genres [(top 10 genres of Brazil).](https://g1.globo.com/pop-arte/musica/noticia/2020/12/26/forro-cresce-no-streaming-e-supera-audicao-de-rap-e-pop-nacional-puxado-pela-pisadinha.ghtml)

### Installation
- [Node.JS](https://nodejs.org/en/) >= 14.17.0 version
- [Yarn](https://yarnpkg.com/) >= 1.22.5 version

### Run Locally

- Install packages with the command `yarn`
- Create a `.env` file and add your Spotify Credentials (you may rename `.env.example`)
- Run `yarn start`

### Documentation
- [Spotify Dev](https://developer.spotify.com/)
- [Spotify API Node](https://github.com/thelinmichael/spotify-web-api-node)

## Python Colab

- [Script and Documentation](https://github.com/guivahl/spotify-tracks/blob/main/colab/Spotify.ipynb)