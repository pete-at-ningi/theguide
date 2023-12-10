import styled from 'styled-components';

import NavAvatar from './NavAvatar';

import { RectangleGroupIcon, UsersIcon } from '@heroicons/react/24/solid';

const Wrapper = styled.div`
  background: #f6f5f4;
  height: 100vh;
  position: fixed;
  width: 250px;
`;

const Inner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Item = styled.a`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  cursor: pointer;
  grid-gap: 8px;
  font-size: 14px;
  color: #3f3f41;
  background: ${(props) => (props.active ? '#ebebeb' : 'transparent')};
  svg {
    width: 24px;
    color: #3f3f41;
  }
  &:hover {
    background: #ebebeb;
  }
`;

const Header = styled.div`
  margin-top: auto;
  padding: 12px 24px;
  font-size: 12px;
  color: #3f3f41;
  font-weight: bold;
  text-transform: uppercase;
`;

const Nav = ({ active }) => {
  return (
    <Wrapper>
      <Inner>
        <NavAvatar />
        <Item
          href='/adviser'
          style={{ marginTop: '24px' }}
          active={active === 'dashboard'}
        >
          <RectangleGroupIcon />
          Dashboard
        </Item>
        <Header>Manage</Header>
        <Item href='/adviser/clients' active={active === 'clients'}>
          <UsersIcon />
          Clients
        </Item>
      </Inner>
    </Wrapper>
  );
};

export default Nav;
