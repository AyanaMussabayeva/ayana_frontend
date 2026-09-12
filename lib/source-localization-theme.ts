// Presentation UI colors are separate from the colors used by scientific charts.
export const sourceLocalizationTheme = `
@media screen {
  :root {
    color-scheme: light;
    --ink: #0f172a;
    --muted: #526175;
    --paper: #fbfcff;
    --line: #dce3ef;
    --ui-blue: #365dc5;
    --ui-blue-soft: #eef2ff;
    --ui-cyan: #0b7285;
    --ui-cyan-soft: #e9f8fa;
    --ui-pink: #b52b7b;
    --ui-pink-soft: #fdf0f7;
    --ui-yellow-soft: #fffde9;
    --ui-brand-gradient: linear-gradient(90deg, #00b5c9, #f6ed3c 52%, #ec51ab);
  }

  ::selection { background: #dce7ff; color: var(--ink); }
  .site-header, .chapter-nav {
    background: rgba(251, 252, 255, .95);
    border-color: var(--line);
  }
  .site-header { box-shadow: 0 3px 18px rgba(15, 23, 42, .025); }
  .wordmark { color: var(--ink); }
  .wordmark span { color: var(--muted); }
  .reading-progress { background: #e9edf6; }
  .reading-progress span { background: var(--ui-brand-gradient); }

  .cover {
    background:
      radial-gradient(ellipse at 90% 75%, rgba(0, 181, 201, .11), transparent 55%),
      radial-gradient(ellipse at 88% 8%, rgba(236, 81, 171, .07), transparent 40%),
      radial-gradient(ellipse at 20% 100%, rgba(246, 237, 60, .07), transparent 40%),
      linear-gradient(135deg, #fff 12%, #f7f9ff);
  }
  .cover h1 em { color: var(--ui-blue); }
  .eyebrow, .chapter-number, .step-index { color: var(--ui-cyan); }
  .cover .chapter-number { color: var(--muted); }
  .conclusion {
    background:
      radial-gradient(ellipse at 90% 80%, rgba(236, 81, 171, .06), transparent 55%),
      linear-gradient(135deg, #f2fbfd, #fbfcff 65%);
  }
  .closing-statement { color: var(--ui-blue); }

  .primary-button {
    background: var(--ui-blue);
    border-color: var(--ui-blue);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(54, 93, 197, .12);
  }
  .primary-button:hover { background: #294ba6; border-color: #294ba6; }
  .mode-button, .research-back-link {
    border-color: #ccd7ee;
    border-radius: 8px;
    background: #fff;
    color: var(--ui-blue);
  }
  .research-back-link:hover { background: var(--ui-blue-soft); border-color: var(--ui-blue); }
  .mode-button:hover, .mode-button[aria-pressed=true] {
    background: var(--ui-blue);
    border-color: var(--ui-blue);
    color: #fff;
  }
  .language-switch, .text-button:hover, .chapter-nav button:hover { color: var(--ui-blue); }
  .icon-button:hover { color: var(--ui-blue); }
  .term { color: var(--ui-cyan); }
  .term:hover { background: var(--ui-cyan-soft); }
  summary:hover, summary::after { color: var(--ui-blue); }
  button:focus-visible, a:focus-visible, summary:focus-visible,
  select:focus-visible, input:focus-visible, [tabindex]:focus-visible {
    outline-color: var(--ui-blue);
  }

  .method-steps article { border-top-color: var(--ui-blue); }
  .reader-guide { border-color: var(--line); color: var(--muted); }
  .learning-lab {
    background: #f0f6fc;
    border-left-color: var(--ui-blue);
    border-radius: 0 8px 8px 0;
  }
  .lab-comparison { border-color: #d2ddef; }
  .scope-map > article { background: #fff; border-color: var(--line); border-radius: 8px; }
  .scope-note { background: #fff8ee; border-radius: 0 8px 8px 0; }
  dialog {
    background: #fff;
    border-color: var(--line);
    border-radius: 12px;
    box-shadow: 0 24px 100px rgba(15, 23, 42, .18);
  }
  dialog::backdrop { background: rgba(15, 23, 42, .35); }
  .dialog-top > span { color: var(--ui-cyan); }
  #contents-list a:hover, #contents-list a[aria-current=true] {
    background: var(--ui-blue-soft);
    color: var(--ui-blue);
  }
}
`
