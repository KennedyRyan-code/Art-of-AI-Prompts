"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const isUserLoggedIn = true; // Change this to false to see the login button
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image src="/assets/images/logo.svg"
                alt="Art of AI Prompts"
                width={40}
                height={40}
                className="object-contain"
            />
            <p className="logo_text">Art of AI Prompts</p>
        </Link>
        {/* Desktop nav */}
        <div className="sm:flex hidden">
            {isUserLoggedIn ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className="black_btn">
                        Create Prompt
                    </Link>
                    <Link href="/profile" className="black_btn">
                        <Image src="/assets/images/logo.svg"
                            alt="Profile"
                            width={20}
                            height={20}
                            className="rounded-full"
                        />
                    </Link>
                    <button type="button" onClick={() => signOut()} className="outline_btn">
                        Sign Out
                    </button>
                </div>
            ) : (
                <>
                    <Link href="/api/auth/signin" className="black_btn">
                        Sign In
                    </Link>
                </>
            )}

        </div>

    </nav>
  )
}

export default Nav