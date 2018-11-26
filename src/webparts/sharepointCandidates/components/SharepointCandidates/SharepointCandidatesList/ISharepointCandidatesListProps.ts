import { ICompany, IContact } from "../../../../../services/service.interface";

export interface ISharepointCandidatesListProps {
  companies: ICompany[];
  contacts: IContact[];
}

// export interface ISPLists {
//   value: ISPList[];
// }

// export interface ISPList {
//   Title: string;
//   Id: string;
// }

// export interface IContactList {
//   name: string;
//   surname: string;
//   company: string;
//   Id: string;
// }
