export interface IDocument {
    id: number;
    icon: string;
    name: string;
    description: string;
    size: number;
    extension: string;
    uri: string;
    formattedSize: string;
    referenceId: string;
    ownerLastLogin: string;
    updaterName: string;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
}

export type Document = { document: IDocument };

export type Documents = { documents: IDocument[] };

export type DocumentsQuery = { name?: string; page: number; size: number };

export type DocumentForm = Pick<
    IDocument,
    | 'name'
    | 'description'
    | 'documentId'
    | 'size'
    | 'formattedSize'
    | 'uri'
    | 'updaterName'
    | 'createdAt'
    | 'updatedAt'
>;
