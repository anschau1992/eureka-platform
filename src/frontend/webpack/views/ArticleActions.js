import React from 'react';
import styled from 'styled-components';
import {__GRAY_600} from '../../helpers/colors.js';
import ARTICLE_VERSION_STATE from '../../../backend/schema/article-version-state-enum.mjs';
import Roles from '../../../backend/schema/roles-enum.mjs';
import ARTICLE_SUBMISSION_STATE from '../../../backend/schema/article-submission-state-enum.mjs';
import {connect} from 'react-redux';
import REVIEW_STATE from '../../../backend/schema/review-state-enum.mjs';
import {SanityCheckAcceptButton} from '../components/Articles/ArticleActions/SanityOk.js';
import {SanityCheckDeclineButton} from '../components/Articles/ArticleActions/SanityNotOk.js';
import {SanityCheckDeclineAndCloseButton} from '../components/Articles/ArticleActions/SanityNotOkAndClose.js';
import {AssignAsEditorButton} from '../components/Articles/ArticleActions/AssignEditor.js';
import {ResignAsEditorButton} from '../components/Articles/ArticleActions/ResignEditor.js';
import {InviteReviewersButton} from '../components/Articles/ArticleActions/InviteReviewers.js';
import {CheckReviewsButton} from '../components/Articles/ArticleActions/CheckReviews.js';
import {AcceptArticleButton} from '../components/Articles/ArticleActions/AcceptArticle.js';
import {DeclineArticleAndRequestButton} from '../components/Articles/ArticleActions/DeclineArticleAndRequest.js';
import {DeclineArticleAndCloseButton} from '../components/Articles/ArticleActions/DeclineArticleAndClose.js';
import {DeclineArticleNotEnoughReviewersButton} from '../components/Articles/ArticleActions/DeclineArticleNotEnoughReviewers.js';
import {EditArticleButton} from '../components/Articles/ArticleActions/EditArticle.js';
import {SignUpForExpertReviewButton} from '../components/Articles/ArticleActions/SignUpForExpertReview.js';
import {WriteExpertReviewButton} from '../components/Articles/ArticleActions/WriteExpertReview.js';
import {WriteCommunityReviewButton} from '../components/Articles/ArticleActions/WriteCommunityReview.js';

const Actions = styled.div`
  font-size: 14px;
  color: ${__GRAY_600};
  font-style: italic;
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const RoleActions = styled.div`
  margin-bottom: 20px;
