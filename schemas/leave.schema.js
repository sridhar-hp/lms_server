import { z } from "zod";

export const leaveSchema = z.object({
    userId: z.string({
        required_error: "User ID is required",
    }),

    name: z.string({
        required_error: "Name is required",
    }),

    leaveType: z.string({
        required_error: "Leave type is required",
    }),

    leaveReason: z
        .string({
            required_error: "Reason is required",
        })
        .min(3, "Reason must be at least 3 characters"),

    startDate: z.coerce.date({
        required_error: "Start date is required",
    }),

    endDate: z.coerce.date({
        required_error: "End date is required",
    }),

    duration: z.number({
        required_error: "Duration is required",
    }).min(1, "Duration must be at least 1 day"),

});
