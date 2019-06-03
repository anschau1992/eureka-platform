import {getDomain} from '../../../../helpers/getDomain.mjs';

export const createContact = (contactAddress, preName, lastName, label) => {
  return fetch(`${getDomain()}/api/book`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      contactAddress,
      preName,
      lastName,
      label
    })
  });
};

export const getContacts = () => {
  return fetch(`${getDomain()}/api/book`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
};

export const updateContact = (contactAddress, preName, lastName, label) => {
  return fetch(`${getDomain()}/api/book`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      contactAddress,
      preName,
      lastName,
      label
    })
  });
};

export const deleteContact = contactAddress => {
  return fetch(`${getDomain()}/api/book`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      contactAddress: contactAddress
    })
  });
};
