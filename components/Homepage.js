import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Homepage() {
  var router = useRouter();

  const Login = () => {
    router.push("https://rahma-app.onrender.com/login");
  };

  return (
    <div className={styles.homepageContainer}>
      <div className={styles.brand}>
        <Link href="/">
          <a>
            <h1>Stats For Spotify</h1>
          </a>
        </Link>
      </div>
      <div className={styles.hero}>
        <h1>GET YOUR SPOTIFY STATS AND FIND OUT WHAT YOU LISTEN TO THE MOST</h1>
        <h4>Information and statistics about your Spotify account.</h4>
      </div>
      <div className={styles.btnWrapper}>
        <button className={styles.btn} onClick={Login}>
          Sign in with Spotify
        </button>
      </div>
      <div className={styles.legalInfos}>
        <h6>
          Your stats report is 100% private.
          <br />
          We don&apos;t store user&apos;s Spotify data.
        </h6>
      </div>
    </div>
  );
}
