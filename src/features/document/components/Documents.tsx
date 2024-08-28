import DocumentList from './DocumentList';
import { DocumentsQuery } from '../../../types/document.types';
import Pagination from './DocumentsPagination';
import React from 'react';
import ResultsSummary from './ResultsSummary';
import SearchBar from './SearchBar';

interface DocumentsProps {
    searchQuery: DocumentsQuery;
    documentsData: any;
    isLoading: boolean;
    onQueryChange: (newQuery: Partial<DocumentsQuery>) => void;
    onPageChange: (direction: 'back' | 'forward') => void;
}

const Documents: React.FC<DocumentsProps> = ({
    searchQuery,
    documentsData,
    isLoading,
    onQueryChange,
    onPageChange
}) => {
    if (isLoading) {
        return <span>Loading..</span>;
    }

    const documents = documentsData?.documents.content || [];
    const totalElements = documentsData?.documents.totalElements || 0;
    const totalPages = documentsData?.documents.totalPages || 0;

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="align-items-center row">
                    <ResultsSummary
                        currentPage={searchQuery.page}
                        pageSize={searchQuery.size}
                        totalElements={totalElements}
                        documentsCount={documents.length}
                    />
                    <div className="col-lg-8">
                        <div className="candidate-list-widgets">
                            <div className="row">
                                <SearchBar onSearch={name => onQueryChange({ name, page: 0 })} />
                                {/* TODO: Add ResultsSizeSelector component here */}
                                {/* TODO: Add Upload Button component here */}
                            </div>
                        </div>
                    </div>
                </div>
                <DocumentList documents={documents} />
                {documents.length > 0 && totalPages > 1 && (
                    <Pagination
                        currentPage={searchQuery.page}
                        totalPages={totalPages}
                        onPageChange={page => onQueryChange({ page })}
                        onNavigate={onPageChange}
                    />
                )}
            </div>
        </div>
    );
};

export default Documents;
