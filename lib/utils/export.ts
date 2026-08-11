/**
 * KarmaSetu AI - Shared CSV/XLSX Data Export Utility
 */

export function exportToCSV(filename: string, data: Record<string, any>[]) {
  if (!data || !data.length) return;

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const val = row[header] ?? "";
          const escaped = String(val).replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(",")
    ),
  ];

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename.toLowerCase().replace(/\s+/g, "_")}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
