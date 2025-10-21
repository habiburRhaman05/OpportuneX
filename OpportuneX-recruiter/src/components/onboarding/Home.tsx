"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, UserPlus, Sparkles, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * RecruiterStartedPage
 * Props:
 * - recruiterCount: number | string (shows how many recruiters joined)
 * - onSignIn: () => void
 * - onCreateAccount: () => void
 * - onGuide: () => void
 *
 * Tailwind + shadcn/ui based single-file React component.
 * Dark mode uses `zinc-950` as background (`dark:bg-zinc-950`).
 *
 * Example usage:
 * <RecruiterStartedPage
 *   recruiterCount={1324}
 *   onSignIn={() => router.push('/signin')}
 *   onCreateAccount={() => router.push('/signup')}
 *   onGuide={() => router.push('/getting-started')}
 * />
 */

export default function RecruiterStartedPage({
  recruiterCount = "—",
  onSignIn = () => {},
  onCreateAccount = () => {},
  onGuide = () => {},
}) {
  const benefits = [
    {
      icon: <UserPlus className="w-5 h-5" />,
      title: "Quality Candidates",
      desc: "Access verified talent profiles tailored to your hiring needs.",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Smart Matching",
      desc: "AI-powered matching surfaces top-fit candidates faster.",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Streamlined Workflow",
      desc: "Post, screen, and message — all from one modern dashboard.",
    },
  ];

  const steps = [
    "Create company profile",
    "Post your first job",
    "Shortlist & interview",
    "Hire — onboard seamlessly",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 transition-colors">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Hero */}
        <section className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-zinc-900 dark:text-white">
            Hire faster. Hire smarter.
          </h1>

          <p className="text-zinc-600 dark:text-zinc-300 max-w-lg">
            Join a community of recruiters building high-performing teams. Post
            jobs, discover curated candidates and manage the entire hiring
            pipeline in one place.
          </p>

          <div className="flex items-center gap-4">
            <Link to={"/recruiter/onboarding/register"}>
              <Button
                onClick={onCreateAccount}
                className="px-6 py-3"
                aria-label="Create account"
              >
                Create account
              </Button>
            </Link>
            <Link to={"/recruiter/login"}>
              <Button
                variant="ghost"
                onClick={onSignIn}
                className="px-6 py-3"
                aria-label="Sign in"
              >
                Sign in
              </Button>
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Card className="shadow-lg rounded-2xl">
              <CardContent className="flex items-center gap-4 py-4 px-5">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <CheckCircle className="w-6 h-6 text-zinc-700 dark:text-zinc-100" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-300">
                    Recruiters on platform
                  </div>
                  <div className="text-xl font-semibold text-zinc-900 dark:text-white">
                    {5000}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              <span className="font-medium">Trusted by teams worldwide.</span>{" "}
              Flexible plans — cancel any time.
            </div>
          </div>
        </section>

        {/* Right: Benefits + Steps */}
        <aside className="space-y-6">
          <div className="grid gap-4">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 shadow-sm"
                role="article"
                aria-labelledby={`benefit-${i}`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-50 dark:bg-zinc-800 grid place-items-center">
                  {b.icon}
                </div>
                <div>
                  <h3
                    id={`benefit-${i}`}
                    className="text-sm font-semibold text-zinc-900 dark:text-white"
                  >
                    {b.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Quick setup — 4 steps
            </h4>
            <ol className="mt-3 space-y-3">
              {steps.map((s, idx) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex w-6 h-6 items-center justify-center rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                      {idx + 1}
                    </span>
                  </span>
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    {s}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex gap-3">
              <Button
                onClick={onCreateAccount}
                aria-label="Create account small"
              >
                Start hiring
              </Button>
              <Button
                variant="ghost"
                onClick={onGuide}
                aria-label="View setup guide"
              >
                View full guide
              </Button>
            </div>
          </div>

          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            By creating an account you agree to our Terms and Privacy Policy.
          </div>
        </aside>
      </div>
    </div>
  );
}
