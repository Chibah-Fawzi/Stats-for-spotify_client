import React, { useEffect, useState } from 'react'
import styles from '../styles/User.module.css'

import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useContext } from 'react'
import { globalContext } from '../context'
import cookie from 'react-cookies'



export default function Genres() {

    const [user, setUser] = useState([])
    const { accessToken } = useContext(globalContext)


    const router = useRouter()


    const getToken = async () => {
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
        getToken()
    }, [])

    const LogOut = (e) => {
        e.preventDefault();
        cookie.remove('token', { path: '/' })
        router.push('/')
    }

    return (
        <div>
            <div className={styles.layout}>
                {user.map((u, i) => {
                    return (
                        <div key={i} className={styles.card}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <img src={u.images[0].url} />
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <a href={u.external_urls.spotify}><h1>{u.display_name}</h1></a>
                                    <h4>{u.country}</h4>
                                </div>
                            </div>
                            <div style={{ marginTop: '-30px' }}>
                                <hr style={{ color: '#fff', height: "2px" }} />
                                <h4>{u.email}</h4>
                                <h4>Follower number : {u.followers.total}</h4>
                                <a onClick={LogOut} className={styles.disconnect}>Disconnect</a>
                            </div>
                        </div>
                    )
                }
                )}
            </div>

        </div>
    )
}
