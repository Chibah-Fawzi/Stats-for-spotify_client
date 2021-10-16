import React, { useEffect, useState } from 'react'
import styles from '../styles/Artists.module.css'
import Navbar from '../components/Navbar'
import { globalContext } from '../context'
import axios from 'axios'
import { useRouter } from 'next/router'
import cookie from 'react-cookies'


export default function Genres() {
    const [user, setUser] = useState([])
    const [savedTracksArtists, setSavedTracksArtists] = useState([])
    const [genres, setGenres] = useState([])

    const [accessToken, setAccessToken] = useState(cookie.load('token'));

    const router = useRouter()

    const getData = async () => {
        axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            setUser([response.data])

        }).catch(error => { console.log({ msg: error }) })
    }

    const getArtistsFromSavedTracks = async () => {
        axios.get('https://api.spotify.com/v1/me/tracks', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            setSavedTracksArtists([response.data])

        }).catch(error => { console.log({ msg: error }) })
    }

    const getGenres = async () => {
        axios.get(`https://api.spotify.com/v1/artists/?ids=${artistsTracks[0]}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            let res = [response.data.artists]
            res.map(e => {
                [e].map((g => {
                    g.map(a => {
                        setGenres([a.genres]);
                    })
                }))
            })
        }).catch(error => { console.log({ msg: error }) })
    }


    var artistsTracks = savedTracksArtists.map(e => {
        return e.items.map(i => {
            return i.track.artists[0].id
        })
    })

    // function mode(arr) {
    //     var result = arr.sort((a, b) =>
    //         arr.filter(v => v === a).length
    //         - arr.filter(v => v === b).length
    //     ).pop();
    //     console.log(result);
    // }

    useEffect(() => {

        const tok = new URL(window.location.href).search.split('access_token=')[1]
        if (tok != null) {
            const token = tok
            cookie.save('token', token, { path: '/' })
            setAccessToken(token)
        } else if (tok == undefined) {
            cookie.remove('token', { path: '/' })
            router.push('/')

        }
        getData();
        getArtistsFromSavedTracks();
        getGenres();
        // mode(genres[0]);
    }, [])

    // console.log(genres);

    return (
        <div className={styles.container}>
            <title>Top Genres</title>
            <globalContext.Provider value={{ accessToken, setAccessToken }}>
                <div className={styles.layout}>
                    <h1>Your top genres</h1>
                    <Navbar />
                    {/* <div id='display' className={styles.displayWrapper}>
                        {genres.map(e => {
                            return e
                        })}
                    </div> */}
                    <h2 style={{ color: 'var(--main-text)', textTransform: 'uppercase', fontSize: '14px' }}>Coming Soon</h2>
                </div>
            </globalContext.Provider>
            <style global jsx>{`
        body{
            background: #4a2e2e;
        }`}</style>
        </div >
    )
}
