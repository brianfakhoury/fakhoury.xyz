import React, { useState } from 'react'
import styled from "styled-components"

const Div = styled.div`
    position: relative;
    box-sizing: border-box;

    background-color: ${({ theme }) => theme.base};
    background-clip: padding-box;
    border: solid 5px transparent;
    border-radius: 50px;

    box-shadow: 0px 0px 10px 2px rgba(112,112,112,0.79); 
    padding: 0px 40px 0px 40px;
    margin: 40px 0px 40px 0px;

    &:after {
        content: '';
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        z-index: -1;
        margin: -5px;
        border-radius: inherit;
        background: -webkit-linear-gradient(45deg, #00eab7, #7fba1b, #f0c800, #f08c28, #be1e2d);
    }
`

export default function CoolCard({ children }) {
    const [perspectiveStyle, setPerspectiveStyle] = useState({});

    const handleMouseMove = (e) => {
        const xVal = e.nativeEvent.layerX

        const yVal = e.nativeEvent.layerY

        const yRotation = 20 * ((xVal - 500 / 2) / 500)

        const xRotation = -20 * ((yVal - 500 / 2) / 500)

        setPerspectiveStyle({ transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg)` })
    }

    const handleMouseOut = (e) => {
        setPerspectiveStyle({ transform: "" })
    }

    return (
        <Div /*onMouseMove={handleMouseMove} onMouseOut={handleMouseOut} style={perspectiveStyle}*/>
            {children}
        </Div>
    )

}