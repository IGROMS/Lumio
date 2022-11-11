import React from 'react';
import './ContractSelect.scss'

const ContractSelect = ({contracts, contractSelected, setContractSelected}) => {

  const handleChange = event => {
    setContractSelected(event.target.value);
  };

  return (
    <select name='contract'
        onChange={handleChange}
        id="select-contract"
        defaultValue={contractSelected}
        >
      {contracts?.map(option => {
        return <option key={option.id} value={option.id}> {option.location.street} {option.location.streetNumber}</option>
      })}
    </select>
  );
};

export default ContractSelect;