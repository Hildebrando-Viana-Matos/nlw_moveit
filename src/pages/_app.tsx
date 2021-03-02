//Aqui colocamos componentes onde aparecem em todas as páginas
import '../styles/global.css'; //Importando o CSS

function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  )
}


export default MyApp
