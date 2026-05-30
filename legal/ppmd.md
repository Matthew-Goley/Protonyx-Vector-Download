# Protonyx LLC — Privacy Policy

**Effective Date:** May 25, 2026
**Version:** 3.1

---

## Overview

Protonyx LLC ("Protonyx," "we," "us," or "our") operates the website protonyxdata.com and the Vector desktop application (collectively, the "Services"). This Privacy Policy explains what personal information we collect, how we use it, with whom we share it, and your rights regarding that information.

We built Vector with a local-first architecture by design: your portfolio data never leaves your device. This policy reflects that commitment.

This Privacy Policy applies to users in the United States. The Services are not directed to, and are not available to, residents of the European Economic Area or the United Kingdom. Jurisdiction-specific rights for California residents are addressed in Section 12.

---

## 1. Who This Policy Applies To

This policy applies to all users of protonyxdata.com and the Vector desktop application. **You must be at least 18 years old to create a Protonyx account or use the Services.** The Services are intended solely for users located in the United States. Users located in the European Economic Area or the United Kingdom are not permitted to use the Services and should not submit any personal information to Protonyx.

We do not knowingly collect personal information from anyone under 18 or from residents of the EEA or UK. If we learn that we have collected personal information from either group, we will delete it from our systems within 30 days. If you believe a minor has created an account, contact us immediately at legal@protonyxdata.com.

---

## 2. Information We Collect

### 2a. Information You Provide Directly

When you create a Protonyx account, we collect:

- **Username**
- **Email address**
- **Password** -- stored exclusively as a bcrypt hash (cost factor 10). We never store, transmit, or have access to your plaintext password at any point.

We also record the following automatically upon account activity:

- Account creation date
- Last login timestamp
- Download count (number of times you have downloaded Vector)
- Plan type (free or pro)
- Beta access status

We collect only the personal information necessary to operate the Services and fulfill the purposes described in this policy. We do not collect your legal name, phone number, physical address, payment card details, or any financial account information at signup. If payment processing is added in the future, this Privacy Policy will be updated and users will be notified before that change takes effect.

### 2b. Information Collected Automatically

**Website (protonyxdata.com):** We do not use Google Analytics, Meta Pixel, or any third-party tracking or analytics scripts. We do not set advertising cookies. We do not build behavioral profiles of visitors.

**Do Not Track:** We do not track users across third-party websites and therefore do not alter our data practices in response to browser Do Not Track signals, as we do not engage in cross-site tracking.

**Authentication token:** When you log in, a JSON Web Token (JWT) is stored in your browser's localStorage. This token identifies your session and contains only your user ID and username. It is not a tracking mechanism and is not shared with any third party. Tokens expire automatically after 7 days.

**Server logs:** Our hosting infrastructure may generate standard server access logs (IP address, timestamp, HTTP method, request path, response code). These logs are used solely for security monitoring and infrastructure debugging. We do not use server logs for marketing, advertising, or user profiling. We retain server logs for no longer than **90 days**, after which they are automatically deleted.

### 2c. Information the Desktop Application Does NOT Transmit

The Vector desktop application stores all of the following locally on your device only. None of it is ever transmitted to Protonyx:

- Your investment positions (tickers, share counts, cost basis)
- Portfolio analytics results
- Lens engine output and history
- Application settings and preferences
- Cached market data

The application does make outbound requests to third-party market data providers (see Section 4) containing only ticker symbols. No account credentials, personal information, or device identifiers are included in those requests.

### 2d. Automated Processing and the Lens Engine

The Lens engine within Vector analyzes your portfolio data using predetermined mathematical rules and thresholds to generate diagnostic output. This processing occurs entirely on your local device; the inputs and outputs are never transmitted to Protonyx. The Lens engine does not constitute automated decision-making that produces legal or similarly significant effects, as all decisions remain solely with you as the user. Protonyx does not use Lens engine output for profiling, marketing, or any purpose other than presenting results to you within the application.

---

## 3. How We Use Your Information

We process your personal information only for the following specific, defined purposes:

