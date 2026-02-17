"use client";

import { useState, FormEvent } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

// SHA-256 hash of the password — change the hash to update the password
// To generate: echo -n "yourpassword" | shasum -a 256
const PASSWORD_HASH = "095d315eec48a0e89022fd07a6d561f694d9cfd18903ce72ca8908d52ecdb2fb";

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// --- Reusable card component (mirrors ExperienceCard) ---
function Card({
  header,
  title,
  description,
  bulletPoints = [],
  tags = [],
  children
}: {
  header: { left: string; leftSuffix?: string; right?: string };
  title: string;
  description?: string;
  bulletPoints?: string[];
  tags?: string[];
  children?: React.ReactNode;
}) {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col justify-between gap-2 font-mono text-lg md:flex-row md:items-center">
        <div className="flex flex-row items-center gap-2">
          <h2 className="truncate">{header.left}</h2>
          {header.leftSuffix && <span className="text-gray-600 dark:text-gray-400">{header.leftSuffix}</span>}
        </div>
        {header.right && <div className="tracking-tighter italic">{header.right}</div>}
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>
      {description && <p className="text-pretty whitespace-pre-wrap">{description}</p>}
      {bulletPoints.length > 0 && (
        <ul className="list-inside list-disc">
          {bulletPoints.map(point => (
            <li key={point} className="text-pretty">
              {point}
            </li>
          ))}
        </ul>
      )}
      {children}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 lg:gap-4">
          {tags.map(tag => (
            <span key={tag} className="rounded-md bg-linear-to-r from-pink-400 to-red-400 px-2 py-1 text-white">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Divider() {
  return <div className="my-12 h-px w-full bg-pink-300 md:my-16 lg:my-20 dark:bg-pink-800" />;
}

// --- Password gate ---
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setChecking(true);
    const hash = await sha256(password);
    if (hash === PASSWORD_HASH) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
    setChecking(false);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6">
      <HeartIcon className="size-16 animate-pulse text-red-500" />
      <h1 className="text-3xl font-bold">This page is secret!</h1>
      <p className="text-gray-600 dark:text-gray-400">Enter the password to continue</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className={`rounded-lg border-2 px-4 py-2 text-center transition-colors outline-none ${error ? "border-red-500 bg-red-50 dark:bg-red-950" : "border-pink-300 focus:border-pink-500 dark:border-pink-700 dark:bg-neutral-900 dark:focus:border-pink-400"}`}
          autoFocus
        />
        <button
          type="submit"
          disabled={checking}
          className="rounded-lg bg-linear-to-r from-pink-500 to-red-500 px-6 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {checking ? "..." : "Unlock"}
        </button>
        {error && <p className="text-sm text-red-500">Nice try, there&apos;s only one girl for me</p>}
      </form>
    </div>
  );
}

// --- Boyfriend Resume Content ---
function BoyfriendResume() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <HeartIcon className="size-8 text-red-500" />
        <h1 className="text-4xl font-bold">Boyfriend Resume</h1>
        <HeartIcon className="size-8 text-red-500" />
      </div>

      {/* --- Relationship Experience --- */}
      <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400">Relationship Experience</h2>
      <div className="space-y-12">
        <Card
          header={{
            left: "Your Heart",
            leftSuffix: "| Full-time",
            right: "Forever - Present"
          }}
          title="Boyfriend Candidate"
          description="Ready to make every day special, turning ordinary moments into extraordinary memories."
          bulletPoints={[
            "Will provide unlimited hugs, cuddles, and emotional support with 99.99% uptime",
            "Will proactively surprise you with preserved roses — because you deserve flowers that last",
            "Expert at listening, understanding, and always being there when it matters most"
          ]}
          tags={["Love", "Patience", "Dedication", "Affection"]}
        />
      </div>

      <Divider />

      {/* --- Core Skills --- */}
      <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400">Core Skills</h2>
      <div className="space-y-12">
        <Card
          header={{
            left: "Ex-Firefighter",
            leftSuffix: "| Certified"
          }}
          title="Protection & Safety"
          bulletPoints={[
            "Trained to keep you safe — literally ran into burning buildings",
            "180cm, smoke-free, and calm under pressure",
            "Reliable when it counts, every single time"
          ]}
        />

        <Card
          header={{
            left: "Emotional Intelligence",
            leftSuffix: "| Expert"
          }}
          title="Communication & Support"
          bulletPoints={[
            "Active listening with genuine empathy",
            "Conflict resolution via calm discussions (zero raised voices SLA)",
            "Celebrating your wins louder than my own"
          ]}
        />

        <Card
          header={{
            left: "Culinary Arts",
            leftSuffix: "| Advanced"
          }}
          title="Food & Dining"
          bulletPoints={[
            "Can actually decide where to eat (rare skill, I know)",
            "Capable of cooking comfort meals at 2am when needed",
            "World-class snack procurement and delivery service"
          ]}
        />

        <Card
          header={{
            left: "Quality Time Dept.",
            leftSuffix: "| Lead"
          }}
          title="Activities & Adventures"
          bulletPoints={[
            "Rooftop bars and hidden speakeasies — not for the drinks, for the vibe and you",
            "Binge-watching series together without spoilers — zero tolerance policy",
            "Spontaneous road trips and travel planning"
          ]}
        />
      </div>

      <Divider />

      {/* --- Education --- */}
      <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400">Education</h2>
      <div className="space-y-12">
        <Card
          header={{
            left: "School of Love",
            right: "Lifelong Learner"
          }}
          title="Bachelor of Being a Better Partner"
          description="Continuously learning and growing to be the best version of myself — for us."
          bulletPoints={["Major in Remembering Important Dates", "Minor in Giving the Best Forehead Kisses"]}
        />
      </div>

      <Divider />

      {/* --- References --- */}
      <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400">References</h2>
      <div className="rounded-lg border-2 border-dashed border-pink-300 p-6 dark:border-pink-700">
        <p className="text-center text-lg text-gray-600 italic dark:text-gray-400">
          &ldquo;He&apos;s alright I guess&rdquo; — You, hopefully soon
        </p>
      </div>

      <div className="pt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Happy (late) Valentine&apos;s Day! I don&apos;t wanna play games, I&apos;d rather cuddle you ❤️
        </p>
      </div>
    </div>
  );
}

// --- Main page ---
export default function SecretValentine() {
  const [unlocked, setUnlocked] = useState(false);

  return unlocked ? <BoyfriendResume /> : <PasswordGate onUnlock={() => setUnlocked(true)} />;
}
