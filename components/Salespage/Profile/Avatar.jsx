import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 1rem 0;
`;

const SaveBtn = styled.label`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  outline: none;
  border: none;
  background: #42aab4;
  color: white;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error);
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert('Error uploading avatar!');
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Wrapper>
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt='Avatar'
          className='avatar image'
          style={{ width: '250px' }}
        />
      )}
      <div>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type='file'
          id='single'
          accept='image/*'
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </Wrapper>
  );
}
