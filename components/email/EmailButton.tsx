import { Link } from "@react-email/components";
import * as React from "react";
import { LoftColors } from "./EmailStyles";

interface EmailButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  emoji?: string;
  className?: string;
}

export default function EmailButton({
  href,
  children,
  variant = 'primary',
  fullWidth = true,
  emoji,
  className,
}: EmailButtonProps) {
  const baseStyles = {
    display: 'inline-block',
    padding: '14px 28px',
    borderRadius: '6px',
    fontWeight: 600,
    textDecoration: 'none',
    fontSize: '16px',
    textAlign: 'center' as const,
    boxSizing: 'border-box' as const,
    ...(fullWidth && {
      width: '100%',
      maxWidth: '350px',
    }),
  };

  const variantStyles = {
    primary: {
      backgroundColor: LoftColors.primary,
      color: '#fff',
    },
    secondary: {
      backgroundColor: LoftColors.backgroundGray,
      color: LoftColors.textSecondary,
      border: `1px solid ${LoftColors.border}`,
    },
  };

  const buttonStyle = {
    ...baseStyles,
    ...variantStyles[variant],
  };

  return (
    <div style={{ margin: '16px 0 32px 0', textAlign: 'center' }}>
      <Link
        href={href}
        style={buttonStyle}
        className={className}
      >
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
        }}>
          {emoji && (
            <span style={{ fontSize: '22px', lineHeight: 1, display: 'inline-block' }}>
              {emoji}
            </span>
          )}
          <span>{children}</span>
        </span>
      </Link>
    </div>
  );
}
