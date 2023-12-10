import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import styled from 'styled-components';
import { Bars3Icon } from '@heroicons/react/24/solid';

const Wrapper = styled.div`
  position: fixed;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  border-bottom: 1px solid #eaeaeb;
  @media (max-width: 700px) {
    border-bottom: none;
    padding: 6px 12px;
  }
  min-width: 100vw;
  img {
    height: 40px;
    @media (max-width: 700px) {
      height: 20px;
    }
  }
`;

const StyledLink = styled.a`
  align-items: flex-start;
  font-family: 'Sora', sans-serif;
  background-color: ${(props) => props.primaryColor};
  border: ${(props) => `${props.primaryColor} 2px solid`};
  border-radius: 8px;
  color: rgb(255, 255, 255);
  cursor: pointer;
  padding: 12px 24px;
  text-align: center;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: none;
  @media (max-width: 700px) {
    display: block;
  }
  svg {
    color: #3f3f41;
    height: 30px;
    width: 30px;
  }
`;

const Nav = ({ logoURL, primaryColor, setShowMobileNav }) => {
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (logoURL) downloadImage(logoURL);
  }, [logoURL]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('companylogos')
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error);
    }
  }

  return (
    <Wrapper>
      <Link href='/'>
        <a style={{ marginTop: '12px' }}>
          <img src={avatarUrl ? avatarUrl : '/ongoingonly.png'} />
        </a>
      </Link>
      <StyledLink
        href='https://www.intercom.com/'
        target='_blank'
        rel='noopener noreferrer'
        primaryColor={primaryColor}
      >
        Get Support
      </StyledLink>
      <MobileMenu>
        <Bars3Icon
          onClick={() => {
            setShowMobileNav(true);
          }}
        />
      </MobileMenu>
    </Wrapper>
  );
};

export default Nav;
