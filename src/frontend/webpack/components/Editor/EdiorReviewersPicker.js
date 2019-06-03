import React from 'react';
import styled from 'styled-components';
import Modal from '../../design-components/Modal.js';
import TxHash from '../../views/TxHash.js';
import UsersSelection from '../UsersSelection.js';
import {getDomain} from '../../../../helpers/getDomain.mjs';
import Roles from '../../../../backend/schema/roles-enum.mjs';

const Container = styled.div``;
class EdiorReviewersPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      showReviewersModal: false
    };
  }

  componentDidMount() {
    this.fetchReviewers();
  }

  fetchReviewers() {
    fetch(`${getDomain()}/api/users/roles?role=${Roles.REVIEWER}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          this.setState({searchableReviewers: response.data});
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderModal() {
    return (
      <Modal
        toggle={isTx => {
          this.setState({tx: null});
        }}
        show={this.state.tx}
        title={'We got your request!'}
      >
        The request of inviting the specified reviewers has successfully
        triggered the smart contract. You can find the transaction status here:{' '}
        <TxHash txHash={this.state.tx}>Transaction Hash</TxHash>. <br />
      </Modal>
    );
  }
  render() {
    return (
      <Container>
        <UsersSelection
          listedTitle={'Reviewers'}
          listedUsers={this.props.reviewersToInvite}
          searchableRoles={[Roles.REVIEWER, Roles.AUTHOR]}
          cannotBeAdded={this.props.selectedAccount.address}
          addToList={u => {
            this.props.addReviewer(u);
          }}
          deleteFromList={u => {
            this.props.removeReviewer(u);
          }}
        />
      </Container>
    );
  }
}

export default EdiorReviewersPicker;
