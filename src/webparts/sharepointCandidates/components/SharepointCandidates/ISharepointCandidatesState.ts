import { ICompany, IContact } from "../../../../services/service.interface";

interface ISharepointCandidatesState {
  serviceErrorMessage: string;
  newContact: IContact;
  companies: ICompany[];
  contacts: IContact[];
  validationMessages: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    salary: string;
  };
  validationFlags: {
    firstNameValid: boolean;
    lastNameValid: boolean;
    emailValid: boolean;
    companyValid: boolean;
    salaryValid: boolean;
  };
}

export default ISharepointCandidatesState;
