import { IDocument } from "./interfaces/IDocument";

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
