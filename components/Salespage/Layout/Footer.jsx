import styled from 'styled-components';

const StyledText = styled.div`
  color: rgb(23, 26, 21);

  font-family: 'Sora', sans-serif;
  font-size: 14px;
  font-weight: 400;
  height: 21px;
  line-height: 21px;
  margin-bottom: 12px;
`;

const Footer = () => {
  return <StyledText>© Ningi Ltd 2023. All rights reserved.</StyledText>;
};

export default Footer;
