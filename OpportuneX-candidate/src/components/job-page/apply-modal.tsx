"use client"

import type React from "react"

import { useState } from "react"
import { X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ApplyModalProps {
  job: any
  isLoading: boolean
  onSubmit: (formData: any) => void
  onClose: () => void
}

export default function ApplyModal({ job, isLoading, onSubmit, onClose }: ApplyModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null as File | null,
    coverLetter: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files?.[0] || null }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-blue-400/30 rounded-2xl w-full max-w-2xl my-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-400/20">
          <div>
            <h2 className="text-2xl font-bold text-white">Apply for Position</h2>
            <p className="text-gray-400 text-sm mt-1">
              {job.title} at {job.company}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-blue-500/20 transition text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-blue-500/10 border border-blue-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-blue-500/10 border border-blue-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-blue-500/10 border border-blue-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          {/* Resume */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Resume *</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              required
              className="w-full px-4 py-3 rounded-lg bg-blue-500/10 border border-blue-400/20 text-gray-400 file:text-blue-300 focus:outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">PDF, DOC or DOCX (Max 5MB)</p>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Cover Letter</label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-blue-500/10 border border-blue-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
              rows={5}
              placeholder="Tell us why you're interested in this role..."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-blue-500/10 border-blue-400/30 text-blue-300 hover:bg-blue-500/20 h-12 rounded-lg transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold h-12 rounded-lg transition-all disabled:opacity-70"
            >
              {isLoading && <Loader2 size={16} className="mr-2 animate-spin" />}
              {isLoading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
