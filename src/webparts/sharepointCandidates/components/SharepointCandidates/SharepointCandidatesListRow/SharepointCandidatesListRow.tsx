import * as React from "react";
import { ISharepointCandidatesListRowProps } from "./ISharepointCandidatesListRowProps";

class SharepointCandidatesListRow extends React.Component<
  ISharepointCandidatesListRowProps,
  {}
> {
  public render(): React.ReactElement<ISharepointCandidatesListRowProps> {
    return (
      <tr>
        <td>{this.props.contact.ID}</td>
        <td>{this.props.contact.FirstName}</td>
        <td>{this.props.contact.Title}</td>
        <td>{this.props.contact.Email}</td>
        <td>{this.props.companyName}</td>
        <td>{this.props.contact.Salary}</td>
      </tr>
    );
  }
}

export default SharepointCandidatesListRow;
