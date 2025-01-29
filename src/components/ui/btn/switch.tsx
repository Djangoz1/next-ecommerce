"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/utils/cn";
import { useFormContext } from "react-hook-form";

const SwitchPrimitive = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    setValue: (value: boolean) => void;
    _value: boolean;
  }
>(({ className, _value, setValue, id = "", ...props }, ref) => {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex  h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className || ""
      )}
      {...props}
      checked={
        props?.checked && _value === undefined ? props?.checked : !_value
      }
      onCheckedChange={(checked) => setValue(checked)}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-zinc-800 border  shadow-xl ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
  );
});

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, id = "", ...props }, ref) => {
  const { setValue, watch } = useFormContext();

  return (
    <SwitchPrimitive
      _value={watch(id)}
      setValue={(checked) => setValue(id, checked)}
      {...props}
    />
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, SwitchPrimitive };
