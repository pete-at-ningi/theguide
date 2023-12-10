import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useClient = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState({});
  const [changes, setChanges] = useState({});

  const getClient = useCallback(async () => {
    if (!router.query.id) return;

    try {
      setLoading(true);
      let { data, error, status } = await supabase
        .from('clients')
        .select(`*`)
        .eq('id', router.query.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setClient(data);
      }
    } catch (error) {
      alert('Error loading client data!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [router.query.id, supabase]);

  useEffect(() => {
    getClient();
  }, [getClient]);

  // A function to handle direct updates without debouncing
  const updateClientField = async (field, value) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('clients')
        .update({ [field]: value })
        .eq('id', client.id);

      if (error) {
        throw error;
      }

      // Update the client state with the new value
      setClient((prevClient) => ({
        ...prevClient,
        [field]: value,
      }));
    } catch (error) {
      console.error('Error updating client:', error);
      throw error; // Re-throw the error to be caught by the calling function
    } finally {
      setLoading(false);
    }
  };

  const handleChange = useCallback(
    (event, callback) => {
      const { name, value } = event.target;
      setClient((prevClient) => ({
        ...prevClient,
        [name]: value,
      }));
      setChanges((prevChanges) => ({
        ...prevChanges,
        [name]: value,
      }));

      if (callback && typeof callback === 'function') {
        saveChanges().then(callback).catch(console.error);
      }
    },
    [saveChanges]
  );

  const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  // Debounce saveChanges function
  const saveChanges = useCallback(
    debounce(async () => {
      if (!Object.keys(changes).length || !client.id) return;

      try {
        const { error } = await supabase
          .from('clients')
          .update(changes)
          .eq('id', client.id);

        if (error) {
          throw error;
        }

        setChanges({});
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    }, 1000),
    [client.id, changes, supabase]
  );

  useEffect(() => {
    if (Object.keys(changes).length) {
      saveChanges();
    }
  }, [changes, saveChanges]);

  return { loading, client, handleChange, updateClientField };
};
