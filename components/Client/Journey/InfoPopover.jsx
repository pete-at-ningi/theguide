import React, { useEffect, useRef } from 'react';

import styled from 'styled-components';

import { XCircleIcon } from '@heroicons/react/24/solid';

const PopoverContainer = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  z-index: 1000;
  overflow-y: ${(props) => (props.show ? 'auto' : 'hidden')};
  @media (min-width: 2401px) {
    display: none;
  }
`;

const PopoverContent = styled.div`
  padding: 2rem;
  overflow-y: auto;
  width: 550px;
  max-width: 100vw;
  @media (min-width: 2401px) {
  }
  @media (min-width: 2601px) {
  }
  @media (max-width: 2400px) {
    position: fixed;
    top: 50%;
    right: -100%;
    transform: translateY(-50%);
    background: white;
    padding: 2rem;
    z-index: 1001;
    transition: all 0.3s ease-out;
    max-height: 100vh;

    box-sizing: border-box;
    ${(props) =>
      props.show &&
      `
    right: 0; 
    `}
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  @media (min-width: 2401px) {
    display: none;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseIcon = styled(XCircleIcon)`
  height: 24px;
  width: 24px;
  color: #3f3f41;
  &:hover {
    opacity: 0.8;
  }
`;

const CloseTextButton = styled.button`
  @media (min-width: 2401px) {
    display: none;
  }
  background: #3f3f41;
  color: white;
  border: 1px solid #3f3f41;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  grid-gap: 0.5rem;
  &:hover {
    opacity: 0.8;
  }
  svg {
    width: 24px;
    height: 24px;
  }
`;

const ContentItem = styled.p`
  margin-bottom: 20px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 1rem;
`;

const InfoPopover = ({ showInfoPopover, setShowInfoPopover, config }) => {
  // Create a ref for the popover content
  const popoverContentRef = useRef(null);

  // Effect to scroll to the top of the popover content when it's opened
  useEffect(() => {
    if (showInfoPopover && popoverContentRef.current) {
      popoverContentRef.current.scrollTop = 0;
    }
  }, [showInfoPopover]);

  // Prevent scrolling on the body when the popover is open
  useEffect(() => {
    document.body.style.overflow = showInfoPopover ? 'hidden' : 'auto';
  }, [showInfoPopover]);

  document.body.style.overflow = showInfoPopover ? 'hidden' : 'auto';

  return (
    <>
      <PopoverContainer
        show={showInfoPopover}
        onClick={() => setShowInfoPopover(false)}
      />
      <PopoverContent
        show={showInfoPopover}
        onClick={(e) => e.stopPropagation()}
        ref={popoverContentRef} // Attach the ref to the popover content
      >
        <TitleRow>
          <h2>{config.helpTextTitle}</h2>
          <CloseButton onClick={() => setShowInfoPopover(false)}>
            <CloseIcon aria-hidden='true' />
          </CloseButton>
        </TitleRow>

        {config.helpText &&
          config.helpText.map((item, index) => (
            <ContentItem key={index}>{item}</ContentItem>
          ))}
        <ButtonWrap>
          <CloseTextButton onClick={() => setShowInfoPopover(false)}>
            Close
          </CloseTextButton>
        </ButtonWrap>
      </PopoverContent>
    </>
  );
};

export default InfoPopover;
