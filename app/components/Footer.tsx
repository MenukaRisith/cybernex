export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        &copy; {year} CineSphere by Menuka Risith. All rights reserved.
      </div>
    </footer>
  );
}
