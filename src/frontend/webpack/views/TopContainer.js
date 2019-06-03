import React from 'react';
import styled from 'styled-components';
import {__MAIN, __SECOND, __THIRD} from '../../helpers/colors.js';
import Ball from './Ball.js';
import connect from 'react-redux/es/connect/connect.js';
import AppHeader from './AppHeader.js';

export const Container = styled.div`
  min-height: 353px;
  background: linear-gradient(
    150deg,
    ${__THIRD} 15%,
    ${__SECOND} 70%,
    ${__MAIN} 94%
  );
  position: relative;
  margin-bottom: -225px !important;
`;

const BallContainer = styled.div`
  position: absolute;
  width: 100%;
`;

class TopContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      dropMenuVisible: false
    };
  }

  toggle() {
    const dropMenuVisible = !this.state.dropMenuVisible;
    this.setState({dropMenuVisible});
  }

  render() {
    return (
      <Container>
        <AppHeader
          show={this.state.dropMenuVisible}
          toggle={() => {
            this.toggle();
          }}
          action={item => {
            this.props.action(item);
          }}
        />
        <BallContainer>
          <Ball
            rgb={'255, 255, 255'}
            left={50}
            top={20}
            width={120}
            intensity={0.07}
          />
          <Ball
            rgb={'255, 255, 255'}
            left={160}
            top={130}
            width={90}
            intensity={0.2}
          />
          <Ball
            rgb={'255, 255, 255'}
            left={400}
            top={90}
            width={120}
            intensity={0.15}
          />
          <Ball
            rgb={'255, 255, 255'}
            left={670}
            top={23}
            width={55}
            intensity={0.1}
          />
          <Ball
            rgb={'255, 255, 255'}
            left={720}
            top={50}
            width={60}
            intensity={0.05}
          />
          <Ball
            rgb={'255, 255, 255'}
            right={200}
            top={180}
            width={150}
            intensity={0.15}
          />
          <Ball
            rgb={'255, 255, 255'}
            right={600}
            top={60}
            width={200}
            intensity={0.3}
          />
          <Ball
            rgb={'255, 255, 255'}
            right={280}
            top={50}
            width={100}
            intensity={0.08}
          />
          <Ball
            rgb={'255, 255, 255'}
            right={340}
            top={80}
            width={70}
            intensity={0.18}
          />
        </BallContainer>
      </Container>
    );
  }
}

export default connect(state => ({
  user: state.userData.data,
  metaMaskStatus: state.metamaskData.status
}))(TopContainer);
