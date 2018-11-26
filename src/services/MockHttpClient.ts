import { ICompany, IContact } from "./service.interface";

export class MockHttpCompanyList {
  private static _items: ICompany[] = [
    { ID: 1, Title: "ITCrafthip", CompanyName: "ITCrafthip" },
    { ID: 2, Title: "Evici", CompanyName: "Evici" }
  ];

  public static get(): Promise<ICompany[]> {
    return new Promise<ICompany[]>(resolve => {
      resolve(MockHttpCompanyList._items);
    });
  }
}

export class MockHttpContactsList {
  private static _items: IContact[] = [
    {
      ID: 121,
      FirstName: "Marko",
      Title: "Markovic",
      Email: "mark@gmail.com",
      Company: "Evici",
      Salary: 1000
    },
    {
      ID: 122,
      FirstName: "Dusan",
      Title: "Zelenovic",
      Email: "djmrky@gmail.com",
      Company: "ITCraftShip",
      Salary: 500
    },
    {
      ID: 123,
      FirstName: "Petar",
      Title: "Petrovic",
      Email: "peter@gmail.com",
      Company: "Evici",
      Salary: 3500
    }
  ];

  public static get(): Promise<IContact[]> {
    return new Promise<IContact[]>(resolve => {
      resolve(MockHttpContactsList._items);
    });
  }
}
