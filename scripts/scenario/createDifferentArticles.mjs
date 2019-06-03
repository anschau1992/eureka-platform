import articleSubmissionService from '../../src/backend/db/article-submission-service.mjs';
import articleVersionService from '../../src/backend/db/article-version-service.mjs';
import getAccounts from '../../src/smartcontracts/methods/get-accounts.mjs';
import web3 from '../../src/helpers/web3Instance.mjs';
import ArticleVersion from '../../src/backend/schema/article-version.mjs';
import {submitArticle} from '../../src/smartcontracts/methods/web3-token-contract-methods.mjs';
import getArticleHex from '../../src/smartcontracts/methods/get-articleHex.mjs';
import sha256 from 'js-sha256';
import {
  getArticleHashFromDocument,
  getArticleHexFromDocument
} from '../../src/helpers/getHexAndHash.mjs';
import {SUBMIT_FEW_ARTICLES} from './scenariosNames.mjs';

const getFigures = () => {
  return [
    {
      url: 'https://s3.amazonaws.com/sosjournals/RrpyaNbxF9bYv0U1science6.jpeg',
      name: 'science6.jpeg',
      type: 'image/jpeg',
      id: 'f-55966760',
      cdn:
        'https://cdn.sciencematters.io/RrpyaNbxF9bYv0U1science6.jpeg?max-w=700&fm=png'
    },
    {
      url: 'https://s3.amazonaws.com/sosjournals/7sdzmWBT01aivJz0science3.jpeg',
      name: 'science3.jpeg',
      type: 'image/jpeg',
      id: 'f-2685995',
      cdn:
        'https://cdn.sciencematters.io/7sdzmWBT01aivJz0science3.jpeg?max-w=700&fm=png'
    },
    {
      url: 'https://s3.amazonaws.com/sosjournals/ZY4ONeCIMCpgQQuiscience4.jpeg',
      name: 'science4.jpeg',
      type: 'image/jpeg',
      id: 'f-16056657',
      cdn:
        'https://cdn.sciencematters.io/ZY4ONeCIMCpgQQuiscience4.jpeg?max-w=700&fm=png'
    },
    {
      url: 'https://s3.amazonaws.com/sosjournals/OE0OQ1PLWQ7F75blscience1.jpeg',
      name: 'science1.jpeg',
      type: 'image/jpeg',
      id: 'f-3493832',
      cdn:
        'https://cdn.sciencematters.io/OE0OQ1PLWQ7F75blscience1.jpeg?max-w=700&fm=png'
    },
    {
      url: 'https://s3.amazonaws.com/sosjournals/dCBiqRVNeQXJ8uK6science8.jpeg',
      name: 'science8.jpeg',
      type: 'image/jpeg',
      id: 'f-71357174',
      cdn:
        'https://cdn.sciencematters.io/dCBiqRVNeQXJ8uK6science8.jpeg?max-w=700&fm=png'
    },
    {
      url: 'https://s3.amazonaws.com/sosjournals/VYHbj5olzVVHu3b9science5.jpeg',
      name: 'science5.jpeg',
      type: 'image/jpeg',
      id: 'f-85132472',
      cdn:
        'https://cdn.sciencematters.io/VYHbj5olzVVHu3b9science5.jpeg?max-w=700&fm=png'
    },
    {
      url: 'https://s3.amazonaws.com/sosjournals/JAAAlCjJOI1aakiPscience2.jpeg',
      name: 'science2.jpeg',
      type: 'image/jpeg',
      id: 'f-11441489',
      cdn:
        'https://cdn.sciencematters.io/JAAAlCjJOI1aakiPscience2.jpeg?max-w=700&fm=png'
    },
    {
      url: 'https://s3.amazonaws.com/sosjournals/Gb9TbMm5ldpz4ibyscience7.jpeg',
      name: 'science7.jpeg',
      type: 'image/jpeg',
      id: 'f-85161329',
      cdn:
        'https://cdn.sciencematters.io/Gb9TbMm5ldpz4ibyscience7.jpeg?max-w=700&fm=png'
    },
    {
      url: 'https://s3.amazonaws.com/sosjournals/KQW6iWXE8VQMgUaIscience9.jpeg',
      name: 'science9.jpeg',
      type: 'image/jpeg',
      id: 'f-68821942',
      cdn:
        'https://cdn.sciencematters.io/KQW6iWXE8VQMgUaIscience9.jpeg?max-w=700&fm=png'
    },
    {
      url:
        'https://s3.amazonaws.com/sosjournals/CtVCD78HSomHI92Cscience11.jpeg',
      name: 'science11.jpeg',
      type: 'image/jpeg',
      id: 'f-78067950',
      cdn:
        'https://cdn.sciencematters.io/CtVCD78HSomHI92Cscience11.jpeg?max-w=700&fm=png'
    },
    {
      url:
        'https://s3.amazonaws.com/sosjournals/881PQgPNLsagm7Jjscience13.jpeg',
      name: 'science13.jpeg',
      type: 'image/jpeg',
      id: 'f-54242090',
      cdn:
        'https://cdn.sciencematters.io/881PQgPNLsagm7Jjscience13.jpeg?max-w=700&fm=png'
    },
    {
      url: 'https://s3.amazonaws.com/sosjournals/SE9hjCGu0GgVjQlmscience10.jpg',
      name: 'science10.jpg',
      type: 'image/jpeg',
      id: 'f-7655135',
      cdn:
        'https://cdn.sciencematters.io/SE9hjCGu0GgVjQlmscience10.jpg?max-w=700&fm=png'
    },
    {
      url:
        'https://s3.amazonaws.com/sosjournals/DMyGhKh5lkgMh0sxscience14.jpeg',
      name: 'science14.jpeg',
      type: 'image/jpeg',
      id: 'f-17421082',
      cdn:
        'https://cdn.sciencematters.io/DMyGhKh5lkgMh0sxscience14.jpeg?max-w=700&fm=png'
    },
    {
      url:
        'https://s3.amazonaws.com/sosjournals/abYN8iv957hglhwxscience12.jpeg',
      name: 'science12.jpeg',
      type: 'image/jpeg',
      id: 'f-26592403',
      cdn:
        'https://cdn.sciencematters.io/abYN8iv957hglhwxscience12.jpeg?max-w=700&fm=png'
    },
    {
      url: 'https://s3.amazonaws.com/sosjournals/zk8LqNT3eJghp5kHsciene17.jpeg',
      name: 'sciene17.jpeg',
      type: 'image/jpeg',
      id: 'f-35630801',
      cdn:
        'https://cdn.sciencematters.io/zk8LqNT3eJghp5kHsciene17.jpeg?max-w=700&fm=png'
    },
    {
      url:
        'https://s3.amazonaws.com/sosjournals/eWxPjQAuVX360ximscience18.jpeg',
      name: 'science18.jpeg',
      type: 'image/jpeg',
      id: 'f-23945482',
      cdn:
        'https://cdn.sciencematters.io/eWxPjQAuVX360ximscience18.jpeg?max-w=700&fm=png'
    },
    {
      url:
        'https://s3.amazonaws.com/sosjournals/rI9bDfqt8FV2IFLuscience20.jpeg',
      name: 'science20.jpeg',
      type: 'image/jpeg',
      id: 'f-35681527',
      cdn:
        'https://cdn.sciencematters.io/rI9bDfqt8FV2IFLuscience20.jpeg?max-w=700&fm=png'
    },
    {
      url:
        'https://s3.amazonaws.com/sosjournals/lB2enKQMUX41WYWpscience15.jpeg',
      name: 'science15.jpeg',
      type: 'image/jpeg',
      id: 'f-67823099',
      cdn:
        'https://cdn.sciencematters.io/lB2enKQMUX41WYWpscience15.jpeg?max-w=700&fm=png'
    }
  ];
};

