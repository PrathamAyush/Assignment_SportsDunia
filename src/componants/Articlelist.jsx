import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setArticles } from '../redux/actions';
import SearchBar from './Nav';

const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);

  const [searchQuery, setSearchQuery] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch articles from News API
  useEffect(() => {
    axios
      .get('https://newsapi.org/v2/everything?q=apple&from=2025-01-03&to=2025-01-03&sortBy=popularity&apiKey=0c45eee7a01f4f65889b7a921dc0d37d')
      .then((response) => {
        dispatch(setArticles(response.data.articles));
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
        alert('Error fetching articles');
      });
  }, [dispatch]);

  // Filter articles based on the search and filter criteria
  useEffect(() => {
    let filtered = articles;

    // Global search by title
    if (searchQuery) {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by author
    if (authorFilter) {
      filtered = filtered.filter((article) =>
        article.author && article.author.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    // Filter by date
    if (dateFilter) {
      filtered = filtered.filter((article) =>
        new Date(article.publishedAt).toLocaleDateString() === new Date(dateFilter).toLocaleDateString()
      );
    }

    // Filter by type
    if (typeFilter) {
      filtered = filtered.filter((article) =>
        article.source.name.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [articles, searchQuery, authorFilter, dateFilter, typeFilter]);

  // Pagination logic
  const indexOfLastArticle = currentPage * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-6">
      {/* SearchBar Component */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        authorFilter={authorFilter}
        setAuthorFilter={setAuthorFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      {/* Display filtered articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentArticles.map((article, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Display Article Image */}
            <img
              src={article.urlToImage || 'https://via.placeholder.com/400x200'}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{article.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{article.description || 'No description available'}</p>
              <p className="text-sm text-gray-500 mt-2 font-bold">Author: {article.author || 'Unknown'}</p>
              <p className="text-sm text-gray-500 font-bold">Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Source: {article.source.name}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-600 hover:underline font-bold"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArticleList;
