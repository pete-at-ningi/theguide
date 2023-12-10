import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { MagnifyingGlassIcon, BackspaceIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Header = styled.h1`
  font-size: 36px;
  font-family: 'Sora', sans-serif;
  line-height: 3.5rem;
  margin: 0;
  padding: 0;
`;

const Count = styled.span`
  font-size: 20px;
  font-family: 'Sora', sans-serif;
  opacity: 0.6;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e4e7eb;
  padding: 8px;
  margin-top: 1rem;
  gap: 10px;
  border-radius: 10px;
  svg {
    width: 25px;
    height: 25px;
  }
`;

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  font-family: 'Sora', sans-serif;
  font-size: 14px;
`;

const StyledBackspaceIcon = styled(BackspaceIcon)`
  color: #fb3838;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const ClientList = styled.table`
  margin-top: 2rem;
  width: 100%;
  border-collapse: collapse;
  thead {
    color: #6b7380;
    font-weight: normal;
    font-size: 12px;
    text-align: left;
  }
  tr {
    border-bottom: 1px solid #e4e7eb;
  }
  td {
    padding: 1rem 0;
  }
  tbody {
    tr {
      &:hover {
        background: #f6f5f4;
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
`;

const ClientItemName = styled.td`
  font-size: 16px;
  font-weight: 500;
`;

const ClientItemEmail = styled.td`
  font-size: 14px;
  opacity: 0.6;
`;

const Clients = () => {
  const router = useRouter();

  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    filterClients();
  }, [searchTerm, clients]);

  async function getClients() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase.from('clients').select(`*`);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setClients(data);
        setFilteredItems(data);
      }
    } catch (error) {
      alert('Error loading user data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function filterClients() {
    const filtered = clients.filter(
      (client) =>
        client.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredItems(filtered);
  }

  const handleRowClick = (clientId) => {
    router.push(`/adviser/clients/${clientId}`);
  };

  return (
    <Wrapper>
      <Header>
        Your Clients{' '}
        <Count>({!loading && !!clients.length ? clients.length : '-'})</Count>
      </Header>

      <SearchBarWrapper>
        <MagnifyingGlassIcon />
        <SearchInput
          type='text'
          placeholder='Search for a client, by name or email...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <StyledBackspaceIcon
            onClick={() => setSearchTerm('')}
            className='cursor-pointer'
          />
        )}
      </SearchBarWrapper>
      <ClientList>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((client) => (
            <tr key={client.id} onClick={() => handleRowClick(client.id)}>
              <ClientItemName>
                {client.first_name}
                {client.middle_name && ` ${client.middle_name}`}{' '}
                {client.last_name}
              </ClientItemName>
              <ClientItemEmail>{client.email}</ClientItemEmail>
            </tr>
          ))}
        </tbody>
      </ClientList>
    </Wrapper>
  );
};

export default Clients;
