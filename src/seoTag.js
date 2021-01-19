
import React from 'react';
import { Helmet } from 'react-helmet';

const HeadSeo = ( { title , description , keywords } ) => {
    return (
      <Helmet>
         <title> { title } </title>
         <meta name="description" content={ description } />
         <meta name="keywords" content={ keywords } />
      </Helmet>
    )
}

const DefaultHeadSEO = ( ) => {
    return (
      <Helmet>
         <meta charset="UTF-8" />
         <meta name="description" content=""/>
         <meta name="keywords" content=""/>
         <meta name="author" content=""/>
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
    )
}

export { DefaultHeadSEO , HeadSeo };
