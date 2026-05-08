"use client"

import { useState } from "react"
import { X, Loader2, Facebook, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareModalProps {
  jobTitle: string
  onShare: (platform: string) => void
  onClose: () => void
}

export default function ShareModal({ jobTitle, onShare, onClose }: ShareModalProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const platforms = [
    { name: "LinkedIn", icon: Linkedin, color: "from-blue-600 to-blue-700", textColor: "text-blue-400" },
    { name: "Twitter", icon: Twitter, color: "from-sky-400 to-sky-500", textColor: "text-sky-400" },
    { name: "Facebook", icon: Facebook, color: "from-blue-500 to-blue-600", textColor: "text-blue-500" },
    { name: "Email", icon: Mail, color: "from-purple-500 to-purple-600", textColor: "text-purple-400" },
  ]

  const handleShare = async (platform: string) => {
    setIsLoading(platform)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onShare(platform)
    setIsLoading(null)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-blue-400/30 rounded-2xl w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-400/20">
          <div>
            <h2 className="text-2xl font-bold text-white">Share Job</h2>
            <p className="text-gray-400 text-sm mt-1 line-clamp-1">{jobTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-blue-500/20 transition text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Platforms */}
        <div className="p-6 space-y-3">
          {platforms.map((platform) => {
            const Icon = platform.icon
            return (
              <button
                key={platform.name}
                onClick={() => handleShare(platform.name)}
                disabled={isLoading !== null}
                className="w-full flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-blue-500/20 via-transparent to-transparent border border-blue-400/30 hover:border-blue-400/60 hover:bg-gradient-to-r hover:from-blue-500/30 transition-all group disabled:opacity-70"
              >
                <div className={`bg-gradient-to-br ${platform.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-white">{platform.name}</p>
                  <p className="text-sm text-gray-400">Share to {platform.name}</p>
                </div>
                {isLoading === platform.name ? (
                  <Loader2 size={18} className="text-blue-400 animate-spin" />
                ) : (
                  <div className="text-gray-500 group-hover:text-blue-400 transition">→</div>
                )}
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-blue-400/20">
          <Button
            onClick={onClose}
            className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-300 h-11 rounded-lg transition-all"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
