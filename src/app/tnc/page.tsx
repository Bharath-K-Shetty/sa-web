import React from "react";
// import Navbar from "@/components/Navbar";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-[#00163d] text-white">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 font-pp-neuebit text-center lg:text-left">
              Terms of Use
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-pp-neuebit text-center lg:text-left">
              Last Updated: 4th July 2025
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 font-pp-neuebit">
            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                Send Arcade Studios Pte. Ltd. (&quot;Send Arcade&quot;) operates
                the website{" "}
                <a
                  href="https://sendarcade.fun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors underline"
                >
                  https://sendarcade.fun
                </a>{" "}
                mobile applications and related services (collectively, the
                &quot;Services&quot;).
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                These Terms of Use govern your access to and use of the
                Services. Please read them carefully before using the Services.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                By accessing or using the Services, you confirm that you have
                read, understood, and agreed to these Terms and our Privacy
                Policy. If you do not agree, you must discontinue use of the
                Services.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                1. Eligibility & Prohibited Jurisdictions
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                You must be at least 18 years old, or the age of majority in
                your jurisdiction, to access the Services.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                The Services are not intended for use or access by individuals
                or entities located in, incorporated in, or residents of
                jurisdictions that are:
              </p>
              <div className="space-y-2 ml-4 sm:ml-6">
                <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                  (a) subject to comprehensive international trade sanctions or
                  embargoes
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                  (b) listed by Singapore or major international organizations
                  as restricted for technology or software services
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                  (c) where participation in online entertainment platforms
                  similar to the Services is prohibited by law.
                </p>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                Such jurisdictions may include, but are not limited to:
                Afghanistan, Belarus, Central African Republic, Democratic
                Republic of Congo, Iran, Iraq, Lebanon, Libya, Myanmar, North
                Korea, Russia, Somalia, Sudan, Syria, Venezuela, Yemen,
                Zimbabwe, and the Crimea, Donetsk, and Luhansk regions of
                Ukraine.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                You agree not to use any methods, technologies, or tools
                including VPNs or proxy servers to obscure your geographic
                location in order to access the Services from a prohibited
                region. Any such activity constitutes a breach of these Terms
                and may result in immediate suspension of access without notice.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                2. The Services
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                Send Arcade provides a browser based interactive platform
                designed for entertainment and engagement through non monetary
                gameplay mechanics. Certain cosmetic features or in app
                achievements may be made available to enhance the user
                experience. These features are non functional, non monetary, and
                have no cash value or external utility.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any part
                of the Services at any time, with or without notice.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                3. Fees & Payment
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                The Services are free to access and use. Any future optional
                features involving payments will be disclosed clearly prior to
                user confirmation. Users are responsible for any applicable
                taxes related to optional features.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                4. Compliance
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                Users agree to comply with all applicable local laws and
                regulations while using the Services. Send Arcade may suspend or
                terminate access for legal violations, inaccurate information,
                or other policy breaches.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                5. Access Control
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                We may disable, suspend, or limit your access to the Services at
                any time, without notice, for violations of these Terms or for
                legal or technical reasons. We are not liable for losses
                resulting from such access restrictions.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                6. User Accounts
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                Users may be required to register an account or authenticate via
                third party identity providers. You are responsible for
                maintaining the confidentiality of your login credentials. Any
                activity conducted through your account is your responsibility.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                7. Risks &amp; Disclaimers
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                The Services are provided &quot;as is&quot; and &quot;as
                available&quot; without warranties of any kind. We do not
                guarantee uptime, availability, or functionality, and disclaim
                liability for issues caused by service interruptions, system
                bugs, or external failures.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                8. Third Party Services and Platforms
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                The Services may be distributed via third party platforms such
                as the Apple App Store and Google Play Store. Your use of such
                platforms may be subject to additional terms and privacy
                policies. Send Arcade may also utilize external infrastructure
                providers for identity and access functionality. These services
                are managed independently.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                9. Cookies and Tracking
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                The Services may use cookies or similar tracking technologies to
                enable certain features, improve performance, and analyze user
                behavior. By continuing to use the Services, you consent to the
                use of such technologies as described in our Privacy Policy.
              </p>
            </div>

            {/* Section 10 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                10. Intellectual Property & Feedback
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                All intellectual property in the Services, including text,
                design, graphics, and software, is owned by Send Arcade or its
                licensors. Users may not reproduce, modify, or distribute
                content without prior written permission. Any suggestions or
                feedback you provide may be used without obligation or
                compensation.
              </p>
            </div>

            {/* Section 11 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                11. Indemnification
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                You agree to indemnify and hold harmless Send Arcade, its
                officers, affiliates, and partners from any claims or
                liabilities arising out of your use of the Services or violation
                of these Terms.
              </p>
            </div>

            {/* Section 12 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                12. Limitation of Liability
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                To the maximum extent permitted by law, Send Arcade shall not be
                liable for any indirect, incidental, or consequential damages.
              </p>
            </div>

            {/* Section 13 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                13. Force Majeure
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                We shall not be held liable for any delay or failure in
                performance resulting from causes beyond our reasonable control,
                including natural disasters, war, government actions, internet
                outages, or service interruptions caused by third parties.
              </p>
            </div>

            {/* Section 14 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                14. No Waiver & Assignment
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                Our failure to enforce any right or provision of these Terms
                shall not constitute a waiver of such right. You may not assign
                or transfer your rights or obligations under these Terms without
                prior written consent from Send Arcade.
              </p>
            </div>

            {/* Section 15 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                15. Governing Law & Dispute Resolution
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                These Terms and any related disputes shall be governed by and
                construed in accordance with the laws of the Republic of
                Singapore, without regard to its conflict of law principles.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                In the event of a dispute arising out of or relating to the
                Services, the parties shall first attempt to resolve the dispute
                informally and in good faith. If no resolution is reached within
                thirty (30) days, the dispute shall be referred to and finally
                resolved by binding arbitration administered by the Singapore
                International Arbitration Centre (SIAC) in accordance with the
                SIAC Arbitration Rules for the time being in force, which rules
                are deemed to be incorporated by reference.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                The seat of arbitration shall be Singapore. The tribunal shall
                consist of one arbitrator, and the language of arbitration shall
                be English.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                You agree to waive any right to participate in class actions,
                class arbitrations, or representative actions related to the
                Services.
              </p>
            </div>

            {/* Section 16 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                16. Changes to These Terms
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                Send Arcade may revise these Terms at any time. Changes will be
                posted with an updated effective date. Continued use of the
                Services constitutes acceptance of the updated Terms.
              </p>
            </div>

            {/* Section 17 */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                17. Entire Agreement; Severability; Survival
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                These Terms, along with the Privacy Policy, represent the entire
                agreement between you and Send Arcade. If any provision is found
                unenforceable, the remainder will remain in effect. Provisions
                intended to survive termination will continue to apply.
              </p>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                Contact Us
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                For any questions, please contact us at{" "}
                <a
                  href="mailto:semi@sendarcade.fun"
                  className="text-blue-400 hover:text-blue-300 transition-colors underline"
                >
                  semi@sendarcade.fun
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfUse;
