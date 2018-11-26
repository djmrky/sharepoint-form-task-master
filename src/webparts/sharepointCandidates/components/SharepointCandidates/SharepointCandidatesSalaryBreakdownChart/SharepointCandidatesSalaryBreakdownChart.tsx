import * as React from "react";
import { ISharepointCandidatesSalaryBreakdownChartProps } from "./ISharepointCandidatesSalaryBreakdownChartProps";
import { Pie } from "react-chartjs";

class SharepointCandidatesSalaryBreakdownChart extends React.Component<
  ISharepointCandidatesSalaryBreakdownChartProps,
  {}
> {
  public render(): React.ReactElement<
    ISharepointCandidatesSalaryBreakdownChartProps
  > {
    const chartData = [];
    this.props.contacts.forEach(contact => {
      chartData.push({
        value: contact.Salary,
        label: contact.FirstName + " " + contact.Title
      });
    });

    return <Pie data={chartData} />;
  }
}

export default SharepointCandidatesSalaryBreakdownChart;
