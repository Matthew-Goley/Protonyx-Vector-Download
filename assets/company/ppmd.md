# Protonyx LLC — Privacy Policy

**Effective Date:** May 19, 2025
**Version:** 1.0

---

## Overview

Protonyx LLC ("Protonyx," "we," "us," or "our") operates the website protonyxdata.com and the Vector desktop application. This Privacy Policy explains what personal information we collect, how we use it, and your rights regarding that information.

We built Vector with a local-first architecture by design: your portfolio data never leaves your device. This policy reflects that commitment.

---

## 1. Who This Policy Applies To

This policy applies to all users of the Protonyx website (protonyxdata.com) and the Vector desktop application. You must be at least 18 years old to create a Protonyx account or use the Services. We do not knowingly collect personal information from anyone under 18. If we learn that we have collected data from a person under 18, we will delete it promptly. If you believe a minor has created an account, contact us at legal@protonyxdata.com.

## 2. Information We Collect

### 2a. Information You Provide Directly

When you create a Protonyx account, we collect:

- Username
- Email address
- Password (stored as a bcrypt hash — we never store your plaintext password)

We also record the following automatically upon account activity:

- Account creation date (member_since)
- Last login timestamp
- Download count (number of times you have downloaded Vector)
- Plan type (free or pro)
- Beta access status

We do not collect your name, phone number, address, payment card details, or any financial account information at signup. If Stripe payment processing is added in the future, this policy will be updated before that change takes effect.

### 2b. Information Collected Automatically

**Website (protonyxdata.com):** We do not use Google Analytics, Meta Pixel, or any third-party tracking or analytics scripts. We do not set advertising cookies. We do not build behavioral profiles of visitors.

**Authentication cookie / session token:** When you log in, a JSON Web Token (JWT) is stored in your browser's localStorage. This token identifies your session so you remain logged in. It is not a tracking cookie and contains only your user ID and username. It expires after 7 days.

**Server logs:** Our hosting infrastructure may generate standard server access logs (IP address, timestamp, HTTP method, path, response code). These are operational logs used solely for security monitoring and debugging. We do not use them for marketing or user profiling.

### 2c. Information the Desktop App Does NOT Send Us

The Vector desktop application stores all of the following **locally on your device only**. None of it is transmitted to Protonyx:

- Your investment positions (tickers, share counts, cost basis)
- Portfolio analytics results
- Lens engine output and history
- Settings and preferences
- Cached market data

The app does make outbound requests to third-party market data providers (see Section 4) containing only ticker symbols. No account credentials or personal information are included in those requests.

## 3. How We Use Your Information

We use the information we collect for the following purposes:

- **Account creation and authentication** — to create and maintain your account and verify your identity on login
- **Email verification** — to confirm your email address is valid via a one-time verification link
- **Password reset** — to send a secure reset link when you request one
- **Transactional email** — to send account-related communications (welcome email, verification, password reset) via our email provider, Resend
- **Download tracking** — to record how many times you have downloaded Vector, visible to you on your account page
- **Service improvement** — aggregate, non-personal operational data may be used to improve the Services

We do not use your information for advertising, behavioral profiling, or sale to third parties.

## 4. Third-Party Services

We work with a small number of third-party services to operate the platform. These are the only external parties that may receive any data:

| Service | Purpose | Data shared |
|---|---|---|
| **Resend** | Transactional email (verification, password reset, welcome) | Your email address and username |
| **Yahoo Finance (via yfinance)** | Market data retrieval by the desktop app | Ticker symbols only — no personal data |
| **Stripe** (planned, not yet active) | Payment processing for Pro plan | Payment details handled directly by Stripe under their own privacy policy |

We do not sell, rent, or trade your personal information to any third party. We do not use advertising networks or data brokers.

## 5. Data Storage and Security

**Account data** is stored in a PostgreSQL database. Passwords are hashed using bcrypt (cost factor 10) and are never stored or transmitted in plaintext. Authentication tokens are signed with a secret key and expire after 7 days.

**Portfolio data** is stored exclusively on your local device under your operating system's application data directory. Protonyx has no access to this data.

We implement reasonable technical and organizational measures to protect your account data. No method of transmission or storage is 100% secure, and we cannot guarantee absolute security. If you believe your account has been compromised, contact us immediately.

## 6. Data Retention

We retain your account data for as long as your account is active. If you request deletion of your account, we will delete your personal information from our database within 30 days, except where retention is required by law.

Verification tokens and password reset tokens are single-use and are deleted immediately upon use or expiration (reset tokens expire after 1 hour).

## 7. Your Rights

Depending on your location, you may have the following rights regarding your personal information:

- **Access** — request a copy of the personal data we hold about you
- **Correction** — request correction of inaccurate data
- **Deletion** — request deletion of your account and associated data
- **Portability** — request your data in a portable format

To exercise any of these rights, email us at legal@protonyxdata.com. We will respond within 30 days.

California residents may have additional rights under the CCPA/CPRA, including the right to know what personal information is sold or disclosed (we do not sell personal information) and the right to opt out of sale (not applicable).

## 8. Cookies and Tracking

We do not use tracking cookies, advertising cookies, or analytics cookies. The only browser storage we use is localStorage to hold your authentication token after login. You can clear this at any time by logging out or clearing your browser's local storage.

## 9. Children's Privacy

The Services are intended for users 18 years of age and older. We do not knowingly collect personal information from anyone under 18. If you are under 18, do not create an account or use the Services.

## 10. Changes to This Policy

We may update this Privacy Policy from time to time. When we do, we will update the Effective Date at the top of this page. Material changes will be communicated via email to registered users or through a notice on the website. Continued use of the Services after changes constitutes acceptance of the revised policy.



## 11. Contact

For privacy-related questions, requests, or concerns, contact Protonyx LLC at:

- Website: protonyxdata.com
- Email: legal@protonyxdata.com

We will respond within 30 days.

---

*Protonyx LLC | Version 1.0 | May 19, 2025*

*DRAFT - Consult qualified legal counsel before finalizing.*