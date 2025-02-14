// src/config/LinphoneConfigGenerator.ts
import { IGenerator, FormField } from ".";
import crypto from "crypto";

export class LinphoneGenerator implements IGenerator {
  generate(data: Record<string, string>): string {

    // Compute HA1 hash: MD5(username:realm:password)
    const ha1 = crypto
      .createHash("md5")
      .update(`${data.username}:${data.domain}:${data.password}`)
      .digest("hex");

    return `<?xml version="1.0" encoding="UTF-8"?>
  <config xmlns="http://www.linphone.org/xsds/lpconfig.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.linphone.org/xsds/lpconfig.xsd lpconfig.xsd">
    <section name="sip">
      <entry name="default_proxy" overwrite="true">0</entry>
      <entry name="transports">${data.udp}</entry>
      <entry name="contact">sip:${data.username}@${data.domain}</entry>
      <entry name="outbound_proxy">sip:${data.domain}</entry>
      <entry name="register_enabled">1</entry>
      <entry name="expires">3600</entry>
    </section>
    <section name="misc">
      <entry name="transient_provisioning" overwrite="true">1</entry>
    </section>
    <section name="auth_info_0" overwrite="true">
      <entry name="username" overwrite="true">${data.username}</entry>
      <entry name="userid" overwrite="true">${data.username}</entry>
      <entry name="ha1" overwrite="true">${ha1}</entry>
      <entry name="passwd">${ha1}</entry>
      <entry name="realm" overwrite="true">${data.domain}</entry>
      <entry name="domain" overwrite="true">${data.domain}</entry>
      <entry name="algorithm" overwrite="true">MD5</entry>
    </section>
  </config>`;
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

  getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/xml',
      'Content-Disposition': 'attachment; filename=config.xml',
    };
  }
}
