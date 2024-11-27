import { useState, useEffect } from "react";

import { Report } from "./types";
import { BalanceSheetTable } from "./components/BalanceSheetTable";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [reportData, setReportData] = useState<Report | null>(null);

  const fetchBalanceSheetData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reports/balancesheet`
      );
      const data = await response.json();
      setReportData(data.Reports[0]);
    } catch (err) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("An unknown error occurred"));
      }
      console.error("Failed to fetch data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalanceSheetData();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center text-xl p-3">
        Error: {error.message}, Please try again later
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center text-xl p-3">Loading...</div>
      )}
      {!isLoading && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xl p-2 w-full justify-center bg-blue-500 text-white">
            Xero {reportData?.ReportName}
            <span>({reportData?.ReportDate})</span>
          </div>
          <BalanceSheetTable balanceData={reportData} />
        </div>
      )}
    </>
  );
}

export default App;
