import { getJobFunctions, getStates, submitForm } from 'api/main';
import Button from 'components/Button';
import InputField from 'components/InputField';
import SelectField, { SelectOption } from 'components/SelectField';
import useForm, { IForm } from 'hooks/useForm';
import Grid from 'layouts/Grid';
import { useEffect, useMemo, useState } from 'react';
import './style.scss';

const JobFunctions: SelectOption[] = [{ value: '0', label: 'Select ...', id: '0' }];
const States: SelectOption[] = [{ value: '0', label: 'Select ...', id: '0' }];

type JobFunction = {
  id: string;
  jobFunction: string;
};

type State = {
  id: string;
  name: string;
  abbreviation: string;
};

const CreationForm = () => {
  const form = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    company: '',
    jobTitle: '',
    jobFunction: JobFunctions[0].value,
    state: States[0].value,
    city: '',
  });

  const [jobFunctions, setJobFunctions] = useState(JobFunctions);
  const [states, setStates] = useState(States);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    getJobFunctions()
      .then(({ data }) => {
        setJobFunctions([
          ...JobFunctions,
          ...(data as JobFunction[]).map((v: JobFunction) => ({
            value: v.jobFunction,
            label: v.jobFunction,
            id: v.id,
          })),
        ]);
      })
      .catch(console.error);
    getStates()
      .then(({ data }) => {
        setStates([
          ...States,
          ...(data as State[]).map((v: State) => ({ value: v.abbreviation, label: v.name, id: v.id })),
        ]);
      })
      .catch(console.error);
  }, []);

  const generatedForm = useMemo((): IForm => {
    return {
      firstName: form.firstName.value as string,
      lastName: form.lastName.value as string,
      email: form.email.value as string,
      password: form.password.value as string,
      company: form.company.value as string,
      jobTitle: form.jobTitle.value as string,
      jobFunction: form.jobFunction.value as string,
      state: form.state.value as string,
      city: form.city.value as string,
    };
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.isFormValid) {
      setSending(true);
      submitForm(generatedForm)
        .then((res) => {
          // console.log(res.data);
          alert('Success!');
          setSending(false);
        })
        .catch((err) => {
          console.error(err);
          setSending(false);
        });
    }
  };

  return (
    <div className="noti-form-container">
      <div className="form-header">Creation Form</div>
      <div className="form-content">
        <Grid>
          <InputField label="First Name" {...form.firstName} error={form.error.firstName} />
          <InputField label="Last Name" {...form.lastName} error={form.error.lastName} />
        </Grid>
        <Grid>
          <InputField {...form.email} label="Email" error={form.error.email} type="email" />
          <InputField {...form.password} label="Password" error={form.error.password} type="password" />
        </Grid>
        <Grid>
          <InputField {...form.company} label="Company" error={form.error.company} />
          <InputField {...form.jobTitle} label="Job Title" error={form.error.jobTitle} />
        </Grid>
        <SelectField
          {...form.jobFunction}
          label="Job Function"
          width="full"
          options={jobFunctions}
          error={form.error.jobFunction}
        />
        <Grid>
          <SelectField {...form.state} label="State" width="full" options={states} error={form.error.state} />
          <InputField {...form.city} label="City" error={form.error.city} />
        </Grid>
        <Button
          label={sending ? 'SUBMITTING' : 'SUBMIT'}
          onClick={handleSubmit}
          disabled={!form.isFormValid || sending}
        />
      </div>
    </div>
  );
};

export default CreationForm;
