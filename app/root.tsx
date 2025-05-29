import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap",
  },
];

export const meta: MetaFunction = () => {
  return [{ title: "CyberNex 2025 – ICT Day" }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          src="https://kit.fontawesome.com/f966c5c9b1.js"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="bg-gray-100 dark:bg-[#0D0D14] text-gray-900 dark:text-gray-100">
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// ✅ CatchBoundary (404, 403, etc.)
export function CatchBoundary() {
  const caught = useRouteError();

  let status = 500;
  let statusText = "Unknown Error";

  if (isRouteErrorResponse(caught)) {
    status = caught.status;
    statusText = caught.statusText;
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-[#0d0d14] text-white text-center px-6">
        <div>
          <h1 className="text-6xl font-bold mb-4">{status}</h1>
          <p className="text-lg mb-6">
            {status === 404 ? "Oops! Page not found." : statusText}
          </p>
          <a
            href="/"
            className="px-6 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </Layout>
  );
}

// ✅ ErrorBoundary (unexpected exceptions)
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-red-900 text-white text-center px-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Something went wrong</h1>
          <p className="mb-4">{error.message}</p>
          <a href="/" className="underline">
            Back to Home
          </a>
        </div>
      </div>
    </Layout>
  );
}
