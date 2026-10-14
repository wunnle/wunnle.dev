import Image from 'next/image'

import socials from '../socials'
import DotWave from './DotWave'
import styles from './Intro.module.css'

const Intro = () => {
  return (
    // clips the full-width decoration sideways only, so it never adds a horizontal scrollbar
    <div className={styles.hero}>
      <div className={styles.intro}>
        {/* background decoration: a 3D dot wave and registration marks */}
        <div className={styles.decor} aria-hidden="true">
          <div className={styles.dots}>
            <DotWave className={styles.dotsCanvas} />
          </div>
          <span className={[styles.cross, styles.crossLeft].join(' ')} />
          <span className={[styles.cross, styles.crossRight].join(' ')} />
        </div>
        <div className={styles.shortOne}>
          <p className={styles.greeting}>Hi, I’m Sinan.</p>
          <p className={styles.myTitle}>I lead teams that ship</p>
          <a target="_blank" rel="noopener noreferrer" href="mailto:me@wunnle.com">
            <button className={styles.helloButton}>Say hello</button>
          </a>
          <ul className={styles.socials}>
            {socials.map(({ href, icon, name }) => (
              <li key={icon}>
                <a target="_blank" rel="noopener noreferrer" href={href}>
                  <Image
                    src={`/images/${icon}.svg`}
                    width={24}
                    height={24}
                    alt={`wunnle on ${name}`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.longOne}>
          <p>
            I’m an Istanbul based software engineer, building for the web for over 15
            years. I’ve been leading engineering teams for a good part of that. I work
            across the stack, mostly with <strong>TypeScript</strong>,{' '}
            <strong>React</strong> and <strong>Next.js</strong> on the front end and{' '}
            <strong>Node.js</strong> on the back.
          </p>
          <p>
            Lately I’ve been spending most of my time on <strong>AI</strong> and{' '}
            <strong>LLM</strong> products.
          </p>
          <p>
            I’m also the organizer of{' '}
            <a
              href="https://kommunity.com/reactjs-istanbul"
              target="_blank"
              rel="noreferrer"
            >
              React Istanbul
            </a>
            , a community for React developers in Istanbul.
          </p>
          <p>
            I’m currently leading engineering at{' '}
            <a href="https://colonist.io" target="_blank" rel="noreferrer">
              Colonist
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Intro
