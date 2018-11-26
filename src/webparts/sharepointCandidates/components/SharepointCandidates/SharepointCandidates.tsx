import * as React from "react";
import styles from "./SharepointCandidates.module.scss";

import { escape } from "@microsoft/sp-lodash-subset";
import {
  MockHttpCompanyList,
  MockHttpContactsList
} from "../../../../services/MockHttpClient";

import { ISharepointCandidatesProps } from "./ISharepointCandidatesProps";
//import ISharepointCandidatesState from "./ISharepointCandidatesState";
import { ICompany } from "../../../../../lib/services/service.interface";
import { IContact } from "../../../../../lib/services/service.interface";

import SharepointCandidatesList from "./SharepointCandidatesList/SharepointCandidatesList";
import SharepointCandidatesSalaryBreakdownChart from "./SharepointCandidatesSalaryBreakdownChart/SharepointCandidatesSalaryBreakdownChart";
import {
  ContactsListService,
  CompaniesListService
} from "../../../../services/SharepointCandidatesService";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";

import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";

export default class SharepointCandidates extends React.Component<
  ISharepointCandidatesProps,
  {}
> {
  contactsListService: ContactsListService;
  companiesListService: CompaniesListService;
  constructor(props: ISharepointCandidatesProps) {
    super(props);

    this.contactsListService = new ContactsListService(
      this.props.context,
      this.props.contactsListTitle
    );
    this.companiesListService = new CompaniesListService(this.props.context);
  }
  //=========================== STATE ===================================
  state = {
    serviceErrorMessage: "",
    newContact: {
      ID: 0,
      FirstName: "",
      Title: "",
      Email: "",
      CompanyID: 0, //ENH: this should normally be an ID of the company (foreign key) and this should be written to the list
      Company: "",
      Salary: 0
    },
    companies: null,
    contacts: null,
    validation: {
      formValid: false,
      fieldMessages: {
        FirstName: "",
        Title: "",
        Email: "",
        Company: "",
        Salary: ""
      },
      fieldValidity: {
        FirstName: false,
        Title: false,
        Email: false,
        Company: false,
        Salary: false
      }
    }
  };

  componentDidMount() {
    if (Environment.type === EnvironmentType.Local) {
      //mock data selected in properties
      this.getMockContacts();
      this.getMockCompanies();
    } else {
      //call live service to get data
      this.getContacts();
      this.getCompanies();
    }
  }

  onChangeTextField = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: any = event.target;
    let newContact = { ...this.state.newContact };
    newContact[name] = value;

    //validation
    let validation = { ...this.state.validation };
    validation.fieldMessages = { ...this.state.validation.fieldMessages };
    validation.fieldValidity = { ...this.state.validation.fieldValidity };

    //required field
    if (value.trim(" ") == "") {
      validation.fieldMessages[name] = "Required field";
      validation.fieldValidity[name] = false;
    } else {
      validation.fieldMessages[name] = "";
      validation.fieldValidity[name] = true;
    }

    //validate email field to be valid email
    if (name == "Email") {
      const emailRegex = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(value)) {
        validation.fieldMessages[name] = "Please enter valid email";
        validation.fieldValidity[name] = false;
      }
    }
    //validate Salary field to be an integer
    if (name == "Salary") {
      const positiveIntegerRegex = /^[1-9]\d*$/;
      if (!positiveIntegerRegex.test(value)) {
        validation.fieldMessages[name] =
          "Please enter valid positive whole number";
        validation.fieldValidity[name] = false;
      }
    }
    validation.formValid = this.formValid(validation.fieldValidity);

    this.setState({
      newContact,
      validation
    });
  };
  onCompanyDropDownSelect = event => {
    const selectedCompanyID = event.target.value;
    const foundCompany: ICompany[] = this.state.companies.filter(
      (company: ICompany) => {
        return company.ID == selectedCompanyID;
      }
    );
    if (foundCompany.length > 0) {
      const newContact = { ...this.state.newContact };
      newContact.CompanyID = foundCompany[0].ID;
      newContact.Company = foundCompany[0].CompanyName;

      //validation
      let validation = { ...this.state.validation };
      validation.fieldMessages = { ...this.state.validation.fieldMessages };
      validation.fieldValidity = { ...this.state.validation.fieldValidity };

      //required field
      if (newContact.CompanyID == 0) {
        validation.fieldMessages.Company = "Please select company";
        validation.fieldValidity.Company = false;
      } else {
        validation.fieldMessages.Company = "";
        validation.fieldValidity.Company = true;
      }

      validation.formValid = this.formValid(validation.fieldValidity);

      this.setState({
        newContact,
        validation
      });
    }
  };
  saveContact = () => {
    this.contactsListService
      ._saveNewContact(this.state.newContact)
      .then((newContactData: any) => {
        //clear fields - initialize state
        this.setState({
          newContact: {
            ID: 0,
            FirstName: "",
            Title: "",
            Email: "",
            CompanyID: 0,
            Company: "",
            Salary: 0
          },
          validation: {
            formValid: false,
            fieldMessages: {
              FirstName: "",
              Title: "",
              Email: "",
              Company: "",
              Salary: ""
            },
            fieldValidity: {
              FirstName: false,
              Title: false,
              Email: false,
              Company: false,
              Salary: false
            }
          }
        });
        //ENH: depending on the case, I can choose to fetch all data again
        //or manually update the state so it reflects on the UI
        this.getContacts();
      });
  };

  getMockContacts = () => {
    MockHttpCompanyList.get().then(companies => {
      const newCompanies = [
        { ID: 0, Title: "", CompanyName: "--- Please select company ----" },
        ...companies
      ];

      this.setState({
        companies: newCompanies
      });
    });
  };
  getMockCompanies = () => {
    MockHttpContactsList.get().then(contacts => {
      this.setState({
        contacts
      });
    });
  };
  getContacts = () => {
    this.contactsListService._getContactListData().then((contactItems: any) => {
      if (contactItems.error) {
        this.setState({
          serviceErrorMessage: contactItems.error.message
        });
      } else {
        const contacts = contactItems.value;
        this.setState({
          contacts
        });
      }
    });
  };

  getCompanies = () => {
    this.companiesListService
      ._getCompaniesListData()
      .then((companyItems: any) => {
        if (companyItems.error) {
          this.setState({
            serviceErrorMessage: companyItems.error.message
          });
        } else {
          const newCompanies = [
            { ID: 0, Title: "", CompanyName: "--- Please select company ----" },
            ...companyItems.value
          ];

          this.setState({
            companies: newCompanies
          });
        }
      });
  };
  formValid = (fieldValidity): boolean => {
    let result = true;
    let property;
    for (property in fieldValidity) {
      if (fieldValidity[property] == false) {
        result = false;
        break;
      }
    }
    return result;
  };
  public render(): React.ReactElement<ISharepointCandidatesProps> {
    if (this.state.serviceErrorMessage != "") {
      return (
        <h3>
          Something went wrong ...
          <br />
          {this.state.serviceErrorMessage}
        </h3>
      );
    }
    if (this.state.contacts == null || this.state.companies == null) {
      return <div>Loading form ...</div>;
    }
    const companyItems = this.state.companies.map(company => {
      return (
        <option key={company.ID} value={company.ID}>
          {company.CompanyName}
        </option>
      );
    });

    return (
      <div className={styles.sharepointCandidates}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Contacts entry form</span>
              <br />
              {/* =========== First Name ========= */}
              <div className={styles.row}>
                <label htmlFor="FirstName">User first name: * </label>
                <br />
                <input
                  type="text"
                  name="FirstName"
                  value={this.state.newContact.FirstName}
                  onChange={this.onChangeTextField}
                />
                <br />
                {!this.state.validation.fieldValidity.FirstName ? (
                  <span className={styles.error}>
                    {this.state.validation.fieldMessages.FirstName}
                  </span>
                ) : null}
              </div>
              {/* =========== Last Name ========= */}
              <div className={styles.row}>
                <label htmlFor="Title">User last name: * </label>
                <br />
                <input
                  type="text"
                  name="Title"
                  value={this.state.newContact.Title}
                  onChange={this.onChangeTextField}
                />
                <br />
                {!this.state.validation.fieldValidity.Title ? (
                  <span className={styles.error}>
                    {this.state.validation.fieldMessages.Title}
                  </span>
                ) : null}
              </div>
              {/* =========== User Email ========= */}
              <div className={styles.row}>
                <label htmlFor="Email">User email: * </label>
                <br />
                <input
                  type="email"
                  name="Email"
                  value={this.state.newContact.Email}
                  onChange={this.onChangeTextField}
                />
                <br />
                <span className={styles.error}>
                  {this.state.validation.fieldMessages.Email}
                </span>
              </div>
              {/* =========== User Company ========= */}
              <div className={styles.row}>
                <label htmlFor="userCompany">User company: * </label>
                <br />
                <select
                  value={this.state.newContact.CompanyID.toString()}
                  defaultValue={this.state.newContact.CompanyID.toString()}
                  onChange={this.onCompanyDropDownSelect}
                >
                  {companyItems}
                </select>
                <br />
                <span className={styles.error}>
                  {this.state.validation.fieldMessages.Company}
                </span>
              </div>
              {/* =========== User Salary ========= */}
              <div className={styles.row}>
                <label htmlFor="Salary">User salary: * </label>
                <br />
                <input
                  type="text"
                  name="Salary"
                  value={this.state.newContact.Salary}
                  onChange={this.onChangeTextField}
                />
                <br />
                <span className={styles.error}>
                  {this.state.validation.fieldMessages.Salary}
                </span>
              </div>
              {/* =========== Form commands ========= */}
              <button
                type="button"
                onClick={this.saveContact}
                disabled={!this.state.validation.formValid}
              >
                Save
              </button>
              <br />
              {/* =========== Salary breakdown pie chart ========= */}
              <SharepointCandidatesSalaryBreakdownChart
                contacts={this.state.contacts}
              />

              <SharepointCandidatesList
                companies={this.state.companies}
                contacts={this.state.contacts}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
