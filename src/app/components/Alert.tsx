import React, { ReactNode } from 'react';

type AlertProps = {
  message: ReactNode;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
};

export const Alert: React.FC<AlertProps> = ({ message, type, title }) => {
  const alertStyles: Record<AlertProps['type'], string> = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellosize-100 border-yellosize-400 text-yellosize-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  };

  const getAlertStyles = () => alertStyles[type];

  return (
    <div className={`border-l-4 p-4 ${getAlertStyles()}`} role="alert">
      {title && <p className="font-bold">{title}</p>}
      <div>{message}</div>
    </div>
  );
};
