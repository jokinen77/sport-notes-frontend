import React from 'react'
import { connect } from 'react-redux'
import MainMenu from './MainMenu'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

interface NavbarProps {

}

const Navbar = (props: NavbarProps) => {
  return (
    <nav className="navbar">
      <ul>
        <li className="item-left">
          <Link to="/"><label>SportNotes</label></Link>
        </li>
        <li className="item-right"><MainMenu /></li>
      </ul>
    </nav>
  )
}

const mapStateToProps = (state: NavbarProps) => { return { ...state } };

const ConnectedNavbar = connect(mapStateToProps)(Navbar);
export default ConnectedNavbar;
