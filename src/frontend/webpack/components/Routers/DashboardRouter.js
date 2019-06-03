import React, {Component} from 'react';
import {Route} from 'react-router';
import {Redirect} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard.js';
import MyAccount from '../Account/MyAccount.js';
import MyHistory from '../MyHistory/MyHistory.js';
import TopContainer from '../../views/TopContainer.js';
import {BottomContainer} from '../../views/BottomContainer.js';
import ArticlesRouter from './ArticlesRouter.js';
import AddressBook from '../AddressBook/AddressBook.js';
import {ContractOwnerGuard} from '../Guards/Guards.js';
import EditorRouter from './EditorRouter.js';
import Reviewers from '../Reviewers.js';
import UserExploration from '../UserLookup/UserExploration.js';
import ReviewsRouter from './ReviewsRouter.js';
import PreviewRouter from './PreviewRouter.js';
import ReviewsWriter from '../Reviews/ReviewsWriter.js';
import ContractRouter from './ContractRouter.js';
import {ToastContainer} from 'react-toastify';

const CloseButton = ({YouCanPassAnyProps, closeToast}) => (
  <i className="material-icons" onClick={closeToast}>
    delete
  </i>
);

class DashboardRouter extends Component {
  render() {
    return (
      <div>
        <TopContainer action={item => this.props.action(item)} />
        <BottomContainer>
          <ToastContainer />
          <Route
            exact
            path={`${this.props.base}/dashboard`}
            render={() => <Dashboard />}
          />

          <Route
            path={`${this.props.base}/owner`}
            render={() => (
              <ContractOwnerGuard>
                <ContractRouter base={`${this.props.base}/owner`} />
              </ContractOwnerGuard>
            )}
          />

          <Route
            exact
            path={`${this.props.base}/book`}
            render={() => <AddressBook />}
          />

          <Route
            exact
            path={`${this.props.base}/account`}
            render={() => <MyAccount />}
          />

          <Route
            exact
            path={`${this.props.base}/actions`}
            render={() => <MyHistory base={`${this.props.base}/actions`} />}
          />

          <Route
            path={`${this.props.base}/reviews`}
            render={() => {
              return <ReviewsRouter base={`${this.props.base}/reviews`} />;
            }}
          />

          <Route
            path={`${this.props.base}/documents`}
            render={() => (
              <ArticlesRouter base={`${this.props.base}/documents`} />
            )}
          />

          <Route
            path={`${this.props.base}/editor`}
            render={() => <EditorRouter base={`${this.props.base}/editor`} />}
          />

          {/*ROUTES IN DASHBOARD WHICH ARE NOT INCLUDED IN PANEL LEFT */}
          <Route
            exact
            path={`${this.props.base}/reviewers`}
            render={() => <Reviewers />}
          />

          <Route
            path={`${this.props.base}/users/:ethereumAddress`}
            render={() => <UserExploration base={`${this.props.base}/users`} />}
          />

          <Route
            path={`${this.props.base}/preview/:id`}
            render={() => (
              <PreviewRouter
                base={`${this.props.base}/preview`}
                cardTitle={'Article Preview'}
              />
            )}
          />

          {/*ReviewsWriter route. Intentionally not kept as a subroute of /reviews*/}
          <Route
            path={`${this.props.base}/write/review/:reviewId`}
            render={() => (
              <ReviewsWriter base={`${this.props.base}/write/review`} />
            )}
          />

          {/*Redirect to dashboard. Leave it at the bottom!*/}
          <Route
            exact
            path={`${this.props.base}`}
            render={() => <Redirect to={`${this.props.base}/dashboard`} />}
          />
        </BottomContainer>
      </div>
    );
  }
}

export default DashboardRouter;
