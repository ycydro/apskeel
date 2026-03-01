export type Client = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
};

export type Job = {
  id: number;
  title: string;
  client: Client;
  budget: number;
  status: "pending" | "in-progress" | "completed" | "cancelled";
};

export type Payment = {
  id: number;
  job: Job;
  amount: number;
  date: string;
  status: "unpaid" | "paid";
};

export type Result<T> =
  | { status: "success"; message?: string; data: T }
  | { status: "error"; message: string };
