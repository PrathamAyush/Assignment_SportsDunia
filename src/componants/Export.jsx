import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const Export = () => {
  const [authors, setAuthors] = useState([]);
  const [payoutPerArticle, setPayoutPerArticle] = useState(1);

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

  const handleExportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.text('Payout Report', 14, 10);

    // Table Data
    const tableColumn = ['Author Name', 'Number of Articles', 'Payout per Article (Rs)', 'Total Payout (Rs)'];
    const tableRows = authors.map(author => [
      author.name,
      author.numArticles,
      payoutPerArticle,
      author.numArticles * payoutPerArticle,
    ]);

    // Add table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    // Save the PDF
    doc.save('payout-report.pdf');
  };

  return (
    <div>
      <h1 style={{fontSize: '20pt' }}>Amount and Export</h1>

      <div>
        <label>
          Payout per Article (Rs):
          <input
            type="number"
            value={payoutPerArticle}
            onChange={e => setPayoutPerArticle(Number(e.target.value))}
            className="border p-2 rounded"
            min="1"
          />
        </label>
      </div>

      {authors.length > 0 ? (
        <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th>Author Name</th>
              <th>Number of Articles</th>
              <th>Payout per Article (Rs)</th>
              <th>Total Payout (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author, index) => (
              <tr key={index}>
                <td>{author.name}</td>
                <td>{author.numArticles}</td>
                <td>{payoutPerArticle}</td>
                <td>{author.numArticles * payoutPerArticle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading author data...</p>
      )}

      <button onClick={handleExportToPDF} style={{ marginTop: '20px', padding: '10px 20px' }} className='bg-indigo-500 ...'>
        Export to PDF
      </button>
    </div>
  );
};

export default Export;
