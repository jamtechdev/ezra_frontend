import { Link } from 'react-router-dom';

const sectionTitleStyle = {
  fontSize: 22,
  fontWeight: 800,
  color: '#1f2937',
  marginBottom: 12,
};

const paragraphStyle = {
  fontSize: 16,
  lineHeight: 1.7,
  color: '#4b5563',
  marginBottom: 16,
};

function TermsSection({ title, paragraphs }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h3 style={sectionTitleStyle}>{title}</h3>
      {paragraphs.map((text, idx) => (
        <p key={idx} style={paragraphStyle}>
          {text}
        </p>
      ))}
    </section>
  );
}

export default function Terms() {
  const englishSections = [
    {
      title: '1. Introduction',
      paragraphs: [
        'Welcome to Ezra. These Terms of Service (“Terms”) govern your access to and use of the Ezra platform, including our website, mobile applications, and any related services (collectively referred to as the “Platform”). By accessing or using Ezra, you agree to be bound by these Terms and all applicable laws and regulations of the State of Israel.',
        'Ezra is a technology platform that connects individuals seeking home services (“Clients”) with independent service providers (“Ezra’s”). Ezra itself does not perform any services and is not responsible for the conduct, performance, or outcomes of any services rendered by Ezra’s. The Platform facilitates communication, scheduling, and payment between Clients and Ezra’s, but Ezra does not supervise, direct, or control the work performed.',
      ],
    },
    {
      title: '2. Eligibility and Legal Capacity',
      paragraphs: [
        'By registering for or using the Platform, you confirm that you are at least 18 years old and legally competent under Israeli law to enter into binding agreements. You agree to use your real, legal name and accurate personal information when creating an account and interacting with other users. You may not impersonate another person, misrepresent your identity, or provide false documentation. Ezra reserves the right to verify your identity and suspend or terminate accounts that violate this requirement.',
      ],
    },
    {
      title: '3. Respectful and Lawful Conduct',
      paragraphs: [
        'All users of Ezra — both Clients and Ezra’s — are expected to behave respectfully, professionally, and lawfully. You agree not to engage in abusive, discriminatory, fraudulent, or illegal behavior on or through the Platform. You must treat others with courtesy, avoid harassment, and maintain a safe and clean working environment. Ezra reserves the right to remove content, suspend accounts, or take legal action against users who violate these standards or applicable Israeli laws.',
      ],
    },
    {
      title: '4. Use of the Platform',
      paragraphs: [
        'Clients may post tasks and hire Ezra’s through the Platform. Ezra’s may offer services and accept tasks. All communication, scheduling, and payments must occur through the Platform. You agree not to circumvent the Platform by arranging services or payments outside of Ezra. Doing so may result in account suspension or termination.',
      ],
    },
    {
      title: '5. Independent Contractor Status',
      paragraphs: [
        'Ezra’s are independent contractors. They are not employees, agents, or representatives of Ezra. Ezra does not control how Ezra’s perform their services and is not responsible for their actions, omissions, or the quality of their work. Ezra’s are solely responsible for their own taxes, insurance, and compliance with labor and safety laws in Israel.',
      ],
    },
    {
      title: '6. Payments and Fees',
      paragraphs: [
        'Clients agree to pay the posted rate for services, plus any applicable service fees and VAT. Ezra may charge a platform fee to Clients and/or Ezra’s, which will be clearly disclosed before booking. All payments are processed through a third-party payment provider authorized to operate in Israel. Ezra is not responsible for delays, errors, or disputes related to payment processing.',
      ],
    },
    {
      title: '7. Cancellations and Refunds',
      paragraphs: [
        'Cancellation and refund policies are outlined within the Platform. Ezra reserves the right to issue refunds at its sole discretion, in accordance with Israeli consumer protection laws. Clients and Ezra’s are encouraged to communicate clearly and promptly to avoid misunderstandings or disputes.',
      ],
    },
    {
      title: '8. Disclaimers and Limitation of Liability',
      paragraphs: [
        'Ezra provides the Platform “as is” and makes no warranties, express or implied, regarding the quality, safety, legality, or outcome of any services provided by Ezra’s. Ezra is not liable for any damages, injuries, losses, or claims arising out of or related to services performed by Ezra’s. To the fullest extent permitted by Israeli law, Ezra disclaims all liability for indirect, incidental, or consequential damages.',
      ],
    },
    {
      title: '9. Dispute Resolution and Jurisdiction',
      paragraphs: [
        'In the event of a dispute between a Client and an Ezra, Ezra may offer support or mediation but is not obligated to resolve the issue. Any legal disputes arising from the use of the Platform shall be governed by the laws of the State of Israel. You agree that the exclusive jurisdiction for any legal proceedings shall be the competent courts located in Tel Aviv.',
      ],
    },
    {
      title: '10. Modifications to Terms',
      paragraphs: [
        'Ezra may update these Terms at any time. Changes will be posted on the Platform, and continued use of the Platform after such changes are posted constitutes your acceptance of the revised Terms. It is your responsibility to review the Terms periodically.',
      ],
    },
    {
      title: '11. Ezra’s Professional Standards',
      paragraphs: [
        'If you are registered as an Ezra, you agree to conduct yourself with professionalism, punctuality, and respect. You will only accept tasks that match your skills and experience, and you will complete tasks as agreed with the Client. You must maintain a safe and respectful working environment and communicate clearly throughout the engagement.',
        'You also confirm that you are legally permitted to work in Israel and that you possess any documentation required to perform your services, such as trade certifications, licenses, or business registration. Ezra may request verification of these documents at any time. You agree to use your legal name and accurate profile information and to comply with all applicable laws and safety standards.',
      ],
    },
    {
      title: '12. User-Generated Content (Job Listings)',
      paragraphs: [
        'Clients may submit job descriptions, images, and other content (“User Content”) when posting tasks. By submitting User Content, you confirm that you own or have the legal right to use the content and that it does not infringe on any third-party rights. You are solely responsible for the accuracy, legality, and appropriateness of the content you post.',
        'By posting User Content, you grant Ezra a non-exclusive, royalty-free, worldwide, perpetual license to use, reproduce, modify, adapt, publish, translate, distribute, and publicly display the content. This includes sharing listings on Ezra’s platform, social media, and promotional materials. Ezra respects your privacy and will not disclose personal information without consent, except as required by law.',
        'Ezra reserves the right to moderate, remove, or block content that violates these Terms or Israeli law. Ezra is not liable for any damages or disputes arising from User Content.',
      ],
    },
    {
      title: '13. Contact',
      paragraphs: ['For questions, support, or legal inquiries, please contact us at: Ezrainisrael1@gmail.com'],
    },
  ];

  const hebrewSections = [
    {
      title: '1. הקדמה',
      paragraphs: [
        'ברוכים הבאים ל-Ezra. תנאי שימוש אלה ("התנאים") מסדירים את הגישה והשימוש שלך בפלטפורמה של Ezra, הכוללת את האתר, האפליקציות הניידות וכל שירות נלווה (להלן: "הפלטפורמה"). השימוש בפלטפורמה מהווה הסכמה לתנאים אלה ולכל דין החל במדינת ישראל.',
        'Ezra היא פלטפורמה טכנולוגית המחברת בין לקוחות המחפשים שירותי בית לבין נותני שירות עצמאיים ("Ezra\'s"). Ezra עצמה אינה מבצעת את השירותים ואינה אחראית על ביצועם, איכותם או תוצאותיהם. הפלטפורמה משמשת לתיאום, תקשורת ותשלום בין לקוחות ל-Ezra\'s, אך Ezra אינה מפקחת או מנהלת את העבודה בפועל.',
      ],
    },
    {
      title: '2. זכאות משפטית',
      paragraphs: [
        'בשימושך בפלטפורמה, אתה מאשר כי אתה בן 18 ומעלה, וכשיר משפטית לפי חוקי מדינת ישראל להתקשר בהסכמים מחייבים. אתה מתחייב להשתמש בשם החוקי שלך ולספק מידע אישי מדויק. אין להשתמש בזהות בדויה או בפרטים שקריים. Ezra שומרת לעצמה את הזכות לאמת את זהות המשתמש ולחסום חשבונות שיפרו תנאי זה.',
      ],
    },
    {
      title: '3. התנהגות נאותה וחוקית',
      paragraphs: [
        'כל משתמשי Ezra — לקוחות ו-Ezra\'s — מחויבים להתנהגות מכבדת, מקצועית וחוקית. חל איסור מוחלט על התנהגות פוגענית, גזענית, מרמה או עבירה על החוק. יש לנהוג בכבוד, להימנע מהטרדה, ולשמור על סביבת עבודה בטוחה ונקייה. Ezra רשאית להסיר תוכן, להשעות חשבונות או לנקוט צעדים משפטיים נגד מפרי תנאים אלו.',
      ],
    },
    {
      title: '4. שימוש בפלטפורמה',
      paragraphs: [
        'לקוחות רשאים לפרסם משימות ולשכור Ezra\'s דרך הפלטפורמה. Ezra\'s רשאים להציע שירותים ולקבל משימות. כל התקשורת, התיאום והתשלום חייבים להתבצע דרך הפלטפורמה בלבד. ניסיון לעקוף את הפלטפורמה עלול להוביל להשעיה או סיום חשבון.',
      ],
    },
    {
      title: '5. סטטוס עצמאי',
      paragraphs: [
        'Ezra\'s הם קבלנים עצמאיים. הם אינם עובדים, נציגים או שליחים של Ezra. Ezra אינה אחראית על אופן ביצוע השירותים, תוצאותיהם או כל פעולה של Ezra\'s. Ezra\'s אחראים באופן מלא על תשלומי מסים, ביטוחים וציות לחוקי העבודה והבטיחות בישראל.',
      ],
    },
    {
      title: '6. תשלומים ודמי שירות',
      paragraphs: [
        'לקוחות מתחייבים לשלם את התעריף שפורסם עבור השירות, בתוספת מע"מ ודמי שירות ככל שיחולו. Ezra רשאית לגבות עמלה מהלקוחות ו/או מה-Ezra\'s, שתוצג באופן ברור לפני ביצוע ההזמנה. כל התשלומים מתבצעים דרך ספק תשלומים חיצוני המורשה לפעול בישראל. Ezra אינה אחראית לעיכובים או שגיאות בתהליך התשלום.',
      ],
    },
    {
      title: '7. ביטולים והחזרים',
      paragraphs: [
        'מדיניות הביטולים וההחזרים מופיעה בפלטפורמה. Ezra שומרת לעצמה את הזכות להעניק החזרים לפי שיקול דעתה ובהתאם לחוק הגנת הצרכן בישראל. מומלץ לתקשר באופן ברור כדי למנוע אי הבנות.',
      ],
    },
    {
      title: '8. אחריות מוגבלת',
      paragraphs: [
        'Ezra מספקת את הפלטפורמה "כמות שהיא" ואינה מתחייבת לאיכות, בטיחות או חוקיות השירותים. Ezra אינה אחראית לנזקים, פגיעות או הפסדים הנובעים מהשירותים. ככל שהדבר מותר לפי החוק בישראל, Ezra מסירה אחריות לנזקים עקיפים או תוצאתיים.',
      ],
    },
    {
      title: '9. יישוב סכסוכים וסמכות שיפוט',
      paragraphs: [
        'במקרה של סכסוך בין לקוח ל-Ezra, Ezra עשויה לסייע אך אינה מחויבת לכך. כל סכסוך משפטי יתברר לפי חוקי מדינת ישראל, בבתי המשפט המוסמכים בעיר תל אביב בלבד.',
      ],
    },
    {
      title: '10. שינויים בתנאים',
      paragraphs: [
        'Ezra רשאית לעדכן את התנאים בכל עת. המשך השימוש בפלטפורמה לאחר פרסום השינויים מהווה הסכמה לתנאים המעודכנים. באחריות המשתמש לעיין בתנאים מעת לעת.',
      ],
    },
    {
      title: '11. סטנדרטים מקצועיים ל-Ezra\'s',
      paragraphs: [
        'Ezra\'s מתחייבים להתנהגות מקצועית, עמידה בזמנים, וכבוד ללקוחות. יש לקבל רק משימות התואמות את הכישורים, ולבצע אותן בהתאם להסכמות. Ezra\'s חייבים להחזיק במסמכים המעידים על מקצועיותם — כגון רישיון, תעודת הסמכה או רישום עסק — ולספקם לפי דרישה. חובה להשתמש בשם החוקי ולשמור על ציות לחוקי מדינת ישראל.',
      ],
    },
    {
      title: '12. תוכן משתמשים (פרטי משימות)',
      paragraphs: [
        'לקוחות רשאים לפרסם תיאורי משימות, תמונות ותוכן נוסף ("תוכן משתמש"). בפרסום תוכן זה, הלקוח מאשר כי הוא הבעלים החוקי של התוכן, וכי הוא אינו מפר זכויות צד שלישי. Ezra אינה אחראית לתוכן זה ואינה מתחייבת לבדוק או לאמת אותו.',
        'בפרסום תוכן משתמש, הלקוח מעניק ל-Ezra רישיון בלתי בלעדי, ללא תמלוגים, עולמי ולצמיתות להשתמש, לשתף, לפרסם ולהציג את התוכן, כולל לצורכי שיווק. Ezra שומרת על פרטיות המשתמשים ואינה חושפת מידע אישי ללא הסכמה, אלא אם נדרש לפי חוק.',
        'Ezra רשאית להסיר תוכן מפר, לחסום משתמשים או לנקוט צעדים לפי הצורך.',
      ],
    },
    {
      title: '13. יצירת קשר',
      paragraphs: ['לשאלות, תמיכה או פניות משפטיות ניתן לפנות לכתובת: Ezrainisrael1@gmail.com'],
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #ede9fe 100%)',
        padding: '60px 20px 80px',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <Link
            to="/"
            style={{
              color: '#4c1d95',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 16,
              background: 'rgba(255,255,255,0.9)',
              padding: '12px 20px',
              borderRadius: 12,
              boxShadow: '0 10px 30px rgba(76, 29, 149, 0.18)',
            }}
          >
            ← Back to EZRA
          </Link>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#4c1d95', letterSpacing: '0.5px' }}>
            🇮🇱 Ezra Terms of Service
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.98)',
            borderRadius: 36,
            padding: '48px 44px',
            boxShadow: '0 35px 80px rgba(76, 29, 149, 0.15)',
            border: '1px solid rgba(255,255,255,0.7)',
          }}
        >
          <div style={{ marginBottom: 48 }}>
            {englishSections.map((section) => (
              <TermsSection key={section.title} title={section.title} paragraphs={section.paragraphs} />
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(148,163,184,0.3)', paddingTop: 48 }}>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: '#312e81', marginBottom: 24 }}>🇮🇱 תנאי שימוש בפלטפורמת Ezra</h2>
            {hebrewSections.map((section) => (
              <section key={section.title} style={{ marginBottom: 36, direction: 'rtl' }}>
                <h3 style={{ ...sectionTitleStyle, color: '#312e81' }}>{section.title}</h3>
                {section.paragraphs.map((text, idx) => (
                  <p key={idx} style={{ ...paragraphStyle, color: '#4338ca', marginBottom: 16 }}>
                    {text}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
            <a
              href="mailto:Ezrainisrael1@gmail.com"
              style={{
                padding: '14px 28px',
                borderRadius: 16,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: 16,
                textDecoration: 'none',
                boxShadow: '0 18px 40px rgba(99, 102, 241, 0.25)',
              }}
            >
              Contact Ezra Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

