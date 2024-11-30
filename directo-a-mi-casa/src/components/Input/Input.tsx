import classNames from "classnames";
import "./input.css";

interface InputProps {
  type?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  regex?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  className = "",
  disabled = false,
  name = "",
  value = "",
  placeholder = "",
  maxLength,
  regex,
  onChange,
}) => {
  return (
    <input
      type={type}
      disabled={!!disabled}
      placeholder={placeholder}
      name={name}
      value={value}
      maxLength={maxLength}
      onChange={(e) => {
        if (regex) {
          new RegExp(regex).test(e.target.value) && onChange(e);
        } else {
          onChange(e);
        }
      }}
      className={classNames("input", {
        "input-disabled": !!disabled,
        [className]: className,
      })}
    />
  );
};

export default Input;
