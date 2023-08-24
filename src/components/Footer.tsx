import React from 'react'
import styled from 'styled-components';
export  const Footer: React.FC = () => {
  return (
    <Wrapper style={{background:"#34eb8c",
      position:"fixed",
      bottom:"0px", width:"100%"}}>
          <p style ={{ textAlign:"center"}}> &copy; { new Date().getFullYear()} Copyrights are Reserved</p>

    </Wrapper>
  )
}

const Wrapper= styled.section`
background:#34eb8c,
position:fixed,
bottom:0px

 
`
