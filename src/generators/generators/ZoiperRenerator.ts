import { IGenerator, FormField } from "..";

export class ZoiperGenerator implements IGenerator {
  getName(): string {
    return "zoiper";
  }

  getFields(): FormField[] {
    return [
      { name: "username", label: "Username", type: "text", required: true },
      { name: "password", label: "Password", type: "password", required: true },
      { name: "domain", label: "SIP Domain", type: "text", required: true },
      { name: "proxy", label: "Proxy (optional)", type: "text", required: false },
      { name: "outboundProxy", label: "Outbound Proxy (optional)", type: "text", required: false },
      { name: "authUser", label: "Auth Username (optional)", type: "text", required: false },
      { name: "displayName", label: "Display Name", type: "text", required: false },
    ];
  }

  getHeaders(): Record<string, string> {
    return {
      "Content-Type": "application/xml",
      "Content-Disposition": "attachment; filename=zoiper.xml",
    };
  }

  getInstructions(): Record<string, string[]> {
    return {
      "Zoiper Configuration Import": [
        "1. Open Zoiper on your device.",
        "2. Go to 'Settings' > 'Accounts'.",
        "3. Click 'Import' and select the downloaded XML file.",
        "4. Confirm the import and restart Zoiper if necessary.",
      ],
    };
  }

  generate(data: Record<string, string>): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<config>
  <account>
    <username>${data.username}</username>
    <password>${data.password}</password>
    <domain>${data.domain}</domain>
    ${data.proxy ? `<proxy>${data.proxy}</proxy>` : ""}
    ${data.outboundProxy ? `<outboundproxy>${data.outboundProxy}</outboundproxy>` : ""}
    ${data.authUser ? `<authuser>${data.authUser}</authuser>` : ""}
    ${data.displayName ? `<displayname>${data.displayName}</displayname>` : ""}
    <enabled>1</enabled>
  </account>
</config>`;
  }
}
