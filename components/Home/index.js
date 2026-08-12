import SEO from '../SEO'
import WorkList from '../WorkList'
import styles from './Home.module.css'

const Home = () => (
  <div className={styles.home}>
    <SEO
      title="Wunnle | Portfolio"
      description="Portfolio of Sinan, an Istanbul based software engineer who leads teams that ship"
    />
    <WorkList />
  </div>
)

export default Home
