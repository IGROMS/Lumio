import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../components/misc/Input';
import { createContract } from '../../../../services/ContractService';
import ContractSchema from './ContractSchema';

const INITIAL_VALUES = {
    location: {
        postalCode: '',
        city: '',
        street: '',
        streetNumber: '',
    },
    billingAccount: '',
    price: '',
}

function ContractCreate() {
    const {
        values, errors, isSubmitting, setSubmitting, setFieldError, handleSubmit, handleChange, handleBlur,
    } = useFormik({
        initialValues: INITIAL_VALUES,
        onSubmit: onSubmit,
        validationSchema: ContractSchema,
    })

    const navigate = useNavigate()

    function onSubmit(values) {
        createContract(values)
            .then(contract => {
                navigate('/contracts')
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
        <div>
            <h1>Create contract</h1>

            <form onSubmit={handleSubmit}>
                <Input 
                    label="Postal Code"
                    placeholder="Add Postal Code"
                    name="location.postalCode"
                    id="postalCode"
                    value={values.location.postalCode}
                    onChange={handleChange}
                    error={errors.location?.postalCode}
                    onBlur={handleBlur}
                />

                <Input
                    label="City"
                    placeholder="Add your City"
                    name="location.city"
                    id="city"
                    value={values.location.city}
                    onChange={handleChange}
                    error={errors.location?.city}
                    onBlur={handleBlur}
                />

                <Input
                    label="Street Name"
                    placeholder="Add Street Name"
                    name="location.street"
                    id="street"
                    value={values.location.street}
                    onChange={handleChange}
                    error={errors.location?.street}
                    onBlur={handleBlur}
                />

                <Input
                    label="Street Number"
                    placeholder="Add Street Number"
                    name="location.streetNumber"
                    id="streetNumber"
                    value={values.location.streetNumber}
                    onChange={handleChange}
                    error={errors.location?.streetNumber}
                    onBlur={handleBlur}
                />

                <Input
                    step=".01"
                    label="Price"
                    placeholder="Add the price of kwh"
                    name="price"
                    id="price"
                    value={values.price}
                    onChange={handleChange}
                    error={errors.price}
                    onBlur={handleBlur}
                />

                <Input
                    label="Solar Panels"
                    placeholder="Do you have solar panels?"
                    name="solarPanels"
                    id="solarPanels"
                    value={values.location.solarPanels}
                    onChange={handleChange}
                    error={errors.solarPanels}
                    onBlur={handleBlur}
                />

                <Input
                    label="Power per Panel"
                    placeholder="Add kwh generated per panel"
                    name="powerPerPanel"
                    id="powerPerPanel"
                    value={values.location.powerPerPanel}
                    onChange={handleChange}
                    error={errors.powerPerPanel}
                    onBlur={handleBlur}
                />

                <Input
                    label="Billing Account"
                    placeholder="Insert billing account"
                    name="billingAccount"
                    id="billingAccount"
                    value={values.location.billingAccount}
                    onChange={handleChange}
                    error={errors.billingAccount}
                    onBlur={handleBlur}
                />


                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Loading' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default ContractCreate;