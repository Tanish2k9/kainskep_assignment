import React from "react";
import { toast } from "react-toastify";
const Toastify = {
  success: (message) => toast.success(message, { autoClose: 3000 }),
  error: (message) => toast.error(message, { autoClose: 3000 }),
  info: (message) => toast.info(message, { autoClose: 3000 }),
  warn: (message) => toast.warn(message, { autoClose: 3000 }),
};

export default Toastify;
