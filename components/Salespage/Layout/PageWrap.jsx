import Nav from './Nav';
import Footer from './Footer';
import styled from 'styled-components';

const PageWrap = styled.div`
  background: #f6f5f4;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const PageWrapper = ({ children }) => {
  return (
    <PageWrap>
      <Nav />
      {children}
      <Footer />
    </PageWrap>
  );
};

export default PageWrapper;
