"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const { data: session } = useSession();  // Get the session object
    //const isUserLoggedIn = session ? true : false;  // Check if the user is logged in
    
    console.log(session?.user.id);  // Log the user id to the console (undefined!!!)
    const [ providers, setProviders ] = useState(null);
    const [ toggleDropdown, setToggleDropdown ] = useState(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        fetchProviders();
    }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image src="/assets/images/logo.svg"
                alt="Art of AI Prompts"
                width={40}
                height={40}
                className="object-contain rounded-full hover:bg-slate-50"
            />
            <p className="logo_text">Art of AI Prompts</p>
        </Link>
        {/* Desktop nav */}
        <div className="sm:flex hidden">
            {session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className="black_btn">
                        Create Prompt
                    </Link>
                    <Link href="/profile" className="black_btn"> 
                        <Image src={session.user.image || "/assets/images/logo.svg"}
                            alt="Profile"
                            width={30}
                            height={30}
                            className="rounded-full"
                        />
                    </Link>
                    <button type="button" onClick={() => signOut()} className="outline_btn">
                        Sign Out
                    </button>
                </div>
            ) : (
                <>
                    {providers && Object.values(providers).map((providers) => (

                        <button type="button" key={providers.name} onClick={() => signIn(providers.id)} className="outline_btn">
                        Sign In
                        </button>
                    ))}
                </>
            )}

        </div>
        {/* Mobile Nav */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                    <Image
                        src={session.user.image || "/assets/images/logo.svg"}
                        alt="Profile"
                        width={30}
                        height={30}
                        className="rounded-full hover:bg-slate-50"
                        onClick={() => setToggleDropdown((prev) => !prev)}
                    />
                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                My Profile
                            </Link>
                            <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                Create Prompt
                            </Link>
                            <button type="button" onClick={() => {setToggleDropdown(false); signOut();}} className=" outline_btn">
                                Sign Out
                            </button>
                        </div>
                    )}
                    
                </div>
            ) : ( 
                <>
                    {providers && Object.values(providers).map((providers) => (
                        <button type="button" key={providers.name} onClick={() => signIn(providers.id)} className="outline_btn">
                        Sign In
                        </button>
                    ))}
                </>
            )}
        </div>


    </nav>
  )
}

export default Nav