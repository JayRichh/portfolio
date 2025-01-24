"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  CassetteTape,
  AtSign,
} from "lucide-react";
import { CtaButton } from "../components/cta-button";
import { GradientSecondaryText } from "../components/gradient-secondary-text";
import ContactForm from "../components/contact-form";
import { PageTransitionLink } from "../components/route-transition";
import { PageSection } from "../components/page-container";
import { CodePenIcon } from "../components/codepen-icon";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../components/ui/tooltip";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/JayRichh",
    icon: GithubIcon,
    label: "Visit my GitHub",
  },
  {
    href: "https://codepen.io/JayRichh",
    icon: CodePenIcon,
    label: "Check out my CodePen",
  },
  {
    href: "https://linkedin.com/in/jaydenrichardson",
    icon: LinkedinIcon,
    label: "Connect with me on LinkedIn",
  },
  {
    href: "https://bsky.app/profile/jayrich.dev",
    icon: AtSign,
    label: "Follow me on Bluesky",
  },
  {
    href: "mailto:jayrich.dev@gmail.com",
    icon: MailIcon,
    label: "Send me an email",
  },
  {
    href: "https://soundcloud.com/distortie",
    icon: CassetteTape,
    label: "Listen to my Soundcloud",
  },
] as const;

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-background via-background/95 to-background pb-16">
      <PageSection>
        <div className="flex min-h-[80vh] flex-col items-center justify-center">
          {/* Main Content Container */}
          <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-6xl px-4 gap-8 lg:gap-16">
            {/* Text Section */}
            <motion.div
              className="w-full lg:w-1/2 text-center lg:text-left space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl text-foreground">
                  Hi, I'm
                </h1>
                <GradientSecondaryText className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-center lg:text-left text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold whitespace-nowrap">
                  Jayden Richardson
                </GradientSecondaryText>
              </div>
              <motion.p
                className="text-lg text-center text-foreground sm:text-xl md:text-2xl lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Full Stack Web Developer with a background in Industrial
                Electrical Engineering
              </motion.p>
              <motion.p
                className="text-lg text-center text-foreground sm:text-xl md:text-2xl lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Kiwi innovating in the UK
              </motion.p>

              <motion.div
                className="flex flex-col items-center gap-4 md:flex-row md:gap-6 lg:justify-start pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <PageTransitionLink href="/work">
                  <CtaButton className="px-8 py-3 text-base sm:text-lg w-full md:w-auto">
                    View Work
                  </CtaButton>
                </PageTransitionLink>
                <PageTransitionLink href="/about">
                  <CtaButton
                    variant="outline"
                    className="px-8 py-3 text-base sm:text-lg w-full md:w-auto"
                  >
                    About Me
                  </CtaButton>
                </PageTransitionLink>
              </motion.div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              className="w-full lg:w-1/2 flex justify-center lg:justify-end relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Decorative Background Element */}
              <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] relative">
                <Image
                  src="/logo_bg_remove.png"
                  alt="Jayden Richardson"
                  fill
                  className="rounded-full shadow-lg object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.nav
            className="mt-12"
            aria-label="Social links"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <TooltipProvider>
              <ul className="flex justify-center space-x-8">
                {SOCIAL_LINKS.map(({ href, icon: Icon, label }, index) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{
                            scale: 1.2,
                            color: "hsl(var(--primary))",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                          className="text-foreground transition-colors hover:text-primary"
                          aria-label={label}
                        >
                          <Icon className="h-8 w-8" />
                        </motion.a>
                      </TooltipTrigger>
                      <TooltipContent>{label}</TooltipContent>
                    </Tooltip>
                  </motion.li>
                ))}
              </ul>
            </TooltipProvider>
          </motion.nav>
        </div>

        {/* Contact Form */}
        <motion.div
          id="contact"
          className="w-full mt-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            ease: [0.04, 0.62, 0.23, 0.98],
          }}
        >
          <ContactForm />
        </motion.div>
      </PageSection>
    </div>
  );
}
