/* eslint-disable max-len */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import {
  ContainerStyled,
  ResumeFormStyled,
  TitleStyled,
  ButtonStyled,
} from './FormStyledComponents';
import FormGroup from './FormGroup';

const SqlQueryGenerator = () => {
  const [formData, setFormData] = useState({});
  const [tables, setTables] = useState([{ id: uuidv4() }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, tables);
  };

  const handleChange = (e, id, field) => {
    const { name, value } = e.target;
    if (field === 'queryDescription') {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setTables((prevTables) => prevTables.map((table) => (table.id === id ? { ...table, [name]: value } : table)));
    }
  };

  const addTable = () => {
    setTables((prevTables) => [
      ...prevTables,
      { id: uuidv4(), tName: '', tableSchema: '' },
    ]);
  };

  return (
    <ContainerStyled>
      <TitleStyled>SQL Query Generator</TitleStyled>
      <ResumeFormStyled onSubmit={handleSubmit}>
        {tables.map((table) => (
          <div key={table.id}>
            <FormGroup
              nameLabel={`Table Name: ${table.tName}`}
              inputType="text"
              field="tName"
              placeHolder="Enter your table name... (e.g) Users"
              formValue={table.tName}
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
          formValue={formData.queryDescription}
          changeFunction={(e) => handleChange(e, -1, 'queryDescription')}
        />
        <ButtonStyled type="submit">Generate SQL Query</ButtonStyled>
      </ResumeFormStyled>
    </ContainerStyled>
  );
};

export default SqlQueryGenerator;
