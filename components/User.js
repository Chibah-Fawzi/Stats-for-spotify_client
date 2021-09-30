import React, { useEffect, useState } from 'react'
import styles from '../styles/User.module.css'

import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useContext } from 'react'
import { globalContext } from '../context'
import cookie from 'react-cookies'
import { MdArrowDropDownCircle } from '@react-icons/all-files/md/MdArrowDropDownCircle'
export default function Genres() {

    const [user, setUser] = useState([])
    const { accessToken } = useContext(globalContext)
    const [selected, setSelected] = useState(false)


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
        <div className={styles.container}>
            <div className={styles.layout}>
                {user.map((u, i) => {
                    return (
                        <div key={i} className={styles.card}>
                            <div className={styles.avatar} onClick={() => setSelected(!selected)}>
                                <div className={styles.avatarPlaceholder}></div>
                                <img src={u.images[0].url} /><span style={{ paddingLeft: '5px' }}><MdArrowDropDownCircle /></span>
                            </div>
                            <div className={selected ? styles.visible : styles.hidden}>
                                <div>
                                    <a href={u.external_urls.spotify}><h3>{u.display_name}</h3></a>
                                    <h4>{u.country}</h4>
                                </div>
                                <div>
                                    <h4>{u.email}</h4>
                                    <h4>Follower number : {u.followers.total}</h4>
                                    <a onClick={LogOut} className={styles.disconnect}>Disconnect</a>
                                </div>
                            </div>
                        </div>
                    )
                }
                )}
            </div>

        </div>
    )
}
