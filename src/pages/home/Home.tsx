import { Link, useNavigate } from 'react-router-dom';

import { IdentityCard } from '../../components/IdentityCard';
import { BIO, PRINCIPLES } from '../../data/about';
import { ENTRY_CARDS, HERO, STAT_LEDGER } from '../../data/home';
import { Ticker } from './Ticker';
import ui from '../../styles/ui.module.css';
import styles from './Home.module.css';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="pg">
      <div className="container">
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.hero}>
          <div>
            <div className={styles.heroEyebrow}>
              <span className={styles.heroRule} aria-hidden="true" />
              {HERO.eyebrow}
              <span className="eyebrow-muted">{HERO.eyebrowMuted}</span>
            </div>

            <h1 className={styles.h1}>
              {HERO.headingLead}
              <span className={styles.h1Accent}>{HERO.headingAccent}</span>
              <span className={styles.caret} aria-hidden="true" />
            </h1>

            <p className={styles.lead}>
              {HERO.lead}
              <strong className={styles.leadStrong}>{HERO.leadStrong}</strong>
            </p>

            <p className={styles.quote}>
              {BIO.pullQuoteLead}
              <span className={styles.quoteTail}>{BIO.pullQuoteTail}</span>
            </p>

            <div className={styles.heroButtons}>
              <button
                type="button"
                className={`${ui.btn} ${ui.primary} ${ui.glow} ${ui.xl}`}
                onClick={() => navigate('/work')}
              >
                {HERO.primaryCta}
              </button>
              <button
                type="button"
                className={`${ui.btn} ${ui.ghost} ${ui.xl}`}
                onClick={() => navigate('/contact')}
              >
                {HERO.secondaryCta}
              </button>
            </div>

            <dl className={styles.ledger}>
              {STAT_LEDGER.map((stat) => (
                <div key={stat.label} className={styles.ledgerCell}>
                  <dt className={styles.ledgerLabel}>{stat.label}</dt>
                  <dd className={styles.ledgerValue}>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.heroCard}>
            <IdentityCard />
          </div>
        </div>

        <section className={styles.creed}>
          <div className={styles.creedHead}>
            <h2 className={styles.creedTitle}>
              {BIO.headingLine1}
              <br />
              {BIO.headingLine2}
            </h2>
            <p className={styles.creedBody}>{BIO.body}</p>
          </div>

          <div className={styles.principles}>
            {PRINCIPLES.map((principle) => (
              <div key={principle.num} className={styles.principle}>
                <div className={styles.principleNum}>{principle.num}</div>
                <div className={styles.principleTitle}>{principle.title}</div>
                <p className={styles.principleBody}>{principle.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Ticker />

      <div className={`container ${styles.cards}`}>
        {ENTRY_CARDS.map((card) => (
          <Link key={card.num} to={card.to} className={styles.card}>
            <div className={styles.cardNum}>{card.num}</div>
            <div className={styles.cardTitle}>{card.title}</div>
            <p className={styles.cardBody}>{card.body}</p>
            <div className={styles.cardCta}>{card.cta} →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
