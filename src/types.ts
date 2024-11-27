export interface Cell {
  Value: string;
  Attributes?: { Value: string; Id: string }[];
}

export interface Row {
  RowType: string;
  Cells: Cell[];
  Title?: string;
}

export interface Section {
  RowType: string;
  Title?: string;
  Rows: Row[];
}

export interface Report {
  ReportID: string;
  ReportName: string;
  ReportType: string;
  ReportTitles: string[];
  ReportDate: string;
  UpdatedDateUTC: string;
  Fields: Record<string, string>;
  Rows: Section[];
}
