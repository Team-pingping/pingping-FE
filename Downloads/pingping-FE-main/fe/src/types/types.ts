// types/types.ts
export interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "start" | "next" | "submit"; // "submit" 추가
  className?: string;
  disabled?: boolean;
}

export interface NavigationProps {
  title?: string;
  showBackButton?: boolean;
}
