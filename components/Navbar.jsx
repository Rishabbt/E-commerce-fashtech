'use client'
import { PackageIcon, Search, ShoppingCart, HomeIcon, ShieldCheckIcon, StoreIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUser, useClerk, UserButton, useAuth } from "@clerk/nextjs"
import axios from "axios";

const Navbar = () => {

    const { user } = useUser()
    const { openSignIn } = useClerk()
    const { getToken } = useAuth()
    const router = useRouter();

    const [search, setSearch] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const cartCount = useSelector(state => state.cart.total)

    useEffect(() => {
        const checkRoles = async () => {
            if (!user) return
            try {
                const token = await getToken()
                const [adminRes, sellerRes] = await Promise.all([
                    axios.get('/api/admin/is-admin', { headers: { Authorization: `Bearer ${token}` } }).catch(() => null),
                    axios.get('/api/store/is-seller', { headers: { Authorization: `Bearer ${token}` } }).catch(() => null),
                ])
                setIsAdmin(adminRes?.data?.isAdmin ?? false)
                setIsSeller(sellerRes?.data?.isSeller ?? false)
            } catch {
                setIsAdmin(false)
                setIsSeller(false)
            }
        }
        checkRoles()
    }, [user])

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/85 backdrop-blur-md sm:relative sm:bg-slate-950 sm:backdrop-blur-none">

            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">

                    <Link href="/" className="relative text-4xl font-semibold text-white">
                        <span className="text-green-600">Fash</span>Tech
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-200 text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
                            <Search size={18} className="text-slate-600" />
                            <input className="w-full bg-transparent outline-none placeholder-slate-600" type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} required />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                            <ShoppingCart size={18} />
                            Cart
                            <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">{cartCount}</button>
                        </Link>

                        {!user ? (
                            <button onClick={openSignIn} className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                                Login
                            </button>
                        ) : (
                            <UserButton>
                                <UserButton.MenuItems>
                                    <UserButton.Action labelIcon={<PackageIcon size={16} />} label="My Orders" onClick={() => router.push('/orders')} />
                                </UserButton.MenuItems>
                                {isSeller && (
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<StoreIcon size={16} />} label="My Shop" onClick={() => router.push('/store')} />
                                    </UserButton.MenuItems>
                                )}
                                {isAdmin && (
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<ShieldCheckIcon size={16} />} label="Admin Panel" onClick={() => router.push('/admin')} />
                                    </UserButton.MenuItems>
                                )}
                            </UserButton>
                        )}

                    </div>

                    {/* Mobile User Button */}
                    <div className="sm:hidden">
                        {user ? (
                            <UserButton>
                                <UserButton.MenuItems>
                                    <UserButton.Action labelIcon={<HomeIcon size={16} />} label="Home" onClick={() => router.push('/')} />
                                </UserButton.MenuItems>
                                <UserButton.MenuItems>
                                    <UserButton.Action labelIcon={<ShoppingCart size={16} />} label="Cart" onClick={() => router.push('/cart')} />
                                </UserButton.MenuItems>
                                <UserButton.MenuItems>
                                    <UserButton.Action labelIcon={<PackageIcon size={16} />} label="My Orders" onClick={() => router.push('/orders')} />
                                </UserButton.MenuItems>
                                {isSeller && (
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<StoreIcon size={16} />} label="My Shop" onClick={() => router.push('/store')} />
                                    </UserButton.MenuItems>
                                )}
                                {isAdmin && (
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<ShieldCheckIcon size={16} />} label="Admin Panel" onClick={() => router.push('/admin')} />
                                    </UserButton.MenuItems>
                                )}
                            </UserButton>
                        ) : (
                            <button onClick={openSignIn} className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full">
                                Login
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <form onSubmit={handleSearch} className="sm:hidden flex items-center gap-2 bg-white px-4 py-2.5 rounded-full mb-3">
                    <Search size={16} className="text-black shrink-0" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent outline-none text-sm text-black placeholder-black"
                        required
                    />
                </form>

            </div>
            <hr className="border-gray-300" />
        </nav>
    )
}

export default Navbar