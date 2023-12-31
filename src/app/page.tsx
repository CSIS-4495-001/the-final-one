"use client";
import Image from "next/image";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "./context/AuthContext";

export default function Home() {
  const { user, isAdmin } = UserAuth();
  const router = useRouter();

  let handleClick = () => {
    const analytics = getAnalytics();
    let a = logEvent(analytics, "goal_completion", { name: "lever_puzzle" });
  };

  return (
    <main className="bg-gray-700" style={{ height: "728px" }}>
      <div className="container mx-auto">
        <header className="py-8 text-center">
          <h1 className="text-4xl font-semibold text-white mb-4">
            Welcome to Your Barter Platform
          </h1>
          <p className="text-lg text-gray-400">
            Trade, Exchange, and Connect with Others
          </p>
        </header>

        {user ? (
          <div className="text-center my-6">
            <p className="text-xl text-gray-400">Hello, {user.displayName}!</p>
            {isAdmin ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4"
                onClick={() => router.push("/admin")}
              >
                Go to Admin Dashboard
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4"
                onClick={() => router.push("/explore")}
              >
                Go to Dashboard
              </button>
            )}
          </div>
        ) : (
          <div>
            <div className="text-center my-6">
              <p className="text-xl text-white">Join the Barter Community</p>
            </div>

            <section className="my-10">
              <h2 className="text-2xl font-semibold text-gray-400 mb-9">
                How It Works
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Image
                    src="/img/1.png"
                    alt="Icon 1"
                    width={100}
                    height={100}
                    style={{ display: "inline" }}
                  />
                  <h3 className="text-lg font-semibold text-gray-200 my-2">
                    Browse Listings
                  </h3>
                  <p className="text-gray-400">
                    Discover items and services available for trade.
                  </p>
                </div>
                <div className="text-center">
                  <Image
                    src="/img/2.png"
                    alt="Icon 1"
                    width={100}
                    height={100}
                    style={{ display: "inline" }}
                  />
                  <h3 className="text-lg font-semibold text-gray-200 my-2">
                    Negotiate Trades
                  </h3>
                  <p className="text-gray-400">
                    Connect with other users and discuss trade options.
                  </p>
                </div>
                <div className="text-center">
                  <Image
                    src="/img/3.png"
                    alt="Icon 1"
                    width={100}
                    height={100}
                    style={{ display: "inline" }}
                  />
                  <h3 className="text-lg font-semibold text-gray-200 my-2">
                    Complete the Trade
                  </h3>
                  <p className="text-gray-400">
                    Finalize your trade and exchange items or services.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
