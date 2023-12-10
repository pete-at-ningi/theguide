import { Fragment } from 'react';
import styled from 'styled-components';
import slugify from 'slugify';

import {
  CheckCircleIcon,
  MapPinIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { useFirm } from '../../../hooks/useFirm';

const Wrapper = styled.div`
  background: #f6f5f4;
  height: 100vh;
  position: fixed;
  margin-top: 82px;
  width: 250px;

  @media (max-width: 700px) {
    width: 100vw;
    z-index: 1001;
    margin-top: 0px;
    position: fixed;
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
    width: 100vw;
    max-width: 100vw;
    z-index: 1001;
    transition: all 0.3s ease-out;
    max-height: 100vh;

    box-sizing: border-box;
    ${(props) =>
      props.show &&
      `
    right: 0; 
    `}
  } }
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

  border-right: ${(props) => 'solid 5px #42aab4'};
  background: ${(props) => (props.active ? '#ebebeb' : 'transparent')};

  &:hover {
    background: #ebebeb;
  }
`;

const StyledSVG = styled(CheckCircleIcon)`
  width: 24px;
  color: ${(props) => (props.isComplete ? '#42aab4' : '#a9a9a9')};
`;

const Header = styled.div`
  margin-top: auto;
  padding: 12px 24px;

  font-size: 14px;
  color: ${(props) =>
    props.isComplete ? '#42aab4' : props.active ? '#3f3f41' : '#a9a9a9'};
  font-weight: bold;
  text-transform: uppercase;
  border-right: ${(props) => (props.active ? 'solid 5px #42aab4' : 'none')};
  &:hover {
    background: #42aab4;
    color: white;
    cursor: pointer;
  }
`;

const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  padding-left: 24px;
  padding-top: 4rem;
  @media (min-width: 700px) {
    display: none;
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

  padding: 6px 12px;
  text-align: center;
  &:hover {
    opacity: 0.8;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;

  cursor: pointer;
`;

const CloseIcon = styled(XCircleIcon)`
  height: 30px;
  width: 30px;
  color: #3f3f41;
  &:hover {
    opacity: 0.8;
  }
`;

const LeftNav = ({
  config,
  activeSection,
  setActiveSection,
  activeStep,
  setActiveStep,
  showMobileNav,
  setShowMobileNav,
  journeyProgress,
}) => {
  const { firm } = useFirm();

  const isSectionComplete = (sectionKey, journeyProgress, config) => {
    const section = journeyProgress[sectionKey];
    if (!section || !section.steps) return false;

    // Assume the section is complete initially
    let complete = true;

    // Check if all steps in the config for this section have a completion date
    config
      .find((configSection) => configSection.title === sectionKey)
      ?.content.forEach((step) => {
        const stepKey = slugify(step.title);
        if (!section.steps[stepKey] || !section.steps[stepKey].date_time) {
          complete = false;
        }
      });

    return complete;
  };

  return (
    <Wrapper show={showMobileNav}>
      <Inner>
        <MobileHeader>
          <StyledLink
            href='https://www.intercom.com/'
            target='_blank'
            rel='noopener noreferrer'
            primaryColor={firm.primaryHex}
          >
            Get Support
          </StyledLink>
          <CloseButton onClick={() => setShowMobileNav(false)}>
            <CloseIcon aria-hidden='true' />
          </CloseButton>
        </MobileHeader>
        {config.map((section, sectionIndex) => {
          const sectionKey = slugify(section.title);
          const sectionComplete = isSectionComplete(
            sectionKey,
            journeyProgress,
            config
          );

          return (
            <Fragment key={sectionIndex}>
              <Header
                active={activeSection === sectionIndex}
                onClick={() => {
                  setActiveSection(sectionIndex);
                  setActiveStep(0);
                }}
                isComplete={sectionComplete}
              >
                {section.title}
              </Header>
              {activeSection === sectionIndex && (
                <>
                  {section.content.map((step, stepIndex) => {
                    const stepKey = slugify(step.title);
                    const stepComplete =
                      journeyProgress[sectionKey]?.steps[stepKey]?.date_time;

                    return (
                      <Item
                        completeColor={firm.primaryHex}
                        isComplete={!!stepComplete}
                        key={stepIndex}
                        active={
                          activeSection === sectionIndex &&
                          activeStep === stepIndex
                        }
                        onClick={() => {
                          setActiveStep(stepIndex);
                        }}
                      >
                        <StyledSVG isComplete={stepComplete} /> {step.title}
                      </Item>
                    );
                  })}
                </>
              )}
            </Fragment>
          );
        })}
      </Inner>
    </Wrapper>
  );
};

export default LeftNav;
