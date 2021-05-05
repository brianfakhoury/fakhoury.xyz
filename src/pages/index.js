import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Helmet } from 'react-helmet'
import { motion } from "framer-motion"

import { GlobalStyles } from '../components/globalStyles'
import { lightTheme, darkTheme } from '../components/Themes'
import { Toggle } from '../components/Toggle'
import { useDarkMode } from "../components/useDarkMode"
import CoolCard from "../components/coolCard"

import profile from '../images/profile.jpg'
import arrow from '../images/arrow.png'
import giphy from '../images/giphy.gif'
import favicon from '../images/favicon.ico'
import xl from '../images/externalLink.svg'

import content from './content'

const Item = ({ link, content }) => {
    const [active, setActive] = useState(false)
    return (
        <li><a href={link} target="_blank" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>{content}{active && <img style={{ display: "inline" }} height="25px" src={xl} />}</a></li>
    )
}

const ItemContainer = (props) => {
    const [expand, setExpand] = useState(false);
    return (
        <>
            <h2 onClick={() => setExpand(!expand)} className="sectionText"><motion.div style={{ display: 'inline-block' }} animate={{ rotate: expand ? 360 : 0 }}>{props.emoji}</motion.div> {props.title}</h2>
            {expand && <motion.ul initial={{ y: '-100px' }} animate={{ y: 0 }} exit={{ y: '-100px' }}>{props.children}</motion.ul>}
        </>
    )
};

const IndexPage = () => {
    const [isClient, setClient] = useState(false);
    useEffect(() => {
        setClient(true);
    }, []);

    const [theme, toggleTheme] = useDarkMode();

    const [profileImage, setProfileImage] = useState(profile);
    const [profileOpacity, setProfileOpacity] = useState(1);

    const runSequence = () => {
        setProfileImage(giphy);
        setTimeout(() => {
            setProfileOpacity(0);
        }, 5300);
        setTimeout(() => {
            setProfileImage(profile);
            setProfileOpacity(1);
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
                    <Toggle theme={theme} toggleTheme={toggleTheme} /> : <></>}

                {isClient ?

                    <CoolCard>
                        <h1 id="header">Hey there, welcome to the Brian portal!</h1>
                        <div id="profile">
                            <img height="210px" src={profileImage} id="me" className="fadein" onClick={profileImage === profile ? runSequence : () => { }} style={{ opacity: profileOpacity, cursor: profileImage === profile ? 'pointer' : 'initial' }} />
                            <img style={{ opacity: profileImage === profile ? 1 : 0 }} width="90px" src={arrow} id="arrow" className="fadein" />
                        </div>
                        <p>I'm a technology investor & generalist with experience in machine learning and venture capital. </p>
                        <p>I advise tech startups on fundraising, product strategy, and more out of a passion for the latest in innovation and commercialization. If you like what you see, <a href="mailto:brianfakhoury@gmail.com"> let's work together</a> on hard problems.</p>
                        <p>My hobbies include fitness and hiking, reading and philosophy, cooking, and going on crazy adventures with my friends:) I have a degree in neuroscience & computer science from Boston University.</p>
                    </CoolCard>

                    : <></>}

                <div id="main">
                    {content.map((e) => (
                        <ItemContainer emoji={e.emoji} title={e.title}>
                            {e.items.map((i) => (
                                <Item content={i.content} link={i.link} />
                            ))}
                        </ItemContainer>
                    ))}
                </div>

                <p>Concurrently, I truly love building my own interesting projects that will push bleeding edge tech for myself and others, bring together investors and entrepreneurs, or simply spark my curiosity.
                To date, I have been involved in the independent fundraising of multiple startups, personally invested significantly in other startups, cryptocurrencies, and more, have built side projects that have reached hundreds of thousands of people, carried
                out academic research in psychophysics and machine learning, and have led multiple entrepreneurial communities in the Boston area and beyond.</p>
                <p>My daily drive is to connect high-powered people and meet the most innovative of them around him. If this century is defined by high capital and social efficiency, then I am investing in and building the 21st century. (check out my VC personality at <a href="https://brianfakhoury.com/vc">Fakhoury VC</a>).</p>

                <hr />
                <div style={{ textAlign: 'right' }}>
                    <small>Latest deploy: {update.toDateString()}</small><br />
                    <small>({time} milliseconds ago)</small>
                </div>

            </div>
        </ThemeProvider>
    );
};

export default IndexPage;
