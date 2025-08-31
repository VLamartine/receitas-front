import { HttpErrorResponse } from "@angular/common/http";
import { FormErrors } from "@customTypes/formErrors";

const mapErrors = (error: HttpErrorResponse) => {
  const formErrors: FormErrors = {};
  if (error.error.message) {
    error.error.message.forEach(
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
