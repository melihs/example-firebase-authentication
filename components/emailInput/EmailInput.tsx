import { Input } from "@nextui-org/react";

const EmailInput = ({ handleChange, values, errors, touched }: any) => {
  return (
    <div>
      <Input
        size="lg"
        type="email"
        label="Email"
        name="email"
        labelPlacement="outside"
        placeholder="Enter your email"
        onChange={handleChange}
        value={values?.email}
        errorMessage={errors?.email}
        isInvalid={(errors?.email && touched?.email) as boolean}
      />
    </div>
  );
};

export default EmailInput;
