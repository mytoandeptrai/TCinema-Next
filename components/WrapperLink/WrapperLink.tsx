import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const WrapperLink = ({ children, href = '/', ...props }: CustomLinkProps) => {
  return (
    <Link href={href}>
      <span {...props}>{children}</span>
    </Link>
  );
};

export default WrapperLink;
