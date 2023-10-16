import { Button } from "@nextui-org/react";
import { FC } from "react";

interface ErrorProps {
  error: string;
  retry: () => Promise<void>;
}
export const OAuthError: FC<ErrorProps> = ({ error, retry }) => {
  return (
    <>
      <h3> {error} </h3>
      <Button color="primary" onClick={retry}>
        Try Again
      </Button>
    </>
  );
};
