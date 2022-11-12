import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getContracts } from '../../../../services/ContractService';
import { getCurrentUser } from '../../../../services/UserService';
import "./User.scss"

const User = () => {
    const [ user, setUser ] = useState({})
    const [ contracts, setContracts] = useState([])

    const toMonthName = (monthNumber) => {
      const date = new Date();
      date.setMonth(monthNumber - 1);
    
      return date.toLocaleString('en-US', {
        month: 'short',
      });
    }

    useEffect(() => {
        getCurrentUser()
          .then(user => {
            setUser(user)
            getContracts(user)
            .then(contracts => {
              setContracts(contracts)
            })
            .catch(err => (console.log(err)))
          })
          .catch(err => console.log(err))
      }, [])

    return (
      <div className='profile'>
        <div>
            <h1>Welcome {user.firstName}</h1>
        </div>
        <div className='profile-info'>
          <h2>My profile</h2>
          <div className='info'>
            <p><b>Username:</b> {user.firstName} {user.lastName}</p>
            <p><b>Email:</b> {user.email}</p>
          </div>
        </div>
        <h2>My Contracts</h2>
        <div className='profile-contract-container'>
          {contracts.map((contract) => {
            return (
              <Link to={""} className="contract-container" key={contract.id}>
                <div className=''>
                  <h3>{contract.location.city}</h3>
                  <p>
                    {toMonthName(contract.createdAt.split('-').slice(1,-1).toString())}
                    {" "}
                    {contract.createdAt.split('-').slice(0, 1)}
                  </p>
                  <p>{contract.location.street}{" "}{contract.location.streetNumber}</p>
                  <p>{contract.price} €/kwh</p>
                  {contract.solarPanels ? <p>Solar panels: {contract.solarPanels}</p> : ''}
                  {contract.solarPanels ? <p>Power generated per solar panel: {contract.powerPerPanel}</p> : ''}
                </div>
              </Link>
            )
          })
          }
        </div>
        <div>
          
        </div>
      </div>
    );
};

export default User;