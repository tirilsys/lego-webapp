// @flow

import { CompanyInterestForm } from './ActionTypes';
import callAPI from 'app/actions/callAPI';
import { addToast } from 'app/actions/ToastActions';
import { companyInterestSchema } from 'app/reducers';
import type { CompanyInterestEntity } from 'app/reducers/companyInterest';
import type { Thunk } from 'app/types';

export function fetchAll() {
  return callAPI({
    types: CompanyInterestForm.FETCH_ALL,
    endpoint: '/company-interests/',
    schema: [companyInterestSchema],
    meta: {
      errorMessage: 'Henting av bedriftsinteresser feilet'
    }
  });
}

export function fetchCompanyInterest(companyInterestId: number) {
  return callAPI({
    types: CompanyInterestForm.FETCH,
    endpoint: `/company-interests/${companyInterestId}/`,
    schema: companyInterestSchema,
    meta: {
      errorMessage: 'Henting av bedriftsinteresse feilet'
    }
  });
}

export function createCompanyInterest(data: CompanyInterestEntity): Thunk<*> {
  return dispatch => {
    return dispatch(
      callAPI({
        types: CompanyInterestForm.CREATE,
        endpoint: '/company-interests/',
        method: 'POST',
        schema: companyInterestSchema,
        body: data,
        meta: {
          errorMessage: 'Opprette bedriftsinteresse feilet'
        }
      })
    ).then(() =>
      dispatch(addToast({ message: 'Bedriftsinteresse opprettet!' }))
    );
  };
}

export function deleteCompanyInterest(id: number): Thunk<*> {
  return dispatch => {
    return dispatch(
      callAPI({
        types: CompanyInterestForm.DELETE,
        endpoint: `/company-interests/${id}/`,
        method: 'DELETE',
        meta: {
          companyInterestId: id,
          errorMessage: 'Fjerning av bedriftsinteresse feilet!'
        }
      })
    ).then(() => dispatch(addToast({ message: 'Bedriftsinteresse fjernet!' })));
  };
}

export function updateCompanyInterest(
  id: number,
  data: CompanyInterestEntity
): Thunk<*> {
  return dispatch => {
    return dispatch(
      callAPI({
        types: CompanyInterestForm.UPDATE,
        endpoint: `/company-interests/${id}/`,
        method: 'PATCH',
        body: data,
        meta: {
          companyInterestId: id,
          errorMessage: 'Endring av bedriftsinteresse feilet!'
        }
      })
    ).then(() => dispatch(addToast({ message: 'Bedriftsinteresse endret!' })));
  };
}
