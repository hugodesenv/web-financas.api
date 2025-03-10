import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function getFriendlyException(originalError: any): { message: string, translated: boolean } {
  if (originalError instanceof PrismaClientKnownRequestError) {
    const { code, message } = originalError;
    const options: Record<string, string> = {
      "P2025": "Record not found!"
    }

    return options[code]?.length
      ? { message: options[code], translated: true }
      : { message, translated: false };
  }

  return {
    message: originalError,
    translated: false
  };
}