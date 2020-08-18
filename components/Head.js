import * as React from 'react';
import NextHead from 'next/head';

const Head = () => (
  <React.Fragment>
    {/* <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" /> */}
    <NextHead>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta property="author" content="Denny Dharmawan" />
      <meta
        property="keywords"
        content="jenius, flexi cash, lending, wisanggeni, admin"
      />
      <meta
        property="description"
        content="An admin app for wisanggeni squad"
      />

      <meta property="og:title" content="Wisanggeni Admin" key="title" />
      <meta property="og:type" content="website" key="type" />
      <meta
        property="og:site_name"
        content="wisanggeni-admin"
        key="site_name"
      />
      <meta
        property="og:description"
        content="An admin app for wisanggeni squad"
        key="description"
      />
      <title>Wisanggeni Admin</title>
    </NextHead>
  </React.Fragment>
);

export default Head;
