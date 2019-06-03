import React, {Fragment} from 'react';
import styled from 'styled-components';
import {PreviewArticleTitleByField} from './PreviewArticleTitleByField.js';
import {
  FieldContainer,
  ReviewsWriterFieldContainer
} from '../Reviews/Annotations/ReviewsWriterField.js';
import ReviewsWriterContainer from '../Reviews/Annotations/WriterContainer.js';
import Sentences from './Sentences.js';

const Container = styled.div``;

const FIELD = 'abstract';

class PreviewArticleAbstract extends React.Component {
  constructor() {
    super();
    this.state = {
      onShow: null,
      annotationRef: null,
      sentences: null
    };
  }

  render() {
    const abstract =
      'Neuronal morphology is established during development. It can subsequently be modified by synaptic activity, a process known as structural plasticity. Postsynaptic compartments, such as dendritic spines or the postsynaptic membrane of the Drosophila neuromuscular junction (NMJ) (called the subsynaptic reticulum or SSR), are highly dynamic elements that grow during development, and that are subject to this type of plasticity. While it is known that the shape of postsynaptic structures is tightly coupled to synaptic function, the factors that govern the morphology and its relationship with functional plasticity are still elusive. Ral GTPase has been shown to regulate the expansion of postsynaptic membranes during development and in response to synaptic activity via the Exocyst, an octameric tethering complex conserved from yeast to human. Postsynaptic activation of Ral at the Drosophila NMJ induces Exocyst recruitment to the synapse, resulting in membrane addition and SSR growth. However, how this type of remodeling is actually achieved, remains to be determined. Given the known role of Rab GTPases in polarized delivery of vesicles, we expect that a subset of these will be required for Exocyst-dependent SSR growth. Here, by systematically evaluating the localization of the Exocyst subunit Sec5 after postsynaptic activation of each Rab GTPase, we concluded that no single Rab is able to induce Sec5 recruitment to the NMJ to same extent as Ral GTPase. This result may indicate that activation of Ral at the Drosophila NMJ is necessary to initiate the signaling cascade that controls SSR size. In addition, we describe the cellular distribution of postsynaptic active Rab GTPases, and identify putative candidates whose distribution and relationship with the Exocyst may indicate a Rab/Exocyst-dependent role in muscle and/or postsynaptic development. Altogether, this study contributes to untangle the vesicle trafficking pathway(s) that regulate SSR growth at the Drosophila NMJ.';
    return (
      <Container id={FIELD}>
        <PreviewArticleTitleByField field={FIELD} />
        <ReviewsWriterFieldContainer>
          <FieldContainer>
            <Sentences
              annotations={this.props.annotations}
              text={abstract}
              field={FIELD}
              isReview={this.props.isReview}
              show={this.state.onShow}
              onClick={ref => {
                this.props.onAdd(ref, FIELD);
              }}
              updateOffsets={sentences => {
                this.setState({sentences});
              }}
              onShow={i => {
                this.setState({onShow: i});
              }}
            />
          </FieldContainer>
          {this.props.isReview ? (
            <Fragment>
              <ReviewsWriterContainer
                sentences={this.state.sentences}
                annotations={this.props.annotations}
                onShow={this.state.onShow}
                field={FIELD}
                onCancel={id => {
                  this.props.cancelAnnotation(id);
                }}
                onSave={id => {
                  this.props.saveAnnotation(id);
                }}
                onDelete={id => {
                  this.props.deleteAnnotation(id);
                }}
                onEdit={id => {
                  this.props.editAnnotation(id);
                }}
                onChange={(id, text) => {
                  this.props.changeAnnotation(id, text);
                }}
                {...this.props}
              />
            </Fragment>
          ) : null}
        </ReviewsWriterFieldContainer>
      </Container>
    );
  }
}
export default PreviewArticleAbstract;
