// export const validate = (schema) => (req, res, next) => {
//   const result = schema.safeParse(req.body);
// ///
//   if (!result.success) {
//     return res.status(400).json({
//       message: "Validation failed",
//       errors: result.error.errors,
//     });
//   }

//   req.body = result.data; // 🔐 trusted data
//   next();
// };

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    console.log("❌ ZOD VALIDATION ERROR:");
    console.log(result.error.errors);

    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.errors,
    });
  }

  req.body = result.data;
  next();
};
