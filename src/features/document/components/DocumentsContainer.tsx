import Documents from './Documents';
import { DocumentsQuery } from '../../../types/document.types';
import { documentAPI } from '../../../services/DocumentService';
import { useState } from 'react';

const DocumentsContainer: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<DocumentsQuery>({ page: 0, size: 4, name: '' });
    const {
        data: documentsQueryData,
        error,
        isSuccess: isDocumentsQuerySuccess,
        isLoading: isDocumentsQueryLoading
    } = documentAPI.useSearchDocumentsQuery(searchQuery);

    const handleSearchQueryChange = (newQuery: Partial<DocumentsQuery>) => {
        setSearchQuery(prev => ({ ...prev, ...newQuery }));
    };

    const handlePageChange = (direction: 'back' | 'forward') => {
        const newPage = direction === 'back' ? searchQuery.page - 1 : searchQuery.page + 1;
        handleSearchQueryChange({ page: newPage });
    };

    return (
        <Documents
            searchQuery={searchQuery}
            documentsData={documentsQueryData?.data}
            isLoading={isDocumentsQueryLoading}
            onQueryChange={handleSearchQueryChange}
            onPageChange={handlePageChange}
        />
    );
};

export default DocumentsContainer;
