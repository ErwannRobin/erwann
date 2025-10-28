import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/ErwannRobin", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com/diwann", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/erwannrobin/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@phone-verif.com", label: "Email" },
  ];

  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full hover:text-primary hover:bg-primary/10 transition-all"
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                  <social.icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Built with{" "}
            <a
              href="https://lovable.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Lovable
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
