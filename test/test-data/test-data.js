import getArticleHex from '../../src/smartcontracts/methods/get-articleHex.mjs';
import web3 from '../../src/helpers/web3Instance.mjs';
import userService from '../../src/backend/db/user-service.mjs';
import Roles from '../../src/backend/schema/roles-enum.mjs';

let accounts;
let contractOwner;
let user1;
let editor1;
let editor2;
let reviewer1;
let reviewer2;
let reviewer3;
let reviewer4;

export function setAccounts(_accounts) {
  accounts = _accounts;
  contractOwner = _accounts[0];
  user1 = _accounts[1];
  editor1 = _accounts[2];
  editor2 = _accounts[3];
  reviewer1 = _accounts[4];
  reviewer2 = _accounts[5];
  reviewer3 = _accounts[6];
  reviewer4 = _accounts[7];
}

export async function createUserContractOwner() {
  return await userService.createUser(
    'test',
    'test@test.test',
    contractOwner,
    'test-avatar'
  );
}

export async function createUser1() {
  return await userService.createUser(
    'test2',
    'test2@test.test',
    user1,
    'test-avatar2'
  );
}

export async function createEditor1() {
  return await userService.createUser(
    'testEditor',
    'editor@test.test',
    editor1,
    'test-editor-avatar'
  );
}

export async function createEditor2() {
  return await userService.createUser(
    'testEditor2',
    'editor2@test.test',
    editor2,
    'test-editor2-avatar'
  );
}

export async function createReviewer1() {
  return await userService.createUser(
    'testReviewer1',
    'reviewer1@test.test',
    reviewer1,
    'test-reviewer-avatar',
    Roles.REVIEWER
  );
}

export async function createReviewer2() {
  return await userService.createUser(
    'testReviewer2',
    'reviewer2@test.test',
    reviewer2,
    'test-reviewer-avatar',
    Roles.REVIEWER
  );
}

export async function createReviewer3() {
  return await userService.createUser(
    'testReviewer3',
    'reviewer3@test.test',
    reviewer3,
    'test-reviewer-avatar',
    Roles.REVIEWER
  );
}

export async function createReviewer4() {
  return await userService.createUser(
    'testReviewer4',
    'reviewer4@test.test',
    reviewer4,
    'test-reviewer-avatar',
    Roles.REVIEWER
  );
}



export const TEST_ARTICLE_1 = {
  articleHash:
    '449ee57a8c6519e1592af5f292212c620bbf25df787d25b55e47348a54d0f9c7',
  url: 'article1.url',
  authors: [
    '0x0Ae55019E00Df4359735D9F5f11C54f6fC1b84Ee',
    '0xBaa8A96aD1b53c5412D5d89cF85d45e579f17F58'
  ],
  contributorRatios: [4000, 6000],
  linkedArticles: [
    '5f37e6ef7ee3f86aaa592bce4b142ef345c42317d6a905b0218c7241c8e30015'
  ],
  linkedArticlesSplitRatios: [3334, 3333, 3333]
};
export const TEST_ARTICLE_1_DATA_IN_HEX = getArticleHex(web3, TEST_ARTICLE_1);
export const TEST_ARTICLE_1_HASH_HEX = '0x' + TEST_ARTICLE_1.articleHash;

// TODO works!!!!
export const TEST_ARTICLE_1_SECOND_VERSION = {
  articleHash:
    '111ee57a8c6519e1592af5f292212c620bbf25df787d25b55e47348a54d0f9c7',
  url: 'article1.url',
  authors: [
    '0x32B90146858A1D119AB56202b84A330AaA7639D6',
    '0xBaa8A96aD1b53c5412D5d89cF85d45e579f17F58'
  ],
  contributorRatios: [1000, 9000],
  linkedArticles: [
    '0x5f37e6ef7ee3f86aaa592bce4b142ef345c42317d6a905b0218c7241c8e30015'
  ],
  linkedArticlesSplitRatios: [1111, 1111, 8888]
};
export const TEST_ARTICLE_1_SECOND_VERSION_DATA_IN_HEX = getArticleHex(web3, TEST_ARTICLE_1_SECOND_VERSION);
export const TEST_ARTICLE_1_SECOND_VERSION_HASH_HEX = '0x' + TEST_ARTICLE_1_SECOND_VERSION.articleHash;
export const TEST_ARTICLE1_SECOND_VERSION_HASH_URL = '0x' + TEST_ARTICLE_1_SECOND_VERSION.url;

