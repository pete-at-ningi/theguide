import ClientItem from '../../../components/Adviser/Clients/Client';
import PageWrap from '../../../components/Adviser/Layout/PageWrap';

const Client = () => {
  return (
    <PageWrap active={'clients'}>
      <ClientItem />
    </PageWrap>
  );
};

export default Client;
