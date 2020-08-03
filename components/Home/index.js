import SEO from '../SEO'
import WorkList from '../WorkList'
import styles from './Home.module.css'

const Home = () => (
  <div className={styles.home}>
    <SEO
      title="Wunnle | Portfolio"
      description="Portfolio of Sinan, a web developer and UI/UX designer"
    />
    <WorkList />
  </div>
)

export default Home
