import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col  justify-around items-center">
      <div className="h-[50%] bg-gray-100 flex flex-col  justify-around items-center p-16">
        <Link href="/components/Photos" passHref>
          <button className="shadow-2xl bg-gray-300   w-full p-2 m-2">
            Photos
          </button>
        </Link>
        <Link href="/components/Blogs" passHref>
          <button className="shadow-2xl bg-gray-300  w-full  p-2 m-2">
            Blogs
          </button>
        </Link>
        <Link href="/components/Arts" passHref>
          <button className="shadow-2xl bg-gray-300  w-full  p-2 m-2">
            Arts
          </button>
        </Link>
        <Link href="/components/Sculptures" passHref>
          <button className="shadow-2xl bg-gray-300 w-full  p-2 m-2">
            Sculptures
          </button>
        </Link>
        <Link href="/components/Travels" passHref>
          <button className="shadow-2xl bg-gray-300 w-full  p-2 m-2">
            Travels
          </button>
        </Link>
        <Link href="/components/Developers" passHref>
          <button className="shadow-2xl bg-gray-300 w-full p-2 m-2">
            Developers
          </button>
        </Link>
      </div>
    </div>
  );
}
