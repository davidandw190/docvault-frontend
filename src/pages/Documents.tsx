import { useRef, useState } from 'react';

import { DocumentsQuery } from '../types/document.types';
import { documentAPI } from '../services/DocumentService';

const Documents: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState<DocumentsQuery>({
        page: 0,
        size: 10,
        name: ''
    });
    const {
        data: documentsQueryData,
        isLoading: isDocumentsQueryLoading,
        isSuccess: isDocumentsQuerySuccess
    } = documentAPI.useSearchDocumentsQuery(searchQuery);

    return <div></div>;
};

export default Documents;
