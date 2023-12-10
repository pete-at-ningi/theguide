import { useState } from 'react';
import styled from 'styled-components';

import {
  LinkIcon,
  EnvelopeIcon,
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/solid';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  p {
    font-size: 14px;
    font-family: 'Sora', sans-serif;
    color: #6b7380;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  grid-gap: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  grid-gap: 10px;
  width: 180px;
  height: 100px;
  &:hover {
    background: #eaeaea;
    border: 2px solid rgba(103, 1, 230, 0.6);
  }
  border: ${({ active }) =>
    active ? '2px solid rgba(103, 1, 230, 0.6)' : '1px solid #eaeaea'};
  background: ${({ active }) => active && '#eaeaea'};
  p {
    font-size: 14px;
    font-family: 'Sora', sans-serif;
    color: #3f3f41;
    margin: 0;
  }
  svg {
    width: 20px;
    height: 20px;
    color: #3f3f41;
  }
`;

const LinkWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1rem;
  border-radius: 10px;
  grid-gap: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #dedede;
  width: p {
    font-size: 14px;
    font-family: 'Sora', sans-serif;
    color: #6b7380;
    margin-bottom: 0;
  }
  svg {
    width: 20px;
    height: 20px;
    color: #3f3f41;
  }
  &:hover {
    background: #eaeaea;
    cursor: pointer;
    opacity: 0.8;
  }
`;

const LinkOuter = styled.div`
  display: flex;
  grid-gap: 1rem;
  align-items: center;
`;

const LinkInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 1rem;
  svg {
    color: ${({ success }) => (success ? '#36d7b7' : '#3f3f41')};
  }
`;

const Success = styled.div`
  display: flex;
  margin-bottom: 12px;
  grid-gap: 1rem;
  color: #36d7b7;
  font-size: 14px;
  font-family: 'Sora', sans-serif;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Communications = ({ client }) => {
  const [commsTypeActive, setCommsTypeActive] = useState('link');
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${baseUrl}/client/${client.id}`);
    setLinkCopied(true); // Setting the linkCopied state to true when the link is copied
  };

  const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.protocol}//${window.location.host}`;
    }
    return null;
  };

  const baseUrl = getBaseUrl();

  return (
    <Wrapper>
      <p>Share a personalised login with this client.</p>
      <ButtonWrap>
        <Button
          active={commsTypeActive === 'link'}
          onClick={() => setCommsTypeActive('link')}
        >
          <LinkIcon />
          <p>Link</p>
        </Button>
        <Button
          active={commsTypeActive === 'invite'}
          onClick={() => setCommsTypeActive('invite')}
        >
          <EnvelopeIcon />
          <p>Invite</p>
        </Button>
      </ButtonWrap>
      {commsTypeActive === 'link' && (
        <>
          <p>Copy the link</p>
          <LinkOuter>
            <LinkWrap onClick={handleCopyLink}>
              <LinkInner>
                <p>
                  {baseUrl}/client/{client.id}
                </p>
                <LinkIcon />
              </LinkInner>
            </LinkWrap>
            {linkCopied && (
              <Success>
                <ClipboardDocumentCheckIcon /> Copied!
              </Success>
            )}
          </LinkOuter>
        </>
      )}
      {commsTypeActive === 'invite' && (
        <p>TBA - should be some email templates and a send button</p>
      )}
    </Wrapper>
  );
};

export default Communications;