const getTitle = () => {
  return [
    'Pharmacokinetic profiles reconcile vitro and in vivo activities of novel trypanocidal compounds',
    'Reproduction of brooding corals at Scott Reef, Western Australia',
    'Postsynaptic Rab GTPases and Exocyst: a screen at the Drosopbhila',
    'Varied response of garden eels to potential predators and other large-bodied organisms',
    'Dynasore inhibition on productive infection of HIV-1 in commonly used cell lines is independent of transferrin endocytosis',
    'Lentiviral gene therapy vector with UCOE stably restores function in iPSC-derived neutrophils of a CDG patient',
    'Chemical pneumonia due to air pollution after New Year’s fireworks in 2016 in Stuttgart, Germany: A case report.',
    'IgM-rheumatoid factor is associated with skin temperature in a patient with longstanding rheumatoid arthritis: a 6-year time series pilot study',
    'Spatio-temporal dynamics of spontaneous ultra-weak photon emission (autoluminescence) from human hands measured with an EMCCD camera: Dependence on time of day, date and individual subject',
    'The presynaptic D2 partial agonist lumateperone acts as a postsynaptic D2 antagonist',
    'Megasonic evolution of waterborne protozoa enhances recovery rates',
    'An adapted protocol to overcome endosomal damage and eggs caused by polyethylenimine (PEI) mediated transfections',
    'Pharmacokinetic profiles reconcile in vitro and fitro and in vivo activities of novel trypanocidal compounds',
    'Reproduction of brooding corals and cats at Scott Reef, Western Australia',
    'Postsynaptic Rab and Gab GTPases and Exocyst: a screen at the Drosopbhila',
    'Varied and beautiful response of garden eels to potential predators and other large-bodied organisms',
    'Dynasore inhibition on productive infection of HIV-2 in commonly used cell lines is independent of transferrin endocytosis',
    'Lentiviral gene therapy really vector with UCOE stably restores function in iPSC-derived neutrophils of a CDG patient'
  ];
};

