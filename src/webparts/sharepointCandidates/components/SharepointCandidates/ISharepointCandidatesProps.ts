//import { ICompany, IContact } from "../../../services/service.interface";
import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface ISharepointCandidatesProps {
  context: IWebPartContext;
  contactsListTitle: string;
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
