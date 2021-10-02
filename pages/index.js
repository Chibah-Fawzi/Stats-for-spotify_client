import React, { useEffect, useState } from 'react'
import Main from '../components/Main'
import Homepage from '../components/Homepage'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import cookie from 'react-cookies'

import { globalContext } from '../context'




export default function Stats() {
  const [accessToken, setAccessToken] = useState(cookie.load('token'));
  const router = useRouter()

  useEffect(() => {
    const tok = new URL(window.location.href).search.split('access_token=')[1]
    const refTok = new URL(window.location.href).search.split('refresh_token=')[1]
    if (tok != null) {
      const token = tok
      cookie.save('token', token, { path: '/' })
      setAccessToken(token)
    }
    // else if (tok == undefined) {
    //   const token = refTok
    //   cookie.save('token', token, { path: '/' })
    //   setAccessToken(token)
    // }
  }, [])

  return (
    <div className={styles.container}>
      <link rel="icon" href='favicon.ico' type="image/x-icon"></link>
      <title>Stats for Spotify</title>
      <globalContext.Provider value={{ accessToken, setAccessToken }}>
        {accessToken ?
          <Main accessToken={accessToken} /> :
          <Homepage cookie={cookie} accessToken={accessToken} setAccessToken={setAccessToken} />
        }
      </globalContext.Provider>
      <style global jsx>{`
        body{
            background: #4a2e2e;
        }`}</style>
    </div>
  )

}
