import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Register the necessary components for the chart
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const ExportPai = () => {
  const [authors, setAuthors] = useState([]);

  // Fetch data from API
  useEffect(() => {
    axios
      .get('https://newsapi.org/v2/everything?q=apple&apiKey=0c45eee7a01f4f65889b7a921dc0d37d')
      .then(response => {
        const articles = response.data.articles;

        // Group articles by author
        const authorMap = articles.reduce((acc, article) => {
          const author = article.author || 'Unknown';
          if (!acc[author]) {
            acc[author] = 0;
          }
          acc[author] += 1;
          return acc;
        }, {});

        // Convert to an array of objects for rendering
        const authorArray = Object.entries(authorMap).map(([name, numArticles]) => ({
          name,
          numArticles,
        }));

        setAuthors(authorArray);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data from the API.');
      });
  }, []);

  // Data for the Pie chart
  const chartData = {
    labels: authors.map(author => author.name),
    datasets: [
      {
        data: authors.map(author => author.numArticles),
        backgroundColor: authors.map(() => `hsl(${Math.random() * 360}, 70%, 60%)`), // Random colors
      },
    ],
  };

  return (
    <div>
      <h1 style={{ fontSize: '20pt' }}>Authors Article Distribution</h1>

      {authors.length > 0 ? (
        <>
          {/* Pie Chart Section */}
          <div style={{ width: '50%', margin: 'auto', marginTop: '20px' }}>
            <Pie data={chartData} />
          </div>
        </>
      ) : (
        <p>Loading author data...</p>
      )}
    </div>
  );
};

export default ExportPai;
