import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

/* ============================================
   🧩 Zod Schemas
   ============================================ */
const emailSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid company email address.")
    .min(5, "Email must be at least 5 characters."),
});

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits.")
    .max(6, "OTP must be 6 digits."),
});

/* ============================================
   🧠 Component
   ============================================ */
export default function CompanyEmailVerification() {
  const [step, setStep] = useState<"email" | "otp" | "success">("email");
  const [loading, setLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  // 📨 Step 1: Email form
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  // 🔢 Step 2: OTP form
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  /* ============================================
     📩 Send Email Handler
     ============================================ */
  const handleSendEmail = async (values: z.infer<typeof emailSchema>) => {
    setLoading(true);
    setSentEmail(values.email);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1500); // simulate backend email send delay
  };

  /* ============================================
     ✅ Verify OTP Handler
     ============================================ */
  const handleVerifyOtp = async (values: z.infer<typeof otpSchema>) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 1500); // simulate backend verification delay
  };

  /* ============================================
     🎨 UI with Framer Motion Animation
     ============================================ */
  return (
    <div className="flex items-center justify-center bg-zinc-950 p-6">
      <Card className="w-full max-w-md shadow-xl bg-zinc-900 border-zinc-800 text-white">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Company Email Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {step === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Form {...emailForm}>
                  <form
                    onSubmit={emailForm.handleSubmit(handleSendEmail)}
                    className="space-y-4"
                  >
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your company email"
                              {...field}
                              className="bg-zinc-800 border-zinc-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Verification Code"
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Alert className="bg-zinc-800 text-white border-zinc-700 mb-4">
                  <AlertCircle className="h-4 w-4 text-yellow-400" />
                  <AlertDescription>
                    Verification code sent to <strong>{sentEmail}</strong>
                  </AlertDescription>
                </Alert>

                <Form {...otpForm}>
                  <form
                    onSubmit={otpForm.handleSubmit(handleVerifyOtp)}
                    className="space-y-4"
                  >
                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enter OTP</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="6-digit code"
                              maxLength={6}
                              {...field}
                              className="bg-zinc-800 border-zinc-700 text-center text-lg tracking-widest"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify OTP"
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-10"
              >
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">
                  Verification Successful!
                </h2>
                <p className="text-zinc-400">
                  Your company email has been successfully verified.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
