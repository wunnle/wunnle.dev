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
        <Link href="https://blog.wunnle.com/">
          <a>Blog</a>
        </Link>
        <Link href="https://wunnle.dev/">
          <a>Portfolio</a>
        </Link>
        <Link href="mailto:me@wunnle.com">
          <a target="_blank" rel="noopener noreferrer">
            Contact
          </a>
        </Link>
      </nav>
    </div>
  </header>
)

export default Header
