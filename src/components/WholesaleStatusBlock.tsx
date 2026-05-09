/**
 * Server component shown on /portal for users with tier=WHOLESALE.
 * No DB fields required — status is hardcoded as "Provisioning" until a future
 * GHL provisioning system writes back. The /portal page is responsible for
 * deciding whether to render this (i.e. only if user.tier === "WHOLESALE").
 */

interface WholesaleStatusBlockProps {
  /** Optional override — defaults to "Provisioning · credentials within 24h". */
  status?: string;
  /** Optional account-name shown in the header. */
  accountName?: string;
}

const ONBOARDING_STEPS: { title: string; body: string }[] = [
  {
    title: "Watch for the credentials email",
    body:
      "Within 24 business hours you'll receive your sub-account login plus the wholesale-rate phone setup walkthrough at the email on file.",
  },
  {
    title: "Set up your dialer phone number",
    body:
      "Inside GHL, head to Settings → Phone Numbers and pick a US/CA local number. Wholesale per-minute rates apply automatically.",
  },
  {
    title: "Import the Empire Vault snapshot",
    body:
      "We'll push the Cold Calling 2.0 pipeline, the 30-day email engine, and the founder counter automation into your account on day 1.",
  },
  {
    title: "Book your kickoff (optional but recommended)",
    body:
      "Reply to the credentials email to grab a 30-min kickoff with Ben — get your first list built and your first 5 dials made on the call.",
  },
];

export default function WholesaleStatusBlock({
  status = "Provisioning · credentials within 24h",
  accountName = "Your Wholesale GHL account",
}: WholesaleStatusBlockProps) {
  return (
    <section
      aria-labelledby="wholesale-status-heading"
      className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50/40 p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700">
            Wholesale GHL
          </p>
          <h2
            id="wholesale-status-heading"
            className="mt-1 font-[Anton,Impact,sans-serif] text-2xl uppercase leading-tight tracking-wide text-slate-900 sm:text-3xl"
          >
            {accountName}
          </h2>
        </div>
        <span className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-semibold text-amber-900 sm:mt-1">
          <span
            aria-hidden
            className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-500"
          />
          {status}
        </span>
      </div>

      <ol className="mt-6 space-y-3 font-mono text-sm text-slate-800">
        {ONBOARDING_STEPS.map((step, i) => (
          <li
            key={step.title}
            className="flex gap-3 rounded-lg border border-slate-200 bg-white/70 p-3"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-amber-300">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-slate-900">{step.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
        <span>Need help?</span>
        <a
          href="mailto:ben@advancedmarketing.co"
          className="font-semibold text-slate-900 underline-offset-2 hover:underline"
        >
          ben@advancedmarketing.co
        </a>
        <span className="text-slate-400">·</span>
        <span className="text-xs text-slate-500">
          Reply with &ldquo;wholesale&rdquo; in the subject for fastest routing.
        </span>
      </div>
    </section>
  );
}
