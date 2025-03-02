import { IGenerator, FormField } from "..";

export class OpenVPNGenerator implements IGenerator {
  getName(): string {
    return "openvpn";
  }

  getFields(): FormField[] {
    return [
      { name: "serverAddress", label: "Server Address", type: "text", required: true },
      { name: "port", label: "Port", type: "number", required: true, defaultValue: "1194" },
      { name: "protocol", label: "Protocol", type: "select", required: true, options: [
          { label: "UDP", value: "udp" },
          { label: "TCP", value: "tcp" }
        ], defaultValue: "udp" },
      { name: "caCert", label: "CA Certificate", type: "textarea", required: true },
      { name: "clientCert", label: "Client Certificate", type: "textarea", required: true },
      { name: "clientKey", label: "Client Key", type: "textarea", required: true },
      { name: "authMethod", label: "Authentication Method", type: "select", required: true, options: [
          { label: "Password", value: "password" },
          { label: "TLS Key", value: "tls" }
        ], defaultValue: "password" },
      { name: "username", label: "Username (if using password auth)", type: "text", required: false },
      { name: "password", label: "Password (if using password auth)", type: "password", required: false },
      { name: "tlsKey", label: "TLS Authentication Key (optional)", type: "textarea", required: false },
    ];
  }

  getHeaders(): Record<string, string> {
    return {
      "Content-Type": "application/x-openvpn-profile",
      "Content-Disposition": "attachment; filename=openvpn.ovpn",
    };
  }

  getInstructions(): Record<string, string[]> {
    return {
      "OpenVPN Configuration Import": [
        "1. Download the generated .ovpn file.",
        "2. Open the OpenVPN client on your device.",
        "3. Click 'Import' and select the downloaded .ovpn file.",
        "4. Enter your username and password if required.",
        "5. Connect to the VPN server."
      ],
    };
  }

  generate(data: Record<string, string>): string {
    return `client
dev tun
proto ${data.protocol}
remote ${data.serverAddress} ${data.port}
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
cipher AES-256-CBC
verb 3

<ca>
${data.caCert}
</ca>

<cert>
${data.clientCert}
</cert>

<key>
${data.clientKey}
</key>

${data.authMethod === "tls" && data.tlsKey ? `<tls-auth>\n${data.tlsKey}\n</tls-auth>` : ""}

auth-user-pass ${data.authMethod === "password" ? "auth.txt" : ""}`;
  }
}