| Purpose | Description |
|---|---|
| Account creation and authentication | To create and maintain your account and verify your identity on login |
| Email verification | To confirm your email address is valid via a one-time verification link |
| Password reset | To send a secure reset link when you request one |
| Transactional email | To send account-related communications via our email provider, Resend |
| Download tracking | To record how many times you have downloaded Vector, visible to you on your account page |
| Security monitoring and fraud prevention | To detect and respond to unauthorized access, abuse, or security threats |
| Service improvement | Aggregate, non-identifiable operational data may be used to improve the Services |

We do not use your personal information for advertising, behavioral profiling, or sale to any third party under any circumstances.

---

## 4. Third-Party Service Providers

We work with a small, defined set of third-party service providers to operate the Services. These are the only external parties that may receive any data:

| Service | Purpose | Data Shared | DPA in Place |
|---|---|---|---|
| **Resend** | Transactional email (verification, password reset, welcome) | Email address and username | Yes |
| **Yahoo Finance (via yfinance)** | Market data retrieval by the desktop application | Ticker symbols only -- no personal data | N/A |
| **Stripe** *(planned -- not yet active; policy will be updated and users notified before activation)* | Payment processing for Pro plan | Payment details handled directly by Stripe under Stripe's own privacy policy | To be executed prior to activation |

We do not sell, rent, share, or otherwise disclose your personal information to any party not listed in this section, except as required by law or legal process (see Section 8), or as necessary to protect the rights, property, or safety of Protonyx, our users, or the public.

---

## 5. Data Storage and Security

**Account data** is stored in a PostgreSQL database. All data in transit between your browser or application and Protonyx servers is encrypted using TLS. Passwords are hashed using bcrypt and are never stored or transmitted in plaintext. Authentication tokens are cryptographically signed and expire after 7 days.

**Portfolio data** is stored exclusively on your local device under your operating system's application data directory. Protonyx has no access to this data under any circumstances.

We implement and maintain the following technical and organizational security measures:

- TLS encryption for all data in transit
- Bcrypt password hashing (cost factor 10)
- Signed, expiring authentication tokens
- Access controls limiting database access to authorized personnel only
- Regular review of access logs for anomalous activity

No method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security. **In the event of a data breach affecting your personal information, we will notify affected users no later than 30 days after discovery**, or within the timeframe required by applicable state law if shorter, whichever is sooner. Notification will be provided via email to the address associated with your account and, where appropriate, via a notice on protonyxdata.com. We will also notify applicable state or federal regulators as required by law. If you believe your account has been compromised, contact us immediately at legal@protonyxdata.com.

---

## 6. Data Retention

We retain your account data for as long as your account is active. We collect and retain only the minimum information necessary to provide the Services and fulfill the purposes described in this policy. If you request deletion of your account, we will delete your personal information from our active database systems within **30 days** of receiving your request, except where retention is required by applicable law.

| Data Type | Retention Period |
|---|---|
| Account information (username, email, hashed password) | Duration of account + 30 days post-deletion request |
| Server access logs | 90 days |
| Email verification tokens | Single-use; deleted immediately upon use or expiration (24-hour expiry) |
| Password reset tokens | Single-use; deleted immediately upon use or expiration (1-hour expiry) |
| Authentication tokens (JWT) | 7-day expiry; revoked on logout |

---

## 7. Your Rights

You have the following rights regarding your personal information. To exercise any right, email us at legal@protonyxdata.com. We will respond within **30 days**, or within the timeframe required by applicable law for your jurisdiction.

- **Access** -- request a copy of the personal data we hold about you
- **Correction** -- request correction of inaccurate or incomplete data
- **Deletion** -- request deletion of your account and all associated personal data
- **Portability** -- request your personal data in a portable, machine-readable format
- **Restriction** -- request that we restrict processing of your data where: (a) you contest the accuracy of the data; (b) the processing is unlawful but you prefer restriction over deletion; (c) we no longer need the data but you require it for a legal claim; or (d) you have objected to processing pending verification
- **Objection** -- object to processing of your data for specific purposes, including any profiling

We will not discriminate against you for exercising any of your privacy rights.

---

## 8. Law Enforcement and Legal Process

We may disclose your personal information to law enforcement, government authorities, or other third parties when we believe in good faith that disclosure is required by applicable law, regulation, or valid legal process (including a subpoena, court order, or search warrant). Where permitted by law, we will attempt to notify you of such a request before disclosing your information. We do not voluntarily provide user data to law enforcement without legal process.

