import styled from 'styled-components';
import { useFirm } from '../../../hooks/useFirm';

const ProgressContainer = styled.div`
  background: #a9a9a965;
  border-radius: 10px;
  font-weight: bold;
  font-size: 80%;
  text-align: right;
`;

const ProgressInner = styled.div`
  background-color: ${(props) => props.color};
  height: 0.5rem;
  border-radius: 10px;
  width: ${(props) => props.width}%;
  transition: width 0.5s ease-in-out;
`;

const Progress = ({ config, activeSection, activeStep }) => {
  const { firm } = useFirm();
  const calculateProgressForSection = () => {
    const sectionStepCount = config[activeSection].content.length;
    const currentStep = activeStep + 1;
    const progress = (currentStep / sectionStepCount) * 100;
    return Math.round(progress);
  };

  return (
    <ProgressContainer>
      <ProgressInner
        width={calculateProgressForSection()}
        color={firm.primaryHex}
      />
    </ProgressContainer>
  );
};

export default Progress;
