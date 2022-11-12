import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Ticket.scss'
import Popup from 'reactjs-popup';
import { useFormik } from 'formik';
import { getCurrentUser } from '../../services/UserService';
import { getContracts } from '../../services/ContractService';
import { buyTicket } from '../../services/TicketService';

const INITIAL_VALUES = {
	buyingUserContract: ""
}

const Ticket = ({ticket}) => {

	const [ options, setOptions ] = useState([])

    const {
        values, isSubmitting, setSubmitting, setFieldError, handleSubmit, handleChange, handleBlur,
    } = useFormik({
        initialValues: INITIAL_VALUES,
        onSubmit: onSubmit,
/*         validationSchema: BuyTicketSchema
 */    })

    useEffect(() => {
        getCurrentUser()
            .then(user => {
                getContracts(user)
                    .then(contracts => {
                        return contracts.map(contract => {
                            return {
                                value: contract.id,
                                name: `${contract.location.street}, ${contract.location.streetNumber}`
                            }
                        })
                    })
                    .then((e) => {
                        setOptions(e)
                    })
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
    }, [])


    const navigate = useNavigate()

    function onSubmit(formData) {
			buyTicket(ticket.id, formData)
            .then(() => {
                navigate('/market')
            })
            .catch(err => {
                console.log(err.response.data);

                err.response.data && 
                  Object.keys(err.response.data.errors)
                    .forEach((errorKey) => {
                        setFieldError(errorKey, err.response.data.errors[errorKey])
                    })
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

  return (
    <Popup trigger={
			<Link to={""} className="ticket-container">
				<div>
					<div className='ticket-selling-user'><h3>{ticket.sellingUser.firstName} {ticket.sellingUser.lastName}</h3></div>
					<h4>{ticket.startDate?.toString().substring(0, 10)} &#x2192; {ticket.endDate?.toString().substring(0, 10)}</h4>
				</div>
				<div className='ticket-info'>
					<p>{ticket.quantity} kWh</p>
					<p>{ticket.price}€/kWh</p>
				</div>
			</Link>
		} position="top left">
    {close => (
      <div className='modal-container'>
				<div className='modal'>
          <div className='controls'>
            <h2>Select your contract</h2>				
            <form onSubmit={handleSubmit} className="contract-select-form">
                <select name='buyingUserContract'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id="select-contract"
                  defaultValue={'default'}
                >
                  <option value={'default'} disabled>Choose you contract</option>
                  {options?.map(option => {
                    return <option key={option.value} value={option.value}> {option.name}</option>
                  })}
                </select>
          
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Loading' : 'Submit'}
                </button>
            </form>
          </div>
          <a className="close" onClick={close}>
          &times;
          </a>
				</div>
      </div>
    )}
  </Popup>
    
  );
};

export default Ticket;