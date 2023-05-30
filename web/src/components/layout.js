import React, {useState, useEffect, useRef} from 'react'
import Header from './header'
import { Link } from 'gatsby'
import '../styles/layout.css'
import styles from './layout.module.css'


const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => {

  const headingStyle = {
    fontFamily: `'Times New Roman', Georgia, serif`,
    textAlign: 'center',
    lineHeight: '3.5rem',
    margin: 0
  }
  let headingLink = {
    fontSize: '3.2rem',
    fontWeight: 300,
    color: '#000'
  }

  let headingText = 'mikejw.co.uk'
  const headingRef = useRef(null)
  const [percentage, setPercentage] = useState(50);
  //const percentCalc = percentage / 100 * 255
  //headingLink.color = `rgb(${percentCalc}, ${percentCalc}, ${percentCalc})`
  headingLink.opacity = 1 - percentage / 100
  if (percentage >= 100) {
    headingStyle.position = 'fixed'
    headingStyle.bottom = 50
    headingStyle.right = 50
    headingStyle.zIndex = 500
    headingStyle.opacity = 1
    headingStyle.padding = 0
    headingStyle.color = '#000'
    headingLink.fontStyle = 'italic'
    headingStyle.borderRadius = '50%'
    headingStyle.width =  '75px'
    headingStyle.height = '75px'
    headingLink.opacity = 1
    headingLink.textDecoration = 'underline'
    headingText = 'm'
    headingStyle.backgroundColor = '#fff'
  } else {
    headingText = 'mikejw.co.uk'
    headingStyle.paddingTop = '2rem'
    headingLink.textDecoration = 'none'
    headingLink.fontStyle = 'normal'
    headingStyle.borderRadius = '0'
    headingStyle.width =  'auto'
    headingStyle.height = 'auto'
    headingStyle.backgroundColor = 'transparent'
  }

  function doScroll() {
    if (headingRef && headingRef.current) {
      //const height = window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight)
      const height = headingRef.current.clientHeight
      const scroll = window.scrollY
      let p
      if (scroll < 1) {
        p = 0
      } else if (scroll >= height) {
        p = 100
      } else {
        p = Math.ceil(100 / (height / scroll))
      }
      console.log(height)
      console.log(scroll)
      console.log(p)
      setPercentage(p)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', doScroll)
    doScroll()
  }, [], () => {
    window.removeEventListener('scroll', doScroll)
  })

  return (
    <div style={{position: 'relative', zIndex: 10}}>
      <div ref={headingRef}>
        <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav}/>
      </div>
      <div style={{ height: '6rem'}}>
        <h1 style={headingStyle}><Link style={headingLink} to="/">{headingText}</Link></h1>
      </div>
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <div className={styles.footerWrapper}>
          <div className={styles.siteInfo}>
            © {new Date().getFullYear()} Mike Whiting, Built with <a href='https://www.sanity.io'>Sanity</a> &amp;
            {` `}
            <a href='https://www.gatsbyjs.org'>Gatsby</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
