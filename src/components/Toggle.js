import React from 'react'
import styled from "styled-components"

const Button = styled.button`
  background: ${({ theme }) => theme.base};
  border: 2px solid ${({ theme }) => theme.border};
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

  & .emoji {
    transition: all 0.2s linear;
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

export const Toggle = ({ theme, toggleTheme }) => {
    return (
        <Button lightTheme={theme === 'light'} onClick={toggleTheme} >
            <div className="emoji">☀️</div><div className="emoji">🌙</div>
        </Button>
    );
};