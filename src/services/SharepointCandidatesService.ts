import { ICompany, IContact } from "./service.interface";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export class ContactsListService {
  _context: IWebPartContext;
  _listItemEntityTypeFullName: string;
  _contactsListTitle: string;
  constructor(context: IWebPartContext, contactsListTitle: string) {
    this._context = context;
    this._contactsListTitle = contactsListTitle;
    this._getListItemEntityTypeFullName(this._context).then(data => {
      //data = "SP.Data.DusanZelenovicListItem"
    });
  }
  public _getContactListData(): Promise<IContact[]> {
    return this._context.spHttpClient
      .get(
        this._context.pageContext.web.absoluteUrl +
          `/_api/web/lists/GetByTitle('${
            this._contactsListTitle
          }')/items?$select=ID,FirstName,Title,Email,Company,Salary`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  public _saveNewContact(contact: IContact): Promise<IContact> {
    const reqJSON: any = {
      "@odata.type": this._listItemEntityTypeFullName,
      FirstName: contact.FirstName,
      Title: contact.Title,
      Email: contact.Email,
      Company: contact.Company,
      Salary: contact.Salary
    };

    return this._context.spHttpClient
      .post(
        this._context.pageContext["web"]["absoluteUrl"] +
          `/_api/web/lists/GetByTitle('${
            this._contactsListTitle
          }')/items?$expand=ListItemAllFields`,
        SPHttpClient.configurations.v1,
        {
          body: JSON.stringify(reqJSON),
          headers: {
            accept: "application/json",
            "content-type": "application/json"
          }
        }
      )
      .then(
        (response: SPHttpClientResponse): Promise<IContact> => {
          return response.json();
        }
      );
  }

  private _getListItemEntityTypeFullName(
    context: IWebPartContext
  ): Promise<any> {
    return context.spHttpClient
      .get(
        context.pageContext["web"]["absoluteUrl"] +
          `/_api/web/lists/GetByTitle('${this._contactsListTitle}')`,
        SPHttpClient.configurations.v1
      )
      .then((response: any) => {
        return response.json();
      })
      .then(value => {
        this._listItemEntityTypeFullName = value["ListItemEntityTypeFullName"];
        return value["ListItemEntityTypeFullName"];
      });
  }
}

export class CompaniesListService {
  _context: IWebPartContext;
  constructor(context: IWebPartContext) {
    this._context = context;
  }
  public _getCompaniesListData(): Promise<ICompany[]> {
    return this._context.spHttpClient
      .get(
        this._context.pageContext.web.absoluteUrl +
          `/_api/web/lists/GetByTitle('Company')/items?$select=ID,Title,CompanyName`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }
}
