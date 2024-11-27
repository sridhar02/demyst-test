import React from "react";
import { Cell, Report, Row, Section } from "../types";

type Props = {
  balanceData: Report | null;
};

export const BalanceSheetTable: React.FC<Props> = ({ balanceData }) => {
  if (!balanceData) {
    return (
      <div className="flex justify-center text-xl p-3">
        Error: No data available
      </div>
    );
  }

  const { Rows, ReportTitles } = balanceData;

  const HeaderRows = Rows?.filter((row) => row.RowType === "Header")?.[0];
  const SectionRows = Rows?.filter((row) => row.RowType === "Section");

  return (
    <div className="container mx-auto">
      <div className="text-lg p-2 w-full justify-center mb-3">
        {ReportTitles.join(" ")}
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-gray-600  text-sm leading-normal">
            {HeaderRows.Cells &&
              HeaderRows?.Cells.map((cell: Cell, index: number) => (
                <th key={`title-${index}`} className="py-3 px-6 text-left">
                  {cell.Value}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {SectionRows.map((section: Section, sectionIndex: number) => (
            <React.Fragment key={`section-${sectionIndex}`}>
              {section.Title && (
                <tr className="border-b border-black">
                  <td
                    colSpan={2}
                    className="py-3 px-6 text-left text-xl font-bold "
                  >
                    {section.Title}:
                  </td>
                </tr>
              )}
              {section.Rows?.length === 0 && (
                <tr>
                  <td
                    className="border-b border-gray-200 hover:bg-gray-100 py-4"
                    colSpan={3}
                  ></td>
                </tr>
              )}
              {section.Rows &&
                section.Rows.map((row: Row, rowIndex: number) => (
                  <tr
                    key={`row-${rowIndex}`}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    {row.Cells.map((cell: Cell, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className={`py-3 px-6 text-left whitespace-nowrap${
                          row.RowType === "SummaryRow" ? " font-bold" : ""
                        }`}
                      >
                        {cell.Value}
                      </td>
                    ))}
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
