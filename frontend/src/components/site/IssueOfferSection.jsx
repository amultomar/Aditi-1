import { Check } from "lucide-react";

import SectionReveal from "@/components/site/SectionReveal";
import { AddToCartButton } from "@/components/site/shared";
import {
  AUTHOR_ISSUES,
  MAGAZINE_ISSUES,
  magazineForIssue,
} from "@/data/siteContent";

function contributorCount(ordinal) {
  return (
    AUTHOR_ISSUES.find((issue) => issue.ordinal === ordinal)?.authors.length ?? 0
  );
}

function offerPoints(ordinal) {
  return [
    `All ${contributorCount(ordinal)} contributions - the full issue, instantly`,
    "Yours to keep - read it for years",
    "One payment - buy only the issue you want",
    "Read on mobile & desktop",
    ordinal === "I"
      ? "Read ADITI from its very first edition"
      : "The latest edition, straight to your account",
  ];
}

const OFFER_CARDS = MAGAZINE_ISSUES.map((issue) => ({
  ...issue,
  magazine: magazineForIssue(issue.ordinal),
  points: offerPoints(issue.ordinal),
})).filter((card) => card.magazine);

export default function IssueOfferSection() {
  if (!OFFER_CARDS.length) {
    return null;
  }

  return (
    <section className="issue-offer-section border-t border-steel px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          {/* =========================
              SECTION HEADING
          ========================== */}
          <div className="issue-offer-heading text-center">
            <p className="font-plex text-xs font-medium uppercase tracking-[0.28em] text-ember">
              The Offer
            </p>

            <h2 className="issue-offer-title mt-3 font-rajdhani font-bold text-chalk">
              Be the one in the room
              <span className="issue-offer-title__accent">
                who actually <span>understands.</span>
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-3xl font-lora text-sm leading-[1.8] text-ash md:text-base">
              One purchase, yours forever. Every issue you buy lives in your
              ADITI account &mdash; read anytime, on any device.
            </p>
          </div>

          {/* =========================
              SIDE-BY-SIDE ISSUE CARDS
          ========================== */}
          <div
            className="
              issue-offer-grid
              mt-10
              grid
              grid-cols-1
              gap-6
              md:mt-14
              lg:grid-cols-2
              lg:gap-8
            "
            aria-label="ADITI magazine issue offers"
          >
            {OFFER_CARDS.map((card) => (
              <article
                className="
                  issue-offer-card
                  relative
                  flex
                  flex-col
                  !overflow-visible
                "
                key={card.slug}
              >
                {/* =========================
                    ISSUE BADGE
                ========================== */}
                <div
                  className="
                    issue-offer-badge
                    relative
                    z-10
                    mx-auto
                    mb-4
                    whitespace-nowrap
                  "
                >
                  Volume I {"·"} {card.label}
                </div>

                {/* =========================
                    MAGAZINE COVER
                ========================== */}
                <div
                  className="
                    issue-offer-cover-wrap
                    flex
                    justify-center
                    px-4
                    pt-1
                    pb-3
                  "
                >
                  <div className="issue-offer-cover-frame">
                    <img
                      src={card.cover}
                      alt={`${card.label} magazine cover`}
                      className="
                        issue-offer-cover
                        block
                        h-auto
                        w-[105px]
                        max-w-[105px]
                        object-contain
                        sm:w-[115px]
                        sm:max-w-[115px]
                        md:w-[125px]
                        md:max-w-[125px]
                      "
                    />
                  </div>
                </div>

                {/* =========================
                    PRICE
                ========================== */}
                <div className="issue-offer-price">
                  <span>₹</span>

                  <strong>
                    {card.magazine.priceLabel.replace("₹", "")}
                  </strong>
                </div>

                {/* =========================
                    TITLE
                ========================== */}
                <h3>The complete issue</h3>

                {/* =========================
                    SUBTITLE
                ========================== */}
                <p className="issue-offer-subtitle">
                  {card.label} &mdash; {card.shortTitle}.
                </p>

                {/* =========================
                    FEATURES
                ========================== */}
                <ul className="issue-offer-list">
                  {card.points.map((point) => (
                    <li key={point}>
                      <Check className="size-4 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* =========================
                    CTA
                ========================== */}
                <AddToCartButton
                  article={card.magazine}
                  stopPropagation={false}
                  className="
                    final-button
                    issue-offer-button
                    mt-auto
                    h-12
                    w-full
                    rounded-none
                    font-rajdhani
                    text-base
                    font-bold
                  "
                >
                  Own {card.label} {"·"} {card.magazine.priceLabel}
                </AddToCartButton>

                {/* =========================
                    FOOTNOTE
                ========================== */}
                <p className="issue-offer-footnote">
                  Secure checkout {"·"} Instant accessa
                </p>
              </article>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}