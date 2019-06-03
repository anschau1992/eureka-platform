import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
  display: flex;
  line-height: 2.5;
`;

export const FieldContainer = styled.div`
  flex: 3;
  position: relative;
`;

export const ReviewsWriterFieldContainer = props => {
  return <Field>{props.children}</Field>;
};
