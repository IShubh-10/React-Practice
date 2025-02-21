import React, { useEffect, useState } from 'react';

const Body = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function apiFetch() {
      try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        let apiData = await response.json();
        setData(apiData);
        console.table(apiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    apiFetch();
  }, []);

  const currentPageData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      {currentPageData.map((post) => (
        <div key={post.id} style={{ display: 'flex', gap: '10px', padding: '10px', borderBottom: '1px solid #ccc' }}>
          <div style={{ flex: 1 }}>{post.userId}</div>
          <div style={{ flex: 2 }}>{post.title}</div>
          <div style={{ flex: 3 }}>{post.body}</div>
        </div>
      ))}
      
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <span style={{ margin: '0 10px' }}>Page {page}</span>
        <button onClick={() => setPage(page + 1)} disabled={page * itemsPerPage >= data.length}>Next</button>
      </div>
    </div>
  );
};

export default Body;
