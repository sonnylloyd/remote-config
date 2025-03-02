import { IGenerator, FormField } from "../IGenerator";

export class ThunderbirdGenerator implements IGenerator {
  getName(): string {
    return "thunderbird";
  }

  generate(data: Record<string, string>): string {
    const config = {
      email: data.email,
      displayName: data.displayName,
      imap: {
        server: data.imapServer,
        port: parseInt(data.imapPort),
        security: data.imapSecurity,
        username: data.email,
      },
      smtp: {
        server: data.smtpServer,
        port: parseInt(data.smtpPort),
        security: data.smtpSecurity,
        username: data.email,
      },
    };

    return JSON.stringify(config, null, 2);
  }

  getFields(): FormField[] {
    return [
      { name: "displayName", label: "Display Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "imapServer", label: "IMAP Server", type: "text", required: true },
      { name: "imapPort", label: "IMAP Port", type: "number", required: true, defaultValue: "993" },
      { name: "imapSecurity", label: "IMAP Security", type: "select", required: true, options: [
        { value: "SSL/TLS", label: "SSL/TLS" },
        { value: "STARTTLS", label: "STARTTLS" },
        { value: "None", label: "None" },
      ], defaultValue: "SSL/TLS" },
      { name: "smtpServer", label: "SMTP Server", type: "text", required: true },
      { name: "smtpPort", label: "SMTP Port", type: "number", required: true, defaultValue: "465" },
      { name: "smtpSecurity", label: "SMTP Security", type: "select", required: true, options: [
        { value: "SSL/TLS", label: "SSL/TLS" },
        { value: "STARTTLS", label: "STARTTLS" },
        { value: "None", label: "None" },
      ], defaultValue: "SSL/TLS" },
    ];
  }

  getHeaders(): Record<string, string> {
    return {
      "Content-Type": "application/json",
    };
  }

  getInstructions(): Record<string, string[]> {
    return {
      "Import into Thunderbird": [
        "Open Thunderbird.",
        "Go to Account Settings.",
        "Add a new email account.",
        "Use the provided IMAP/SMTP settings.",
        "Save and test the configuration."
      ],
    };
  }
}