---

## 9. Third-Party Links

The Services or communications from Protonyx may contain links to third-party websites or services. Protonyx is not responsible for the privacy practices or content of those third parties. This Privacy Policy does not apply to any third-party site or service. We encourage you to review the privacy policies of any third-party site you visit.

---

## 10. Cookies and Tracking

We do not use tracking cookies, advertising cookies, or analytics cookies of any kind. The only browser-side storage we use is **localStorage** to hold your authentication token after login. This token contains only your user ID and username and is used exclusively to maintain your login session. You can delete this token at any time by logging out or manually clearing your browser's localStorage. Clearing this token will log you out of your session.

---

## 11. Children's Privacy

The Services are intended exclusively for users 18 years of age and older. We do not knowingly collect, use, or disclose personal information from any person under 18. If you are under 18, you must not create an account or use the Services. If we become aware that we have collected personal information from a person under 18, we will delete that information from our systems within 30 days. To report a potential minor account, contact legal@protonyxdata.com.

---

## 12. Additional Rights for California Residents (CCPA/CPRA)

If you are a California resident, the following additional provisions apply under the California Consumer Privacy Act ("CCPA") and the California Privacy Rights Act ("CPRA").

**Categories of Personal Information Collected.** In the past 12 months, we have collected the following categories of personal information: identifiers (username, email address, IP address); internet or other electronic network activity information (server logs, login timestamps); and inferences drawn from account activity (download count, plan type). We do not sell or use these inferences for targeted advertising or third-party profiling.

**We Do Not Sell or Share Personal Information.** We do not sell your personal information to any third party. We do not share your personal information for cross-context behavioral advertising purposes. You therefore have no need to opt out of sale or sharing, but you retain the right to submit such a request and we will confirm our non-sale status in writing.

**Your California Rights.** You have the right to: know what personal information we collect, use, disclose, or sell; request deletion of your personal information; correct inaccurate personal information; and opt out of sale or sharing (not applicable, as we do not sell or share).

**Non-Discrimination.** We will not discriminate against you in any way for exercising your California privacy rights.

**Authorized Agents.** You may designate an authorized agent to make requests on your behalf. We may require verification of the agent's identity and authorization before processing such requests.

To exercise your California rights, email legal@protonyxdata.com. We will respond within **45 days**, with a possible extension of an additional 45 days where reasonably necessary. We will notify you of any extension within the initial 45-day period.

---

## 13. Business Transfers and Changes of Control

If Protonyx LLC is involved in a merger, acquisition, asset sale, reorganization, or similar transaction, personal information we hold may be transferred to the successor entity as part of that transaction. We will provide notice of any such transfer that materially affects how your personal information is used, by posting a notice on protonyxdata.com and, where practicable, by emailing the address associated with your account, no less than 14 days before the transfer takes effect. You may request deletion of your personal information prior to the transfer taking effect by contacting legal@protonyxdata.com.

---

## 14. Changes to This Policy

We may update this Privacy Policy from time to time to reflect changes in our practices, the Services, or applicable law. When we update this policy, we will revise the Effective Date at the top of this document.

**Material changes** means changes that meaningfully affect how we collect, use, or share your personal information, or that reduce your rights under this policy. Material changes will be communicated to you via email to the address associated with your account and through a prominent notice on protonyxdata.com, no less than **14 days** before the changes take effect. Continued use of the Services after the effective date of any material change constitutes your acceptance of the revised policy.

---

## 15. Geographic Restriction -- EEA and UK Users

The Services are not directed to, and are not intended for use by, residents of the European Economic Area or the United Kingdom. If you are located in the EEA or UK, you must not use the Services or submit any personal information to Protonyx. We do not knowingly collect personal information from EEA or UK residents. If we become aware that we have done so, we will delete that information from our systems within 30 days.

---

## 16. Contact

For privacy-related questions, requests, complaints, or legal notices, contact Protonyx LLC at:

- **Website:** protonyxdata.com
- **Email:** legal@protonyxdata.com

We will respond within 30 days, or within the timeframe required by applicable law for your jurisdiction.

---

*Protonyx LLC | Version 3.1 | May 25, 2026*