import "../styles/globals.scss";

import { PlayerContextProvider } from "../contexts/PlayerContext";
import { Header } from "../components/Header";
import { Player } from "../components/Player";

import styles from "../styles/app.module.scss";

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.appWrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );
}

export default MyApp;
