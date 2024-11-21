"use client";

import React from "react";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, MailIcon, CassetteTape } from "lucide-react";
import { CtaButton } from "../components/cta-button";
import { GradientSecondaryText } from "../components/gradient-secondary-text";
import ContactForm from "../components/contact-form";
import { PageTransitionLink } from "../components/route-transition";
import { PageSection } from "../components/page-container";
import { ANIMATION_CONFIG } from "./code/_constants";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/JayRichh",
    icon: GithubIcon,
    label: "Visit my GitHub profile",
  },
  {
    href: "https://linkedin.com/in/jaydenrichardson",
    icon: LinkedinIcon,
    label: "Connect with me on LinkedIn",
  },
  {
    href: "mailto:jayrich.dev@gmail.com",
    icon: MailIcon,
    label: "Send me an email",
  },
  {
    href: "https://soundcloud.com/distortie",
    icon: CassetteTape,
    label: "Listen to my music on Soundcloud",
  },
] as const;

const staggerDelay = ANIMATION_CONFIG.STAGGER_DELAY;

export default function HomePage() {
  return (
    <PageSection>
      <div className="mt-40 w-full">
        <div className="flex flex-col items-center text-center">
          <div className="mb-2 space-y-1 text-4xl font-bold sm:text-5xl md:mb-4 md:space-y-2 md:text-6xl lg:text-7xl">
            <h1 className="block text-foreground">Hi, I'm</h1>
            <GradientSecondaryText className="block bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text pb-3 font-bold">
              Jayden Richardson
            </GradientSecondaryText>
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground sm:text-xl md:text-2xl">
            Full Stack Web Developer with a background in Industrial
            Electrical Engineering
          </p>
          <p className="mt-2 text-lg text-foreground sm:text-xl md:text-2xl">
            Kiwi innovating in the UK
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row md:mt-12">
            <PageTransitionLink href="/about">
              <CtaButton className="w-full bg-primary px-8 py-3 text-lg text-primary-foreground hover:bg-accent sm:w-auto">
                About Me
              </CtaButton>
            </PageTransitionLink>
            <PageTransitionLink href="/code">
              <CtaButton
                variant="outline"
                className="w-full border-primary px-8 py-3 text-lg text-primary hover:bg-primary/20 sm:w-auto"
              >
                View Projects
              </CtaButton>
            </PageTransitionLink>
          </div>
        </div>
      </div>

      <div className="m-0 mb-16 w-full p-0">
        <nav className="mt-8 md:mt-12" aria-label="Social links">
          <ul className="flex justify-center space-x-6">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <li key={href}>
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: "hsl(var(--primary))" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="text-foreground transition-colors hover:text-primary"
                  aria-label={label}
                >
                  <Icon className="h-8 w-8" />
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>

        <ContactForm />
      </div>
    </PageSection>
  );
}
