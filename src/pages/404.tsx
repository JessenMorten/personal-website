import React, { FC } from "react"
import { PageProps } from "gatsby"
import { Button, Page } from "../components";

const NotFoundPage: FC<PageProps> = (props) => {
  const path = props.location.pathname;

  return (
    <Page standfirst="Error 404" headline="Page not found">
      <p className="mb-5">
        The page at&nbsp;
        <code className="
          rounded
          px-1
          dark:bg-slate-900
          bg-slate-300
          text-primary-700
          dark:text-primary-500">{path}</code>
        &nbsp;page was not found.</p>
      <Button text="Go home" onClick={() => props.navigate("/")} />
    </Page>
  )
}

export default NotFoundPage
