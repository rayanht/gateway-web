import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import ReactDOM from 'react-dom';
// import wallet from '../../utils/wallet'
import {
  Container,
  Button,
  Nav,
  Navbar,
  NavDropdown
} from 'react-bootstrap';
import './Header.css';

import { getCurrentWalletConnected } from '../../utils/interact';
import { connectWeb3Wallet } from '../../hooks/useWeb3'

const Header = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");


  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWeb3Wallet();
    setStatus(walletResponse._state.accounts.length);
    setWallet(walletResponse.selectedAddress);
  };

  return (
    <header className="gateway-header">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/"><img src="/common/gateway-logo.svg" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">What We Do</Nav.Link>
              <Nav.Link href="#link">What are DAOs?</Nav.Link>
              <Nav.Link href="#link">Add Your Comunity</Nav.Link>
              <Nav.Link className="last-nav-item" id="walletButton" onClick={connectWalletPressed}>
                {walletAddress.length > 0 ? (
                  String(walletAddress).substring(0, 6) +
                  "..." +
                  String(walletAddress).substring(38)
                ) : (
                  <span>Connect Wallet</span>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;