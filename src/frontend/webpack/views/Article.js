import React from 'react';
import ArticleCard from './ArticleCard.js';

const Article = ({article, ...otherProps}) => {
  return (
    <ArticleCard
      show={otherProps.show}
      buttonText={otherProps.buttonText}
      onMouseEnter={obj => {
        otherProps.onMouseEnter(obj);
      }}
      onMouseLeave={obj => {
        otherProps.onMouseLeave(obj);
      }}

      article={article}
      action={(id, article) => {
        otherProps.action(id, article);
      }}
      action2={(id, article) => {
        otherProps.action2(id, article);
      }}
      button2Text={otherProps.button2Text}
    />
  );
};

export default Article;
