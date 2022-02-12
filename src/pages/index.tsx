import React, { FC } from "react";
import { Link, Page } from "../components";

const IndexPage: FC = () => {
  return (
    <Page
      headline="Hi"
      seo={{
        title: "mortenjessen.dk"
      }}>
      <p><Link to="/i-told-you-so">This page</Link> does not exist.</p>
    </Page>
  )
}

export default IndexPage
