import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "SharepointCandidatesWebPartStrings";
import SharepointCandidates from "./components/SharepointCandidates/SharepointCandidates";
import {
  ISharepointCandidatesProps
  //ISPList
} from "./components/SharepointCandidates/ISharepointCandidatesProps";
import { MockHttpContactsList } from "../../services/MockHttpClient";

export interface ISharepointCandidatesWebPartProps
  extends ISharepointCandidatesProps {}

const styles = {
  listItem: {},
  list: {}
};

export default class SharepointCandidatesWebPart extends BaseClientSideWebPart<
  ISharepointCandidatesWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<
      ISharepointCandidatesProps
    > = React.createElement(SharepointCandidates, {
      contactsListTitle: this.properties.contactsListTitle,
      context: this.context
    });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.ContactListSettingsGroupName,
              groupFields: [
                PropertyPaneTextField("contactsListTitle", {
                  label: strings.ContactsListTitleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
