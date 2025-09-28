import { HttpErrorResponse } from "@angular/common/http";
import { FormError } from "@customTypes/error";

const mapErrors = (error: HttpErrorResponse["error"]) => {
  const formErrors: FormError = {
    error: error.error,
    statusCode: error.statusCode,
  };
  if (error.message) {
    error.message.forEach(
      ({ field, message }: { field: string; message: string }) => {
        const newMessage = message.charAt(0).toUpperCase() + message.slice(1);
        if (formErrors[field]) {
          formErrors[field].push(newMessage);
        } else {
          formErrors[field] = [newMessage];
        }
      },
    );
  }

  return formErrors;
};

export default mapErrors;
