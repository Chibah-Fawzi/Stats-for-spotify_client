import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/Artists.module.css'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { globalContext } from '../context'
import cookie from 'react-cookies'

export default function TopArtists() {
    const [artists, setArtists] = useState([])

    const [accessToken, setAccessToken] = useState(cookie.load('token'));



    const getData = async () => {
        axios.get('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5&offset=5', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            setArtists([response.data.items])
            console.log(response.data)

        }).catch(error => { console.log({ msg: error }) })
    }

    useEffect(() => {

        const tok = new URL(window.location.href).search.split('access_token=')[1]
        if (tok != null) {
            const token = tok
            cookie.save('token', token, { path: '/' })
            setAccessToken(token)
        }
        getData();
    }, [])


    console.log(accessToken);

    return (
        <div>
            <title>Top Artists</title>
            <globalContext.Provider value={{ accessToken, setAccessToken }}>
                <div className={styles.layout}>
                    <Navbar />
                    {artists.map((e, i) => e.map((artist) => {
                        return (
                            <>
                                <div className={styles.card}>
                                    <img height={artist.images[0].height} src={artist.images[0].url}></img>
                                    <h2>{artist.name}</h2>
                                    <h4>Genre : {artist.genres[0]}</h4>
                                    <h4>Follower number : {artist.followers.total}</h4>
                                    <h4><a href={artist.external_urls.spotify}>Ecouter {artist.name}</a></h4>
                                </div>
                            </>
                        )
                    })
                    )}
                </div>
            </globalContext.Provider>

        </div>
    )
}
