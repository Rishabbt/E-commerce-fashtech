import AdminLayout from "@/components/admin/AdminLayout";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
export const metadata = {
    title: "FeshTech. - Admin",
    description: "FeshTech. - Admin",
};


export default function RootAdminLayout({ children }) {

    return (
        <>  <SignedIn>

            <AdminLayout>
                {children}
            </AdminLayout>
           </SignedIn>
           <SignedIn>
            <SignedOut>
                <div className="min-h-screen flex items-center justify-center">
                    <SignIn fallbackRedirectUrl="/admin" routing="hash"/>
                </div>
            </SignedOut>
           </SignedIn>
        </>
    );
}
