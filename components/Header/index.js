import Link from 'next/link'

import logo from './logo.svg'
import styles from './style.css'

const Header = () => (
  <header className={styles.header}>
    <div className={styles.headerInner}>
      <Link href="/">
        <a>
          <img className={styles.logo} src={logo} width="150" alt="" />
        </a>
      </Link>
    </div>
  </header>
)

export default Header
