import * as React from "react";
import { ISharepointCandidatesListProps } from "./ISharepointCandidatesListProps";
import SharepointCandidatesListRow from "../SharepointCandidatesListRow/SharepointCandidatesListRow";
import { IContact } from "../../../../../services/service.interface";

class SharepointCandidatesList extends React.Component<
  ISharepointCandidatesListProps,
  {}
> {
  public render(): React.ReactElement<ISharepointCandidatesListProps> {
    const contactRows = this.props.contacts.map((contact: IContact) => {
      // //resolve the name of the company since only company ID is in the argument
      // const company = this.props.companies.filter((company: ICompany) => {
      //   return company.ID == contact.ID;
      // });
      return (
        <SharepointCandidatesListRow
          key={contact.ID}
          contact={contact}
          companyName={contact.Company}
        />
      );
    });
    return (
      <div>
        <table>
          <th>Id</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Company</th>
          <th>Salary</th>

          <tbody>{contactRows}</tbody>
        </table>
      </div>
    );
  }
}

export default SharepointCandidatesList;
