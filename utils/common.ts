import { toast } from 'react-hot-toast';

export const isAllFieldInObjectFilled = (object: any): boolean => {
  if (!object) return false;

  return Object.values(object).every((value) => value !== '');
};

export const copyToClipBoard = (text = '', message = 'Copy to clipboard successfully') => {
  navigator.clipboard?.writeText && navigator.clipboard.writeText(text);
  toast.success(message);
};