export const TEST_ARTICLE_2 = {
  articleHash:
    '551aa99a8c6519e1592af5f292212c620bbf25df787d25b55e47348a54d0f9c7',
  url: 'article2.url',
  authors:
    [
      '0x8a19ee7f2f65da61e288455d33baeea283b9ea97',
      '0xc81c582875967d6d134ebe513c2a79b4490f6ecb'
    ],
  contributorRatios:
    [2000, 8000],
  linkedArticles:
    [
      '5f37e6ef7ee3f86aaa592bce4b142ef345c42317d6a905b0218c7241c8e30015'
    ],
  linkedArticlesSplitRatios:
    [2000, 2000, 6000]
};
export const TEST_ARTICLE_2_NO_HEX = {
  articleHash:
    '551aa99a8c6519e1592af5f292212c620bbf25df787d25b55e47348a54d0f9c7',
  url: 'article2.url',
  authors:
    [
      '0x8a19ee7f2f65da61e288455d33baeea283b9ea97',
      '0xc81c582875967d6d134ebe513c2a79b4490f6ecb'
    ],
  contributorRatios:
    [2000, 8000],
  linkedArticles:
    [
      '5f37e6ef7ee3f86aaa592bce4b142ef345c42317d6a905b0218c7241c8e30015'
    ],
  linkedArticlesSplitRatios:
    [2000, 2000, 6000]
};
export const TEST_ARTICLE_2_DATA_IN_HEX = getArticleHex(web3, TEST_ARTICLE_2_NO_HEX);

// TODO works!!!
export const TEST_ARTICLE_2_HASH_HEX = '0x' + TEST_ARTICLE_2.articleHash;


export const TEST_ARTICLE_3 = {
  articleHash:
    '333ee57a8c6519e1592af5f292212c620bbf25df787d25b55e47348a54d0f9c7',
  url: 'article3.url',
  authors: [
    '0xbB44e39bF87016b167997922597591Bdff68Fd44',
    '0xA8Dd80d44959490bcAAdc41d916A9D8a5d0038CC'
  ],
  contributorRatios: [4000, 6000],
  linkedArticles: [
    '5f37e6ef7ee3f86aaa592bce4b142ef345c42317d6a905b0218c7241c8e30333'
  ],
  linkedArticlesSplitRatios: [3334, 3333, 3333]
};
export const TEST_ARTICLE_3_DATA_IN_HEX = getArticleHex(web3, TEST_ARTICLE_3);
export const TEST_ARTICLE_3_HASH_HEX = '0x' + TEST_ARTICLE_3.articleHash;


export const TEST_ARTICLE_4 = {
  articleHash:
    '444ee57a8c6519e1592af5f292212c620bbf25df787d25b55e47348a54d0f9c7',
  url: 'article4.url',
  authors: [
    '0x655aA73E526cdf45c2E8906Aafbf37d838c2Ba88',
    '0xA99c235D93A2a2dd1eA775F50e7bAf7332d7A053'
  ],
  contributorRatios: [4000, 6000],
  linkedArticles: [
    '5f37e6ef7ee3f86aaa592bce4b142ef345c42317d6a905b0218c7241c8e30444'
  ],
  linkedArticlesSplitRatios: [3334, 3333, 3333]
};
export const TEST_ARTICLE_4_DATA_IN_HEX = getArticleHex(web3, TEST_ARTICLE_4);
export const TEST_ARTICLE_4_HASH_HEX = '0x' + TEST_ARTICLE_4.articleHash;
/******************* TEST REVIEWS *******************/

