import { useState, useEffect } from 'react';
import {
  useUser,
  useSession,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import Avatar from './Avatar';

import styled from 'styled-components';

const InputWrapper = styled.div`
  max-width: 400px;

  margin: auto;
  margin-top: 2rem;
  label {
    font-weight: bold;
  }
  p {
    margin: 0;
    font-size: 90%;
    opacity: 0.8;
  }
  input {
    margin: 0.5rem 0 2rem 0;
    padding: 0.5rem;
    border-radius: 5px;
    outline: none;
    border: 1px grey solid;
    width: 100%;
  }
  select {
    margin: 0.5rem 0 2rem 0;
    padding: 0.5rem;
    border-radius: 5px;
    outline: none;
    border: 1px grey solid;
    width: 40%;
  }
`;

const SaveBtn = styled.button`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  outline: none;
  border: none;
  font-family: 'Sora', sans-serif;
  background: #00c4d6;
  color: #171a15;
  border: 2px solid #171a15;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const CancelBtn = styled.button`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  outline: none;
  border: none;
  font-family: 'Sora', sans-serif;
  background: #e65a03;
  color: #171a15;
  border: 2px solid #171a15;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export default function Account() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  const session = useSession();

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
        setFullname(data.fullname);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ fullname, avatar_url }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        fullname,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <InputWrapper>
      <h2>User Profile</h2>
      <hr />
      <Avatar
        uid={user.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullname, avatar_url: url });
        }}
      />
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' type='text' value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor='fullname'>Full Name</label>
        <input
          id='fullname'
          type='text'
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>

      <div>
        <SaveBtn
          onClick={() => updateProfile({ fullname, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </SaveBtn>
      </div>
      <div>
        <CancelBtn onClick={() => supabase.auth.signOut()}>Sign Out</CancelBtn>
      </div>
    </InputWrapper>
  );
}
