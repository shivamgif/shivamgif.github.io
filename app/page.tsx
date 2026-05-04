import { defaultLocale } from "@/lib/i18n";

export default function RootIndex() {
  const target = `/${defaultLocale}/`;
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(target)});`,
        }}
      />
      <noscript>
        <a href={target} className="underline">
          Continue →
        </a>
      </noscript>
    </main>
  );
}
