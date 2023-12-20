import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import Nav from "../components/Nav"
import styles from "src/styles/Home.module.css"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "hello_dashboard"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className={styles.globe} />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  )
}

export default Layout
