import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import styles from './Footer.module.css'

const Footer = ({ noBorder }) => (
  <footer>
    <div className={noBorder ? styles.containerNoBorder : styles.container}>
      <Link href="/" passHref>
        <Image src="/images/logomark.svg" width={70} height={32} alt="wunnle logo" />
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/wunnle"
            >
              <Image
                src="/images/twitter.svg"
                width={24}
                height={24}
                alt="wunnle on twitter"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://dribbble.com/wunnle"
            >
              <Image
                src="/images/dribble.svg"
                width={24}
                height={24}
                alt="wunnle on dribbble"
              />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/wunnle">
              <Image
                src="/images/github.svg"
                width={24}
                height={24}
                alt="wunnle on github"
              />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
)

export default Footer
