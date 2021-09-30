import React from 'react'
import Link from "next/link"
import { useRouter } from 'next/router'

import styles from '../styles/Main.module.css'
import Navbar from './Navbar'

export default function Main(props) {
    const router = useRouter()

    const { accessToken } = props;

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.layout}>

                <div className={styles.boxWrapper}>

                    <div className={styles.box}>
                        <Link href={`/artists?access_token=${accessToken}`}>
                            <button className={styles.btn}>Your top artists</button>
                        </Link>
                    </div>
                    <br /><div className={styles.box}>
                        <Link href={`/tracks?access_token=${accessToken}`}>
                            <button className={styles.btn}>Your top tracks</button>
                        </Link>
                    </div>
                    <br /><div className={styles.box}>
                        <Link href={`/genres?access_token=${accessToken}`}>
                            <button className={styles.btn}>Your top genres</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
