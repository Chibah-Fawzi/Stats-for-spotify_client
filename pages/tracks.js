import React, { useEffect, useState } from 'react'
import styles from '../styles/Tracks.module.css'

import axios from 'axios'
import querystring from 'querystring';

import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'



export default function TopTracks() {
    const [tracks, setTracks] = useState([])

    const router = useRouter()

    var access_token = router.query.access_token

    const getToken = async () => {
        axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5&offset=5', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
        }).then(response => {
            setTracks([response.data.items])

        }).catch(error => { console.log({ msg: error }) })
    }

    useEffect(() => {
        getToken()
    }, [])

    return (
        <div>
            <title>Top Tracks</title>

            <div className={styles.layout}>
                <Navbar />
                {tracks.map((e, i) => e.map((track) => {
                    var src = `https://open.spotify.com/embed/track/${track.id}`
                    return (
                        <div key={i}>
                            <ul className={styles.card}>
                                <li><a href={track.external_urls.spotify}>{track.name}</a></li>

                                <iframe src={src}
                                    width="30%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media" ></iframe>

                                <img src={track.album.images[0].url} />
                                <li>{track.duration_ms}ms</li>
                                <li>{track.album.name}</li>
                                <li><a href={track.artists[0].external_urls.spotify}>{track.artists[0].name}</a></li>
                            </ul>
                            <br style={{ height: '10px', backgroundColor: 'black' }} />
                        </div>
                    )
                })
                )}
            </div>

        </div>
    )
}
