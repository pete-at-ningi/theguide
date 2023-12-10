import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useFirm = () => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(true);
  const [firm, setFirm] = useState({
    primaryHex: null,
    logoUrl: null,
  });

  useEffect(() => {
    async function fetchFirm() {
      try {
        setLoading(true);

        let { data, error, status } = await supabase
          .from('firms')
          .select(`primary_hex, logo_url`)
          .eq('id', process.env.NEXT_PUBLIC_FIRM_ID)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setFirm({
            primaryHex: data.primary_hex,
            logoUrl: data.logo_url,
          });
        }
      } catch (error) {
        alert('Error loading data!');
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchFirm();
  }, []);

  return { firm, loading };
};
