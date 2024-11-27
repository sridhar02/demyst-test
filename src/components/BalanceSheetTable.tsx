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

  const { Rows } = balanceData;

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Value</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {Rows.map((section: Section, sectionIndex: number) => (
            <React.Fragment key={sectionIndex}>
              {section.Title && (
                <tr className="bg-gray-100 border-b border-gray-200">
                  <td colSpan={2} className="py-3 px-6 text-left font-bold">
                    {section.Title}
                  </td>
                </tr>
              )}
              {section.Rows &&
                section.Rows.map((row: Row, rowIndex: number) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    {row.Cells.map((cell: Cell, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className="py-3 px-6 text-left whitespace-nowrap"
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
