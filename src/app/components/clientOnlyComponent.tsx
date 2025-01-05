import { useIsClient } from '@uidotdev/usehooks';

export function clientOnlyComponent<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.ComponentType<P> {
  const ClientOnlyComponent = (props: P) => {
    const isClient = useIsClient();

    if (!isClient) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ClientOnlyComponent;
}
