import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/Navv.module.css'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import User from './User'

export default function Navv() {
    const router = useRouter()
    const [navbar, setNavbar] = useState(false);

    useEffect(() => {
        const changeBackground = () => {
            if (window.scrollY >= 100) {
                setNavbar(true)
            } else {
                setNavbar(false)
            }
        }
        window.addEventListener('scroll', changeBackground)
    }, [navbar])

    var access_token = router.query.access_token
    const activeClass = () => {
        setActive(true);
    }

    return (
        <nav>
            < Navbar className={navbar ? styles.active : styles.nav} fixed="top" expand="lg" variant="light" >
                <Navbar.Brand className={styles.navBrand}>
                    <Link href={`/?access_token=${access_token}`}>
                        <a>SFS</a>
                    </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={styles.navList}>

                        <Nav.Link>
                            <Link href={`/?access_token=${access_token}`}>
                                <a className={styles.link}>Home</a>
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link href={`/artists?access_token=${access_token}`}>
                                <a className={styles.link}>Top Artists</a>
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link href={`/tracks?access_token=${access_token}`}>
                                <a className={styles.link}>Top Tracks</a>
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link href={`/genres?access_token=${access_token}`}>
                                <a className={styles.link}>Top Genres</a>
                            </Link>
                        </Nav.Link>
                        <User />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </nav >
    )
}

