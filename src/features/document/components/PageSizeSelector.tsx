import React from 'react';

interface PageSizeSelectorProps {
    value: number;
    onChange: (size: number) => void;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ value, onChange }) => (
    <div className="col-lg-3">
        <div className="selection-widget">
            <select
                onChange={e => onChange(Number(e.target.value))}
                className="form-select"
                data-trigger="true"
                name="size"
                aria-label="Select page size"
                value={value}
            >
                <option value="4">Per page (4)</option>
                <option value="6">6</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
        </div>
    </div>
);

export default PageSizeSelector;
