import React from 'react'
import Link from 'next/link';
import getWorks from '../getWorks'

const Home = ({ pages }) => (
    <>
      <h1>Pages</h1>
      {
        pages.map(p => (
        <div>
          <Link href={`/work/${p.slug}`}>
            <a>{p.slug}</a>
          </Link>
        </div>
        ))
      }
    </>
  )

Home.getInitialProps = async function () {
  const pages = await getWorks()

  return { pages }
};

export default Home
