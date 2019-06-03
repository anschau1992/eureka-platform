import React from 'react';
import styled from 'styled-components';
import {Card} from '../../views/Card.js';
import Modal from '../../design-components/Modal.js';
import Article from '../../views/Article.js';
import GridSpinner from '../../views/spinners/GridSpinner.js';
import {withRouter} from 'react-router-dom';
import {getMyReviews} from './ReviewMethods.js';
import {__THIRD} from '../../../helpers/colors.js';
import {isGanache} from '../../../../helpers/isGanache.mjs';
import {
  addCommunityReview,
  addEditorApprovedReview
} from '../../../../smartcontracts/methods/web3-platform-contract-methods.mjs';
import withWeb3 from '../../contexts/WithWeb3.js';
import {connect} from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NoArtDiv = styled.div`
  display: flex;
  font-style: italic;
  margin-top: 25px;
  color: ${__THIRD};
  font-size: 16px;
`;

const NoArticles = () => {
  return <NoArtDiv>There are no reviews to display.</NoArtDiv>;
};

class ReviewsMyReviews extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: null,
      article: null,
      loading: false,
      articleOnHover: null,
      errorMessage: false,

      showTxModal: false,
      tx: null
    };
  }

  async componentDidMount() {
    await this.getMyReviews();
  }

  async getMyReviews() {
    this.setState({loading: true});
    return getMyReviews()
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          this.setState({articles: response.data});
        }
        this.setState({loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
        console.error(err);
      });
  }

  async submitEditorApprovedReview(review) {
    let gasAmount;
    // gas estimation on ganache doesn't work properly
    if (!isGanache(this.props.context.web3))
      gasAmount = await addEditorApprovedReview(
        this.props.context.platformContract,
        review.articleHash,
        review.reviewHash,
        review.articleHasMajorIssues,
        review.articleHasMinorIssues,
        review.score1,
        review.score2
      ).estimateGas({
        from: this.props.selectedAccount.address
      });
    else gasAmount = 80000000;

    addEditorApprovedReview(
      this.props.context.platformContract,
      review.articleHash,
      review.reviewHash,
      review.articleHasMajorIssues,
      review.articleHasMinorIssues,
      review.score1,
      review.score2
    )
      .send({
        from: this.props.selectedAccount.address,
        gas: gasAmount
      })
      .on('transactionHash', tx => {
        this.setState({
          showTxModal: true,
          tx
        });
        //TODO Redirect to article preview and review editor
      })
      .on('receipt', async receipt => {
        console.log('Submitting Editor Approved Review:  ' + receipt.status);
        return receipt;
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errorMessage:
            'Ouh. Something went wrong with the Smart Contract call: ' +
            err.toString()
        });
      });
  }

  async submitCommunityReview(review) {
    let gasAmount;
    // gas estimation on ganache doesn't work properly
    if (!isGanache(this.props.context.web3))
      gasAmount = await addCommunityReview(
        this.props.context.platformContract,
        review.articleHash,
        review.reviewHash,
        review.articleHasMajorIssues,
        review.articleHasMinorIssues,
        review.score1,
        review.score2
      ).estimateGas({
        from: this.props.selectedAccount.address
      });
    else gasAmount = 80000000;

    addCommunityReview(
      this.props.context.platformContract,
      review.articleHash,
      review.reviewHash,
      review.articleHasMajorIssues,
      review.articleHasMinorIssues,
      review.score1,
      review.score2
    )
      .send({
        from: this.props.selectedAccount.address,
        gas: gasAmount
      })
      .on('transactionHash', tx => {
        this.setState({
          showTxModal: true,
          tx
        });
        //TODO Redirect to article preview and review editor
      })
      .on('receipt', async receipt => {
        console.log('Submitting Community Review:  ' + receipt.status);
        return receipt;
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errorMessage:
            'Ouh. Something went wrong with the Smart Contract call: ' +
            err.toString()
        });
      });
  }

  renderModals() {
    return (
      <div>
        <Modal
          type={'notification'}
          toggle={isErrorMessage => {
            this.setState({errorMessage: null});
          }}
          show={this.state.errorMessage}
          title={'You got the following error'}
        >
          {this.state.errorMessage}
        </Modal>

        <Modal
          action={'GOT IT'}
          callback={() => {
            this.setState({showTxModal: false});
          }}
          noClose
          show={this.state.showTxModal}
          title={'Your Review has been successfully sent!'}
        >
          Dear reviewer, your request for submitting a review has successfully
          triggered our Smart Contract. If you are interested, you can track the
          Blockchain approval process at the following link: <br />
          <a href={'tx/' + this.state.tx} target={'_blank'}>
            {this.state.tx}{' '}
          </a>
        </Modal>
      </div>
    );
  }

  render() {
    return (
      <Container>
        {this.renderModals()}
        {this.state.loading ? (
          <GridSpinner />
        ) : (
          <Card title={'My Reviews'}>
            {this.state.articles ? (
              this.state.articles.length > 0 ? (
                this.state.articles.map(article => {
                  return (
                    <Article
                      buttonText={'Edit Review'}
                      show={this.state.articleOnHover === article._id}
                      key={article._id}
                      article={article}
                      onMouseEnter={obj => {
                        this.setState({articleOnHover: obj._id});
                      }}
                      onMouseLeave={obj => {
                        this.setState({articleOnHover: null});
                      }}
                      action={(_, article) => {
                        this.props.history.push(
                          `/app/write/review/${article.reviewId}`
                        );
                      }}
                    />
                  );
                })
              ) : (
                <NoArticles />
              )
            ) : (
              <NoArticles />
            )}
          </Card>
        )}
      </Container>
    );
  }
}

export default withWeb3(
  withRouter(
    connect(state => ({
      network: state.networkData.network,
      selectedAccount: state.accountsData.selectedAccount
    }))(ReviewsMyReviews)
  )
);
