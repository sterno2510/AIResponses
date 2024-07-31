import React, { useState } from 'react';
import {
  ContainerStyled,
  ResumeFormStyled,
  TitleStyled,
  ButtonStyled,
} from './FormStyledComponents';
import FormGroup from './FormGroup';

const SqlQueryGenerator = () => {
  const [formData, setFormData] = useState({ queryDescription: '' });
  const [tables, setTables] = useState([{ tableName: '', tableSchema: '' }]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData, tables);
  };

  const handleChange = (e, index, field) => {
    const { name, value } = e.target;
    if (field === 'queryDescription') {
      setFormData({ ...formData, [name]: value });
    } else {
      const newTables = [...tables];
      newTables[index][name] = value;
      setTables(newTables);
    }
  };

  const addTable = () => {
    setTables([...tables, { tableName: '', tableSchema: '' }]);
  };

  return (
    <ContainerStyled>
      <TitleStyled>SQL Query Generator</TitleStyled>
      <ResumeFormStyled onSubmit={handleSubmit}>
        {tables.map((table, index) => (
          <div key={table.tableName}>
            <FormGroup
              nameLabel="Table Name"
              inputType="text"
              field="tableName"
              placeHolder="Enter your table name... (e.g) Users"
              formValue={table.tableName}
              changeFunction={(e) => handleChange(e, index, 'table')}
            />
            <FormGroup
              nameLabel="Database Tables (e.g., Users: id, name, email, age; Orders: order_id, user_id, product_name)"
              inputType="text"
              field="tableSchema"
              placeHolder="Enter database table schema"
              formValue={table.tableSchema}
              changeFunction={(e) => handleChange(e, index, 'table')}
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
