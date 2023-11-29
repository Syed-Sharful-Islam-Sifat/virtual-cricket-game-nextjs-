import '../styles/globals.css'
import { StatProvider } from '../providers/playerStatProvider'
function MyApp({ Component, pageProps }) {
  return(
    <StatProvider>
      <Component {...pageProps} />
    </StatProvider>
  )
  
}

export default MyApp
