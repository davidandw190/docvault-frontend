import React from 'react';

interface ResultsSummaryProps {
    currentPage: number;
    pageSize: number;
    totalElements: number;
    documentsCount: number;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
    currentPage,
    pageSize,
    totalElements,
    documentsCount
}) => (
    <div className="col-lg-4">
        <div className="mb-3 mb-lg-0">
            {documentsCount > 0 && (
                <h6 className="fs-16 mb-0">
                    {`Showing ${currentPage * pageSize + 1} - ${
                        currentPage * pageSize + documentsCount
                    } of ${totalElements} results`}
                </h6>
            )}
        </div>
    </div>
);

export default ResultsSummary;
