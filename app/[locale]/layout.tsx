import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { MainLayout } from "@/components/layout";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { GenresProvider } from "@/lib/contexts/GenresContext";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <AuthProvider>
        <GenresProvider>
          <MainLayout>{children}</MainLayout>
        </GenresProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}

