import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { portfolioDataState, searchTermState } from '@src/states/SearchResultsState';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { search, searchPage } from '@src/apis/search';
// api 테스트 및 구현 완료
const AutoSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [, setPortfolioData] = useRecoilState(portfolioDataState);
  const [, setSearchWords] = useRecoilState(searchTermState);
  const [searchError, setSearchError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const debounceSearch = debounce(async term => {
      try {
        const response = await search(1, term);
        if (response.data) {
          setSuggestions(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }, 500);

    debounceSearch(searchTerm);
  }, [searchTerm]);

  const handleChange = e => {
    const term = e.target.value;
    setSearchError('');
    setSearchTerm(term);
  };

  const handleKeyDown = async e => {
    if (e.key === 'Enter') {
      // if (searchTerm === '') {
      //   setSearchError('단어를 입력해주세요');
      //   return; // 검색어가 비어있으면 동작하지 않음
      // }
      const searchPortfolioData = await searchPage(1, searchTerm);
      setPortfolioData(searchPortfolioData);
      setSearchWords(searchTerm);
      navigate('/searchresults');
    }
  };

  const handleClickSuggestion = suggestion => {
    setSearchTerm(suggestion);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} onKeyDown={handleKeyDown} />
      <p>{searchError}</p>
      {searchTerm !== '' && suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleClickSuggestion(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSearch;
