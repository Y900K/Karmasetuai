/**
 * KarmaSetu AI — Memory-Safe Huge-Data Multi-Format Exportation Engine
 * Processes massive datasets in memory chunks to prevent V8 memory heap spikes.
 */

const CHUNK_SIZE = 2500;

export function exportToCSV(filename: string, data: Record<string, any>[]) {
  if (!data || !data.length) return;

  const headers = Object.keys(data[0]);
  const chunks: string[] = [headers.join(",") + "\n"];

  for (let i = 0; i < data.length; i += CHUNK_SIZE) {
    const slice = data.slice(i, i + CHUNK_SIZE);
    const chunkRows = slice.map((row) =>
      headers
        .map((header) => {
          const val = row[header] ?? "";
          const escaped = typeof val === "object" ? JSON.stringify(val).replace(/"/g, '""') : String(val).replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(",")
    );
    chunks.push(chunkRows.join("\n") + "\n");
  }

  downloadBlobChunks(chunks, `${sanitizeFilename(filename)}_${getFormattedDate()}.csv`, "text/csv;charset=utf-8;");
}

export function exportToTSV(filename: string, data: Record<string, any>[]) {
  if (!data || !data.length) return;

  const headers = Object.keys(data[0]);
  const chunks: string[] = [headers.join("\t") + "\n"];

  for (let i = 0; i < data.length; i += CHUNK_SIZE) {
    const slice = data.slice(i, i + CHUNK_SIZE);
    const chunkRows = slice.map((row) =>
      headers
        .map((header) => {
          const val = row[header] ?? "";
          return typeof val === "object" ? JSON.stringify(val) : String(val).replace(/\t/g, " ");
        })
        .join("\t")
    );
    chunks.push(chunkRows.join("\n") + "\n");
  }

  downloadBlobChunks(chunks, `${sanitizeFilename(filename)}_${getFormattedDate()}.tsv`, "text/tab-separated-values;charset=utf-8;");
}

export function exportToFormattedText(filename: string, title: string, data: Record<string, any>[]) {
  if (!data || !data.length) return;

  const chunks: string[] = [
    `====================================================================\n` +
    `KarmaSetu AI — ${title.toUpperCase()}\n` +
    `Generated On: ${new Date().toLocaleString()}\n` +
    `Total Records: ${data.length}\n` +
    `====================================================================\n\n`
  ];

  for (let i = 0; i < data.length; i += CHUNK_SIZE) {
    const slice = data.slice(i, i + CHUNK_SIZE);
    const lines: string[] = [];

    slice.forEach((item, index) => {
      lines.push(`--- Record #${i + index + 1} ---`);
      if (item && typeof item === "object") {
        Object.entries(item).forEach(([key, val]) => {
          const formattedVal = typeof val === "object" ? JSON.stringify(val) : String(val ?? "");
          lines.push(`${key}: ${formattedVal}`);
        });
      }
      lines.push("");
    });

    chunks.push(lines.join("\n") + "\n");
  }

  downloadBlobChunks(chunks, `${sanitizeFilename(filename)}_${getFormattedDate()}.txt`, "text/plain;charset=utf-8;");
}

export function triggerPrintableDocument() {
  if (typeof window !== "undefined") {
    window.print();
  }
}

function downloadBlobChunks(chunks: string[], filename: string, mimeType: string) {
  const blob = new Blob(chunks, { type: mimeType });
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
