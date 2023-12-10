import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TopNav from './TopNav';
import LeftNav from './LeftNav';
import Progress from './Progress';
import InfoPopover from './InfoPopover';
import slugify from 'slugify';

import { useClient } from '../../../hooks/useClient';
import { useFirm } from '../../../hooks/useFirm';

import config from './config';
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/solid';
import Info from './StepTypes/Info';

const PageWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background: white;
`;

const InnerWrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
`;

const Inner = styled.div`
  width: 100%;
  background: white;
  min-height: calc (100vh - 83px);
  margin-top: 82px;
  margin-left: 250px;
  padding: 2rem;
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 700px) {
    margin-top: 48px;
    margin-left: 0;
    padding: 6px 12px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  font-size: 12px;
  font-weight: bold;
  color: #3f3f41;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
  padding-top: 6px;
`;

const ActionsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.button`
  background: white;
  color: #3f3f41;
  border: 1px solid #3f3f41;
  padding: 0.5rem 1rem;
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
    background: #f6f5f4;
  }
  svg {
    width: 24px;
    height: 24px;
  }
  &:disabled {
    border: none;
    color: #3f3f41;
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Home = () => {
  const { firm } = useFirm();
  const { client, loading, updateClientField } = useClient();
  const [activeSection, setActiveSection] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [showInfoPopover, setShowInfoPopover] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [journeyProgress, setJourneyProgress] = useState(false);

  const interpolateContent = (content) => {
    return content.replace(/<<(\w+)>>/g, (_, key) => {
      return client[key] || `<<${key}>>`;
    });
  };

  useEffect(() => {
    if (client.id) {
      if (client.journey_progress) {
        const latestPosition = client.journey_progress.latestPosition || [0, 0];
        setJourneyProgress(client.journey_progress);
        setActiveSection(latestPosition[0]);
        setActiveStep(latestPosition[1]);
      } else {
        const initialProgress = {
          start_date: new Date().toISOString(),
          latestPosition: [0, 0],
        };
        setJourneyProgress(initialProgress);
      }
    }
  }, [client]);

  useEffect(() => {
    const update = { ...journeyProgress };
    update.latestPosition = [activeSection, activeStep];
    if (!update[slugify(config[activeSection].title)]) {
      update[slugify(config[activeSection].title)] = {
        start_date: new Date(),
        steps: {
          [slugify(config[activeSection].content[activeStep].title)]: {
            date_time: new Date(),
          },
        },
      };
    } else {
      update[slugify(config[activeSection].title)].steps[
        slugify(config[activeSection].content[activeStep].title)
      ] = {
        date_time: new Date(),
      };
    }
    setJourneyProgress(update);
  }, [activeSection, activeStep]);

  useEffect(() => {
    if (client.id) {
      updateClientField('journey_progress', journeyProgress);
    }
  }, [journeyProgress]);

  return (
    <PageWrap>
      <InnerWrapper>
        <TopNav
          logoURL={firm.logoUrl}
          primaryColor={firm.primaryHex || '#6701e6'}
          setShowMobileNav={setShowMobileNav}
        />
        <Container>
          <LeftNav
            config={config}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            showMobileNav={showMobileNav}
            setShowMobileNav={setShowMobileNav}
            journeyProgress={journeyProgress}
          />
          <Inner>
            <HeaderRow>
              <Progress
                config={config}
                activeSection={activeSection}
                activeStep={activeStep}
              />
              <Header>{config[activeSection].title}</Header>
            </HeaderRow>

            {config[activeSection].content[activeStep].type === 'info' && (
              <Info
                config={config[activeSection].content[activeStep]}
                interpolateContent={interpolateContent}
                setShowInfoPopover={setShowInfoPopover}
              />
            )}
            <ActionsRow>
              <Button
                onClick={() => {
                  if (activeStep > 0) {
                    setActiveStep(activeStep - 1);
                  } else {
                    setActiveSection(activeSection - 1);
                    setActiveStep(config[activeSection - 1].content.length - 1);
                  }
                }}
                disabled={activeStep === 0 && activeSection === 0}
              >
                <ArrowLongLeftIcon /> Back
              </Button>
              <Button
                onClick={() => {
                  if (activeStep === config[activeSection].content.length - 1) {
                    setActiveSection(activeSection + 1);
                    setActiveStep(0);
                  } else {
                    setActiveStep(activeStep + 1);
                  }
                }}
              >
                Next
                <ArrowLongRightIcon />
              </Button>
            </ActionsRow>
          </Inner>
          <InfoPopover
            showInfoPopover={showInfoPopover}
            setShowInfoPopover={setShowInfoPopover}
            config={config[activeSection].content[activeStep]}
          />
        </Container>
      </InnerWrapper>
    </PageWrap>
  );
};

export default Home;
