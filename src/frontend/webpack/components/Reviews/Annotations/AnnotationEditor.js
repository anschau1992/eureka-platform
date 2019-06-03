import React from 'react';
import styled from 'styled-components';
import {
  __ALERT_SUCCESS,
  __GRAY_200,
  __GRAY_600,
  __GRAY_700
} from '../../../../helpers/colors.js';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  resize: none;
  overflow: auto;
  font-size: 10.5px;
  color: ${__GRAY_700};
  border: 1px solid ${__GRAY_200};
  padding: 8px;
  border-radius: 2px;
  min-height: 58px;
`;

const Button = styled.div`
  padding: 4px 8px;
  border-radius: 3px;
  cursor: pointer;
`;

const Comment = styled(Button)`
  margin-left: auto;
  color: white;
  background: ${__ALERT_SUCCESS};
  transition: 0.35s ease-in-out;
  opacity: ${props => (props.text ? 1 : 0.35)};
  pointer-events: ${props => (props.text ? 'auto' : 'none')};
`;

const Cancel = styled(Button)`
  margin-right: auto;
  color: ${__GRAY_600};
  background: ${__GRAY_200};
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 7.5px;
  line-height: 1.5;
  font-size: 8px;
`;
class AnnotationEditor extends React.Component {
  render() {
    return (
      <Container>
        <TextArea
          value={this.props.annotation.text ? this.props.annotation.text : ''}
          placeholder={'Enter your annotation here..'}
          cols={'10'}
          onChange={e => {
            this.props.onChange(this.props.id, e.target.value);
          }}
        />
        <Buttons>
          <Cancel
            onClick={() => {
              this.props.onCancel(this.props.id);
            }}
          >
            Cancel
          </Cancel>
          <Comment
            text={this.props.annotation.text}
            onClick={() => {
              this.props.onSave(this.props.id);
            }}
          >
            Comment
          </Comment>
        </Buttons>
      </Container>
    );
  }
}

export default AnnotationEditor;
