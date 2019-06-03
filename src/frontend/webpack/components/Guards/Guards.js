import React from 'react';
import {Redirect} from 'react-router-dom';
import GridSpinner from '../../views/spinners/GridSpinner.js';
import Roles from '../../../../backend/schema/roles-enum.mjs';
import {connect} from 'react-redux';
import {fetchUserData} from '../../reducers/user.js';

const mapDispatchToProps = dispatch => ({
  fetchUserData: () => {
    dispatch(fetchUserData());
  }
});
const mapStateToProps = state => ({
  isAuthenticated: state.userData.isAuthenticated,
  user: state.userData.data
});

export const DashBoardGuard = connect(
  mapStateToProps,
  mapDispatchToProps
)(props => {
  if (props.isAuthenticated === null) {
    return <GridSpinner />;
  }
  if (!props.isAuthenticated) {
    return (
      <Redirect to={{pathname: '/login', state: {from: props.location}}} />
    );
  }
  return props.children;
});

export const LoginGuard = connect(
  mapStateToProps,
  mapDispatchToProps
)(props => {
  if (props.isAuthenticated === null) {
    return <GridSpinner />;
  }
  if (props.isAuthenticated) {
    return <Redirect to={{pathname: '/app', state: {from: props.location}}} />;
  }
  return props.children;
});

export const ContractOwnerGuard = connect(
  mapStateToProps,
  mapDispatchToProps
)(({user, ...otherProps}) => {
  if (user.roles.includes(Roles.CONTRACT_OWNER)) {
    return otherProps.children;
  } else {
    return <Redirect to={{pathname: '/app', state: {from: otherProps.location}}} />;
  }
});
