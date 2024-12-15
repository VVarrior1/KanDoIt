'use client'

import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
    const pathname = usePathname();
    const hideSettingsRoutes = ['/', '/signin', '/signup'];
    const showSettings = !hideSettingsRoutes.includes(pathname);

    return <div className="navbar bg-base-100">
        <div className="flex-1">
            <Link className="btn btn-ghost text-xl" href={'/home'}><span>KanDoIt</span></Link>
            <span className="text-neutral-content font-thin">A KanBan board for project management.</span>
        </div>
        <div className="flex-none">
            {showSettings && (
                <Link
                    href="/settings"
                    className="p-2 rounded-xl hover:bg-base-200 transition-all duration-200
                            flex items-center gap-2 text-gray-600 hover:text-gray-900
                            focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                    <Settings size={20} />
                    <span className="hidden sm:inline">Settings</span>
                </Link>
            )}
            <Link
                href="/"
                className="p-2 rounded-xl hover:bg-base-200 transition-all duration-200
                            flex items-center gap-2 text-gray-600 hover:text-gray-900
                            focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
            </Link>
        </div>
    </div>
}