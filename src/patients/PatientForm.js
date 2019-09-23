import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns'
import { format } from 'date-fns'
import { Formik } from 'formik'
import { MuiPickersUtilsProvider, DateTimePicker, DatePicker } from '@material-ui/pickers'
import * as Yup from 'yup'
import React from 'react';
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Button,
  InputLabel
} from '@material-ui/core'
import SpecialistType from './SpecialistType';
import * as utils from '../utils'

const getInitialValues = () => ({
  firstName: '',
  lastName: '',
  specialist: SpecialistType.Nurse,
  birthDate: format(new Date(), utils.dateFormat),
  serviceDate: format(new Date(), utils.dateTimeFormat),
  isServiced: false
})

export default function PatientForm(props) {
  return (
    <Formik
      initialValues={getInitialValues()}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false)
        props.onSubmit(values)
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string()
          .required('Required'),
        lastName: Yup.string()
          .required('Required'),
      })}
    >
      {formProps => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        } = formProps;
        return (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item>
                <FormControl>
                  <TextField
                    error={errors.firstName && touched.firstName}
                    helperText={touched.firstName && errors.firstName}
                    name="firstName"
                    placeholder="First name"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange} />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <TextField
                    error={errors.lastName && touched.lastName}
                    helperText={touched.firstName && errors.lastName}
                    name="lastName"
                    placeholder="Last name"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange} />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item>
                <FormControl>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      name="birthDate"
                      value={values.birthDate}
                      label="Birth Date"
                      ampm={false}
                      format={utils.dateFormat}
                      onBlur={handleBlur}
                      onChange={value => setFieldValue('birthDate', format(value, utils.dateFormat))}
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      name="serviceDate"
                      value={values.serviceDate}
                      label="Service Date"
                      ampm={false}
                      minDate={new Date()}
                      format={utils.dateTimeFormat}
                      onBlur={handleBlur}
                      onChange={value => setFieldValue('serviceDate', format(value, utils.dateTimeFormat))}
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item>
                <FormControl>
                  <InputLabel htmlFor="specialist">Specialist</InputLabel>
                  <Select
                    name="specialist"
                    value={values.specialist}
                    onChange={handleChange}>
                    <MenuItem value={SpecialistType.Nurse}>{SpecialistType.Nurse}</MenuItem>
                    <MenuItem value={SpecialistType.Surgeon}>{SpecialistType.Surgeon}</MenuItem>
                    <MenuItem value={SpecialistType.Psychiatrist}>{SpecialistType.Psychiatrist}</MenuItem>
                    <MenuItem value={SpecialistType.Cardiologist}>{SpecialistType.Cardiologist}</MenuItem>
                    <MenuItem value={SpecialistType.Dermatologist}>{SpecialistType.Dermatologist}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item>
                <Button type="submit" disabled={isSubmitting} variant="contained" color="primary">Submit</Button>
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  )
}

PatientForm.propTypes = {
  onSubmit: PropTypes.func
}