// src/config/LinphoneConfigGenerator.ts
import { IGenerator, FormField } from ".";
import crypto from "crypto";

export class LinphoneGenerator implements IGenerator {
  generate(data: Record<string, string>): string {
    const ha1 = crypto.createHash('md5').update(`${data.username}:${data.domain}:${data.password}`).digest('hex');
  
    return `<?xml version="1.0" encoding="UTF-8"?>
  <config xmlns="http://www.linphone.org/xsds/lpconfig.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.linphone.org/xsds/lpconfig.xsd lpconfig.xsd">
    <section name="sip">
      <entry name="default_proxy" overwrite="true">0</entry>
    </section>
    <section name="net">
      <entry name="nat_policy_ref" overwrite="true">~OuCpkaPzCwyvMo</entry>
    </section>
    <section name="misc">
      <entry name="transient_provisioning" overwrite="true">1</entry>
    </section>
    <section name="nat_policy_default_values">
      <entry name="stun_server">stun.linphone.org</entry>
      <entry name="protocols">stun,ice</entry>
    </section>
    <section name="nat_policy_0">
      <entry name="ref" overwrite="true">~OuCpkaPzCwyvMo</entry>
      <entry name="stun_server" overwrite="true">stun.linphone.org</entry>
      <entry name="protocols" overwrite="true">stun,ice</entry>
    </section>
    <section name="auth_info_0" overwrite="true">
      <entry name="username" overwrite="true">${data.username}</entry>
      <entry name="ha1" overwrite="true">${ha1}</entry>
      <entry name="realm" overwrite="true">${data.domain}</entry>
      <entry name="domain" overwrite="true">${data.domain}</entry>
      <entry name="algorithm" overwrite="true">MD5</entry>
    </section>
    <section name="proxy_0" overwrite="true">
      <entry name="reg_proxy" overwrite="true">&lt;sip:${data.domain};transport=${data.transport}&gt;</entry>
      <entry name="reg_route" overwrite="true">&lt;sip:${data.domain};transport=${data.transport}&gt;</entry>
      <entry name="reg_identity" overwrite="true">"${data.displayName}" &lt;sip:${data.username}@${data.domain}&gt;</entry>
      <entry name="realm" overwrite="true">${data.domain}</entry>
      <entry name="quality_reporting_collector" overwrite="true">sip:voip-metrics@${data.domain};transport=${data.transport}</entry>
      <entry name="quality_reporting_enabled" overwrite="true">1</entry>
      <entry name="quality_reporting_interval" overwrite="true">180</entry>
      <entry name="reg_expires" overwrite="true">31536000</entry>
      <entry name="reg_sendregister" overwrite="true">1</entry>
      <entry name="publish" overwrite="true">1</entry>
      <entry name="avpf" overwrite="true">1</entry>
      <entry name="avpf_rr_interval" overwrite="true">1</entry>
      <entry name="nat_policy_ref" overwrite="true">~OuCpkaPzCwyvMo</entry>
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
