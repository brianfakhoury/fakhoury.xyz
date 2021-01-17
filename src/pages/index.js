import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';
import bg from '../images/bg.svg';
import profile from '../images/profile.jpg';
import arrow from '../images/arrow.png';
import giphy from '../images/giphy.gif';
import favicon from '../images/favicon.ico';
import content from './content';


const GlobalStyles = createGlobalStyle`
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
}

a:hover {
    font-weight: bolder;
    // text-decoration: underline blue wavy;
    text-shadow: 0px 0px 10px rgb(180,180,180);
}

.sectionText:hover {
    text-shadow: 0px 0px 10px rgb(180,180,180);
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
    text-shadow: 0px 0px 6px rgb(180,180,180);
}
`;

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.gradient};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: 4rem;
  height: 3rem;
  outline: none;
  box-shadow: none;

  &:hover {
      box-shadow: 0px 0px 32px 2px rgba(112,112,112,0.5); 
  }

  .emoji {
    height: auto;
    // width: 2.5rem;
    transition: all 0.3s linear;
    font-size: 24pt;

    // sun icon
    &:first-child {
        transform: ${({ lightTheme }) => lightTheme ? 'translateY(0px)' : 'translateY(100px)'};
    }

    // moon icon
    &:nth-child(2) {
        transform: ${({ lightTheme }) => lightTheme ? 'translateY(-200px)' : 'translateY(-40px)'};
    }
}
`;

// styles
const lightTheme = {
    body: 'rgb(245,245,245)',
    text: 'black',
    toggleBorder: 'rgb(240,240,240)',
    imgInv: 0,
    gradient: 'white',
    green: 'rgb(0,100,0)',
};

const darkTheme = {
    body: 'rgb(25,25,25)',
    text: '#FAFAFA',
    toggleBorder: 'rgb(60,60,60)',
    imgInv: 1,
    gradient: 'black',
    green: 'rgb(20,255,20)',
};

const IndexPage = () => {
    const [isClient, setClient] = useState(false);
    useEffect(() => {
        setClient(true);
    }, []);

    const [theme, setTheme] = useState((typeof window != 'undefined') && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    const [profileImage, setProfileImage] = useState(profile);
    const [picOpacity, setPicOpacity] = useState(1);

    const runSequence = () => {
        setProfileImage(giphy);
        setTimeout(() => {
            setPicOpacity(0);
        }, 5300);
        setTimeout(() => {
            setProfileImage(profile);
            setPicOpacity(1);
        }, 5800);
    };

    useEffect(() => {
        runSequence();
    }, []);

    const update = new Date('January 17, 2021');

    const [time, setTime] = useState(Date.now() - update);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(Date.now() - update)
        }, 67);
        return () => clearInterval(timer);
    }, [])

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <>
                <GlobalStyles />
                <Helmet>
                    <title>Brian Fakhoury - Homepage</title>
                    <link rel="icon" type="image/x-icon" href={favicon} />
                    <meta name="”description”" content="Brian Fakhoury personal webpage!" />
                    <meta name="”keywords”" content="brian fakhoury, venture capital, machine learning, neuroscience, lifestyle, personal page" />
                    <meta property="og:title" content="Brian Fakhoury - Homepage" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://brianfakhoury.com" />
                    <meta property="og:image" content={profile} />
                </Helmet>
                <div id="content">
                    {isClient ?
                        <ToggleContainer lightTheme={theme === 'light'} onClick={toggleTheme} >
                            <div className="emoji">☀️</div><div className="emoji">🌙</div>
                        </ToggleContainer> : <></>}


                    <h1 id="header">Hey there, welcome to the Brian portal!</h1>
                    <div id="profile">
                        <img height="210px" src={profileImage} id="me" className="fadein" onClick={profileImage === profile ? runSequence : () => { }} style={{ opacity: picOpacity, cursor: profileImage === profile ? 'pointer' : 'initial' }} />
                        <img style={{ opacity: profileImage === profile ? 1 : 0 }} width="90px" src={arrow} id="arrow" className="fadein" />
                    </div>
                    <p>I'm a technology investor & generalist with experience in machine learning and venture capital. </p>
                    <p>I advise tech startups on fundraising, product strategy, and more out of a passion for the latest in innovation and commercialization. If you like what you see, <a href="mailto:brianfakhoury@gmail.com"> let's work together</a> on hard problems.</p>
                    <p>My hobbies include fitness and hiking, reading and philosophy, cooking, and going on crazy adventures with my friends:) I have a degree in neuroscience & computer science from Boston University.
          </p>
                    <div id="main">
                        {content.map((e) => (
                            <ItemContainer title={e.title}>
                                {e.items.map((i) => (
                                    <Item content={i.content} link={i.link} />
                                ))}
                            </ItemContainer>
                        ))}
                    </div>
                    <p>Concurrently, I truly love building my own interesting projects that will push bleeding edge tech for myself and others, bring together investors and entrepreneurs, or simply spark my curiosity.
                    To date, I have been involved in the independent fundraising of multiple startups, personally invested significantly in other startups, cryptocurrencies, and more, have built side projects that have reached hundreds of thousands of people, carried
                    out academic research in psychophysics and machine learning, and have led multiple entrepreneurial communities in the Boston area and beyond.
          </p>
                    <p>My daily drive is to connect high-powered people and meet the most innovative of them around him. If this century is defined by high capital and social efficiency, then I am investing in and building the 21st century. (check out my VC personality at <a href="https://brianfakhoury.com/vc">Fakhoury VC</a>).</p>
                    {/* <img src="me.svg" id="mesvg"> */}
                    <hr />
                    <div style={{ textAlign: 'right' }}>
                        <small>Latest deploy: {update.toDateString()}</small><br />
                        <small>({time} milliseconds ago)</small>
                    </div>

                </div>
            </>
        </ThemeProvider>
    );
};

const Item = ({ link, content }) => {
    const [expand, setExpand] = useState(false);
    return (
        <div onMouseOver={() => setExpand(true)} onMouseLeave={() => setTimeout(() => setExpand(false), 0)} >
            <li><a href={link}>{content}</a></li>
            {/* {expand && <p>Detailed Info, Coming Soon! 🔥 </p>} */}
        </div>
    );
};

const ItemContainer = (props) => {
    const [expand, setExpand] = useState(false);
    return (
        <>
            <h2 onClick={() => setExpand(!expand)} className="sectionText">{props.title}</h2>
            {expand && <ul>{props.children}</ul>}
        </>
    )
};

export default IndexPage;