export const NO_ISSUES_REVIEW_1 = {
  reviewHash:
    '449ee57a8c6519e1592af5f292212c620bbf25df787d25b55e47348a54d0f9c7',
  reviewText: 'This is the test-text for the review or reviewer 1',
  score1: 3,
  score2: 5,
  articleHasMajorIssues: false,
  articleHasMinorIssues: false
};

export const NO_ISSUES_REVIEW_1_HASH_HEX = '0x' + NO_ISSUES_REVIEW_1.reviewHash;
export const NO_ISSUES_REVIEW_1_CORRECTED = {
  reviewHash:
    '111aa57a8c6519e1592af5f292212c620bbf25df787d25b55e47348a54d0f9c7',
  reviewText: 'This is the correction review of NO ISSUES 1',
  score1: 3,
  score2: 3,
  articleHasMajorIssues: false,
  articleHasMinorIssues: false
};

export const NO_ISSUES_REVIEW_2 = {
  reviewHash:
    '222ee57a8c6519e1592af5f292212c620bbf25df787d25b55e47348a54d0f9c7',
  reviewText: 'This is article has NO ISSUES 2',
  score1: 4,
  score2: 4,
  articleHasMajorIssues: false,
  articleHasMinorIssues: false
};
export const NO_ISSUES_REVIEW_2_HASH_HEX = '0x' + NO_ISSUES_REVIEW_2.reviewHash;

export const MINOR_ISSUES_REVIEW_1 = {
  reviewHash:
    '333cc57a8c6519e1592af5f292212c620bbf25df787d25b55e47348a54d0f9c7',
  reviewText: 'This is article has MINOR ISSUES 1',
  score1: 1,
  score2: 2,
  articleHasMajorIssues: false,
  articleHasMinorIssues: true
};
export const MINOR_ISSUES_REVIEW_1_HASH_HEX = '0x' + MINOR_ISSUES_REVIEW_1.reviewHash;

export const MINOR_ISSUES_REVIEW_2 = {
  reviewHash:
    '444cc57a8c6519e1592af5f292212c620bbf25df787d25b55e47348a54d0f9c7',
  reviewText: 'This is article has MINOR ISSUES 2',
  score1: 1,
  score2: 2,
  articleHasMajorIssues: false,
  articleHasMinorIssues: true
};
export const MINOR_ISSUES_REVIEW_2_HASH_HEX = '0x' + MINOR_ISSUES_REVIEW_2.reviewHash;

export const MAJOR_ISSUE_REVIEW_1= {
  reviewHash:
    '555cc57a8c6519e1592af5f292212c620bbf25df787d25b55e47348a54d0f9c7',
  reviewText: 'This is article has MAJOR ISSUES 1',
  score1: 1,
  score2: 1,
  articleHasMajorIssues: false,
  articleHasMinorIssues: false
};
export const MAJOR_ISSUE_REVIEW_1_HASH_HEX = '0x' + MAJOR_ISSUE_REVIEW_1.reviewHash;

export const MAJOR_ISSUE_REVIEW_2= {
  reviewHash:
    '666cc57a8c6519e1592af5f292212c620bbf25df787d25b55e47348a54d0f9c7',
  reviewText: 'This is article has MAJOR ISSUES 2',
  score1: 1,
  score2: 2,
  articleHasMajorIssues: false,
  articleHasMinorIssues: false
};
export const MAJOR_ISSUE_REVIEW_2_HASH_HEX = '0x' + MAJOR_ISSUE_REVIEW_2.reviewHash;

export const MAJOR_ISSUE_REVIEW_3= {
  reviewHash:
    '777cc57a8c6519e1592af5f292212c620bbf25df787d25b55e47348a54d0f9c7',
  reviewText: 'This is article has MAJOR ISSUES 3',
  score1: 2,
  score2: 1,
  articleHasMajorIssues: false,
  articleHasMinorIssues: false
};
export const MAJOR_ISSUE_REVIEW_3_HASH_HEX = '0x' + MAJOR_ISSUE_REVIEW_3.reviewHash;