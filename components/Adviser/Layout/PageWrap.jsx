import Nav from './Nav';
import styled from 'styled-components';

const AdviserPageWrap = styled.div`
  display: flex;
`;

const AdviserInner = styled.div`
  margin-left: 250px;
  background-color: white;
  width: 100%;
  min-height: 100vh;
`;

const PageWrap = ({ children, active }) => {
  return (
    <AdviserPageWrap>
      <Nav active={active} />
      <AdviserInner>{children}</AdviserInner>
    </AdviserPageWrap>
  );
};

export default PageWrap;
