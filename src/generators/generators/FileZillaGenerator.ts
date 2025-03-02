import { IGenerator, FormField } from "..";

export class FileZillaGenerator implements IGenerator {
  getName(): string {
    return "filezilla";
  }

  getFields(): FormField[] {
    return [
      { name: "host", label: "FTP Host", type: "text", required: true },
      { name: "port", label: "Port", type: "number", required: true, defaultValue: "21" },
      { name: "username", label: "Username", type: "text", required: true },
      { name: "password", label: "Password", type: "password", required: true },
      {
        name: "protocol",
        label: "Protocol",
        type: "select",
        required: true,
        options: [
          { value: "0", label: "FTP" },
          { value: "1", label: "FTP over TLS" },
          { value: "2", label: "SFTP (SSH)" }
        ]
      },
      { name: "remote_dir", label: "Remote Directory", type: "text", required: false }
    ];
  }

  getHeaders(): Record<string, string> {
    return {
      "Content-Type": "application/xml",
      "Content-Disposition": 'attachment; filename="filezilla-config.xml"'
    };
  }

  getInstructions(): Record<string, string[]> {
    return {
      "Steps to import configuration": [
        "Open FileZilla Client.",
        "Go to 'File' > 'Import'.",
        "Select the generated XML configuration file.",
        "Click 'OK' to apply the settings."
      ]
    };
  }

  generate(data: Record<string, string>): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<FileZilla3>
  <Servers>
    <Server>
      <Host>${data.host}</Host>
      <Port>${data.port}</Port>
      <Protocol>${data.protocol}</Protocol>
      <User>${data.username}</User>
      <Pass>${data.password}</Pass>
      <RemoteDir>${data.remote_dir || "/"}</RemoteDir>
    </Server>
  </Servers>
</FileZilla3>`;
  }
}
