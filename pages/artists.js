import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/Artists.module.css'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { globalContext } from '../context'
import cookie from 'react-cookies'

import { useRouter } from 'next/router'

export default function TopArtists(props) {
    const [selected, setSelected] = useState('')
    const [handleSelect, setHandleSelect] = useState(false)

    const [artistsMonth, setArtistsMonth] = useState([])
    const [artistsHalfYear, setArtistsHalfYear] = useState([])
    const [artistsAllTime, setArtistsAllTime] = useState([])

    const [accessToken, setAccessToken] = useState(cookie.load('token'));

    const router = useRouter()

    const getData = async () => {
        axios.get('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            setArtistsMonth([response.data.items])

        }).catch(error => { console.log({ msg: error }) })
        axios.get('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            setArtistsHalfYear([response.data.items])

        }).catch(error => { console.log({ msg: error }) })
        axios.get('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            setArtistsAllTime([response.data.items])

        }).catch(error => { console.log({ msg: error }) })
    }

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
    }, [])

    const handleToggle = (n) => {
        setSelected(n)

        if (n == selected) {
            setHandleSelect(!handleSelect);
        } else {
            setHandleSelect(true);
        }
    }

    return (
        <div className={styles.container}>
            <title>Top Artists</title>
            <globalContext.Provider value={{ accessToken, setAccessToken }}>
                <div className={styles.layout}>
                    <h1>Your top artists</h1>
                    <div className={styles.boxes}>
                        <button id='lastMonth' onClick={() => handleToggle(0)} className={styles.btn}>Last month</button>
                        <button id='halfYear' onClick={() => handleToggle(1)} className={styles.btn}>Last 6 months</button>
                        <button id='allTime' onClick={() => handleToggle(2)} className={styles.btn}>All time</button>
                    </div>
                    <Navbar />
                    <div className={styles.displayWrapper}>
                        {selected === 0 && handleSelect ? <LastMonth setSelected={setSelected} artistsMonth={artistsMonth} /> : selected === 1 && handleSelect ? <HalfYear artistsHalfYear={artistsHalfYear} /> : selected === 2 && handleSelect ? <AllTime artistsAllTime={artistsAllTime} /> : ''}
                    </div>
                </div>
            </globalContext.Provider>
            <style global jsx>{`
        body{
            background: #4a2e2e;
        }`}</style>
        </div>
    )
}


const LastMonth = (props) => {
    const { artistsMonth } = props
    return (
        <div className={styles.display}>

            {artistsMonth.map((e, i) => e.map((artist, index) => {
                return (
                    <div key={i} className={styles.card}>
                        <img height={artist.images[0].height} src={artist.images[0].url}></img>
                        <h2>{index + 1}. {artist.name}</h2>
                        <h4><span>Genre : </span>{artist.genres[0]}</h4>
                        <h4><span>Followers : </span>{artist.followers.total}</h4>
                        <a target="_blank" rel="noreferrer" href={artist.external_urls.spotify}>
                            <h4>
                                <span>
                                    Ecouter <i>{artist.name}</i>
                                </span>
                            </h4>
                        </a>
                    </div>
                )
            })
            )}
        </div>
    )
}
const HalfYear = (props) => {
    const { artistsHalfYear } = props

    return (
        <div className={styles.display}>
            {artistsHalfYear.map((e, i) => e.map((artist, index) => {
                return (
                    <div key={i} className={styles.card}>
                        <img height={artist.images[0].height} src={artist.images[0].url}></img>
                        <h2>{index + 1}. {artist.name}</h2>
                        <h4><span>Genre : </span>{artist.genres[0]}</h4>
                        <h4><span>Followers : </span>{artist.followers.total}</h4>
                        <a target="_blank" rel="noreferrer" href={artist.external_urls.spotify}>
                            <h4>
                                <span>
                                    Ecouter <i>{artist.name}</i>
                                </span>
                            </h4>
                        </a>
                    </div>
                )
            })
            )}
        </div>
    )
}
const AllTime = (props) => {
    const { artistsAllTime } = props

    return (
        <div className={styles.display}>
            {artistsAllTime.map((e, i) => e.map((artist, index) => {
                return (
                    <div key={i} className={styles.card}>
                        <img height={artist.images[0].height} src={artist.images[0].url}></img>
                        <h2>{index + 1}. {artist.name}</h2>
                        <h4><span>Genre : </span>{artist.genres[0]}</h4>
                        <h4><span>Followers : </span>{artist.followers.total}</h4>
                        <a target="_blank" rel="noreferrer" href={artist.external_urls.spotify}>
                            <h4>
                                <span>
                                    Ecouter <i>{artist.name}</i>
                                </span>
                            </h4>
                        </a>
                    </div>
                )
            })
            )}
        </div>
    )
}

