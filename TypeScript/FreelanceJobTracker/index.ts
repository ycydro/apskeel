import type { Client, Job, Payment, Result } from "./types.js";

let CLIENT_ID = 1;
let JOB_ID = 1;
let PAYMENT_ID = 1;

const clientList: Client[] = [
  { id: CLIENT_ID++, name: "Hev", email: "hev@email.com", isActive: true },
  {
    id: CLIENT_ID++,
    name: "Maria Santos",
    email: "maria@email.com",
    isActive: true,
  },
  {
    id: CLIENT_ID++,
    name: "John Cruz",
    email: "john@email.com",
    isActive: true,
  },
  {
    id: CLIENT_ID++,
    name: "Aiko Tanaka",
    email: "aiko@email.com",
    isActive: true,
  },
  {
    id: CLIENT_ID++,
    name: "Liam Reyes",
    email: "liam@email.com",
    isActive: true,
  },
];

const jobList: Job[] = [
  {
    id: JOB_ID++,
    title: "Website Redesign",
    client: clientList[0]!,
    budget: 1,
    status: "completed",
  },
  {
    id: JOB_ID++,
    title: "E-commerce Setup",
    client: clientList[1]!,
    budget: 2,
    status: "in-progress",
  },
  {
    id: JOB_ID++,
    title: "Portfolio Website",
    client: clientList[2]!,
    budget: 10,
    status: "completed",
  },
  {
    id: JOB_ID++,
    title: "Inventory System",
    client: clientList[3]!,
    budget: 4,
    status: "completed",
  },
  {
    id: JOB_ID++,
    title: "Mobile App UI",
    client: clientList[4]!,
    budget: 5,
    status: "cancelled",
  },
];

const paymentList: Payment[] = [
  {
    id: PAYMENT_ID++,
    job: jobList[0]!,
    amount: jobList[0]!.budget,
    date: "2026-02-01",
    status: "paid",
  },
  {
    id: PAYMENT_ID++,
    job: jobList[1]!,
    amount: jobList[1]!.budget,
    date: "2026-02-10",
    status: "unpaid",
  },
  {
    id: PAYMENT_ID++,
    job: jobList[2]!,
    amount: jobList[2]!.budget,
    date: "2026-02-15",
    status: "paid",
  },
  {
    id: PAYMENT_ID++,
    job: jobList[3]!,
    amount: jobList[3]!.budget,
    date: "2026-02-20",
    status: "unpaid",
  },
  {
    id: PAYMENT_ID++,
    job: jobList[4]!,
    amount: jobList[4]!.budget,
    date: "2026-02-25",
    status: "paid",
  },
];

// client management
function addClient(client: Omit<Client, "id">): Result<Client> {
  const newClient = { id: CLIENT_ID++, ...client };
  clientList.push(newClient);
  return {
    status: "success",
    message: `Successfully added ${newClient.name} to client list.`,
    data: newClient,
  };
}

function deactiveClient(id: number): Result<Client> {
  const client = clientList.find((client) => client.id === id);
  if (!client) {
    console.error(`Client: ${client} is not found in list.`);
    return {
      status: "error",
      message: `Client: ${client} is not found in list.`,
    };
  }
  client.isActive = false;
  return {
    status: "success",
    message: `Successfully deactivated ${client.name}.`,
    data: client,
  };
}

function getClientByIdentifier(
  identifier: Client["id"] | Client["email"],
): Client | undefined {
  if (typeof identifier === "string") {
    return clientList.find((client) => client.email === identifier);
  } else if (typeof identifier === "number") {
    return clientList.find((client) => client.id === identifier);
  } else {
    throw new TypeError("Identifier needs to be type `string` or `number");
  }
}

// job management
function createJob(
  clientIdentifier: Client["id"] | Client["email"],
  job: Omit<Job, "id" | "client" | "status">,
): Result<Job> {
  const client = getClientByIdentifier(clientIdentifier);
  if (!client) {
    return {
      status: "error",
      message: `Failed to create job since ${client} is not found in client list.`,
    };
  }

  // handle inactive client
  if (!client.isActive) {
    return {
      status: "error",
      message: `Failed to create job since client ${client.name} isn't active.`,
    };
  }
  const newJob: Job = { id: JOB_ID++, client, status: "pending", ...job };
  jobList.push(newJob);
  return {
    status: "success",
    message: `Successfully added ${newJob.title} to job list.`,
    data: newJob,
  };
}

function cancelJob(jobID: Job["id"]): Result<Job> {
  const job = getJobByID(jobID);
  if (!job) {
    return {
      status: "error",
      message: `Failed to cancel job since ${jobID} doesn't exist.`,
    };
  }
  job.status = "cancelled";
  return {
    status: "success",
    message: `Successfully cancelled ${job.title}.`,
    data: job,
  };
}

function completeJob(jobID: Job["id"]): Result<Job> {
  const job = getJobByID(jobID);

  if (!job) {
    return {
      status: "error",
      message: `Failed to complete job since ${jobID} doesn't exist.`,
    };
  }

  // handle payment creation before setting status to completed
  const paymentCreationResult = createPayment(job.id);
  if (paymentCreationResult.status === "error") {
    return {
      status: "error",
      message: `Failed to create payment for job: ${job.id}.`,
    };
  }

  job.status = "completed";
  return {
    status: "success",
    message: `Successfully completed ${job.title}.`,
    data: job,
  };
}

function getJobByID(jobID: Job["id"]): Job | undefined {
  return jobList.find((job) => job.id === jobID);
}

