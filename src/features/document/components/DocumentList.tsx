import DocumentItem from './DocumentItem';
import { IDocument } from '../../../types/interfaces/IDocument';
import React from 'react';

interface DocumentListProps {
    documents: IDocument[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => (
    <div className="candidate-list">
        {documents.length === 0 && (
            <h4
                className="card mt-4 align-items-center row"
                style={{ border: 'none', boxShadow: 'none' }}
            >
                No documents found.
            </h4>
        )}
        {documents.map(document => (
            <DocumentItem {...document} key={document.id} />
        ))}
    </div>
);

export default DocumentList;
