import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const Wrapper = styled.div`
  background: white;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  align-items: center;
  padding: 12px 24px;
  border-bottom: 1px solid #eaeaeb;
  min-width: 100vw;
  img {
    margin-top: 7px;
    height: 30px;
  }
`;

const StyledLink = styled.a`
  align-items: flex-start;
  font-family: 'Sora', sans-serif;
  background-color: rgb(23, 26, 21);
  border: 2px solid rgb(23, 26, 21);
  border-radius: 8px;
  color: rgb(255, 255, 255);
  cursor: pointer;
  padding: 12px 24px;
  text-align: center;
  &:hover {
    opacity: 0.8;
  }
`;

const Nav = () => {
  return (
    <Wrapper>
      <Link href='/'>
        <a>
          <Image src='/ongoingonly.png' width='175' height='30' />
        </a>
      </Link>
      <StyledLink
        href='https://calendly.com/team-ningi/ongoing-reviews'
        target='_blank'
        rel='noopener noreferrer'
      >
        Book a Demo
      </StyledLink>
    </Wrapper>
  );
};

export default Nav;
