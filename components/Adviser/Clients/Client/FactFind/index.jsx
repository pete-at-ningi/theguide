import styled from 'styled-components';
import config from './config';

const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1rem;
  border-bottom: ${(props) => (props.isLast ? 'none' : '1px solid #dedede')};
  padding: ${(props) => (props.isFirst ? '0 0 1rem 0' : '1rem 0')};
`;

const Left = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 16px;
  font-family: 'Sora', sans-serif;
  color: #3f3f41;
  margin-bottom: 0;
`;

const Sub = styled.p`
  font-size: 14px;
  font-family: 'Sora', sans-serif;
  color: #6b7380;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  grid-gap: 1rem;
  margin-bottom: 1rem;
`;

const Item = styled.div`
  width: ${(props) => props.widthPercentage}%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  * {
    width: 100%;
  }
  label {
    margin-bottom: 6px;
  }
  input,
  select {
    border: 1px solid #dedede;
    padding: 6px 12px;
    border-radius: 4px;
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    color: #6b7380;
  }
`;

const FactFind = ({ client, handleChange }) => {
  return (
    <>
      {config.map((section, sectionIndex) => (
        <Section
          key={sectionIndex}
          isFirst={sectionIndex === 0}
          isLast={sectionIndex + 1 === config.length}
        >
          <Left>
            <Title>{section.title}</Title>
            <Sub>{section.sub}</Sub>
          </Left>
          <Right>
            {section.data.map((row, rowIndex) => {
              const widthPercentage = 100 / row.length;
              return (
                <Row key={rowIndex}>
                  {row.map((item, itemIndex) => (
                    <Item key={itemIndex} widthPercentage={widthPercentage}>
                      <label>{item.label}</label>
                      {item.type === 'select' ? (
                        <select
                          name={item.key}
                          value={client[item.key] || ''}
                          onChange={handleChange}
                        >
                          <option value='' disabled>
                            Select option
                          </option>
                          {item.options.map((option, optIndex) => (
                            <option key={optIndex} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={item.type}
                          name={item.key}
                          value={client[item.key] || ''}
                          onChange={handleChange}
                        />
                      )}
                    </Item>
                  ))}
                </Row>
              );
            })}
          </Right>
        </Section>
      ))}
    </>
  );
};

export default FactFind;
