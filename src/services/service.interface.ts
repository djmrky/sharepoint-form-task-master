export interface ISPLists<T> {
  value: T[];
}

export interface ICompany {
  ID: number; //added id as a key
  Title: string;
  CompanyName: string;
}

export interface IContact {
  ID: number;
  FirstName: string;
  Title: string; //this is the last name field in the contacts list
  Email: string;
  Company: string; //ENH: this should be a foreign key in the contacts list, and not plain text. In this case the 'Title' column is presumed to be unique
  Salary: number;

  // Attachments: boolean;
  // AuthorId: number;
  // CellPhone: string;
  // Comments: string;
  // ComplianceAssetId: number;
  // ContentTypeId: string;
  // Created: string;
  // EditorId: number;
  // FileSystemObjectType: number;
  // FullName: string;
  // GUID: string;
  // HomePhone: string;
  // Id: number;
  // JobTitle: string;
  // Modified: string;
  // OData__UIVersion: string;
  // ServerRedirectedEmbedUri: string;
  // ServerRedirectedEmbedUrl: string;
  // WebPage: string;
  // WorkAddress: string;
  // WorkCity: string;
  // WorkCountry: string;
  // WorkFax: string;
  // WorkPhone: string;
  // WorkState: string;
  // WorkZip: string;
}
