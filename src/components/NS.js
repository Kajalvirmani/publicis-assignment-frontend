import React, { useState } from 'react';
import axios from 'axios';
import NewsSearchResults from './NewsSearchResults';

const NS = () => {
  const [keyword, setKeyword] = useState('');
  const [intervalType, setIntervalType] = useState('HOURS');
  const [intervalValue, setIntervalValue] = useState(12);
  const [articles, setArticles] = useState([]);
  const [links, setLinks] = useState({});

  const handleSearch = async (url = null) => {
    try {
      const response = await axios.get(url || 'http://localhost:8081/news/search', {
        params: { keyword, intervalType, N: intervalValue },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/hal+json'
        },
        withCredentials: true,
      });
      console.log(response)
      setArticles(response.data._embedded.articles || []); // assuming HATEOAS `_embedded` is used
      setLinks(response.data._links); // Store links for pagination
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleNext = () => {
    if (links.nextInterval) {
      handleSearch(links.nextInterval.href);
    }
  };

  const handlePrevious = () => {
    if (links.previousInterval) {
      handleSearch(links.previousInterval.href);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        placeholder="Enter keyword"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input
        type="number"
        value={intervalValue}
        onChange={(e) => setIntervalValue(e.target.value)}
      />
      <select value={intervalType} onChange={(e) => setIntervalType(e.target.value)}>
        <option value="MINUTES">Minutes</option>
        <option value="HOURS">Hours</option>
        <option value="DAYS">Days</option>
        <option value="WEEKS">Weeks</option>
        <option value="MONTHS">Months</option>
        <option value="YEARS">Years</option>
      </select>
      <button onClick={() => handleSearch()}>Search</button>

      <NewsSearchResults articles={articles} />
      
      {/* Pagination Links */}
      <div>
        {links.previousInterval && <button onClick={handlePrevious}>Previous Interval</button>}
        {links.nextInterval && <button onClick={handleNext}>Next Interval</button>}
      </div>
    </div>
  );
};

export default NS;
