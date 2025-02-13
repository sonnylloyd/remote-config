// src/config/LinphoneConfigGenerator.ts
import { IGenerator, FormField } from ".";

export class LinphoneGenerator implements IGenerator {
  generate(data: Record<string, string>): string {
    return `[account]\nusername=${data.username}\npassword=${data.password}\ndomain=${data.domain}\ntransport=${data.transport || "udp"}\nproxy=${data.proxy || ""}\n`;
  }
  

  getFields(): FormField[] {
    return [
      { name: "username", label: "Username", type: "text", required: true },
      { name: "password", label: "Password", type: "password", required: true },
      { name: "domain", label: "Domain", type: "text", required: true },
      {
        name: "transport",
        label: "Transport Protocol",
        type: "select",
        required: true,
        options: [
          { value: "udp", label: "UDP" },
          { value: "tcp", label: "TCP" },
          { value: "tls", label: "TLS" },
        ],
      },
    ];
  }
}
