import PageWrap from '../../../components/Adviser/Layout/PageWrap';
import ClientsContent from '../../../components/Adviser/Clients';

const Clients = () => {
  return (
    <PageWrap active={'clients'}>
      <ClientsContent />
    </PageWrap>
  );
};

export default Clients;
