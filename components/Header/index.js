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
      <nav className={styles.nav}>
        <a href="https://blog.wunnle.com/">Blog</a>
        <a href="https://wunnle.dev/">Portfolio</a>
        <a
          className={styles.contactLink}
          href="mailto:me@wunnle.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
      </nav>
    </div>
  </header>
)

export default Header
