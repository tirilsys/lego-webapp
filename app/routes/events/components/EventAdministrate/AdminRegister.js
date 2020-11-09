// @flow

import React from 'react';
import { Field, type FormProps } from 'redux-form';
import { RenderErrorMessage } from 'app/components/Form/Field';
import { legoForm, TextEditor, SelectInput } from 'app/components/Form';
import Button from 'app/components/Button';
import type { ID, EventPool, User } from 'app/models';
import { waitinglistPoolId } from 'app/actions/EventActions';

type Props = {
  eventId: ID,
  adminRegister: (ID, ID, ID, string, string) => Promise<*>,
  pools: Array<EventPool>,
} & FormProps;

const AdminRegister = ({
  eventId,
  handleSubmit,
  adminRegister,
  pools,
  invalid,
  pristine,
  submitting,

  error,
}: Props) => {
  return (
    <div style={{ width: '400px' }}>
      <form onSubmit={handleSubmit}>
        <Field
          placeholder="Begrunnelse"
          label="Begrunnelse"
          name="adminRegistrationReason"
          component={TextEditor.Field}
        />
        <Field
          placeholder="Tilbakemelding"
          label="Tilbakemelding"
          name="feedback"
          component={TextEditor.Field}
        />
        <Field
          name="pool"
          component={SelectInput.Field}
          placeholder="Pool"
          label="Pool"
          options={pools
            .map((pool) => ({ value: pool.id, label: pool.name }))
            .concat([{ value: waitinglistPoolId, label: 'Venteliste' }])}
        />
        <Field
          name="user"
          component={SelectInput.AutocompleteField}
          filter={['users.user']}
          placeholder="Bruker"
          label="Bruker"
        />
        <RenderErrorMessage error={error} />
        <Button type="submit" disabled={invalid || pristine || submitting}>
          Registrer
        </Button>
      </form>
    </div>
  );
};

function validateForm(data) {
  const errors = {};

  if (!data.reason) {
    errors.reason = 'Forklaring er påkrevet';
  }

  if (!data.pool) {
    errors.pool = 'Pool er påkrevet';
  }

  if (!data.user) {
    errors.user = 'Bruker er påkrevet';
  }

  return errors;
}
const onSubmit = (
  {
    user,
    pool,
    feedback,
    adminRegistrationReason,
  }: {
    user: User,
    pool: number,
    feedback: string,
    adminRegistrationReason: string,
  },
  dispatch,
  { reset, eventId, adminRegister }: Props
) =>
  adminRegister(eventId, user.id, pool, feedback, adminRegistrationReason).then(
    () => {
      reset();
    }
  );

export default legoForm({
  form: 'adminRegister',
  validate: validateForm,
  onSubmit,
})(AdminRegister);
