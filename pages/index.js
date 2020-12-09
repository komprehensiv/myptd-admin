import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Root } from '../styles/index.styles'
import Header from '../components/header/header.component'
import Footer from '../components/footer/footer.component'
import Shell from '../components/shell/shell.component'
import Retailers from '../components/retailers/retailers.component'

export default function Home() {
  return (
    <Root>
      <Header />
      <Shell>
        <Retailers />
      </Shell>
      <Footer />
    </Root>
  )
}
