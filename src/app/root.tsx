import "./global.css";
import LandingSection from "./ui";
import React from "react";
import { ShinyText } from "./ui/Shiny";

export default function Root() {
    return (
        <main className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-black">
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px]" />
            <div className="absolute top-40 -right-40 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[100px]" />

            <LandingSection />

            <p className="text-purple-100 absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 opacity-30 hover:opacity-100 cursor-pointer">
                Made with{" "}
                <a href="https://ft_react.emanuelscura.me" target="_blank" className="hover:font-bold duration-200">
                    <ShinyText gradient="from-indigo-500 to-blue-500" text="ft_react" />
                </a>
                {" "}by{" "}
                <a href="https://emanuelscura.me" target="_blank" className="hover:font-bold duration-200">
                    <ShinyText gradient="from-blue-500 to-indigo-500" text="Emanuel" />
                </a>
            </p>
        </main>
    );
}
