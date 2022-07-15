import useInput from 'hooks/useInput';
import { useMemo } from 'react';
import validator from 'validator';
import _ from 'lodash';

export interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: string;
  jobTitle: string;
  jobFunction: string;
  state: string;
  city: string;
}

const defaultError: IForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  company: '',
  jobTitle: '',
  jobFunction: '',
  state: '',
  city: '',
};

const useForm = (initForm: IForm) => {
  const firstName = useInput(initForm.firstName);
  const lastName = useInput(initForm.lastName);
  const email = useInput(initForm.email);
  const password = useInput(initForm.password);
  const company = useInput(initForm.company);
  const jobTitle = useInput(initForm.jobTitle);
  const jobFunction = useInput(initForm.jobFunction);
  const state = useInput(initForm.state);
  const city = useInput(initForm.city);

  const error = useMemo(() => {
    const newErr = Object.assign({}, defaultError);

    if (firstName.value === '') newErr.firstName = 'Required';
    else if (!validator.isAlpha(firstName.value as string)) newErr.firstName = 'Use only letters';

    if (lastName.value === '') newErr.lastName = 'Required';
    else if (!validator.isAlpha(lastName.value as string)) newErr.lastName = 'Use only letters';

    if (email.value === '') newErr.email = 'Required';
    else if (!validator.isEmail(email.value as string)) newErr.email = 'Email is not valid';

    if (password.value === '') newErr.password = 'Required';
    if (company.value === '') newErr.company = 'Required';
    if (jobTitle.value === '') newErr.jobTitle = 'Required';
    if (jobFunction.value === '0') newErr.jobFunction = 'Required';
    if (state.value === '0') newErr.state = 'Required';
    if (city.value === '') newErr.city = 'Required';

    return newErr;
  }, [firstName, lastName, email, password, company, jobTitle, jobFunction, state, city]);

  const isFormValid = useMemo(() => {
    return _.isEqual(error, defaultError);
  }, [error]);

  return { firstName, lastName, email, password, company, jobTitle, jobFunction, state, city, error, isFormValid };
};

export default useForm;
