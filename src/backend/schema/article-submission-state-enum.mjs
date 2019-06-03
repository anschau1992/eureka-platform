/**
 * Different states a submission process can have
 */
const ARTICLE_SUBMISSION_STATE = Object.freeze({
  NOT_EXISTING: 'NOT_EXISTING',
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  EDITOR_ASSIGNED: 'EDITOR_ASSIGNED',
  NEW_REVIEW_ROUND_REQUESTED: 'NEW_REVIEW_ROUND_REQUESTED',
  CLOSED: 'CLOSED'
});

export default ARTICLE_SUBMISSION_STATE;