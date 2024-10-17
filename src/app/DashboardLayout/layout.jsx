import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex mt-20">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-screen p-5 fixed   left-0">
        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/DashboardLayout/dashboardhome">
              <span className="block p-2 hover:bg-gray-700 rounded">
                Dashboard Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/DashboardLayout/dashboardSetting">
              <span className="block p-2 hover:bg-gray-700 rounded">
                Settings
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <main className="flex-1 ml-64 p-5  bg-gray-100 min-h-screen">
        {children}
      </main>
    </div>
  );
}
