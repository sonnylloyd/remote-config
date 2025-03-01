export interface IGenerator {
  getName(): string;
  generate(data: Record<string, string>): string;
  getFields(): FormField[]; // Field name -> Expected Type
  getHeaders(): Record<string, string>;
  getInstructions(): Record<string, string[]> ;
}

export type FormField = {
  name: string;
  label: string;
  type: "text" | "password" | "select";
  required: boolean;
  options?: { value: string; label: string }[];
  defaultValue?: string;
  hint?: string;
};
