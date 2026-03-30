import { useState } from "react";
import { Mail, Binary,Copy, Check, Github, Linkedin, Twitter, Instagram, Youtube, ArrowUpRight } from "lucide-react";
import { socials, email } from "../content/socials";

const iconMap: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  binary:Binary
};

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-medium text-zinc-100 mb-2">Connect</h2>
          <p className="text-zinc-400">Let's build something great together.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Card */}
        <div className="p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 flex flex-col justify-between space-y-6 hover:border-zinc-700/50 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4 border border-zinc-700/50">
              <Mail className="w-5 h-5 text-zinc-300" />
            </div>
            <h3 className="text-lg font-medium text-zinc-100 mb-1">Email Me</h3>
            <p className="text-sm text-zinc-400">I usually respond within 24 hours.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${email}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 font-medium hover:bg-white transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              Send Email
            </a>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 transition-colors border border-zinc-700/50"
              title="Copy email address"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Socials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socials.map((social) => {
            const Icon = iconMap[social.icon];
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/10 hover:bg-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" />
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors">
                    {social.name}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
