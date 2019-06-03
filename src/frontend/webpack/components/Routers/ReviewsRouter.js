import React, {Component} from 'react';
import styled from 'styled-components';
import {Route} from 'react-router';
import {Redirect, withRouter} from 'react-router-dom';
import NavPill from '../../views/NavPill.js';
import {ReviewsNavPillRoutes} from './ReviewsNavPillRoutes.js';
import ReviewsInvited from '../Reviews/ReviewsInvited.js';
import ReviewsOpen from '../Reviews/ReviewsOpen.js';
import Roles from '../../../../backend/schema/roles-enum.mjs';
import BecomeReviewer from '../Reviews/BecomeReviewer.js';
import ReviewsMyReviews from '../Reviews/ReviewsMyReviews.js';
import connect from 'react-redux/es/connect/connect.js';

const Parent = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavPills = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
`;

const Container = styled.div``;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2em;
`;

class ReviewsRouter extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Parent>
        {this.props.user.roles.includes(Roles.REVIEWER) ||
        this.props.user.roles.includes(Roles.EXPERT_REVIEWER) ? (
          <Container>
            <NavPills>
              {ReviewsNavPillRoutes.map((item, index) => {
                return (
                  <NavPill
                    name={item.name}
                    base={this.props.base}
                    key={index}
                    path={item.path}
                    icon={item.icon}
                    material={item.material}
                    width={22}
                  />
                );
              })}
            </NavPills>
            <CardContainer>
              <Route
                exact
                path={`${this.props.base}/invited`}
                render={() => (
                  <ReviewsInvited base={`${this.props.base}/invited`} />
                )}
              />

              <Route
                exact
                path={`${this.props.base}/open`}
                render={() => <ReviewsOpen base={`${this.props.base}/open`} />}
              />

              <Route
                exact
                path={`${this.props.base}/me`}
                render={() => (
                  <ReviewsMyReviews base={`${this.props.base}/me`} />
                )}
              />

              <Route
                exact
                path={`${this.props.base}`}
                render={() => {
                  return <Redirect to={`${this.props.base}/invited`} />;
                }}
              />
            </CardContainer>
          </Container>
        ) : (
          <BecomeReviewer />
        )}
      </Parent>
    );
  }
}

export default withRouter(
  connect(state => ({
    user: state.userData.data
  }))(ReviewsRouter)
);
