declare module 'pdf2image' {
  export function convert(pdfFilePath: string, options: any): Promise<string[]>;
  // Add other exports and types as needed
}