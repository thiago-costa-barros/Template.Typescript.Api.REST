/* eslint-disable @typescript-eslint/no-explicit-any */
export function AutoHandlerUserId(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    // Verifica se `this` possui a propriedade `_methodName`
    if (this && typeof this === "object") {
      (this as any)._methodName = propertyKey;
    }

    // Chama o método original
    return originalMethod.apply(this, args);
  };
}