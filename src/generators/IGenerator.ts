export interface IGenerator {
  generate(data: Record<string, string>): string;
  getFields(): FormField[]; // Field name -> Expected Type
}

export type FormField = {
  name: string;
  label: string;
  type: "text" | "password" | "select";
  required: boolean;
  options?: { value: string; label: string }[];
};
