import React, { useEffect, useState } from 'react'
import Main from '../components/Main'
import Homepage from '../components/Homepage'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import cookie from 'react-cookies'

import { globalContext } from '../context'




export default function Stats() {
  const [accessToken, setAccessToken] = useState(cookie.load('token'));
  var router = useRouter()

  useEffect(() => {
    const tok = new URL(window.location.href).search.split('access_token=')[1]
    if (tok != null) {
      const token = tok
      cookie.save('token', token, { path: '/' })
      setAccessToken(token)
    }
  }, [])

  return (
    <div className={styles.container}>
      <title>Spotify App</title>
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
