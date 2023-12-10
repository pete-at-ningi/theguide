import { BounceLoader } from 'react-spinners';
import styled from 'styled-components';

const PageWrap = styled.div`
  background: #f6f5f4;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  return (
    <PageWrap>
      <BounceLoader color='#36d7b7' />
      <div style={{ marginTop: '2rem' }}>Loading...</div>
    </PageWrap>
  );
};

export default Loading;
