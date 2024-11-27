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
        <div className="container mx-auto p-6 shadow-lg rounded-lg bg-white my-4">
          <div className="mx-2">
            <div className="text-xl">{reportData?.ReportName}</div>
            <div className="text-lg">{reportData?.ReportDate}</div>
          </div>
          <BalanceSheetTable balanceData={reportData} />
        </div>
      )}
    </>
  );
}

export default App;
