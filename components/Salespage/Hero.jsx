import styled from 'styled-components';

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 100vh;
  padding: 4rem 24px 0;
`;

const Tagline = styled.p`
  font-size: 30px;
  color: #6701e699;
  font-family: 'Caveat', 'serif';
  font-weight: 700;
  margin: 0;
  margin-bottom: 12px;
`;

const Header = styled.h1`
  margin: 0;
  font-size: 36px;
  max-width: 800px;
  text-align: center;
  font-family: 'Sora', sans-serif;
  line-height: 3.5rem;
`;

const StyledParagraph = styled.p`
  font-size: 18px;
  max-width: 800px;
  color: #4c5664;
  text-align: center;
  font-family: 'Sora', sans-serif;
  line-height: 180%;
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

export default function Home() {
  return (
    <PageWrap>
      <Tagline>Ongoing reviews made easy</Tagline>
      <Header>
        Automate your ongoing review process, using smart tech, not people.
      </Header>
      <StyledParagraph>
        We use the latest in machine learning to make sure your reviews are
        always on time and always accurate. No more chasing people for reviews,
        no more late reviews, no more inaccurate reviews.
      </StyledParagraph>
      <StyledLink
        href='https://calendly.com/team-ningi/ongoing-reviews'
        target='_blank'
        rel='noopener noreferrer'
      >
        Book a Demo
      </StyledLink>
    </PageWrap>
  );
}
