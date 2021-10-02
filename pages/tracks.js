import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/Artists.module.css'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { globalContext } from '../context'
import cookie from 'react-cookies'
import Image from 'next/image'
import { useRouter } from 'next/router'


export default function Toptracks(props) {
    const [selected, setSelected] = useState('')
    const [handleSelect, setHandleSelect] = useState(false)

    const [tracksMonth, setTracksMonth] = useState([])
    const [tracksHalfYear, setTracksHalfYear] = useState([])
    const [tracksAllTime, setTracksAllTime] = useState([])

    const [accessToken, setAccessToken] = useState(cookie.load('token'));

    const router = useRouter()


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

    const MstoMn = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
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
            <globalContext.Provider value={{ accessToken, setAccessToken }}>
                <title>Top tracks</title>
                {accessToken ?
                    <div className={styles.layout}>
                        <h1>Your top tracks</h1>
                        <div className={styles.boxes}>
                            <button id='lastMonth' onClick={() => handleToggle(0)} className={styles.btn}>Last month</button>
                            <button id='halfYear' onClick={() => handleToggle(1)} className={styles.btn}>Last 6 months</button>
                            <button id='allTime' onClick={() => handleToggle(2)} className={styles.btn}>All time</button>
                        </div>
                        <Navbar />
                        <div className={styles.displayWrapper}>
                            {selected === 0 && handleSelect ? <LastMonth MstoMn={MstoMn} setSelected={setSelected} tracksMonth={tracksMonth} /> : selected === 1 && handleSelect ? <HalfYear tracksHalfYear={tracksHalfYear} MstoMn={MstoMn} /> : selected === 2 && handleSelect ? <allTime tracksAllTime={tracksAllTime} MstoMn={MstoMn} /> : ''}
                        </div>
                    </div>
                    : <h1>Login</h1>}
            </globalContext.Provider>
            <style global jsx>{`
        body{
            background: #4a2e2e;
        }`}</style>
        </div>
    )
}


const LastMonth = (props) => {
    const { tracksMonth, MstoMn } = props
    return (
        <div className={styles.display}>

            {tracksMonth.map((e, i) => e.map((track, index) => {
                var src = `https://open.spotify.com/embed/track/${track.id}`
                return (
                    <div key={i}>
                        <div className={styles.card}>

                            {/* <iframe src={src}
                                width="30%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media" ></iframe> */}

                            <img src={track.album.images[0].url} />
                            <a target="_blank" rel="noreferrer" href={track.external_urls.spotify}><h2>{index + 1}. {track.name}</h2></a>
                            <h4><span>Time : </span>{MstoMn(track.duration_ms)}</h4>
                            <h4><span>Album : </span>{track.album.name}</h4>
                            <h4><span>Artist : </span>  <a target="_blank" rel="noreferrer" href={track.artists[0].external_urls.spotify}>{track.artists[0].name}</a></h4>
                        </div>
                        <br style={{ height: '10px', backgroundColor: 'black' }} />
                    </div>
                )
            })
            )}
        </div>
    )
}
const HalfYear = (props) => {
    const { tracksHalfYear, MstoMn } = props

    return (
        <div className={styles.display}>
            {tracksHalfYear.map((e, i) => e.map((track, index) => {
                var src = `https://open.spotify.com/embed/track/${track.id}`
                return (
                    <div key={i}>
                        <div className={styles.card}>

                            {/* <iframe src={src}
                                width="30%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media" ></iframe> */}

                            <img src={track.album.images[0].url} />
                            <a target="_blank" rel="noreferrer" href={track.external_urls.spotify}><h2>{index + 1}. {track.name}</h2></a>
                            <h4><span>Time : </span>{MstoMn(track.duration_ms)}</h4>
                            <h4><span>Album : </span>{track.album.name}</h4>
                            <h4><span>Artist : </span>  <a target="_blank" rel="noreferrer" href={track.artists[0].external_urls.spotify}>{track.artists[0].name}</a></h4>
                        </div>
                        <br style={{ height: '10px', backgroundColor: 'black' }} />
                    </div>
                )
            })
            )}
        </div>
    )
}
const AllTime = (props) => {
    const { tracksAllTime, MstoMn } = props

    return (
        <div className={styles.display}>
            {tracksAllTime.map((e, i) => e.map((track, index) => {
                var src = `https://open.spotify.com/embed/track/${track.id}`
                return (
                    <div key={i}>
                        <div className={styles.card}>

                            {/* <iframe src={src}
                                width="30%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media" ></iframe> */}

                            <img src={track.album.images[0].url} />
                            <a target="_blank" rel="noreferrer" href={track.external_urls.spotify}><h2>{index + 1}. {track.name}</h2></a>
                            <h4><span>Time : </span>{MstoMn(track.duration_ms)}</h4>
                            <h4><span>Album : </span>{track.album.name}</h4>
                            <h4><span>Artist : </span>  <a target="_blank" rel="noreferrer" href={track.artists[0].external_urls.spotify}>{track.artists[0].name}</a></h4>
                        </div>
                        <br style={{ height: '10px', backgroundColor: 'black' }} />
                    </div>
                )
            })
            )}
        </div>
    )
}