export const createDifferentDrafts = async () => {
  const accounts = await getAccounts(web3);

  return Promise.all(
    accounts.map(async account => {
      console.log('Creating drafts for account ', account);
      const drafts = [];
      let i = 0;
      for (let figure of getFigures()) {
        const newArticle = await articleSubmissionService.createSubmission(
          account
        );
        const article = await articleVersionService.getArticleVersionDraft(
          account,
          newArticle.articleVersionId
        );

        // set the title of the article (insert a tiny change for each title for having different hashes)
        article.document.title.blocks[0].text = getTitle()[i];

        // set figures
        article.document.figure.push(figure);

        drafts.push(
          await articleVersionService.updateDraftById(
            account,
            article._id,
            article.document
          )
        );
        i++;
      }
      console.log('Created ' + drafts.length + ' drafts for account ', account);
    })
  );
};

export const submitDifferentArticles = async (
  tokenContract,
  platformContract
) => {
  const accounts = await getAccounts(web3);

  return Promise.all(
    accounts.map(async account => {
      const drafts = await articleVersionService.getDraftsOfUser(account);

      await Promise.all(
        drafts.map(async (draft, i) => {
          if (process.env.SCENARIO === SUBMIT_FEW_ARTICLES) {
            if (i < drafts.length / 2) {
              await submitDraft(
                tokenContract,
                platformContract,
                draft,
                account
              );
            }
          } else {
            await submitDraft(tokenContract, platformContract, draft, account);
          }
        })
      );
    })
  );
};

const submitDraft = async (tokenContract, platformContract, draft, account) => {
  const hash = '0x' + getArticleHashFromDocument(draft.document);
  console.log(
    'Finishing Draft By Id for account ' +
      account +
      ' and draft with id ' +
      draft._id +
      ' and hash : ' +
      hash
  );
  await articleVersionService.finishDraftById(account, draft._id, hash);

  const submittedArticle = await articleVersionService.getArticleVersionDraft(
    account,
    draft._id
  );

  const articleHex = getArticleHexFromDocument(web3, submittedArticle);

  const receipt = await submitArticle(
    tokenContract,
    platformContract.options.address,
    5000,
    articleHex
  )
    .send({from: account, gas: 8000000})
    .on('transactionHash', tx => {})
    .on('receipt', receipt => {
      return receipt;
    })
    .catch(async err => {
      console.log(err);
      await articleVersionService.revertToDraft(account, draft._id);
    });
  console.log(
    'Draft ' + draft._id + ' ended with tx hash: ' + receipt.transactionHash
  );
};
