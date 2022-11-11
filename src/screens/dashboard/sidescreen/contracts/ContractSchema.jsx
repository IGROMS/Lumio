import * as Yup from 'yup';
import ERRORS from '../../../../constants/formErrors';

const ContractSchema = Yup.object().shape({
    location: Yup.object({
        postalCode: Yup
            .number()
            .required(ERRORS.ERROR_REQUIRED)
            .min(5),
        city: Yup
            .string()
            .required(ERRORS.ERROR_REQUIRED)
            .min(3),
        street: Yup
            .string()
            .required(ERRORS.ERROR_REQUIRED),
        streetNumber: Yup
            .number()
            .required(ERRORS.ERROR_REQUIRED),
    }),
    price: Yup
        .number()
        .required(ERRORS.ERROR_REQUIRED),
    solarPanel: Yup
        .number()
        .min(0),
    powerPerPanel: Yup
        .number()
        .min(0),
    billingAccount: Yup
        .string()
        .required(ERRORS.ERROR_REQUIRED)
        .matches(/^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/gm, 'Invalid bank account')
})

export default ContractSchema