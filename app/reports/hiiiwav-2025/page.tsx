import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '2025 HiiiWAV Impact Report',
  description: 'HiiiWAV 2025 Annual Impact Report - Oakland Tech Week, Multi-Year Funding, Community Impact',
}

export default function HiiiWAV2025Report() {
  return (
    <div className="hiiiwav-report">
      <style>{`
        .hiiiwav-report {
          --green: #99FF69;
          --purple: #A855F7;
          --orange: #FF5722;
          --black: #000000;
          --white: #FFFFFF;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
          color: var(--black);
        }

        .hiiiwav-report * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .hiiiwav-report .page {
          width: 100%;
          max-width: 1024px;
          margin: 0 auto;
          min-height: 100vh;
          position: relative;
          padding: 40px;
        }

        .hiiiwav-report .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .hiiiwav-report .logo {
          width: 150px;
          height: auto;
          object-fit: contain;
        }
        
        .hiiiwav-report .logo-small {
          width: 80px;
          height: auto;
          object-fit: contain;
        }
        
        .hiiiwav-report .logo-large {
          width: clamp(700px, 90vw, 1200px);
          height: auto;
          object-fit: contain;
          display: block;
        }

        .hiiiwav-report .page-number {
          font-size: 14px;
          opacity: 0.7;
        }

        .hiiiwav-report h1,
        .hiiiwav-report h2,
        .hiiiwav-report h3,
        .hiiiwav-report h4 {
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          letter-spacing: 1px;
        }

        .hiiiwav-report .section-title {
          font-size: clamp(48px, 10vw, 80px);
          line-height: 0.95;
          margin-bottom: 20px;
        }

        .hiiiwav-report .arrow {
          font-size: 48px;
          display: inline-block;
          margin-left: 10px;
        }

        .hiiiwav-report .subtitle {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 24px;
        }

        /* Cover Page */
        .hiiiwav-report .cover {
          background-color: var(--green);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-bottom: 60px;
        }

        .hiiiwav-report .cover .year {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(32px, 5vw, 48px);
          margin-bottom: 10px;
        }

        .hiiiwav-report .cover .main-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(64px, 15vw, 120px);
          line-height: 0.9;
          margin-bottom: 30px;
        }

        .hiiiwav-report .cover-image {
          width: 100%;
          max-width: 600px;
          margin: 20px 0;
        }

        .hiiiwav-report .wordmark {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 12vw, 100px);
          letter-spacing: 2px;
        }

        .hiiiwav-report .cover-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 20px;
          font-size: 12px;
          margin-top: auto;
          padding-top: 40px;
        }

        .hiiiwav-report .cover-footer-col {
          min-width: 150px;
        }

        /* Table of Contents */
        .hiiiwav-report .toc {
          background-color: var(--white);
        }

        .hiiiwav-report .toc-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 60px;
          align-items: start;
        }

        .hiiiwav-report .toc-image-caption {
          font-size: 12px;
          font-style: italic;
          margin-top: 8px;
          opacity: 0.7;
        }

        .hiiiwav-report .toc-list {
          list-style: none;
        }

        .hiiiwav-report .toc-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
          font-size: 16px;
        }

        .hiiiwav-report .toc-item-title {
          font-weight: 500;
        }

        .hiiiwav-report .toc-item-page {
          color: var(--purple);
          font-weight: 700;
        }

        .hiiiwav-report .toc-thanks {
          margin-top: 40px;
          padding: 20px;
          background: linear-gradient(90deg, var(--purple), var(--green));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-style: italic;
          font-size: 14px;
          text-align: center;
        }

        /* Founder's Note */
        .hiiiwav-report .founders-note {
          background-color: var(--white);
        }

        .hiiiwav-report .founders-note-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
        }

        .hiiiwav-report .founders-note .section-title span {
          color: var(--purple);
          font-style: italic;
        }

        .hiiiwav-report .founders-note-content p {
          margin-bottom: 16px;
          font-size: 14px;
          line-height: 1.7;
        }

        .hiiiwav-report .highlight-purple {
          background-color: var(--purple);
          color: var(--white);
          padding: 2px 6px;
          font-weight: 700;
        }

        .hiiiwav-report .callout-box {
          background-color: var(--purple);
          color: var(--white);
          padding: 20px;
          margin: 24px 0;
          font-weight: 600;
          font-style: italic;
        }

        .hiiiwav-report .signature-block {
          margin-top: 40px;
        }

        .hiiiwav-report .signature-label {
          font-size: 14px;
          margin-bottom: 8px;
        }

        .hiiiwav-report .signature {
          font-family: 'Dancing Script', cursive;
          font-size: 36px;
        }

        .hiiiwav-report .signature-title {
          font-size: 12px;
          opacity: 0.7;
        }

        .hiiiwav-report .founder-photo {
          width: 100%;
          max-width: 300px;
        }

        /* Dark Pages */
        .hiiiwav-report .dark-page {
          background-color: var(--black);
          color: var(--white);
        }

        .hiiiwav-report .dark-page .logo,
        .hiiiwav-report .dark-page .page-number {
          color: var(--white);
        }

        .hiiiwav-report .green-accent {
          color: var(--green);
        }

        /* Intro Page */
        .hiiiwav-report .intro-content {
          max-width: 500px;
          margin-left: auto;
        }

        .hiiiwav-report .intro-content p {
          font-size: 14px;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .hiiiwav-report .intro-callout {
          color: var(--green);
          font-weight: 700;
          font-style: italic;
          font-size: 16px;
          margin: 24px 0;
        }

        .hiiiwav-report .full-width-image {
          width: calc(100% + 80px);
          margin-left: -40px;
          margin-right: -40px;
          margin-top: 40px;
        }

        .hiiiwav-report .image-caption {
          font-size: 12px;
          padding: 10px 40px;
          opacity: 0.8;
        }

        .hiiiwav-report .image-caption::before {
          content: "✳ ";
        }

        /* HiiiLIGHTS Page */
        .hiiiwav-report .highlights {
          background-color: var(--purple);
          color: var(--white);
        }

        .hiiiwav-report .highlights .section-title {
          color: var(--green);
        }

        .hiiiwav-report .highlights-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .hiiiwav-report .highlights p {
          font-size: 14px;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .hiiiwav-report .quote-block {
          position: relative;
          padding: 30px 20px;
          margin: 30px 0;
        }

        .hiiiwav-report .quote-mark {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 80px;
          color: var(--green);
          line-height: 1;
          opacity: 0.5;
        }

        .hiiiwav-report .quote-text {
          font-size: 16px;
          font-style: italic;
          font-weight: 600;
          margin: 10px 0;
        }

        .hiiiwav-report .quote-attribution {
          font-size: 12px;
          opacity: 0.8;
        }

        .hiiiwav-report .highlights ul {
          list-style: none;
          margin: 20px 0;
        }

        .hiiiwav-report .highlights li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .hiiiwav-report .highlights li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--green);
          font-weight: bold;
        }

        .hiiiwav-report .highlights li strong {
          color: var(--green);
        }

        /* Programs Page */
        .hiiiwav-report .programs-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .hiiiwav-report .program-section {
          margin-bottom: 30px;
        }

        .hiiiwav-report .program-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          color: var(--green);
          margin-bottom: 12px;
        }

        .hiiiwav-report .tag {
          display: inline-block;
          background-color: var(--green);
          color: var(--black);
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        /* Orange Page */
        .hiiiwav-report .orange-page {
          background-color: var(--orange);
          color: var(--white);
        }

        .hiiiwav-report .event-subtitle {
          font-style: italic;
          font-size: 18px;
          margin-bottom: 30px;
        }

        /* Utilities */
        .hiiiwav-report .mt-4 { margin-top: 40px; }
        .hiiiwav-report .mb-4 { margin-bottom: 40px; }
        .hiiiwav-report .text-center { text-align: center; }

        .hiiiwav-report .placeholder-image {
          background: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 14px;
          text-align: center;
          padding: 20px;
        }

        @media (max-width: 768px) {
          .hiiiwav-report .page {
            padding: 24px;
          }

          .hiiiwav-report .toc-layout,
          .hiiiwav-report .founders-note-layout,
          .hiiiwav-report .highlights-layout,
          .hiiiwav-report .programs-layout {
            grid-template-columns: 1fr;
          }

          .hiiiwav-report .full-width-image {
            width: calc(100% + 48px);
            margin-left: -24px;
            margin-right: -24px;
          }

          .hiiiwav-report .cover-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />

      {/* PAGE 1: Cover */}
      <section className="page cover">
        <header className="page-header">
          <img src="/reports/hiiiwav-2025/images/logo-black.png" alt="HiiiWAV" className="logo" />
          <div>www.hiiiwav.org</div>
        </header>

        <div>
          <div className="year">2025</div>
          <h1 className="main-title">
            iMPACT<br />REPORT
          </h1>
        </div>

        <div className="cover-image">
          <div className="placeholder-image" style={{ height: 300 }}>
            [2025 Event Photo - B&W]
          </div>
        </div>

        <img src="/reports/hiiiwav-2025/images/logo-black.png" alt="HiiiWAV" className="logo-large" />

        <footer className="cover-footer">
          <div className="cover-footer-col">
            <img src="/reports/hiiiwav-2025/images/logo-black.png" alt="HiiiWAV" className="logo-small" />
            <div>2181 Telegraph Ave.</div>
            <div>Oakland, CA 94612</div>
          </div>
          <div className="cover-footer-col">
            <div>bosko@hiiiwav.org</div>
            <div>323-481-7372</div>
          </div>
          <div className="cover-footer-col">
            <div>*HiiiWAV is A 501(c)3</div>
            <div>Nonprofit Corporation</div>
          </div>
        </footer>
      </section>

      {/* PAGE 2: Table of Contents */}
      <section className="page toc">
        <header className="page-header">
          <img src="/reports/hiiiwav-2025/images/logo-black.png" alt="HiiiWAV" className="logo" />
          <div className="page-number">page 01</div>
        </header>

        <h2 className="section-title">TABLE OF<br />CONTENTS</h2>
        <span className="arrow">↘</span>

        <div className="toc-layout mt-4">
          <div>
            <div className="placeholder-image" style={{ height: 350 }}>
              [Featured Artist Photo - B&W]
            </div>
            <div className="toc-image-caption">Artist @ HiiiWAV Event 2025</div>
          </div>

          <div>
            <ul className="toc-list">
              {[
                ["Founder's Note", "2"],
                ["Introduction", "3"],
                ["HiiiLIGHTS", "4"],
                ["Major Wins", "5"],
                ["Oakland Tech Week", "6"],
                ["Oakland Ecosystem", "8"],
                ["Community Events", "10"],
                ["AFRO AI Updates", "12"],
                ["Partnerships", "14"],
                ["Impact Metrics", "16"],
                ["The Future", "18"],
                ["Financials", "20"],
              ].map(([title, page]) => (
                <li key={title} className="toc-item">
                  <span className="toc-item-title">{title}</span>
                  <span className="toc-item-page">{page}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="toc-thanks">
          Thank you to our incredible supporters: Kapor Foundation, Meta, Good Trouble VC, Akonadi Foundation, Alameda County, 
          Full Spectrum Capital, and our growing community of champions!
        </div>
      </section>

      {/* PAGE 3: Founder's Note */}
      <section className="page founders-note">
        <header className="page-header">
          <img src="/reports/hiiiwav-2025/images/logo-black.png" alt="HiiiWAV" className="logo" />
          <div className="page-number">page 02</div>
        </header>

        <h2 className="section-title"><span>Founder&apos;s</span><br />Note</h2>
        <span className="arrow">↘</span>

        <div className="founders-note-layout mt-4">
          <div className="founders-note-content">
            <p>
              2024 was supposed to be a year of consolidation. Instead, it became a year of <strong>audacious expansion</strong>.
            </p>
            <p>
              We secured <span className="highlight-purple">$450,000 in multi-year funding</span>—anonymous backing that signals 
              deep trust in our mission. We launched <strong>Oakland Tech Week</strong>, bringing together the ecosystem we&apos;ve 
              been building for years. We partnered with <strong>Kapor Foundation</strong> on a multi-year commitment that 
              positions HiiiWAV as a cornerstone of Oakland&apos;s creative tech infrastructure.
            </p>
            <p>
              At Hiero Day and Hella Juneteenth, our community showed up in force. At Meta AI conferences from the Bay to Chicago, 
              we proved that <strong>Oakland&apos;s voice belongs at every table where AI&apos;s future is being decided</strong>.
            </p>
            <p>
              We invested in our people—Kev Choice&apos;s continued innovation, E-40&apos;s historic Tiny Desk, the next generation of 
              creators at our summer internship program with EOYDC and Represented.
            </p>

            <div className="callout-box">
              But at HiiiWAV, we don&apos;t wait for permission. We build. We own. We lead.
            </div>

            <p>
              This year, we&apos;re launching <strong>Director</strong>—our fractional nonprofit leadership service at 
              directorforgood.org. It&apos;s what we&apos;ve been doing informally for years, now available to organizations 
              that need backbone support to scale their impact.
            </p>
            <p>
              The HiiiWAV 50 Fund. New studio upgrades. New residents. New partnerships with Good Trouble VC. 
              <strong> This isn&apos;t just growth—it&apos;s proof of concept.</strong>
            </p>
            <p style={{ fontWeight: 700, color: '#A855F7' }}>
              The danger is real. But so is our power.
            </p>

            <div className="signature-block">
              <div className="signature-label">In Solidarity,</div>
              <div className="signature">Bosko Kante</div>
              <div className="signature-title">Cofounder & President, HiiiWAV</div>
            </div>
          </div>

          <div>
            <div className="founder-photo">
              <div className="placeholder-image" style={{ height: 400, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 4 }}>
                [Bosko Kante Photo]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 4: Introduction */}
      <section className="page dark-page">
        <header className="page-header">
          <img src="/reports/hiiiwav-2025/images/logo-white.png" alt="HiiiWAV" className="logo" />
          <div className="page-number">page 03</div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 60 }}>
          <div>
            <h2 className="section-title green-accent">Intro</h2>
            <span className="arrow green-accent">↘</span>
          </div>

          <div className="intro-content">
            <p>
              As we reflect on the past year at <strong className="green-accent">HiiiWAV</strong>, we recognize the accelerating 
              pace of change in technology, culture, and community. The landscape for artists, creators, and technologists 
              has never been more dynamic—or more urgent.
            </p>
            <p>
              2024-2025 marked a turning point. While others debated the future of AI, we built infrastructure. While others 
              worried about displacement, we created pathways to ownership. While others talked about community, we invested 
              in it—with capital, space, and unwavering commitment.
            </p>
            <p>
              HiiiWAV has always stood at the intersection of culture, technology, and economic opportunity. This year proved 
              that intersection is exactly where transformation happens.
            </p>

            <div className="intro-callout">
              This is our moment to double down, to innovate where the system falls short, and to continue building an 
              ecosystem where creativity is not just valued but sustained.
            </div>
          </div>
        </div>

        <div className="full-width-image">
          <div className="placeholder-image" style={{ height: 300 }}>
            [Community Event Photo - Full Width]
          </div>
          <div className="image-caption">Oakland Tech Week brought together innovators from across the Bay</div>
        </div>
      </section>

      {/* PAGE 5: HiiiLIGHTS */}
      <section className="page highlights">
        <header className="page-header">
          <img src="/reports/hiiiwav-2025/images/logo-white.png" alt="HiiiWAV" className="logo" />
          <div className="page-number">page 04</div>
        </header>

        <h2 className="section-title">HiiiLIGHTS</h2>

        <div className="highlights-layout">
          <div>
            <p>
              <strong className="green-accent">HiiiWAV</strong> is a visionary Black-led organization innovating at the 
              intersection of art and technology to confront the systemic exclusion and exploitation that have long 
              shaped the entertainment and media industries.
            </p>
            <p>
              In cultural hubs like Oakland—where rising costs, lack of access to capital, and now AI-driven disruption 
              threaten the survival of independent creators—we exist to dismantle these barriers and build new pathways 
              to ownership and sustainability.
            </p>

            <div className="quote-block">
              <div className="quote-mark">&ldquo;</div>
              <div className="quote-text">
                &ldquo;We do this because too many artists are forced to choose between their craft and financial stability—
                HiiiWAV exists to change that narrative.&rdquo;
              </div>
              <div className="quote-attribution">– Executive Director, Bosko Kante</div>
              <div className="quote-mark" style={{ textAlign: 'right' }}>&rdquo;</div>
            </div>
          </div>

          <div>
            <p><strong>Key milestones for 2024-2025 include:</strong></p>
            <ul>
              <li><strong>Multi-Year Funding Secured:</strong> $450,000 anonymous commitment</li>
              <li><strong>Kapor Foundation Partnership:</strong> Multi-year collaboration</li>
              <li><strong>Oakland Tech Week Launch:</strong> Inaugural ecosystem convening</li>
              <li><strong>Full Spectrum Capital Accelerator:</strong> New capital pathways</li>
              <li><strong>New Fiscal Sponsorships:</strong> Alphabet Rockers, Ryan Nicole</li>
              <li><strong>Director Launch:</strong> directorforgood.org</li>
              <li><strong>Studio Upgrades:</strong> New resident Clay Xavier, tenant Precious Stroud</li>
              <li><strong>HiiiWAV 50 Fund:</strong> Investing in Oakland creators</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PAGE 6: Major Wins */}
      <section className="page dark-page">
        <header className="page-header">
          <img src="/reports/hiiiwav-2025/images/logo-white.png" alt="HiiiWAV" className="logo" />
          <div className="page-number">page 05</div>
        </header>

        <h2 className="section-title green-accent">MAJOR<br />WINS</h2>
        <p className="subtitle">A year of strategic partnerships and community milestones</p>

        <div className="programs-layout">
          <div>
            <div className="program-section">
              <span className="tag">Funding Milestone</span>
              <h3 className="program-title">$450K Multi-Year Commitment</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>
                An anonymous donor made a transformative multi-year commitment of $450,000—the largest single gift in 
                HiiiWAV history. This investment enables long-term planning and sustained impact.
              </p>
            </div>

            <div className="program-section">
              <span className="tag">Partnership</span>
              <h3 className="program-title">Kapor Foundation Multi-Year</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>
                The Kapor Foundation deepened their commitment with a multi-year partnership, recognizing HiiiWAV as 
                essential infrastructure for Oakland&apos;s creative economy.
              </p>
            </div>

            <div className="program-section">
              <span className="tag">New Initiative</span>
              <h3 className="program-title">Good Trouble VC Partnership</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>
                Opening new pathways for HiiiWAV entrepreneurs to access venture capital and scale their innovations.
              </p>
            </div>
          </div>

          <div>
            <div className="program-section">
              <span className="tag">Investment</span>
              <h3 className="program-title">Kev Choice Investment</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>
                Continued investment in Kev Choice&apos;s groundbreaking work—culminating in Choice Scores and expanded 
                reach for artist-owned tools.
              </p>
            </div>

            <div className="program-section">
              <span className="tag">Milestone</span>
              <h3 className="program-title">E-40 Tiny Desk Concert</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>
                Supporting E-40&apos;s historic NPR Tiny Desk performance—showcasing Bay Area hip-hop excellence globally.
              </p>
            </div>

            <div className="program-section">
              <span className="tag">Launch</span>
              <h3 className="program-title">Director for Good</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>
                Launching directorforgood.org—fractional nonprofit leadership bringing HiiiWAV&apos;s operational excellence 
                to organizations that need backbone support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 7: Oakland Tech Week */}
      <section className="page orange-page">
        <header className="page-header">
          <img src="/reports/hiiiwav-2025/images/logo-black.png" alt="HiiiWAV" className="logo" />
          <div className="page-number">page 06</div>
        </header>

        <h2 className="section-title">OAKLAND<br />TECH WEEK</h2>
        <p className="event-subtitle">Building the Ecosystem Oakland Deserves</p>

        <div className="placeholder-image" style={{ height: 250, margin: '30px 0', background: 'rgba(0,0,0,0.2)' }}>
          [Oakland Tech Week Event Photo]
        </div>

        <div className="programs-layout">
          <div>
            <p style={{ fontSize: 14, lineHeight: 1.7 }}>
              <strong>Oakland Tech Week</strong> launched as HiiiWAV&apos;s flagship ecosystem convening—bringing together 
              founders, investors, artists, and technologists for collaboration, learning, and community building.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginTop: 16 }}>
              The event showcased Oakland&apos;s unique position at the intersection of culture and technology, featuring 
              panels, workshops, pitch sessions, and networking events.
            </p>
          </div>

          <div>
            <h4 className="program-title" style={{ color: '#FFFFFF' }}>Key Outcomes:</h4>
            <ul style={{ listStyle: 'none', fontSize: 14, lineHeight: 2 }}>
              <li>• Multiple ecosystem convenings throughout the year</li>
              <li>• Connections between Oakland founders and Bay Area investors</li>
              <li>• Showcased local innovation to national audiences</li>
              <li>• Platform for AFRO AI graduates to present their work</li>
              <li>• Foundation for annual Oakland Tech Week tradition</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PAGE 8: The Future */}
      <section className="page" style={{ backgroundColor: '#99FF69' }}>
        <header className="page-header">
          <img src="/reports/hiiiwav-2025/images/logo-black.png" alt="HiiiWAV" className="logo" />
          <div className="page-number">page 07</div>
        </header>

        <h2 className="section-title">THE<br />FUTURE</h2>
        <span className="arrow">↘</span>

        <div style={{ maxWidth: 700, marginTop: 40 }}>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, marginBottom: 20 }}>
            Launching Director for Good
          </h3>
          <p style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
            After years of informally supporting fellow nonprofits with operational guidance, HiiiWAV is formalizing 
            this work through <strong>Director</strong>—a fractional nonprofit leadership service available at 
            <strong> directorforgood.org</strong>.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, fontWeight: 700 }}>
            Because when one organization succeeds, the whole ecosystem rises.
          </p>
        </div>

        <div style={{ marginTop: 60, padding: 30, background: '#000000', color: '#FFFFFF' }}>
          <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, marginBottom: 20 }}>What&apos;s Next for HiiiWAV</h4>
          <ul style={{ listStyle: 'none', fontSize: 16, lineHeight: 2.2 }}>
            <li>→ HiiiWAV 50 Fund: Investing in 50 Oakland creators</li>
            <li>→ Oakland Tech Week 2025: Bigger, bolder ecosystem convening</li>
            <li>→ AFRO AI Expansion: New cohorts, new partnerships</li>
            <li>→ Studio Development: More space for more creators</li>
            <li>→ Community Wins: Kev Choice, GNXL, Prospect, Sol Development</li>
          </ul>
        </div>
      </section>

      {/* Final Page: Thank You */}
      <section className="page dark-page text-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2 className="section-title green-accent" style={{ fontSize: 'clamp(48px, 12vw, 100px)' }}>THANK<br />YOU</h2>
        
        <p style={{ fontSize: 18, maxWidth: 600, margin: '40px auto', lineHeight: 1.8 }}>
          To our donors, partners, artists, and community—you make this work possible. 
          Together, we&apos;re building an Oakland where creativity thrives and ownership is the norm.
        </p>

        <div style={{ marginTop: 40 }}>
          <img src="/reports/hiiiwav-2025/images/logo-white.png" alt="HiiiWAV" className="logo-large" style={{ filter: 'brightness(0) saturate(100%) invert(89%) sepia(25%) saturate(1015%) hue-rotate(45deg) brightness(104%) contrast(102%)' }} />
          <p style={{ marginTop: 20, opacity: 0.7 }}>www.hiiiwav.org</p>
        </div>
      </section>
    </div>
  )
}
