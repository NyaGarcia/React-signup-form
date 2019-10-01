import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { TextField } from "final-form-material-ui";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import { validateForm } from "services/index";

export const SignupComponent = (): JSX.Element => {

const onSubmit = (values): void =>
  alert(JSON.stringify(values));

const validate = async (values): Promise<any> => {
  const { fieldErrors, recordErrors } = await validateForm(values);
  const errors  = {...getErrorMessages(fieldErrors), ...getErrorMessages(recordErrors)};
  return errors;
}

const getErrorMessages = (object): {[field: string]: string} => {
  return Object.keys(object).reduce((acc, key) => {
    let { message } = object[key];

    if(!message) message = false;

    acc[key] = message;
    return acc;
  }, {});
  
}

 return <Card>
          <CardHeader title="Signup" />
            <CardContent>
              <Form       
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, values, form, pristine, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container alignItems="flex-start" spacing={2}>
                      <Grid item xs={6}>
                        <Field name="id" component={TextField} placeholder="NyaGarcia" label="Github ID" />
                      </Grid>
                      <Grid item xs={7}>
                        <Field name="firstName" component={TextField} placeholder="Nya" label="First Name" />
                      </Grid>
                      <Grid item xs={5}>
                        <Field name="lastName" component={TextField} placeholder="García" label="Last Name" fullWidth/>
                      </Grid>
                      <Grid item xs={12}>
                        <Field name="email" component={TextField} placeholder="nya@lemoncode.com" label="Email" fullWidth/>
                      </Grid>
                      <Grid item xs={12}>
                        <Field name="repeatEmail" component={TextField} placeholder="nya@lemoncode.com" label="Repeat Email" fullWidth/>
                      </Grid>
                      <Grid item xs={6}>
                        <Field name="password" type="password" component={TextField} placeholder="password" label="Password"/>
                      </Grid>
                      <Grid item xs={6}>
                        <Field name="repeatPassword" type="password" component={TextField} placeholder="password" label="Repeat Password"/>
                      </Grid>
                      <Grid item xs={6}>
                        <Button type="submit" color="primary" variant="contained" disabled={submitting || pristine}>Submit</Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button onClick={form.reset} disabled={pristine}>Reset</Button>
                      </Grid>       
    
      {JSON.stringify(values)};
          </Grid>
                  </form>
                )}
              />
            </CardContent>
        </Card>
}