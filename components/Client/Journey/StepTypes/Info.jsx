import styled from 'styled-components';

import { useFirm } from '../../../../hooks/useFirm';

import { InformationCircleIcon } from '@heroicons/react/24/solid';

const DescriptionRow = styled.div`
  padding: 1rem 0;
`;

const StepType = styled.p`
  font-weight: bold;
  font-size: 80%;
  color: #3f3f4185;
`;

const Content = styled.p`
  margin: 0;
  margin-bottom: 6px;
  font-size: 18px;
  line-height: 1.5;
  display: block;
`;

const HelpToggle = styled.div`
  color: ${(props) => props.color};
  font-weight: bold;
  font-size: 80%;
  svg {
    height: 20px;
    width: 20px;
  }
  display: flex;
  align-items: center;
  grid-gap: 3px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
  @media (min-width: 2401px) {
    display: none;
  }
`;

const Info = ({ config, interpolateContent, setShowInfoPopover }) => {
  const { firm } = useFirm();
  return (
    <DescriptionRow>
      <StepType color={firm.primaryHex}>INFO</StepType>
      {config.content.map((contentItem, contentIndex) => (
        <Content key={contentIndex}>{interpolateContent(contentItem)}</Content>
      ))}
      {config.helpToggleLabel && (
        <HelpToggle
          color={firm.primaryHex}
          onClick={() => setShowInfoPopover(true)}
        >
          <InformationCircleIcon /> {config.helpToggleLabel}
        </HelpToggle>
      )}
    </DescriptionRow>
  );
};

export default Info;
