import { createGlobalStyle } from "styled-components"

import bg from '../images/bg.svg'

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
  
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    transition: all 0.25s linear;
    position: relative;
    font-family: 'Lato', 'sans-serif';
    font-size: x-large;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  body::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(${bg});
    filter: invert(${({ theme }) => theme.imgInv});
    z-index: -1;
  }
  a {
    color: ${({ theme }) => theme.green};
    text-decoration: none;
    display: inline-block;
}

a:hover {
    font-weight: bolder;
    // text-decoration: underline blue wavy;
    text-shadow: 0px 0px 10px rgb(180,180,180);
    transform: translate(2px, 2px);
}

li a { vertical-align: top }

.sectionText:hover {
    text-shadow: 0px 0px 10px rgb(180,180,180);
    transform: translate(2px, 2px);
}

.sectionText {
    cursor: pointer
}

ul {
    width: 80%;
}

p:hover {
    text-shadow: 0px 0px 3px rgb(180,180,180);
}

#me {
    width: 200px;
    height: 200px;
    border-radius: 500px;
    border-color: rgb(${({ theme }) => 0 + 255 * theme.imgInv}, ${({ theme }) => 0 + 255 * theme.imgInv}, ${({ theme }) => 0 + 255 * theme.imgInv});
    border-width: 3px;
    border-style: solid;
    box-shadow: 0px 0px 16px 4px rgba(112,112,112,0.79); 
}

#me:hover {
    box-shadow: 0px 0px 32px 4px rgba(112,112,112,0.79); 
    transform: translate(2px, 2px);
}

#arrow {
    position: absolute;
    top: -20px;
    right: 55px;
    transform: rotate(-20deg);
    filter: invert(${({ theme }) => theme.imgInv});
}

ax-width: 600px;
}

#profile {
    width: 100%;
    height: 215px;
    display: flex;
    justify-content: center;
    position: relative;
}

.fadein {
    transition: opacity 400ms ease-in-out;
}

#content {
    max-width: 600px;
    padding: 15px
}

#header:hover {
    background-image: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
    -webkit-background-clip: text;
    transition: background-image 1000ms linear;
}

#header {
    background-image: -webkit-linear-gradient(45deg, #00eab7, #7fba1b, #f0c800, #f08c28, #be1e2d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

#para1 {
    background-color: ${({ theme }) => theme.base};
    border-radius: 20px;
    padding: 25px;
    margin: 20px;
    border: 10px solid;
    border-image: -webkit-linear-gradient(45deg, #00eab7, #7fba1b, #f0c800, #f08c28, #be1e2d) 1;
    transition: transform 200ms ease-out;
    box-shadow: 0px 0px 10px 4px rgba(112,112,112,0.79); 
}
`;