/**
 * KarmaSetu AI — Deep Multi-Format Data Exportation Suite
 * Supports CSV, JSON, TSV (Excel Ready), Structured Text Summaries & Printable Document view.
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
          const escaped = typeof val === "object" ? JSON.stringify(val).replace(/"/g, '""') : String(val).replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(",")
    ),
  ];

  downloadBlob(csvRows.join("\n"), `${sanitizeFilename(filename)}_${getFormattedDate()}.csv`, "text/csv;charset=utf-8;");
}

export function exportToJSON(filename: string, data: Record<string, any>[]) {
  if (!data || !data.length) return;
  const jsonContent = JSON.stringify(data, null, 2);
  downloadBlob(jsonContent, `${sanitizeFilename(filename)}_${getFormattedDate()}.json`, "application/json;charset=utf-8;");
}

export function exportToTSV(filename: string, data: Record<string, any>[]) {
  if (!data || !data.length) return;

  const headers = Object.keys(data[0]);
  const tsvRows = [
    headers.join("\t"),
    ...data.map((row) =>
      headers
        .map((header) => {
          const val = row[header] ?? "";
          return typeof val === "object" ? JSON.stringify(val) : String(val).replace(/\t/g, " ");
        })
        .join("\t")
    ),
  ];

  downloadBlob(tsvRows.join("\n"), `${sanitizeFilename(filename)}_${getFormattedDate()}.tsv`, "text/tab-separated-values;charset=utf-8;");
}

export function exportToFormattedText(filename: string, title: string, data: Record<string, any>[]) {
  if (!data || !data.length) return;

  const lines = [
    `====================================================================`,
    `KarmaSetu AI — ${title.toUpperCase()}`,
    `Generated On: ${new Date().toLocaleString()}`,
    `Total Records: ${data.length}`,
    `====================================================================\n`,
  ];

  data.forEach((item, index) => {
    lines.push(`--- Record #${index + 1} ---`);
    Object.entries(item).forEach(([key, val]) => {
      const formattedVal = typeof val === "object" ? JSON.stringify(val) : String(val);
      lines.push(`${key}: ${formattedVal}`);
    });
    lines.push("");
  });

  downloadBlob(lines.join("\n"), `${sanitizeFilename(filename)}_${getFormattedDate()}.txt`, "text/plain;charset=utf-8;");
}

export function triggerPrintableDocument() {
  if (typeof window !== "undefined") {
    window.print();
  }
}

function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function sanitizeFilename(filename: string): string {
  return filename.toLowerCase().replace(/[^a-z0-9_]/g, "_");
}

function getFormattedDate(): string {
  return new Date().toISOString().slice(0, 10);
}
