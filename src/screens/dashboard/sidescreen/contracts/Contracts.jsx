import React, { useEffect, useState } from 'react';
import { getContract, getContracts } from '../../../../services/ContractService';
import './Contracts.scss'
import { TbCirclePlus } from 'react-icons/tb'
import { Link } from 'react-router-dom';
import ContractSelect from '../../../../components/misc/contract-select/ContractSelect';
import { getCurrentUser } from '../../../../services/UserService';
import ContractDetails from './ContractDetails';

const Contracts = () => {
  const [ contracts, setContracts ] = useState([])
  const [ contractSelected, setContractSelected] = useState()
  const [ contract, setContract ] = useState(null)

  useEffect(() => {
    getContracts()
      .then(contracts => {
        setContracts(contracts)
    })
  }, [])

  useEffect(() => {
    getCurrentUser()
      .then(user => {
        getContracts(user)
          .then(contractsFetched => {
            setContracts(contractsFetched)
						setContractSelected(contractsFetched[0].id);
          })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if(contractSelected) {
      getContract(contractSelected)
        .then(contract => {
          setContract(contract)
        })
    }
  }, [contractSelected])

  return contracts ? (
    <div className='contracts-screen'>
      <div className="sidescreen-title">
        <h2 className='dashboard-title'>My Contracts</h2>
        <Link to={"/contracts/create"}><TbCirclePlus className='title-icon'/></Link>
      </div>
      <div className='select'>
        <ContractSelect
            contracts={contracts}
            contractSelected={contractSelected}
            setContractSelected={setContractSelected}
          />
      </div>
      <ContractDetails contract={contract} />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Contracts;