import React from 'react'
import styles from '../../styles/modules/packages/package.module.css'

const HorizontalScrolling = () => {
  return (
    <div className={`${styles.scrollingwrapper}`}>
      <div className={`${styles.card}`}><h2>Card</h2></div>
      <div className={`${styles.card}`}><h2>Card</h2></div>
      <div className={`${styles.card}`}><h2>Card</h2></div>
      <div className={`${styles.card}`}><h2>Card</h2></div>
      <div className={`${styles.card}`}><h2>Card</h2></div>
      <div className={`${styles.card}`}><h2>Card</h2></div>
      <div className={`${styles.card}`}><h2>Card</h2></div>
      <div className={`${styles.card}`}><h2>Card</h2></div>
      <div className={`${styles.card}`}><h2>Card</h2></div>
    </div>
  )
}

export default HorizontalScrolling