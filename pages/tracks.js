import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/Artists.module.css'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { globalContext } from '../context'
import cookie from 'react-cookies'
import Image from 'next/image'

export default function Toptracks(props) {
    const [selected, setSelected] = useState('')
    const [handleSelect, setHandleSelect] = useState(false)

    const [tracksMonth, setTracksMonth] = useState([])
    const [tracksHalfYear, setTracksHalfYear] = useState([])
    const [tracksAllTime, setTracksAllTime] = useState([])

    const [accessToken, setAccessToken] = useState(cookie.load('token'));



    const getData = async () => {
        axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            setTracksMonth([response.data.items])

        }).catch(error => { console.log({ msg: error }) })
        axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            setTracksHalfYear([response.data.items])

        }).catch(error => { console.log({ msg: error }) })
        axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            setTracksAllTime([response.data.items])

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
            <title>Top tracks</title>
            <globalContext.Provider value={{ accessToken, setAccessToken }}>
                <div className={styles.layout}>
                    <h1>Your top tracks</h1>
                    <div className={styles.boxes}>
                        <button id='lastMonth' onClick={() => handleToggle(0)} className={styles.btn}>Last month</button>
                        <button id='halfYear' onClick={() => handleToggle(1)} className={styles.btn}>Last 6 months</button>
                        <button id='allTime' onClick={() => handleToggle(2)} className={styles.btn}>All time</button>
                    </div>
                    <Navbar />
                    <div className={styles.displayWrapper}>
                        {selected === 0 && handleSelect ? <LastMonth setSelected={setSelected} tracksMonth={tracksMonth} /> : selected === 1 && handleSelect ? <HalfYear tracksHalfYear={tracksHalfYear} /> : selected === 2 && handleSelect ? <AllTime tracksAllTime={tracksAllTime} /> : ''}
                    </div>
                </div>
            </globalContext.Provider>
        </div>
    )
}


const LastMonth = (props) => {
    const { tracksMonth } = props
    return (
        <div className={styles.display}>

            {tracksMonth.map((e, i) => e.map((track) => {
                var src = `https://open.spotify.com/embed/track/${track.id}`
                return (
                    <div key={i}>
                        <ul className={styles.card}>
                            <li><a href={track.external_urls.spotify}><h3>{track.name}</h3></a></li>

                            {/* <iframe src={src}
                                width="30%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media" ></iframe> */}

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
    )
}
const HalfYear = (props) => {
    const { tracksHalfYear } = props

    return (
        <div className={styles.display}>
            {tracksHalfYear.map((e, i) => e.map((track) => {
                var src = `https://open.spotify.com/embed/track/${track.id}`
                return (
                    <div key={i}>
                        <ul className={styles.card}>
                            <li><a href={track.external_urls.spotify}><h3>{track.name}</h3></a></li>

                            {/* <iframe src={src}
                                width="30%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media" ></iframe> */}

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
    )
}
const AllTime = (props) => {
    const { tracksAllTime } = props

    return (
        <div className={styles.display}>
            {tracksAllTime.map((e, i) => e.map((track) => {
                var src = `https://open.spotify.com/embed/track/${track.id}`
                return (
                    <div key={i}>
                        <ul className={styles.card}>
                            <li><a href={track.external_urls.spotify}><h3>{track.name}</h3></a></li>

                            {/* <iframe src={src}
                                width="30%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media" ></iframe> */}

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
    )
}

