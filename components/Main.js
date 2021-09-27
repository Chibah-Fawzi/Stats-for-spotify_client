import React from 'react'
import Link from "next/link"
import { useRouter } from 'next/router'

import styles from '../styles/Main.module.css'
import Navbar from '../components/Navbar'

export default function Main() {
    const router = useRouter()

    var access_token = router.query.access_token

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.layout}>

                <div className={styles.boxWrapper}>

                    <div className={styles.box}>
                        <Link href={`/artists?access_token=${access_token}`}>
                            <button className={styles.btn}>Your top artists</button>
                        </Link>
                    </div>
                    <br /><div className={styles.box}>
                        <Link href={`/tracks?access_token=${access_token}`}>
                            <button className={styles.btn}>Your top tracks</button>
                        </Link>
                    </div>
                    <br /><div className={styles.box}>
                        <Link href={`/genres?access_token=${access_token}`}>
                            <button className={styles.btn}>Your top genres</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
