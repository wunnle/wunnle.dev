import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import socials from '../socials'
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
            {socials.map(({ href, icon, name }) => (
              <a key={icon} target="_blank" rel="noopener noreferrer" href={href}>
                <Image
                  src={`/images/${icon}.svg`}
                  width={24}
                  height={24}
                  alt={`wunnle on ${name}`}
                />
              </a>
            ))}
          </li>
        </ul>
      </nav>
    </div>
  </footer>
)

export default Footer
