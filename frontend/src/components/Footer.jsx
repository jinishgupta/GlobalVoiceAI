function Footer() {
  return (
    <footer className="bg-base-bg-alt border-t border-divider text-text-muted text-sm mt-8">
      <div className="container mx-auto py-8 px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-primary font-bold text-xl mb-2">GlobalVoice AI</div>
          <div className="mb-2">Empowering global communication with AI-driven localization.</div>
          <div className="flex gap-3 mt-2">
            {/* Social media icon placeholders */}
            <span className="w-6 h-6 bg-divider rounded-full inline-block" />
            <span className="w-6 h-6 bg-divider rounded-full inline-block" />
            <span className="w-6 h-6 bg-divider rounded-full inline-block" />
          </div>
        </div>
        <div>
          <div className="font-semibold text-text-main mb-2">Quick Links</div>
          <ul className="space-y-1">
            <li><a href="/features" className="hover:text-primary">Features</a></li>
            <li><a href="/pricing" className="hover:text-primary">Pricing</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-text-main mb-2">Resources</div>
          <ul className="space-y-1">
            <li><a href="/blog" className="hover:text-primary">Blog</a></li>
            <li><a href="/faq" className="hover:text-primary">FAQ</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-text-main mb-2">Legal</div>
          <ul className="space-y-1">
            <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-primary">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center py-4 border-t border-divider text-xs text-text-muted bg-base-bg">© {new Date().getFullYear()} GlobalVoice AI. All rights reserved.</div>
    </footer>
  );
}

export default Footer; 