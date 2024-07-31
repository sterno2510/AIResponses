import React, { useState } from 'react';

const SqlQueryGenerator = () => {
  const [tables, setTables] = useState('');
  const [columns, setColumns] = useState('');
  const [relationships, setRelationships] = useState('');
  const [queryDescription, setQueryDescription] = useState('');

  const handleTablesChange = (e) => setTables(e.target.value);
  // eslint-disable-next-line no-unused-vars
  const handleColumnsChange = (e) => setColumns(e.target.value);
  const handleRelationshipsChange = (e) => setRelationships(e.target.value);
  const handleQueryDescriptionChange = (e) => setQueryDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      tables,
      columns,
      relationships,
      queryDescription,
    };
    console.log(formData);
  };

  return (
    <div>
      <h2>SQL Query Generator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="table">
            Database Tables
            (e.g., Users: id, name, email, age; Orders: order_id, user_id, product_name):
            <textarea
              value={tables}
              onChange={handleTablesChange}
              placeholder="Enter database tables and their columns"
              rows="4"
              cols="50"
            />
          </label>
        </div>
        <div>
          <label htmlFor="relationships">
            Relationships (e.g., Users.id = Orders.user_id):
            <textarea
              value={relationships}
              onChange={handleRelationshipsChange}
              placeholder="Enter relationships between tables"
              rows="2"
              cols="50"
            />
          </label>
        </div>
        <div>
          <label htmlFor="query">
            Query Description:
            <textarea
              value={queryDescription}
              onChange={handleQueryDescriptionChange}
              placeholder="Describe your query in natural language"
              rows="4"
              cols="50"
            />
          </label>
        </div>
        <button type="submit">Generate SQL Query</button>
      </form>
    </div>
  );
};

export default SqlQueryGenerator;
