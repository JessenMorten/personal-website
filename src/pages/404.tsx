import React, { FC } from "react"
import { PageProps } from "gatsby"
import { Button, Page } from "../components";

const NotFoundPage: FC<PageProps> = (props) => {
  const path = props.location.pathname;

  return (
    <Page area="mortenjessen.dk" header="404" subHeader={`The resource at '${path}' page was not found`}>
      <Button text="Go home" onClick={() => props.navigate("/")} />
    </Page>
  )
}

export default NotFoundPage
