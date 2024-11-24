import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

// 認証フォームのバリデーションスキーマ
const useFormValidation = <T extends FieldValues>(
  validationSchema: ZodSchema<T>
): UseFormReturn<T> => {
  return useForm<T>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });
};

export default useFormValidation;
