/* eslint-disable max-len */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {
  ContainerStyled,
  ResumeFormStyled,
  TitleStyled,
  ButtonStyled,
  DangerousHtmlStyled,
} from './FormStyledComponents';
import FormGroup from './FormGroup';
import SubmitButton from './SubmitButton';

const SqlQueryGenerator = () => {
  const [queryDescription, setQueryDescription] = useState({});
  const [tables, setTables] = useState([{ id: uuidv4() }]);
  const [submitting, setSubmitting] = useState(false);
  const [SQLQuery, setSQLQuery] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      query: queryDescription,
      tables,
    };
    console.log('Generating SQL Query, please wait...');
    setSubmitting(true);
    axios.post('/api/openai/sql-query', data)
      .then((response) => {
        console.info('response', response);
        setSQLQuery(response.data.content);
        setSubmitting(false);
      })
      .catch((err) => {
        console.info(err);
      });
  };
  console.log('SQL Query', SQLQuery);

  const handleChange = (e, id, field) => {
    const { name, value } = e.target;
    if (field === 'queryDescription') {
      setQueryDescription((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setTables((prevTables) => prevTables.map((table) => (table.id === id ? { ...table, [name]: value } : table)));
    }
  };

  const addTable = () => {
    setTables((prevTables) => [
      ...prevTables,
      { id: uuidv4(), tableName: '', tableSchema: '' },
    ]);
  };

  return (
    <ContainerStyled>
      <TitleStyled>SQL Query Generator</TitleStyled>
      <ResumeFormStyled onSubmit={handleSubmit}>
        {tables.map((table) => (
          <div key={table.id}>
            <FormGroup
              nameLabel={`Table Name: ${table.tableName}`}
              inputType="text"
              field="tableName"
              placeHolder="Enter your table name... (e.g) Users"
              formValue={table.tableName}
              changeFunction={(e) => handleChange(e, table.id, 'table')}
            />
            <FormGroup
              nameLabel="Database Tables (e.g., Users: id, name, email, age; Orders: order_id, user_id, product_name)"
              inputType="text"
              field="tableSchema"
              placeHolder="Enter database table schema"
              formValue={table.tableSchema}
              changeFunction={(e) => handleChange(e, table.id, 'table')}
            />
          </div>
        ))}
        <ButtonStyled type="button" onClick={addTable}>Add Another Table</ButtonStyled>
        <FormGroup
          nameLabel="Query Description"
          inputType="text"
          field="queryDescription"
          placeHolder="Describe your query in natural language"
          formValue={queryDescription.queryDescription}
          changeFunction={(e) => handleChange(e, -1, 'queryDescription')}
        />
        <SubmitButton onClick={handleSubmit} type="submit" loading={submitting}>Generate SQL Query</SubmitButton>
      </ResumeFormStyled>
      <DangerousHtmlStyled dangerouslySetInnerHTML={{ __html: SQLQuery }} />
    </ContainerStyled>
  );
};

export default SqlQueryGenerator;
