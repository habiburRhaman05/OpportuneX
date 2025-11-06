"use client";

import { ArrowLeft, Building2, User, Upload } from "lucide-react";

import { PersonalInfoForm } from "@/components/company-profile/company-edit/personal-info-form";
import { ProfessionalInfoForm } from "@/components/company-profile/company-edit/professional-info-form";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function CompanyEditPage() {
  const [activeSection, setActiveSection] = useState("personal");

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 hover:bg-zinc-900 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-white">
                Edit Company Profile
              </h1>
              <p className="text-sm text-zinc-400">
                Update your company information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="">
          {/* Sidebar Navigation */}

          <div className="flex items-center gap-4 mb-8 lg:flex-nowrap flex-w">
            <button
              onClick={() => setActiveSection("personal")}
              className={`w-[300px] flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                activeSection === "personal"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                  : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-900 bg-zinc-900/50"
              }`}
            >
              <User className="w-5 h-5" />
              <span>Personal Info</span>
            </button>
            <button
              onClick={() => setActiveSection("professional")}
              className={`w-[300px] flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                activeSection === "professional"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                  : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-900 bg-zinc-900/50"
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span>Professional Info</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="">
            {/* Personal Info Section */}
            {activeSection === "personal" && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 lg:p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-400" />
                    Personal Information
                  </h2>
                  <p className="text-sm text-zinc-400 mt-1">
                    Update your company's basic details
                  </p>
                </div>
                <PersonalInfoForm />
              </div>
            )}

            {/* Professional Info Section */}
            {activeSection === "professional" && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 lg:p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-400" />
                    Professional Information
                  </h2>
                  <p className="text-sm text-zinc-400 mt-1">
                    Update your company's registration and contact details
                  </p>
                </div>
                <ProfessionalInfoForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
