import Head from 'next/head'

import DotWave from '../../components/Intro/DotWave'
import styles from './sandbox.module.css'

// A bare page for trying out the dot wave on its own, full screen.
const Sandbox = () => (
  <>
    <Head>
      <title>Sandbox</title>
      <meta name="robots" content="noindex" />
    </Head>
    <div className={styles.stage}>
      <DotWave className={styles.wave} />
    </div>
  </>
)

export default Sandbox
