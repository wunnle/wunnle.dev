import React from 'react'
import Head from 'next/head'


const SEO = ({ title, description, image = "/static/images/wide-logo.png" }) => (
  <Head>
    <title>{title}</title>
    <meta  name="twitter:creator" content="@wunnle"></meta>
    <meta  name="twitter:card" content="summary_large_image"></meta>
    <meta  property="og:type" content="website"></meta>

    <meta property="og:title" content={title}></meta>
    <meta name="twitter:title" content={title}></meta>

    <meta name="description" content={description}></meta>
    <meta  name="twitter:description" content={description}></meta>

    <meta property="og:image" content={image}></meta>
    <meta name="twitter:image" content={image}></meta>
    <link href="/static/common.css" rel="stylesheet" />

    <link rel="apple-touch-icon" sizes="192x192" href="/static/images/icon-192x192.png"></link>
    <link rel="apple-touch-icon" sizes="256x256" href="/static/images/icon-256x256.png"></link>
    <link rel="apple-touch-icon" sizes="384x384" href="/static/images/icon-384x384.png"></link>
    <link rel="apple-touch-icon" sizes="512x512" href="/static/images/icon-512x512.png"></link>
  </Head>
)


export default SEO