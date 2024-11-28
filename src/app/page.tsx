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
    <div className="relative min-h-screen w-full bg-gradient-to-b from-background via-background/95 to-background pb-24">
      <PageSection>
        <div className="flex min-h-[85vh] flex-col items-center justify-center -mt-16">
          <div className="flex flex-col items-center text-center">
            <motion.div 
              className="mb-2 space-y-1 text-4xl font-bold sm:text-5xl md:mb-4 md:space-y-2 md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="block text-foreground">Hi, I'm</h1>
              <GradientSecondaryText className="block bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text pb-3 font-bold">
                Jayden Richardson
              </GradientSecondaryText>
            </motion.div>

            <motion.p 
              className="mx-auto mt-4 max-w-2xl text-lg text-foreground sm:text-xl md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Full Stack Web Developer with a background in Industrial Electrical
              Engineering
            </motion.p>
            <motion.p 
              className="mt-2 text-lg text-foreground sm:text-xl md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Kiwi innovating in the UK
            </motion.p>

            <motion.div 
              className="mt-8 flex flex-row justify-center gap-6 md:mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <PageTransitionLink href="/showcase">
                <CtaButton className="px-8 py-3 text-base sm:text-lg">
                  View Showcase
                </CtaButton>
              </PageTransitionLink>
              <PageTransitionLink href="/about">
                <CtaButton
                  variant="outline"
                  className="px-8 py-3 text-base sm:text-lg"
                >
                  About Me
                </CtaButton>
              </PageTransitionLink>
            </motion.div>

            <motion.nav 
              className="mt-10 md:mt-12" 
              aria-label="Social links"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ul className="flex justify-center space-x-6">
                {SOCIAL_LINKS.map(({ href, icon: Icon, label }, index) => (
                  <motion.li 
                    key={href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  >
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
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </div>
        </div>

        <motion.div 
          className="w-full -mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.8,
            ease: [0.04, 0.62, 0.23, 0.98] // Custom easing for smooth entrance
          }}
        >
          <ContactForm />
        </motion.div>
      </PageSection>
    </div>
  );
}