// payment management
function createPayment(jobID: Job["id"]): Result<Payment> {
  const job = getJobByID(jobID);
  if (!job) {
    return {
      status: "error",
      message: `Failed to create payment for job since ${job} is not found in job list.`,
    };
  }

  // handle cancelled job
  if (job.status === "cancelled") {
    return {
      status: "error",
      message: `Failed to create payment since job ${job.title} was cancelled.`,
    };
  }

  // handle uncomplete job
  if (job.status !== "completed") {
    return {
      status: "error",
      message: `Failed to create payment since job ${job.title} isn't complete.`,
    };
  }

  const newPayment: Payment = {
    id: PAYMENT_ID++,
    job,
    amount: job.budget,
    date: String(new Date()),
    status: "unpaid",
  };
  paymentList.push(newPayment);
  return {
    status: "success",
    message: `Successfully created unpaid payment for ${job.title}.`,
    data: newPayment,
  };
}

function markPaymentAsPaid(paymentID: Payment["id"]): Result<Payment> {
  const payment = getPaymentByID(paymentID);
  if (!payment) {
    return {
      status: "error",
      message: `Failed to mark payment as paid since ${payment} is not found in payment list.`,
    };
  }
  payment.status = "paid";
  return {
    status: "success",
    message: `Successfully mark payment as paid: ${payment.id}.`,
    data: payment,
  };
}

function getPaymentByID(paymentID: Payment["id"]): Payment | undefined {
  return paymentList.find((payment) => payment.id === paymentID);
}

// financial tracking
function getTotalEarned(): Result<number> {
  if (paymentList.length <= 0) {
    return {
      status: "error",
      message:
        "Failed to get total earned since there are no payment available",
    };
  }
  const totalEarned = paymentList
    .filter((payment) => payment.status === "paid")
    .reduce((acc, payment) => acc + payment.amount, 0);
  return {
    status: "success",
    data: totalEarned,
  };
}

function getPendingRevenue(): Result<number> {
  if (paymentList.length <= 0) {
    return {
      status: "error",
      message:
        "Failed to get total earned since there are no payment available",
    };
  }

  const pendingRevenue = paymentList
    .filter((payment) => payment.status === "unpaid")
    .reduce((acc, payment) => acc + payment.amount, 0);
  return {
    status: "success",
    data: pendingRevenue,
  };
}

function getTotalRevenuePerClient(): Result<any> {
  if (clientList.length <= 0) {
    return {
      status: "error",
      message:
        "Failed to get revenue per client since there are no clients available",
    };
  }

  if (paymentList.length <= 0) {
    return {
      status: "error",
      message:
        "Failed to get total earned since there are no payment available",
    };
  }
  const totalRevenuePerClient = clientList.map((client) => {
    const revenue = paymentList
      .filter(
        (payment) =>
          payment.job?.client?.id === client.id && payment.status === "paid",
      )
      .reduce((acc, payment) => acc + payment.amount, 0);
    return { client: client, revenue };
  });
  return {
    status: "success",
    data: totalRevenuePerClient,
  };
}

function getTopPayingClient(): Result<Client> {
  const clientsWithRevenue = getTotalRevenuePerClient();

  if (clientsWithRevenue.status === "error") {
    return {
      status: "error",
      message: "No clients available.",
    };
  }

  let highestRevenue = 0;
  let topPayingClient;

  for (const client of clientsWithRevenue.data) {
    if (client.revenue > highestRevenue) {
      highestRevenue = client.revenue;
      topPayingClient = client;
    }
  }

  return {
    status: "success",
    data: topPayingClient,
  };
}

// reporting
function getJobsByStatus(status: Job["status"]): Result<Job[]> {
  if (jobList.length <= 0) {
    return {
      status: "error",
      message: "No jobs available.",
    };
  }

  const jobs = jobList.filter((job) => job.status === status);

  return {
    status: "success",
    data: jobs,
  };
}

function getActiveClients(): Result<Client[]> {
  if (clientList.length <= 0) {
    return {
      status: "error",
      message: "No clients available.",
    };
  }
  const clients = clientList.filter((client) => client.isActive === true);

  return {
    status: "success",
    data: clients,
  };
}

function getUnpaidPayments(): Result<Payment[]> {
  if (paymentList.length <= 0) {
    return {
      status: "error",
      message: "No payments available.",
    };
  }
  const unpaidPayments = paymentList.filter(
    (payment) => payment.status === "unpaid",
  );

  return {
    status: "success",
    data: unpaidPayments,
  };
}

function getCompletedJobs(): Result<Job[]> {
  if (jobList.length <= 0) {
    return {
      status: "error",
      message: "No jobs available.",
    };
  }
  const completedJobs = jobList.filter((job) => job.status === "completed");
  return {
    status: "success",
    data: completedJobs,
  };
}
// console.log(addClient({ name: "Hev", email: "hev@email.com", isActive: true }));
// console.log("Client List: ", clientList);
// console.log(deactiveClient(1));
// console.log(getClientByIdentifier("hev@email.com"));
// console.log("Client List: ", clientList);
// console.log(createJob(1, { title: "Video FX", budget: 10000 }));
// console.log("Client List: ", clientList);
// console.log("Job List: ", jobList);
// console.log("Payment List: ", paymentList);
console.log("Top Paying Client: ", getTopPayingClient());
console.log("Jobs by 'completed' status: ", getJobsByStatus("completed"));
console.log("Active Clients: ", getActiveClients());
console.log("Unpaid Payments: ", getUnpaidPayments());
console.log("Completed Jobs: ", getCompletedJobs());
