import React from 'react';
import PropTypes from 'prop-types';

const DownloadButton = ({ downloadDocxFile }) => {
  const handleDownload = () => {
    downloadDocxFile();
  };

  return (
    <button type="button" onClick={handleDownload}>Download DOCX</button>
  );
};

DownloadButton.propTypes = {
  downloadDocxFile: PropTypes.func.isRequired,
};

export default DownloadButton;