`;

const AuthorActions = ({article, user}) => {
  if (article.articleSubmission.ownerAddress === user.ethereumAddress) {
    if (article.articleVersionState === ARTICLE_VERSION_STATE.DRAFT)
      return <EditArticleButton article={article}/>;
  }
  return null;
};

const EditorActions = ({article, user}) => {
  if (user.roles.includes(Roles.EDITOR)) {
    if (
      article.articleSubmission.articleSubmissionState === ARTICLE_SUBMISSION_STATE.OPEN
      && article.articleSubmission.ownerAddress !== user.ethereumAddress
    ) {
      return (
        <RoleActions>
          <AssignAsEditorButton article={article}/>
        </RoleActions>
      );
    }

    if (
      article.articleSubmission.articleSubmissionState ===
      ARTICLE_SUBMISSION_STATE.EDITOR_ASSIGNED &&
      article.articleSubmission.editor === user.ethereumAddress
    ) {
      if (article.articleVersionState === ARTICLE_VERSION_STATE.SUBMITTED)
        return (
          <div>
            <RoleActions>
              <SanityCheckAcceptButton article={article}/>
              <SanityCheckDeclineButton article={article}/>
              <SanityCheckDeclineAndCloseButton article={article}/>
            </RoleActions>
            <RoleActions>
              <ResignAsEditorButton article={article}/>
            </RoleActions>
          </div>
        );

      if (
        article.articleVersionState ===
        ARTICLE_VERSION_STATE.OPEN_FOR_ALL_REVIEWERS
      )
        return (
          <div>
            <RoleActions>
              {/*{getNumberOfReviewsInformation(article)}*/}
              <InviteReviewersButton article={article}/>
              {getDeclineArticleNotEnoughReviewerButton(article)}
            </RoleActions>
            <RoleActions>
              {getCheckReviewsButton(article)}
            </RoleActions>
            <RoleActions>
              {getAcceptArticleButton(article)}
              {getDeclineArticleAndRequestNewVersionButton(article)}
              {getDeclineArticleAndCloseSubmissionButton(article)}
            </RoleActions>
          </div>
        );
    }
  }
  return null;
};

const ExpertReviewerActions = ({article, user}) => {
  if (
    user.roles.includes(Roles.EXPERT_REVIEWER) &&
    article.articleSubmission.ownerAddress !== user.ethereumAddress &&
    article.articleSubmission.editor !== user.ethereumAddress &&
    !article.document.authors.includes(user.ethereumAddress)
  ) {
    const expertReview = article.editorApprovedReviews.find(r => {
      return r.reviewerAddress === user.ethereumAddress;
    });

    const communityReview = article.communityReviews.find(r => {
      return r.reviewerAddress === user.ethereumAddress;
    });

    if (!expertReview && !communityReview)
      return (
        <RoleActions>
          <SignUpForExpertReviewButton article={article}/>
          <WriteExpertReviewButton article={article}/>
        </RoleActions>
      );

    if (expertReview) {
      switch (expertReview.reviewState) {
        case REVIEW_STATE.INVITED:
          return (
            <RoleActions>
              <SignUpForExpertReviewButton article={article}/>
              <WriteExpertReviewButton article={article}/>
            </RoleActions>
          );

        case REVIEW_STATE.SIGNED_UP_FOR_REVIEWING:
          return (
            <div>
              <WriteExpertReviewButton article={article}/>
              <div>Resign from Expert Reviewing</div>
            </div>
          );

        case REVIEW_STATE.HANDED_IN_DB:
          return <div>Continue Review</div>;

        case REVIEW_STATE.HANDED_IN_SC:
          return <div>See Your Review</div>;

        case REVIEW_STATE.DECLINED:
          return <div>Correct Your Review</div>;

        case REVIEW_STATE.ACCEPTED:
          return <div>Edit Your Review</div>;

        default:
          return null;
      }
    }
  }
  return null;
};

const CommunityReviewerActions = ({article, user}) => {
  if (
    user.roles.includes(Roles.REVIEWER) &&
    article.articleSubmission.ownerAddress !== user.ethereumAddress &&
    article.articleSubmission.editor !== user.ethereumAddress &&
    !article.document.authors.includes(user.ethereumAddress)
  ) {
    const expertReview = article.editorApprovedReviews.find(r => {
      return r.reviewerAddress === user.ethereumAddress;
    });

    const communityReview = article.communityReviews.find(r => {
      return r.reviewerAddress === user.ethereumAddress;
    });

    if (!expertReview && !communityReview)
      return (
        <RoleActions>
          <WriteCommunityReviewButton article={article}/>
        </RoleActions>
      );

    if (communityReview) {
      switch (communityReview.reviewState) {
        case REVIEW_STATE.INVITED:
          return (
            <RoleActions>
              <WriteCommunityReviewButton article={article}/>
            </RoleActions>
          );

        case REVIEW_STATE.SIGNED_UP_FOR_REVIEWING:
          return (
            <RoleActions>
              <WriteCommunityReviewButton article={article}/>
            </RoleActions>
          );

        case REVIEW_STATE.HANDED_IN_DB:
          return <div>Continue Community Review</div>;

        case REVIEW_STATE.HANDED_IN_SC:
          return <div>See Your Community Review</div>;

        case REVIEW_STATE.DECLINED:
          return <div>Correct Your Community Review</div>;

        case REVIEW_STATE.ACCEPTED:
          return <div>Edit Your Community Review</div>;

        default:
          return null;
      }
    }
  }
  return null;
};

const getNumberOfReviewsInformation = article => {
  return <div>There are X reviews. Y reviews are unchecked</div>;
};

const getCheckReviewsButton = article => {
  if (getNumberOfCheckableReviews(article) > 0)
    return <CheckReviewsButton article={article}/>;
  else
    return null;
};

const getNumberOfCheckableReviews = article => {
  return 1;
};

const isArticleAcceptable = article => {
  return true;
};

const getAcceptArticleButton = article => {
  if (isArticleAcceptable(article))
    return <AcceptArticleButton article={article}/>;
  else
    return null;
};

const isDeclinable = article => {
  return true;
};

const isNewVersionRequestPossible = article => {
  return true;
};

const getDeclineArticleAndRequestNewVersionButton = article => {
  if (isDeclinable(article) && isNewVersionRequestPossible(article))
    return <DeclineArticleAndRequestButton article={article}/>;
  else
    return null;
};

const getDeclineArticleAndCloseSubmissionButton = article => {
  if (isDeclinable(article))
    return <DeclineArticleAndCloseButton article={article}/>;
  else
    return null;
};

const getDeclineArticleNotEnoughReviewerButton = article => {
  return <DeclineArticleNotEnoughReviewersButton article={article}/>;
};

const mapStateToProps = state => ({
  user: state.userData.data
});

const ArticleActions = connect(mapStateToProps)(({article, user}) => {
  return (
    <Actions>
      <AuthorActions article={article} user={user}/>
      <EditorActions article={article} user={user}/>
      <ExpertReviewerActions article={article} user={user}/>
      <CommunityReviewerActions article={article} user={user}/>
    </Actions>
  );
});

export default ArticleActions;
