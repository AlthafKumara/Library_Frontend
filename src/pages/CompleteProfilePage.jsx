import { useState } from "react";
import MobileHeader from "../components/layout/MobileHeader";
import UserSidebar from "../components/layout/UserSidebar";

export default function CompleteProfilePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="min-h-dvh bg-neutral-50 flex flex-col">
            <UserSidebar isMobileOpen={sidebarOpen} setIsMobileOpen={setSidebarOpen} />
            <MobileHeader onClick={() => setSidebarOpen(true)} />
        </div>
    )
}