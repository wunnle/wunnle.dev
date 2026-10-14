import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import DotWave from '../Intro/DotWave'
import socials from '../socials'
import styles from './Footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    {/* the same dot sea as the hero, rising from the bottom of the page behind the footer */}
    <div className={styles.sea} aria-hidden="true">
      {/* a slice of a hero-sized view, so it matches the hero's angle; lifted towards the horizon,
          where the dots are denser */}
      <DotWave className={styles.seaCanvas} viewHeight={1080} viewLift={320} />
    </div>
    <div className={styles.container}>
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
