import { UseToastOptions } from "@chakra-ui/react";

export function getErrorToast() {
  return {};
}

export function getSuccessToast(title: string): UseToastOptions {
  return {
    title,
    status: "success",
    colorScheme: "blue",
    isClosable: true,
    duration: 2000,
    position: "top-right",
  };
}
