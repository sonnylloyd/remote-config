// src/config/LinphoneConfigGenerator.ts
import { IGenerator, FormField } from ".";
import crypto from "crypto";

export class LinphoneGenerator implements IGenerator {
  generate(data: Record<string, string>): string {
    const ha1 = crypto.createHash('md5').update(`${data.username}:${data.realm}:${data.password}`).digest('hex');
  
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
      <entry name="realm" overwrite="true">${data.realm}</entry>
      <entry name="domain" overwrite="true">${data.domain}</entry>
      <entry name="algorithm" overwrite="true">MD5</entry>
    </section>
    <section name="display_info" overwrite="true">
      <entry name="display_name" overwrite="true">${data.name || data.username}</entry>
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
      { 
        name: "name", 
        label: "Display Name", 
        type: "text", 
        required: false,
        hint: "This is the name you would like to display in the app"
      },
      { 
        name: "username", 
        label: "Username", 
        type: "text", 
        required: true,
        hint: "This is your SIP username, usually your extension number."
      },
      { 
        name: "password", 
        label: "Password", 
        type: "password", 
        required: true,
        hint: "Use your SIP password, not your user portal password."
      },
      { 
        name: "domain", 
        label: "Domain", 
        type: "text", 
        required: true,
        hint: "Enter your SIP server address, e.g., sip.example.com."
      },
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
        defaultValue: "udp",
        hint: "Choose the transport protocol for SIP communication. UDP is most common."
      },
      { 
        name: "realm", 
        label: "Realm", 
        type: "text", 
        required: true, 
        defaultValue: "asterisk",
        hint: "This is usually 'asterisk' for FreePBX and Asterisk-based systems."
      },
    ];
  }
  
  

  getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/xml',
      'Content-Disposition': 'attachment; filename=config.xml',
    };
  }

  getInstructions(): Record<string, string[]> {
    return {
      'Mobile': [
        "Install the Linephone app onto your mobile device",
        "Open the Linphone app",
        "Open the side menu by ptessing the four lines on the top left corner",
        "Press assistant",
        "On the assistant screen press 'Fetch Remote Configuration'",
        "Press 'QRCode' and scan the qr code above",
        "Now press 'Fetch and apply'",
        "Your app should now be connected"
      ],
      'Desktop': [
        "Download the generated configuration file to your computer.",
        "Open the Linphone desktop application.",
        "Go to 'Preferences' > 'Accounts'.",
        "Click 'Add' and select 'Import from configuration file'.",
        "Choose the downloaded config.xml file.",
        "Save and verify your registration status."
      ]
    };
  }
  
}
