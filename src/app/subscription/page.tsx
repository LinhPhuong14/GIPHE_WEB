"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import  DashboardSidebar  from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

// // Mock subscription plans
// const subscriptionPlans = [
//   {
//     id: "basic",
//     name: "Basic",
//     price: 9.99,
//     interval: "month",
//     description: "Perfect for beginners",
//     features: [
//       "Unlimited access to basic courses",
//       "Unlimited speaking practice sessions",
//       "Basic vocabulary flashcards",
//       "Access to community forums",
//     ],
//     limitations: [
//       "Limited test access",
//       "No advanced courses",
//       "No personalized learning path",
//     ],
//     popular: false,
//     buttonText: "Get Started",
//   },
//   {
//     id: "premium",
//     name: "Premium",
//     price: 19.99,
//     interval: "month",
//     description: "Most popular choice",
//     features: [
//       "Everything in Basic",
//       "Unlimited access to all courses",
//       "Unlimited speaking practice sessions",
//       "Full vocabulary flashcard library",
//       "Personalized learning path",
//       "Priority support",
//       "Unlimited test access",
//     ],
//     limitations: [],
//     popular: true,
//     buttonText: "Get Premium",
//   },
//   {
//     id: "annual",
//     name: "Annual",
//     price: 199.99,
//     interval: "year",
//     description: "Best value",
//     features: [
//       "Everything in Premium",
//       "2 months free",
//       "Offline course downloads",
//       "Certificate of completion",
//       "1-on-1 tutor sessions (2/month)",
//     ],
//     limitations: [],
//     popular: false,
//     buttonText: "Save with Annual",
//   },
// ]

export default function Subscription() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status !== "loading") {
      setIsLoading(false);
      fetchSubscriptionPlans();
      setCurrentPlan(null);
    }
  }, [status, router]);
  async function fetchSubscriptionPlans() {
    try {
      const res = await fetch("/api/subscription-plans");
      const data = await res.json();
      setSubscriptionPlans(data.plans);
    } catch (error) {
      console.error("Failed to fetch subscription plans:", error);
    }
  }
  const handleSubscribe = (planId: string) => {
    toast({
      title: "Subscription initiated",
      description: `You're being redirected to complete your ${planId} subscription.`,
    });

    setTimeout(() => {
      setCurrentPlan(planId);
      toast({
        title: "Subscription successful!",
        description: `You are now subscribed to the ${planId} plan.`,
        variant: "success",
      });
    }, 2000);
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Subscription cancellation",
      description: "Are you sure you want to cancel your subscription?",
      action: (
        <Button
          variant="destructive"
          onClick={() => {
            setCurrentPlan(null);
            toast({
              title: "Subscription cancelled",
              description:
                "Your subscription has been cancelled. You'll have access until the end of your billing period.",
              variant: "destructive",
            });
          }}
        >
          Confirm
        </Button>
      ),
    });
  };

  if (isLoading || status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const userInfo = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "",
  };

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar isOpen={open} setIsOpen={setOpen} />
      <div className="flex-1">
        <DashboardHeader user={userInfo} />
        <main className="container py-6">
          <h1 className="text-3xl font-bold mb-2">Subscription</h1>

          {currentPlan && (
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Current Subscription
                  </CardTitle>
                  <CardDescription>
                    Your current subscription plan and details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {
                          subscriptionPlans.find(
                            (plan) => plan.id === currentPlan
                          )?.name
                        }{" "}
                        Plan
                      </h3>
                      <p className="text-muted-foreground">
                        $
                        {
                          subscriptionPlans.find(
                            (plan) => plan.id === currentPlan
                          )?.price
                        }
                        /
                        {
                          subscriptionPlans.find(
                            (plan) => plan.id === currentPlan
                          )?.interval
                        }
                      </p>
                      <p className="text-sm mt-2">
                        Next billing date:{" "}
                        {new Date(
                          Date.now() + 30 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button
                        variant="outline"
                        onClick={handleCancelSubscription}
                      >
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {currentPlan ? "Upgrade Your Plan" : "Choose Your Plan"}
            </h2>
            <p className="text-muted-foreground">
              Select the plan that best fits your learning needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  className={`h-full flex flex-col ${
                    plan.popular ? "border-primary" : ""
                  }`}
                >
                  <CardHeader>
                    {plan.price && (
                      <div className="absolute top-0 right-0 -mt-2 -mr-2">
                        <Badge className="bg-primary">Popular</Badge>
                      </div>
                    )}
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">
                        /{plan.duration}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Features
                      </h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">
                    Can I cancel my subscription at any time?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Yes, you can cancel your subscription at any time. You'll
                    continue to have access to your plan until the end of your
                    current billing period.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">
                    How do I change my subscription plan?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You can upgrade your plan at any time. The new plan will
                    take effect immediately, and you'll be charged the prorated
                    difference.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Is there a free trial?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We offer a 7-day free trial for new users. You can access
                    basic features without a subscription, but some features are
                    limited.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We accept all major credit cards, PayPal, and Apple Pay.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
