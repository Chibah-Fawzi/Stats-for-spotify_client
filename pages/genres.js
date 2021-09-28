import React, { useEffect, useState } from 'react'
import styles from '../styles/Genres.module.css'
import Navbar from '../components/Navbar'
import { globalContext } from '../context'
import axios from 'axios'
import { useRouter } from 'next/router'
import cookie from 'react-cookies'

export default function Genres() {
    const [user, setUser] = useState([])


    const { accessToken } = useContext(globalContext)

    const getData = async () => {
        if (accessToken) {
            axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
            }).then(response => {
                setUser([response.data])

            }).catch(error => { console.log({ msg: error }) })
        }
    }


    useEffect(() => {

        if (accessToken != null) {
            cookie.save('token', token, { path: '/' })
        }
        getData();
    }, [])


    return (
        <div>
            <title>User information</title>
            <globalContext.Provider value={{ accessToken, setAccessToken }}>
                <div className={styles.layout}>
                    <Navbar />
                    {user.map((u, i) => {
                        return (
                            <div key={i} className={styles.card}>
                                <img src={u.images[0].url} />
                                <a href={u.external_urls.spotify}><h1>{u.display_name}</h1></a>
                                <h4>{u.email}</h4>
                                <h4>{u.country}</h4>
                                <h4>Follower number : {u.followers.total}</h4>
                            </div>
                        )
                    }
                    )}
                </div>
            </globalContext.Provider>
        </div>
    )
}
