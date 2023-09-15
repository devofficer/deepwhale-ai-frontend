import Description from "@/components/Description";
import Savings from "@/components/Savings";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Deep Whale</title>
      </Head>
      <main
        className={`
        flex 
        flex-col
        md:flex-row
        space-x-0 md:space-x-6 lg:space-x-16 
        space-y-16 md:space-y-0
        dark:bg-ilght 
        dark:bg-main
        bg-light
        max-w-7xl 
        mx-auto 
        px-4 sm:px-6 lg:px-8
        py-4 md:py-16
        ${inter.className}
      `}
      >
        <Description />
        <Savings />
      </main>
    </div>
  );
}
