import React from 'react';

const NewsSearchResults = ({ articles }) => {
  if (!articles || articles.length === 0) return <p>No results found.</p>;

  return (
    <div>
      {articles.map((article, index) => (
        <div key={index} className="article">
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          <small>Published At: {article.publishedAt}</small>
        </div>
      ))}
    </div>
  );
};

export default NewsSearchResults;
