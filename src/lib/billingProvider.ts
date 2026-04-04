export interface User {
  id: string;
  email: string;
}

export interface Subscription {
  plan: "starter" | "pro" | "subscription";
  status: "active" | "canceled" | "trialing";
  renewalDate?: string;
}

export interface BillingProvider {
  createCheckoutSession(plan: string): Promise<string>;
  getUserSubscription(userId: string): Promise<Subscription>;
  handleWebhook(payload: unknown): Promise<void>;
}

export const LemonSqueezyProvider: BillingProvider = {
  async createCheckoutSession(plan: string): Promise<string> {
    return Promise.resolve(`https://checkout.lemonsqueezy.com/buy/${plan}`);
  },

  async getUserSubscription(userId: string): Promise<Subscription> {
    return Promise.resolve({
      plan: "starter",
      status: "active",
    });
  },

  async handleWebhook(payload: unknown): Promise<void> {
    return Promise.resolve();
  },
};
