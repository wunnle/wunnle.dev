import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

import styles from './Header.module.css'

const Header = () => (
  <header className={styles.header}>
    <div className={styles.headerInner}>
      <Link href="/" passHref>
        <Image
          src="/images/logo.svg"
          width={136}
          height={42}
          alt="wunnle logo"
          className={styles.logo}
        />
      </Link>
      <Script src="https://www.poeticmetric.com/poeticmetric.js"></Script>
      <nav className={styles.nav}>
        <a href="https://wunnle.com/">Blog</a>
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
