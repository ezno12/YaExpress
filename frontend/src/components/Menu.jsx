import React from "react";
import styled from "styled-components";
import { mobile } from "../js/responsive";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import {MenuBook, MenuOpen, MenuRounded } from "@material-ui/icons";


const Menu = () => {
    
  return (
      
    <div className={styles.container}>
    <div className={styles.item}>
    <button className={styles.btn}><MenuRounded/></button>
      <ul className={styles.list}>
        <Link to={'/'}>
        <li className={styles.listItem}>Home</li>
        </Link>
        <Link to={'/products/keyboard'}>
        <li className={styles.listItem}>Keyboard</li>
        </Link>
        <Link to={'/products/mouse'}>
        <li className={styles.listItem}>Mouse</li>
        </Link>
        <Link to={'/products/mousepad'}>
        <li className={styles.listItem}>Mousepad</li>
        </Link>
        <Link to={'/products/headset'}>
        <li className={styles.listItem}>Headset</li>
        </Link>
        <Link to={'/products/speakers'}>
        <li className={styles.listItem}>Speakers</li>
        </Link>
        <Link to={'/products/chair'}>
        <li className={styles.listItem}>Chair</li>
        </Link>
      </ul>
    </div>
    
  </div>
);
};
export default Menu;
