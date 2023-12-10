import { useState, useEffect } from 'react';
import {
  useUser,
  useSession,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';

import styled from 'styled-components';
const AvatarImageWrap = styled.div`
  margin: 0;
  padding: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none;
  }
`;

const Wrapper = styled.a`
  display: flex;
  border-bottom: 1px #dcdde1 solid;
  padding: 16px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const TextWrap = styled.div`
  margin-left: 16px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  p {
    margin: 0;
    font-weight: 600;
  }
`;

const Sub = styled.p`
  color: rgba(103, 1, 230, 0.6);
`;

export default function Avatar({}) {
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [avatar_url, setAvatarUrl] = useState(null);
  const supabase = useSupabaseClient();
  const session = useSession();
  const [avatarImageUrl, setAvatarImageUrl] = useState(null);
  const [fullName, setFullName] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`fullname, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setAvatarUrl(data.avatar_url);
        setFullName(data.fullname);
      }
    } catch (error) {
      alert('Error loading user data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (avatar_url) downloadImage(avatar_url);
  }, [avatar_url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarImageUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error);
    }
  }

  return (
    <Wrapper href={'/profile'}>
      <AvatarImageWrap>
        {!!avatarImageUrl && !loading ? (
          <img src={avatarImageUrl} alt='Avatar' />
        ) : (
          <img src='/placeholder.png' alt='Avatar' />
        )}
      </AvatarImageWrap>
      <TextWrap>
        <p>{fullName}</p>
        <Sub>- Adviser</Sub>
      </TextWrap>
    </Wrapper>
  );
}
