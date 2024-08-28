import DocumentsContainer from '../components/DocumentsContainer';
import React from 'react';

const DocumentsPage: React.FC = () => {
    return (
        <div className="container mtb">
            <h1>Documents</h1>
            <DocumentsContainer />
        </div>
    );
};

export default DocumentsPage;
