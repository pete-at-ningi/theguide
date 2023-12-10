import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useClient } from '../../../../hooks/useClient';
import Loading from '../../../Loading';
import styled from 'styled-components';
import { UserCircleIcon } from '@heroicons/react/24/solid';

import General from './General';
import FactFind from './FactFind';
import Communications from './Communications';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Heading = styled.h1`
  display: flex;
  align-items: center;
  font-size: 30px;
  font-family: 'Sora', sans-serif;
  line-height: 3.5rem;
  margin: 0;
  padding: 0;
  grid-gap: 10px;
  color: #3f3f41;
  svg {
    width: 40px;
    height: 40px;
    color: #3f3f41;
  }
`;

const Tabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eaeaea;
`;

const Tab = styled.div`
  padding: 1rem;
  color: #6b7380;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  background: ${(props) => (props.active ? '#eaeaea' : 'transparent')};
  &:hover {
    background: #eaeaea;
  }
`;

const InnerWrapper = styled.div`
  padding: 1rem;
`;

const Client = () => {
  const { loading, client, handleChange } = useClient();
  const [activeTab, setActiveTab] = useState(0);

  const tabsConfig = [
    { label: 'General', component: General },
    { label: 'FactFind', component: FactFind },
    { label: 'Communications', component: Communications },
  ];

  const ActiveComponent = tabsConfig[activeTab].component;

  return (
    <div>
      {!!loading ? (
        <Loading />
      ) : (
        <Wrapper>
          <Heading>
            <UserCircleIcon /> {client.first_name}
            {client.middle_name && ` ${client.middle_name}`} {client.last_name}
          </Heading>
          <Tabs>
            {tabsConfig.map((tab, index) => (
              <Tab
                key={index}
                active={activeTab === index}
                onClick={() => {
                  setActiveTab(index);
                }}
              >
                {tab.label}
              </Tab>
            ))}
          </Tabs>
          <InnerWrapper>
            <ActiveComponent client={client} handleChange={handleChange} />
          </InnerWrapper>
        </Wrapper>
      )}
    </div>
  );
};

export default Client;
