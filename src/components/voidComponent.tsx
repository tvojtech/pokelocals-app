/* eslint-disable @typescript-eslint/no-unused-vars */
export function voidComponent<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.ComponentType<P> {
  const VoidComponent = () => {
    return null;
  };

  return VoidComponent;
}
