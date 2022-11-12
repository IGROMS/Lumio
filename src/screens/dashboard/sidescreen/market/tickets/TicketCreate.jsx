import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../../components/misc/Input';
import { getPanelContracts } from '../../../../../services/ContractService';
import { createTicket } from '../../../../../services/TicketService';
import { getCurrentUser } from '../../../../../services/UserService';
import TicketSchema from './TicketSchema';
import {ProgressBar} from  'react-loader-spinner'
import './TicketCreate.scss'

const INITIAL_VALUES = {
    price: "",
    quantity: ""
}

function TicketCreate() {
    const [ options, setOptions ] = useState([])

    const {
        values, errors, isSubmitting, setSubmitting, setFieldError, handleSubmit, handleChange, handleBlur,
    } = useFormik({
        initialValues: INITIAL_VALUES,
        onSubmit: onSubmit,
        validationSchema: TicketSchema,
		validateOnBlur: false,
        validateOnChange: false
    })


    useEffect(() => {
        getCurrentUser()
            .then(user => {
                getPanelContracts(user)
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

    function onSubmit() {
        createTicket(values)
            .then(ticket => {
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
    
    
    return options ? (
        <div className='ticket-create'>
            <div className='card'>

                <h1>Create Ticket</h1>

                <form onSubmit={handleSubmit}>

                    <select
                        name='sellingUserContract'
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

                    <Input 
                        outputFormat="number"
                        label="Price"
                        step=".01"
                        placeholder="Add price to sell at"
                        name="price"
                        id="price"
                        value={values.price}
                        onChange={handleChange}
                        error={errors.price}
                        onBlur={handleBlur}
                    />

                    <Input 
                        type='number'
                        label="Quantity"
                        placeholder="Add ammount to sell"
                        name="quantity"
                        id="quantity"
                        value={values.quantity}
                        onChange={handleChange}
                        error={errors.quantity}
                        onBlur={handleBlur}
                    />

                    <Input
                        type='date'
                        label='Starting Date'
                        placeholder='ni idea'
                        name="startDate"
                        id="startDate"
                        value={values.startDate}
                        onChange={handleChange}
                        error={errors.startDate}
                        onBlur={handleBlur}
                    />

                    <Input
                        type='date'
                        label='Ending Date'
                        name="endDate"
                        id="endDate"
                        value={values.endDate}
                        onChange={handleChange}
                        error={errors.endDate}
                        onBlur={handleBlur}
                    />

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Loading' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    ) : (
        <div className='loader-container'>

        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor = '#020E31'
          barColor = '#FF9600'
        />
      </div>
    );

}

export default TicketCreate;