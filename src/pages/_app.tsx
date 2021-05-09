import '../sytles/global.scss'
import styles from '../sytles/app.module.scss'
import Player from '../components/Player'
import Header from '../components/Header'
import { PlayerContextProvider } from '../contexts/PlayerContext'


function MyApp({ Component, pageProps }) {
  return(
    <PlayerContextProvider>
      <div className={styles.appWrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
   
}

export default MyApp
