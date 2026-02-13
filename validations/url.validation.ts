import z from "zod";

const shortenSchema = z.object({
  targetURL: z.url(),
});

export { shortenSchema };
